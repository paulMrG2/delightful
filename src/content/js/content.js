/**
 * Delightful
 *
 * Main content file for front end
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */
// Triggers
import {asana} from "./trigger/asana";
import {clickup} from "./trigger/clickup";
import {github} from "./trigger/github";
import {jira} from "./trigger/jira";
import {todoist} from "./trigger/todoist";
import {trello} from "./trigger/trello";
import {wrike} from "./trigger/wrike";

if (typeof window.delightfulActivated === 'undefined') {

    /**
     * Stop executeScript from background from executing multiple times
     *
     * @type {boolean}
     */
    window.delightfulActivated = true;

    /**
     * Reference vars
     */
    const ref = {
        delightfulAnimationRunning: false,
        mouseDownVal:               null
    };

    /**
     * List of settings
     */
    const allSettings = {
        allDelights:     null,
        allSites:        null,
        chanceOfDelight: null
    };

    /**
     * Keep settings up to date
     */
    chrome.runtime.sendMessage({type: 'allSettings'}, response => {
        allSettings.allSites = response.allSites;
        allSettings.allDelights = response.allDelights;
        allSettings.chanceOfDelight = response.chanceOfDelight;
    });
    chrome.storage.onChanged.addListener(function (changes, namespace) {
        if (typeof changes.enabledSites?.newValue !== 'undefined') {
            allSettings.allSites = changes.enabledSites.newValue.sites;
        }
        if (typeof changes.enabledDelights?.newValue !== 'undefined') {
            allSettings.allDelights = changes.enabledDelights.newValue.delights;
        }
        if (typeof changes.chanceOfDelight?.newValue !== 'undefined') {
            allSettings.chanceOfDelight = changes.chanceOfDelight.newValue.chance;
        }
    });

    /**
     * Mousedown event for tracking drag/drop
     */
    document.addEventListener('mousedown', event => {

        // Reset the value
        ref.mouseDownVal1 = null;
        ref.mouseDownVal2 = null;

        // Trello board view mousedown ref
        let trello = allSettings.allSites.map(site => site.host).indexOf('trello.com');
        if ((trello > -1) && allSettings.allSites[trello].enabled) {
            let listContent = event.target.closest('.js-list-content');
            if (listContent !== null) {
                let listName = listContent.querySelector('.js-list-name-assist');
                if (listName !== null) {
                    // Name of the list we're starting from (don't run animation if dropped in same list)
                    ref.mouseDownVal1 = listName.innerHTML;
                }
                // Record the current task to match with
                let task = event.target.closest('a.list-card');
                if (task !== null) {
                    ref.mouseDownVal2 = task.getAttribute("href").toString();
                }
            }
        }

        // ClickUp board view mousedown ref
        let clickup = allSettings.allSites.map(site => site.host).indexOf('app.clickup.com');
        if ((clickup > -1) && allSettings.allSites[clickup].enabled) {
            if (event.target.closest('.cdk-drag') !== null) {
                let dropList = event.target.closest('.cdk-drop-list');
                if ((dropList !== null) && (typeof dropList.dataset.status !== 'undefined')) {
                    ref.mouseDownVal1 = dropList.dataset.status;
                }
            }
        }

        if (ref.mouseDownVal1 === null) {
            ref.mouseDownVal1 = 'standardClickEvent';
            ref.mouseDownVal2 = event.target.className;
        }

    }, true);

    /**
     * Main document event listener for clicks on any element
     */
    document.addEventListener('mouseup', event => {
        if (!ref.delightfulAnimationRunning && allSettings.allSites !== null) {
            if (event.button === 0) { // Left mouse button only
                matchTrigger(event);
            }
        }
    }, true);

    /**
     * Check if a match is found
     *
     * @param event
     * @returns {boolean}
     */
    const matchTrigger = event => {

        asana(allSettings, ref, event);
        clickup(allSettings, ref, event);
        github(allSettings, ref, event);
        jira(allSettings, ref, event);
        todoist(allSettings, ref, event);
        trello(allSettings, ref, event);
        wrike(allSettings, ref, event);

    };

    /**
     * Asana - give old tasks some shame
     * Move this to a more relevant location later
     */
    window.addEventListener('load', event => {
        if (document.location.host === 'app.asana.com') {
            const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000; // 30 days
            let now = new Date();
            const timestampThirtyDaysAgo = now.getTime() - thirtyDaysInMs;
            let old = false;
            let testPattern1 = /^[A-Za-z]{3} [0-9]{1,2}/g;
            let testPattern2 = /^[0-9]{1,2} [A-Za-z]{3}/g;
            const asanaOldTaskObserver = new MutationObserver(mutations => {
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
                        if(!isNaN(taskCreatedDate)) {
                            old = (timestampThirtyDaysAgo > taskCreatedDate.getTime());
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
                                if(!isNaN(taskCreatedDate)) {
                                    old = (timestampThirtyDaysAgo > taskCreatedDate.getTime());
                                }
                            }
                        }
                    }
                });
                const taskPane = document.querySelector('article.TaskPane .DynamicBorderScrollable-content');
                if (taskPane !== null) {
                    if (old) {
                        chrome.runtime.sendMessage({type: 'delight', delight: "spiderWeb"}, response => {
                            taskPane.style.backgroundRepeat = 'no-repeat';
                            taskPane.style.backgroundImage = "url('" + response.image + "')";
                            taskPane.style.backgroundSize = '100%';
                            const taskNameInput = document.querySelector('.BaseTextarea[aria-label="Task Name"]');
                            if(taskNameInput !== null) {
                                taskNameInput.style.backgroundColor = 'transparent';
                            }
                        });
                    } else {
                        taskPane.style.backgroundImage = 'none';
                    }
                }
            });
            const theNode = (document.querySelector('.FullWidthPageStructureWithDetailsOverlay-detailsOverlay') || document.querySelector('.FocusModePage-taskPane'));
            if (theNode !== null) {
                asanaOldTaskObserver.observe(theNode, {
                    attributeFilter: ['data-task-id'],
                    childList:       true,
                    subtree:         false
                });
            }
        }
    });
}