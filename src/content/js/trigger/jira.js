/**
 * Delightful
 *
 * Trigger: Jira
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */
import {doAnimation} from "../animation";

export const jira = (allSettings, ref, event) => {

    // todo make it work for Kanban board

    if(document.location.host.endsWith('.atlassian.net')) {
        let jira = allSettings.allSites.map(site => site.host).indexOf('*.jira.com');
        if ((jira > -1) && allSettings.allSites[jira].enabled) {

            // Loop through multiple status list
            for (let i = 0; i < allSettings.allSites[jira].statusList.length; i++) {

                let status = allSettings.allSites[jira].statusList[i];

                // Target has innerText matching status
                if (event.target.innerText.toLowerCase() === status.toLowerCase()) {
                    let closestDivWithId = event.target.closest('div[id]');
                    if (closestDivWithId !== null && closestDivWithId.id.startsWith('react-select-')) {
                        // Target has parent/grandparent dev element with id starting with react-select-
                        doAnimation(allSettings, ref, event);
                    }
                }
            }
        }
    }
};