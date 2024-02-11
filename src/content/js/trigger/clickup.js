/**
 * Delightful
 *
 * Trigger: ClickUp
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */
import {doAnimation} from "../animation";

export const clickup = (allSettings, ref, event) => {

    let className = event.target.getAttribute('class') || '';

    if (ref.mouseDownVal1 === 'standardClickEvent' && (ref.mouseDownVal2 === event.target.className)) { // Stop cheating by matching mousedown and mouseup className
        let idx = allSettings.allSites.map(site => site.host).indexOf('app.clickup.com');
        if ((idx > -1) && allSettings.allSites[idx].enabled) {

            // ClickUp task complete button top of open task pane
            if (event.target.closest('.simple-open')) {
                doAnimation(allSettings, ref, event);
            }
            // ClickUp task complete button top of open task pane
            if ((className.includes('cu-task-row-status_dot') || event.target.closest('.cu-task-row-status_dot')) && event.target.closest('[data-pendo="task-row__main-done-false"]')) {
                doAnimation(allSettings, ref, event);
            }
        }
    }

    // Board view
    if ((ref.mouseDownVal1 !== 'standardClickEvent') && (ref.mouseDownVal1 !== 'complete')) {
        let dropList = event.target.closest('.cdk-drop-list');
        if (dropList.dataset.status === 'complete') {
            doAnimation(allSettings, ref, event);
        }
    }
};