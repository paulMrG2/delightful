/**
 * Delightful
 *
 * Extra: Asana Spider Web
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 *
 * Sources used
 * Original photo of web by Paul Groth
 */

const ref = {
    asanaLoadObserver:    null,
    asanaOldTaskObserver: null,
    asanaOldTaskPage:     null
};

export const asanaSpiderWeb = () => {
    window.addEventListener('load', () => {
        spiderWeb();
        ref.asanaLoadObserver = new MutationObserver(() => {
            spiderWeb();
        });

        const asanaMainPage = document.getElementById('asana_main_page');
        if(asanaMainPage) {
            ref.asanaLoadObserver.observe(asanaMainPage, {
                attributeFilter: ['class'],
                childList:       true,
                subtree:         false
            });
        }
    });
};

const spiderWeb = () => {
    if (ref.asanaOldTaskObserver !== null) {
        ref.asanaOldTaskObserver.disconnect();
        ref.asanaOldTaskObserver = null;
    }
    ref.asanaOldTaskPage = null;

    const daysInMs = 90 * 24 * 60 * 60 * 1000; // 90 days
    let now = new Date();
    const timestampNDaysAgo = now.getTime() - daysInMs;
    let old = false;
    let testPattern1 = /^[A-Za-z]{3} [0-9]{1,2}/g;
    let testPattern2 = /^[0-9]{1,2} [A-Za-z]{3}/g;

    ref.asanaOldTaskObserver = new MutationObserver(mutations => {
        old = false;
        mutations.forEach(mutation => {
            const taskCreatedElement = mutation.target.querySelector('.TaskCreationBlockStory .BlockStory-timestamp > span');
            if ((taskCreatedElement !== null) && (taskCreatedElement.innerText.length > 0) && (testPattern1.test(taskCreatedElement.innerText) === true || testPattern2.test(taskCreatedElement.innerText) === true)) {
                const taskCreatedText = taskCreatedElement.innerText;
                let theDateArray = taskCreatedText.split(', ');
                if (theDateArray.length === 1) { // This year
                    theDateArray.push(now.getFullYear());
                }
                let taskCreatedDate = new Date((theDateArray.join(', ')));
                if (!isNaN(taskCreatedDate)) {
                    old = (timestampNDaysAgo > taskCreatedDate.getTime());
                }
            } else {
                const miniStory = mutation.target.querySelector('.MiniStoryActionSentence-content');
                if (miniStory !== null && miniStory.innerText.includes('duplicated task from')) {
                    const duplicatedTaskCreatedElement = mutation.target.querySelector('.MiniStory-timestamp');
                    if ((duplicatedTaskCreatedElement !== null) && (duplicatedTaskCreatedElement.innerText.length > 0) && (testPattern1.test(duplicatedTaskCreatedElement.innerText) === true || testPattern2.test(duplicatedTaskCreatedElement.innerText) === true)) {
                        const duplicatedTaskCreatedText = duplicatedTaskCreatedElement.innerText;
                        let theDateArray = duplicatedTaskCreatedText.split(', ');
                        if (theDateArray.length === 1) { // This year
                            theDateArray.push(now.getFullYear());
                        }
                        let taskCreatedDate = new Date((theDateArray.join(', ')));
                        if (!isNaN(taskCreatedDate)) {
                            old = (timestampNDaysAgo > taskCreatedDate.getTime());
                        }
                    }
                }
            }
        });

        const taskPane = document.querySelector('div.TaskPane .DynamicBorderScrollable-content');
        if (taskPane !== null) {
            if (old) {
                chrome.runtime.sendMessage({type: 'delight', delight: "spiderWeb"}, response => {
                    taskPane.style.backgroundRepeat = 'no-repeat';
                    taskPane.style.backgroundImage = "url('" + response.image + "')";
                    taskPane.style.backgroundSize = '100%';
                    // Remove background of the title
                    const taskNameInput = document.querySelector('.BaseTextarea[aria-label="Task Name"]');
                    if (taskNameInput !== null) {
                        taskNameInput.style.backgroundColor = 'transparent';
                    }
                    // Remove background of the description
                    const taskDescriptionInput = document.querySelector('#TaskDescriptionView');
                    if (taskDescriptionInput !== null) {
                        taskDescriptionInput.style.backgroundColor = 'transparent';
                    }
                    // Remove background of the message banner if it's there
                    const taskMessageBanner = document.querySelector('.TypographyPresentation--m.MessageBanner--default');
                    if (taskMessageBanner !== null) {
                        taskMessageBanner.style.backgroundColor = 'transparent';
                    }
                });
            } else {
                taskPane.style.backgroundImage = 'none';
            }
        }
    });

    setTimeout(() => {
        const theNode = (document.querySelector('.FullWidthPageStructureWithDetailsOverlay-detailsOverlay') || document.querySelector('.FocusModePage-taskPane'));
        if (theNode !== null) {
            if (theNode.className.includes('FullWidthPageStructureWithDetailsOverlay-detailsOverlay')) {
                ref.asanaOldTaskPage = 'MyTasksPage';
            }
            if (theNode.className.includes('FocusModePage-taskPane')) {
                ref.asanaOldTaskPage = 'ProjectPage';
            }
            ref.asanaOldTaskObserver.observe(theNode, {
                attributeFilter: ['data-task-id'],
                childList:       true,
                subtree:         false
            });
        }
    }, 3000);
};