/**
 * Delightful
 *
 * Trigger: ClickUp
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */
import {doAnimation} from "../animation";

export const clickup = (allSettings, ref, event) => {

    if (document.location.host === 'app.clickup.com') {
        let className = event.target.getAttribute('class') || '';

        if (ref.mouseDownVal1 === 'standardClickEvent' && (ref.mouseDownVal2 === event.target.className)) { // Stop cheating by matching mousedown and mouseup className
            let idx = allSettings.allSites.map(site => site.host).indexOf('app.clickup.com');
            if ((idx > -1) && allSettings.allSites[idx].enabled) {

                // ClickUp task complete button in main task list
                if (className.includes('cu-task-row-status') || (event.target.closest('.cu-task-row-status') !== null)) {
                    let taskList = null;
                    if((event.target.closest('.cu-task-list').dataset.test === 'task-list-new-subtask')) {
                        taskList = event.target.closest('.cu-task-list').parentElement.closest('.cu-task-list');
                    } else {
                        taskList = event.target.closest('.cu-task-list');
                    }
                    if (taskList !== null) {
                        let groupHeader = taskList.querySelector('.cu-group-header__header-status');
                        if (groupHeader !== null) {
                            if (groupHeader.textContent.toLowerCase() === 'to do') {
                                doAnimation(allSettings, ref, event);
                            }
                        }
                    }
                }

                // ClickUp task complete button top of open task pane
                if (className.includes('task-status_toggle')) {
                    let taskStatus = event.target.querySelector('.task-status__value');
                    if ((taskStatus !== null) && (taskStatus.textContent.toLowerCase() === 'mark complete')) {
                        doAnimation(allSettings, ref, event);
                    }
                }
                if (className.includes('ng-star-inserted') || className.includes('task-status__icon')) {
                    let toggleButton = event.target.closest('.task-status_toggle');
                    if (toggleButton !== null) {
                        let taskStatus = toggleButton.querySelector('.task-status__value');
                        if ((taskStatus !== null) && (taskStatus.textContent.toLowerCase() === 'mark complete')) {
                            doAnimation(allSettings, ref, event);
                        }
                    }
                }
                if (className.includes('task-status__value')) {
                    if (event.target.textContent.toLowerCase() === 'mark complete') {
                        doAnimation(allSettings, ref, event);
                    }
                }

                // ClickUp subtask in and open task pane
                if(className.includes('task-todo-item__toggle')) {
                    if(event.target.closest('.subtask__container') !== null) {
                        doAnimation(allSettings, ref, event);
                    }
                }
            }
        }

        // Board view
        if((ref.mouseDownVal1 !== 'standardClickEvent') && (ref.mouseDownVal1 !== 'complete')) {
            let dropList = event.target.closest('.cdk-drop-list');
            if(dropList.dataset.status === 'complete') {
                doAnimation(allSettings, ref, event);
            }
        }
    }
};