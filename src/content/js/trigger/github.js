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
        let github = allSettings.allSites.map(site => site.host).indexOf('github.com');
        if ((github > -1) && allSettings.allSites[github].enabled) {

            // Loop through multiple status list
            for (let i = 0; i < allSettings.allSites[github].statusList.length; i++) {

                let status = allSettings.allSites[github].statusList[i];

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
};