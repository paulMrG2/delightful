/**
 * Delightful
 *
 * Trigger: Wrike
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */
import {doAnimation} from "../animation";

export const wrike = (allSettings, ref, event) => {

    let className = event.target.getAttribute('class') || '';

    // Wrike
    // Only works on buttons and checkboxes. Event propagation is cancelled before we can use it.
    let idx = allSettings.allSites.map(site => site.host).indexOf('www.wrike.com');
    if ((idx > -1) && allSettings.allSites[idx].enabled) {

        if (ref.mouseDownVal1 === 'standardClickEvent' && (ref.mouseDownVal2 === event.target.className)) { // Stop cheating by matching mousedown and mouseup className
            // todo consider removing Wrike support. The frontend code is quite a mess.

            // Wrike right modal status checkbox
            if (className.includes('status-button__checkbox')) {
                if ((event.target.getAttribute('aria-label') === 'Change to Completed') && (event.target.getAttribute('aria-checked') === 'false')) {
                    doAnimation(allSettings, ref, event);
                }
            }
        }
    }
};