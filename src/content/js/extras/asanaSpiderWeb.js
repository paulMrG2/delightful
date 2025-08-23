/**
 * Delightful
 *
 * Extra: Asana Spider Web
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 *
 * Sources used
 * Original photo of web by Paul Groth
 * Spider web by Sarah Webber (AKA some spider in the backyard)
 */

const ref = {
  asanaLoadObserver:    null,
  asanaOldTaskObserver: null,
  asanaOldTaskPage:     null
};

export const asanaSpiderWeb = (spiderWebSettings) => {
  addEventListener('load', () => {
    ref.asanaLoadObserver = new MutationObserver(() => {
      spiderWeb(spiderWebSettings);
    });

    const asanaMainPage = document.body;
    if (asanaMainPage) {
      ref.asanaLoadObserver.observe(asanaMainPage, {
        attributeFilter: ['class'],
        childList:       true,
        subtree:         false
      });
    }

    // On load, in case the observer doesn't catch it
    setTimeout(() => doFirstRun(spiderWebSettings), 5000);
  });
};

const convert12to24hr = (time12h) => {
  let [hours, minutes] = time12h.split(':');
  let modifier = minutes.substring(2);
  minutes = minutes.substring(0, 2);

  if (modifier === 'pm' && hours !== '12') {
    hours = parseInt(hours, 10) + 12;
  }

  return [hours, minutes, 0];
};

const doFirstRun = (spiderWebSettings) => {
  const theNode = (document.querySelector('.FullWidthPageStructureWithDetailsOverlay-detailsOverlay') || document.querySelector('.FocusModePage-taskPane'));
  const taskCreatedElement = theNode.querySelector('.BlockStory-timestamp > span');
  let isOld = false;
  if ((taskCreatedElement !== null) && (taskCreatedElement.innerText.length > 0)) {
    const taskCreatedText = taskCreatedElement.innerText;
    if (isTaskCreatedText(taskCreatedText) && isOldTask(taskCreatedText, spiderWebSettings)) {
      isOld = true;
    }
  }
  setSpiderWebBackground(isOld);
};

const isTaskCreatedText = (taskCreatedText) => {
  return /^[A-Za-z]{3} [0-9]{1,2}/g.test(taskCreatedText) ||
    /^[0-9]{1,2} [A-Za-z]{3}/g.test(taskCreatedText) ||
    /^[0-9]{1,2} (minute(s)?|hour(s)?|day(s)?) ago$/g.test(taskCreatedText) ||
    /^Today at [0-9]{1,2}:[0-9]{2}(am|pm)$/g.test(taskCreatedText) ||
    /^Yesterday at [0-9]{1,2}:[0-9]{2}(am|pm)$/g.test(taskCreatedText);
};

const isOldTask = (taskCreatedText, spiderWebSettings) => {
  let taskAgeDays = typeof spiderWebSettings.taskAgeDays !== 'undefined' ? spiderWebSettings.taskAgeDays : 30;
  const daysInMs = taskAgeDays > 0 ? taskAgeDays * 24 * 60 * 60 * 1000 : 0;
  let now = new Date();
  const timestampNDaysAgo = now.getTime() - daysInMs;
  let taskCreatedDate;
  if (/^[0-9]{1,2} (minute(s)?|hour(s)?|day(s)?) ago$/g.test(taskCreatedText)) {
    let ago = taskCreatedText.split(' ');
    let timeInMs = 0;
    if (ago[1].startsWith('minute')) timeInMs = parseInt(ago[0]) * 60 * 1000;
    if (ago[1].startsWith('hour')) timeInMs = parseInt(ago[0]) * 60 * 60 * 1000;
    if (ago[1].startsWith('day')) timeInMs = parseInt(ago[0]) * 24 * 60 * 60 * 1000;
    taskCreatedDate = now.getTime() - timeInMs;
  } else if (/^Today at [0-9]{1,2}:[0-9]{2}(am|pm)$/g.test(taskCreatedText)) {
    let yesterdayArray = taskCreatedText.split(' ');
    let yesterday = new Date();
    yesterday.setHours(...convert12to24hr(yesterdayArray[2]));
    taskCreatedDate = yesterday.getTime();
  } else if (/^Yesterday at [0-9]{1,2}:[0-9]{2}(am|pm)$/g.test(taskCreatedText)) {
    let yesterdayArray = taskCreatedText.split(' ');
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(...convert12to24hr(yesterdayArray[2]));
    taskCreatedDate = yesterday.getTime();
  } else {
    let theDateArray = taskCreatedText.split(', ');
    if (theDateArray.length === 1) { // This year
      theDateArray.push(now.getFullYear());
    }
    taskCreatedDate = new Date((theDateArray.join(', '))).getTime();
  }
  return !isNaN(taskCreatedDate) && (timestampNDaysAgo > taskCreatedDate);
};

