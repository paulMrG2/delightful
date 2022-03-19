/**
 * Delightful
 *
 * Trigger: Asana
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */
import {doAnimation} from "../animation";

export const asana = (allSettings, ref, event) => {

    if(document.location.host === 'app.asana.com') {
        let className = event.target.getAttribute('class') || '';

        // todo trigger for drag/drop on Board view, with user-defined section names
        // having trouble getting the new target and going up and down the dom

        let idx = allSettings.allSites.map(site => site.host).indexOf('app.asana.com');
        if ((idx > -1) && allSettings.allSites[idx].enabled) {

            // Asana task complete button top of open task pane
            if (className.includes('TaskCompletionToggleButton--isNotPressed') || event.target.closest('.TaskCompletionToggleButton--isNotPressed')) {
                doAnimation(allSettings, ref, event);
            }

            // Asana task complete button in main task list or subtask in open task pane
            if (className.includes('TaskCompletionStatusIndicator--incomplete') || event.target.closest('.TaskCompletionStatusIndicator--incomplete')) {
                doAnimation(allSettings, ref, event);
            }
        }
    }
};