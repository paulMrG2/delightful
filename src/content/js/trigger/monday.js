/**
 * Delightful
 *
 * Trigger: Monday.com
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */
import {doAnimation} from "../animation";

export const monday = (allSettings, ref, event) => {

    if (ref.mouseDownVal1 === 'standardClickEvent' && (ref.mouseDownVal2 === event.target.className)) { // Stop cheating by matching mousedown and mouseup className

        let idx = allSettings.allSites.map(site => site.host).indexOf('*.monday.com');
        if ((idx > -1) && allSettings.allSites[idx].enabled) {

            let targetListItem = null;
            let className = event.target.getAttribute('class') || '';
            if (className.includes('new-status-picker-color-option-viewing-v2')) {
                targetListItem = event.target;
            } else if (className.includes('status-color-background') || className.includes('ds-text-component') || (event.target.closest('.ds-text-component') !== null)) {
                targetListItem = event.target.closest('.new-status-picker-color-option-viewing-v2');
            }
            if (targetListItem !== null) {

                let button = targetListItem.querySelector('.ds-text-component span');
                if (button !== null) {
                    for (let i = 0; i < allSettings.allSites[idx].statusList.length; i++) {
                        let status = allSettings.allSites[idx].statusList[i];
                        if (button.innerText.toLowerCase() === status.toLowerCase()) {
                            doAnimation(allSettings, ref, event);
                        }
                    }
                }
            }
        }
    }
};