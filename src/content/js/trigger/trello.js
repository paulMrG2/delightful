/**
 * Delightful
 *
 * Trigger: Trello
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */
import {doAnimation} from "../animation";

export const trello = (allSettings, ref, event) => {

    // Trello (drag and drop makes for a bit of a challenge)
    let idx = allSettings.allSites.map(site => site.host).indexOf('trello.com');
    if ((idx > -1) && allSettings.allSites[idx].enabled) {
        const task = document.querySelector(`[data-card-id="${ref.mouseDownVal2}"]`);
        if (task !== null) {
            const parentList = task.closest('[data-testid="list-wrapper"]');
            if (parentList !== null) {
                let listNameElement = parentList.querySelector('[data-testid="list-header"] textarea');
                if (listNameElement !== null && allSettings.allSites[idx].statusList.includes(listNameElement.innerHTML)) {
                    if (listNameElement.innerHTML !== ref.mouseDownVal1) {
                        doAnimation(allSettings, ref, event);
                    }
                }
            }
        }
    }
};