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
import {monday} from "./trigger/monday";
import {productive} from "./trigger/productive";
import {todoist} from "./trigger/todoist";
import {trello} from "./trigger/trello";
import {wrike} from "./trigger/wrike";

// Extra bits
import {asanaSpiderWeb} from "./extras/asanaSpiderWeb";
import {productiveSpiderWeb} from "./extras/productiveSpiderWeb";

// All settings
import {loadSettings} from "../../browser/js/allSettings";

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
        mouseDownVal1:              null,
        mouseDownVal2:              null
    };

    /**
     * List of settings
     */
    const allSettings = {
        allDelights:      null,
        allSites:         null,
        chanceOfDelight:  null,
        specialThings:    null,
        lastDelightNames: ['', '', '']
    };

    /**
     * Keep settings up to date
     */
    loadSettings().then(settings => {
        allSettings.allSites = settings.allSites;
        allSettings.allDelights = settings.allDelights;
        allSettings.chanceOfDelight = settings.chanceOfDelight;
        allSettings.specialThings = settings.specialThings;

        // Do any special things
        specialThings();
    });
    chrome.storage.onChanged.addListener(function (changes) {
        if (typeof changes.enabledSites?.newValue !== 'undefined') {
            allSettings.allSites = changes.enabledSites.newValue.sites;
        }
        if (typeof changes.enabledDelights?.newValue !== 'undefined') {
            allSettings.allDelights = changes.enabledDelights.newValue.delights;
        }
        if (typeof changes.chanceOfDelight?.newValue !== 'undefined') {
            allSettings.chanceOfDelight = changes.chanceOfDelight.newValue.chance;
        }
        if (typeof changes.specialThings?.newValue !== 'undefined') {
            allSettings.specialThings = changes.specialThings.newValue.things;
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
        let trello = allSettings.allSites.map(site => site.id).indexOf('delightful_sites_trello');
        if ((trello > -1) && allSettings.allSites[trello].enabled) {
            let listContent = event.target.closest('[data-testid="list"]');
            if (listContent !== null) {
                let listName = listContent.querySelector('[data-testid="list-header"] textarea');
                if (listName !== null) {
                    // Name of the list we're starting from (don't run animation if dropped in same list)
                    ref.mouseDownVal1 = listName.innerHTML;
                }
                // Record the current task to match with
                let task = event.target.closest('[data-testid="list-card"]');
                if (task !== null) {
                    ref.mouseDownVal2 = task.querySelector('[data-card-id]').getAttribute('data-card-id');
                }
            }
        }

        // ClickUp board view mousedown ref
        let clickup = allSettings.allSites.map(site => site.id).indexOf('delightful_sites_clickup');
        if ((clickup > -1) && allSettings.allSites[clickup].enabled) {
            if (event.target.closest('.cdk-drag') !== null) {
                let dropList = event.target.closest('.cdk-drop-list');
                if ((dropList !== null) && (typeof dropList.dataset.status !== 'undefined')) {
                    ref.mouseDownVal1 = dropList.dataset.status;
                }
            }
        }

        if (ref.mouseDownVal1 === null) {
            ref.mouseDownVal1 = 'standardClickEvent';
            ref.mouseDownVal2 = event.target.className;
        }

    }, true);

    /**
     * Main document event listener for clicks on any element
     */
    document.addEventListener('mouseup', event => {
        if (!ref.delightfulAnimationRunning && allSettings.allSites !== null) {
            if (event.button === 0) { // Left mouse button only
                matchTrigger(event);
            }
        }
    }, true);

    /**
     * Main document event listener for clicks on any element
     */
    document.addEventListener('drop', event => {
        if (!ref.delightfulAnimationRunning && allSettings.allSites !== null) {
            if (event.button === 0) { // Left mouse button only
                matchTrigger(event);
            }
        }
    });

    const triggerMap = {
        'delightful_sites_asana':      asana,
        'delightful_sites_atlassian':  jira,
        'delightful_sites_clickup':    clickup,
        'delightful_sites_github':     github,
        'delightful_sites_monday':     monday,
        'delightful_sites_productive': productive,
        'delightful_sites_todoist':    todoist,
        'delightful_sites_trello':     trello,
        'delightful_sites_wrike':      wrike,
    };

    /**
     * Check if a match is found
     *
     * @param event
     */
    const matchTrigger = event => {
        const host = document.location.host;
        const site = allSettings.allSites.find(s =>
            host === s.host ||
            (s.host.startsWith('*.') && host.endsWith(s.host.slice(1)))
        );
        if (site) {
            const trigger = triggerMap[site.id];
            if (trigger) trigger(allSettings, ref, event);
        }
    };

    /**
     * Special things
     */
    const specialThings = () => {
        const host = document.location.host;
        const asanaHost = allSettings.allSites.find(s => s.id === 'delightful_sites_asana')?.host;
        const productiveHost = allSettings.allSites.find(s => s.id === 'delightful_sites_productive')?.host;
        for (let i = 0; i < allSettings.specialThings.length; i++) {
            switch (allSettings.specialThings[i].id) {
                case 'delightful_special_spider_web':
                    if (host === asanaHost && allSettings.specialThings[i].enabled) {
                        asanaSpiderWeb(allSettings.specialThings[i]);
                    }
                    if (host === productiveHost && allSettings.specialThings[i].enabled) {
                        productiveSpiderWeb(allSettings.specialThings[i]);
                    }
                    break;
            }
        }
    }

}