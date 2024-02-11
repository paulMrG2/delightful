/**
 * Delightful
 *
 * Trigger: Todoist
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */
import {doAnimation} from "../animation";

export const todoist = (allSettings, ref, event) => {
    let className = event.target.getAttribute('class') || '';

    let idx = allSettings.allSites.map(site => site.host).indexOf('app.todoist.com');
    if ((idx > -1) && allSettings.allSites[idx].enabled) {

        if (ref.mouseDownVal1 === 'standardClickEvent' && (ref.mouseDownVal2 === event.target.className)) { // Stop cheating by matching mousedown and mouseup className

            // Todoist task complete checkbox in all views
            if (className.includes('task_checkbox') && event.target.getAttribute('aria-checked') === 'false') {
                doAnimation(allSettings, ref, event);
            } else if(event.target.closest('.task_checkbox') && event.target.closest('.task_checkbox').getAttribute('aria-checked') === 'false') {
                doAnimation(allSettings, ref, event);
            }
        }
    }
};