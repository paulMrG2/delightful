/**
 * Delightful
 *
 * Main content file for front end
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */
// Triggers
import {asana} from "./trigger/asana";
import {clickup} from "./trigger/clickup";
import {github} from "./trigger/github";
import {jira} from "./trigger/jira";
import {todoist} from "./trigger/todoist";
import {trello} from "./trigger/trello";
import {wrike} from "./trigger/wrike";

if (typeof window.delightfulActivated === 'undefined') {

    /**
     * Stop executeScript from background from executing multiple times
     *
     * @type {boolean}
     */
    window.delightfulActivated = true;

    /**
     * Reference vars
     */
    const ref = {
        delightfulAnimationRunning: false,
        mouseDownVal:               null
    };

    /**
     * List of settings
     */
    const allSettings = {
        allDelights:     null,
        allSites:        null,
        chanceOfDelight: null
    };

    /**
     * Keep settings up to date
     */
    chrome.runtime.sendMessage({type: 'allSettings'}, response => {
        allSettings.allSites = response.allSites;
        allSettings.allDelights = response.allDelights;
        allSettings.chanceOfDelight = response.chanceOfDelight;
    });
    chrome.storage.onChanged.addListener(function (changes, namespace) {
        if (typeof changes.enabledSites?.newValue !== 'undefined') {
            allSettings.allSites = changes.enabledSites.newValue.sites;
        }
        if (typeof changes.enabledDelights?.newValue !== 'undefined') {
            allSettings.allDelights = changes.enabledDelights.newValue.delights;
        }
        if (typeof changes.chanceOfDelight?.newValue !== 'undefined') {
            allSettings.chanceOfDelight = changes.chanceOfDelight.newValue.chance;
        }
    });

    /**
     * Mousedown event for tracking drag/drop
     */
    document.addEventListener('mousedown', event => {

        // Reset the value
        ref.mouseDownVal1 = null;
        ref.mouseDownVal2 = null;

        // Trello board view mousedown ref
        let trello = allSettings.allSites.map(site => site.host).indexOf('trello.com');
        if ((trello > -1) && allSettings.allSites[trello].enabled) {
            let listContent = event.target.closest('.js-list-content');
            if (listContent !== null) {
                let listName = listContent.querySelector('.js-list-name-assist');
                if (listName !== null) {
                    // Name of the list we're starting from (don't run animation if dropped in same list)
                    ref.mouseDownVal1 = listName.innerHTML;
                }
                // Record the current task to match with
                let task = event.target.closest('a.list-card');
                if (task !== null) {
                    ref.mouseDownVal2 = task.getAttribute("href").toString();
                }
            }
        }

        // ClickUp board view mousedown ref
        let clickup = allSettings.allSites.map(site => site.host).indexOf('app.clickup.com');
        if((clickup > -1) && allSettings.allSites[clickup].enabled) {
            if(event.target.closest('.cdk-drag') !== null) {
                let dropList = event.target.closest('.cdk-drop-list');
                if((dropList !== null) && (typeof dropList.dataset.status !== 'undefined')) {
                    ref.mouseDownVal1 = dropList.dataset.status;
                }
            }
        }

        if(ref.mouseDownVal1 === null) {
            ref.mouseDownVal1 = 'standardClickEvent';
            ref.mouseDownVal2 = event.target.className;
        }

    }, true);

    /**
     * Main document event listener for clicks on any element
     */
    document.addEventListener('mouseup', event => {
        if (!ref.delightfulAnimationRunning && allSettings.allSites !== null) {
            if(event.button === 0) { // Left mouse button only
                matchTrigger(event);
            }
        }
    }, true);

    /**
     * Check if a match is found
     *
     * @param event
     * @returns {boolean}
     */
    const matchTrigger = event => {

        asana(allSettings, ref, event);
        clickup(allSettings, ref, event);
        github(allSettings, ref, event);
        jira(allSettings, ref, event);
        todoist(allSettings, ref, event);
        trello(allSettings, ref, event);
        wrike(allSettings, ref, event);

    };
}