const setSpiderWebBackground = (isOld) => {
  const taskPane = document.querySelector('div.TaskPane .DynamicBorderScrollable-content');
  if (taskPane !== null) {
    if (isOld) {
      chrome.runtime.sendMessage({type: 'delight', delight: "spiderWeb"}, response => {
        taskPane.style.backgroundRepeat = 'no-repeat';
        taskPane.style.backgroundImage = "url('" + response.image + "')";
        taskPane.style.backgroundSize = '100%';
        // Remove background of the title
        const taskNameInput = taskPane.querySelector('.BaseTextarea[aria-label="Task Name"]');
        if (taskNameInput !== null) {
          taskNameInput.style.backgroundColor = 'transparent';
        }
        // Remove background of the description
        const taskDescriptionInput = taskPane.querySelector('#TaskDescription');
        if (taskDescriptionInput !== null) {
          taskDescriptionInput.style.backgroundColor = 'transparent';
        }
        // Remove background of the message banner if it's there
        const taskMessageBanner = taskPane.querySelector('.TypographyPresentation--m.MessageBanner--default');
        if (taskMessageBanner !== null) {
          taskMessageBanner.style.backgroundColor = 'transparent';
        }
        // Remove background of the message banner if it's there
        const taskPaneBody = taskPane.querySelector('.TaskPaneBody');
        if (taskPaneBody !== null) {
          taskPaneBody.style.backgroundColor = 'transparent';
        }
      });
    } else {
      taskPane.style.backgroundImage = 'none';
    }
  }
};

const spiderWeb = (spiderWebSettings) => {
  if (ref.asanaOldTaskObserver !== null) {
    ref.asanaOldTaskObserver.disconnect();
    ref.asanaOldTaskObserver = null;
  }
  ref.asanaOldTaskPage = null;

  ref.asanaOldTaskObserver = new MutationObserver(mutations => {
    let old = false;
    mutations.forEach(mutation => {
      let taskCreatedElement = mutation.target.querySelector('.BlockStory-timestamp > span');
      if ((taskCreatedElement !== null) && (taskCreatedElement.innerText.length > 0)) {
        const taskCreatedText = taskCreatedElement.innerText;
        if (isTaskCreatedText(taskCreatedText) && isOldTask(taskCreatedText, spiderWebSettings)) {
          old = true;
        }
      }
    });

    setSpiderWebBackground(old);
  });

  const theNode = (document.querySelector('.FullWidthPageStructureWithDetailsOverlay-detailsOverlay') || document.querySelector('.FocusModePage-taskPane'));
  if (theNode !== null) {
    if (theNode.querySelector('.FullWidthPageStructureWithDetailsOverlay-detailsOverlay')) {
      ref.asanaOldTaskPage = 'MyTasksPage';
    }
    if (theNode.querySelector('.FocusModePage-taskPane')) {
      ref.asanaOldTaskPage = 'ProjectPage';
    }
    ref.asanaOldTaskObserver.observe(theNode, {
      attributeFilter: ['data-task-id'],
      childList:       true,
      subtree:         false
    });
  }
};