/**
 * Delightful
 *
 * Trigger: Todoist
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */
import {doAnimation} from "../animation";

export const todoist = (allSettings, ref, event) => {
    if (document.location.host === 'todoist.com') {
        let className = event.target.getAttribute('class') || '';

        let idx = allSettings.allSites.map(site => site.host).indexOf('todoist.com');
        if ((idx > -1) && allSettings.allSites[idx].enabled) {

            // Todoist task checkbox
            if (className.includes('task_checkbox') && className.includes('checked')) { // checked is added before it gets here, so this is reversed
                console.log('t1')
                doAnimation(allSettings, ref, event);
            }

            // Todoist task checkbox child
            if (event.target.closest('.task_checkbox')) {
                let checkboxButton = event.target.closest('.task_checkbox');
                if (checkboxButton !== null && !checkboxButton.className.includes('checked')) {
                    console.log('t2')
                    doAnimation(allSettings, ref, event);
                }
            }
        }
    }
};