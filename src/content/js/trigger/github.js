/**
 * Delightful
 *
 * Trigger: Github
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */
import {doAnimation} from "../animation";

export const github = (allSettings, ref, event) => {

    if(document.location.host === 'github.com') {
        let idx = allSettings.allSites.map(site => site.host).indexOf('github.com');
        if ((idx > -1) && allSettings.allSites[idx].enabled) {

            if (ref.mouseDownVal1 === 'standardClickEvent' && (ref.mouseDownVal2 === event.target.className)) { // Stop cheating by matching mousedown and mouseup className
                // Loop through multiple status list
                for (let i = 0; i < allSettings.allSites[idx].statusList.length; i++) {

                    let status = allSettings.allSites[idx].statusList[i];

                    // Match the target
                    if (event.target.hasAttribute('name') && (event.target.getAttribute('name') === status)) {
                        // Make sure status doesn't already have a checkmark next to it
                        if (!event.target.firstChild.hasChildNodes()) {
                            doAnimation(allSettings, ref, event);
                        }
                    }

                    // Match the target via child node
                    let closest = event.target.closest("div[name='" + status + "']");
                    if (closest !== null) {
                        // Make sure status doesn't already have a checkmark next to it
                        if (!closest.firstChild.hasChildNodes()) {
                            doAnimation(allSettings, ref, event);
                        }
                    }
                }

                // Github issues button on comment block 'Close issue' or 'Close with comment'
                if ((event.target.hasAttribute('name') && event.target.getAttribute('name') === 'comment_and_close') || event.target.closest("button[name='comment_and_close']")) {
                    doAnimation(allSettings, ref, event);
                }
            }
        }
    }
};