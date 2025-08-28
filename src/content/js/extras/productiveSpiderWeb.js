/**
 * Delightful
 *
 * Extra: Productive Spider Web
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 *
 * Sources used
 * Original photo of web by Paul Groth
 * Spider web by Sarah Webber (AKA some spider in the backyard)
 */

const ref = {
  productiveLoadObserver:    null,
  productiveOldTaskObserver: null
};

export const productiveSpiderWeb = (spiderWebSettings) => {
  addEventListener('load', () => {
    productiveSpiderWebObserver(spiderWebSettings);
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

const oldnessCheck = (target, spiderWebSettings) => {
  setTimeout(() => { // Productive is slow to load the task details
    const activityItems = target.querySelectorAll('.activity-item');
    let isOld = false;
    if (activityItems.length > 0) {
      const changeText = activityItems[activityItems.length - 1].querySelector('.activity-item__changes > .changeset-item');
      if (changeText !== null && (changeText.innerText.includes('Created') || changeText.innerText.includes('Copied from'))) {
        const taskCreatedText = activityItems[activityItems.length - 1].querySelector('.activity-item__comment-header-timeago > span');
        if (taskCreatedText !== null && taskCreatedText.innerText.length > 0) {
          if (isTaskCreatedText(taskCreatedText.innerText) && isOldTask(taskCreatedText.innerText, spiderWebSettings)) {
            isOld = true;
          }
        }
      }
    }
    setSpiderWebBackground(isOld);
  }, 2000);
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
  const taskPane = document.querySelector('.task-form-page__main');
  if (taskPane !== null) {
    if (isOld) {
      chrome.runtime.sendMessage({type: 'delight', delight: "spiderWeb"}, response => {
        taskPane.style.backgroundRepeat = 'no-repeat';
        taskPane.style.backgroundImage = "url('" + response.image + "')";
        taskPane.style.backgroundSize = '100%';
      });
    } else {
      taskPane.style.backgroundImage = 'none';
    }
  }
};

const productiveSpiderWebObserver = (spiderWebSettings) => {
  if (ref.productiveOldTaskObserver !== null) {
    ref.productiveOldTaskObserver.disconnect();
    ref.productiveOldTaskObserver = null;
  }
  ref.productiveOldTaskPage = null;

  ref.productiveOldTaskObserver = new MutationObserver(mutations => {
    let old = false;
    mutations.forEach(mutation => {
      oldnessCheck(mutation.target, spiderWebSettings);
    });

    setSpiderWebBackground(old);
  });

  ref.productiveOldTaskObserver.observe(document.body, {
    attributeFilter: ['class'],
    childList:       true,
    subtree:         false
  });
};