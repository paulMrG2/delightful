/**
 * Delightful
 *
 * Trigger: Jira
 * Two domains: *.atlassian.net, *.jira.com
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */
import {doAnimation} from "../animation";

export const jira = (allSettings, ref, event) => {

    // todo make it work for Kanban board

    let idx = -1;

    // domain *.atlassian.net
    if (document.location.host.endsWith('.atlassian.net')) {
        idx = allSettings.allSites.map(site => site.host).indexOf('*.atlassian.net');
    }

    // domain *.jira.com
    if ((idx === -1) && document.location.host.endsWith('.jira.com')) {
        idx = allSettings.allSites.map(site => site.host).indexOf('*.jira.com');
    }

    if ((idx > -1) && allSettings.allSites[idx].enabled) {

        // Loop through multiple status list
        for (let i = 0; i < allSettings.allSites[idx].statusList.length; i++) {

            let status = allSettings.allSites[idx].statusList[i];

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
};