/**
 * Delightful
 *
 * General settings
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */

import {loadSettings} from "./allSettings";

const settings = () => {

    /**
     * Localisation
     */
    const localize = () => {
        document.title = chrome.i18n.getMessage("settings_pageTitle");
        document.querySelectorAll('[data-locale]').forEach(el => {
            let html = chrome.i18n.getMessage(el.dataset.locale);
            if ((typeof html !== 'undefined') && html !== '') {
                el.innerHTML = html;
            }
        });
    }

    /**
     * List of settings
     */
    const allSettings = {
        allDelights:     null,
        allSites:        null,
        chanceOfDelight: null,
        specialThings:   null
    };

    /**
     * Generate chance of delight select
     */
    const chanceOfDelight = () => {

        // Display the list
        const chanceOfDelightList = document.querySelector('.settings__chanceOfDelight');

        // Label
        const label = document.createElement('label');
        label.className = "settings__chanceOfDelightLabel";
        label.dataset.locale = "settings_chanceOfDelightLabel";
        label.htmlFor = "settings_chanceOfDelightLabel";
        label.innerText = "Chance of getting a delight";
        chanceOfDelightList.append(label);

        // Select
        const select = document.createElement('select');
        select.className = "settings__chanceOfDelightSelect";
        select.id = "settings__chanceOfDelightSelect";
        chanceOfDelightList.append(select);

        // Options
        allSettings.chanceOfDelight.map(chance => {
            const option = document.createElement('option');
            option.dataset.locale = chance.i18nName;
            option.innerText = chance.defaultName;
            option.value = chance.value;
            if (chance.selected) {
                option.setAttribute('selected', 'selected');
            }
            select.append(option);
        });

        select.addEventListener('change', event => {
            saveChanceOfDelight(event.currentTarget.value);
        });
    };

    /**
     * Save changes to chance of delight
     *
     * @param value
     */
    const saveChanceOfDelight = value => {

        // Update all selected true/false
        allSettings.chanceOfDelight.map((chance, i) => {
            allSettings.chanceOfDelight[i].selected = (chance.value.toString() === value);
        });

        // Store it
        chrome.storage.local.set({
            chanceOfDelight: {chance: allSettings.chanceOfDelight}
        });
    };

    /**
     * Generate a checkbox for a specified site
     *
     * @param details
     * @returns {HTMLDivElement}
     */
    const generateSiteCheckbox = details => {

        // Wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'settings__enabledSitesListItem';

        // Input
        const input = document.createElement('input');
        input.checked = details.enabled;
        input.className = "settings__enabledSitesListCheckbox";
        input.id = details.id;
        input.type = 'checkbox';
        input.addEventListener('change', event => {
            saveEnabledSite(details.id, event.currentTarget.checked);
        });
        wrapper.append(input);

        // Label
        const label = document.createElement('label');
        label.className = "settings__enabledSitesListLabel";
        label.dataset.locale = details.i18nName;
        label.htmlFor = details.id;
        label.innerText = details.defaultName;
        wrapper.append(label);

        // Status list (if exists)
        if (typeof details.statusList !== 'undefined') {
            const statusInput = document.createElement('input');
            statusInput.className = "settings__enabledDelightsListStatus";
            statusInput.id = details.id + "Status";
            statusInput.type = 'text';
            statusInput.value = details.statusList.join(',');
            statusInput.addEventListener('keyup', event => {
                saveEnabledSiteStatusList(details.id, event.currentTarget.value);
            });
            wrapper.append(statusInput);
        }

        return wrapper;
    }

    /**
     * Sync enabled sites and update the list in the dom
     */
    const enabledSites = () => {

        // Display the list
        const enabledSitesList = document.querySelector('.settings__enabledSitesList');
        allSettings.allSites.map(site => {
            enabledSitesList.append(generateSiteCheckbox(site));
        });
    };

    /**
     * Save changes to enabled sites
     *
     * @param id
     * @param checked
     */
    const saveEnabledSite = (id, checked) => {

        let idx = allSettings.allSites.map(site => site.id).indexOf(id);
        if (idx > -1) {

            // Update it locally
            allSettings.allSites[idx].enabled = checked;

            // Store it
            chrome.storage.local.set({
                enabledSites: {sites: allSettings.allSites}
            });
        }
    };

    /**
     * Save changes to a status list for a site
     *
     * @param id
     * @param value
     */
    const saveEnabledSiteStatusList = (id, value) => {

        let idx = allSettings.allSites.map(site => site.id).indexOf(id);
        if (idx > -1) {

            // Update it locally
            allSettings.allSites[idx].statusList = value.split(',').map(status => status.trim());

            // Store it
            chrome.storage.local.set({
                enabledSites: {sites: allSettings.allSites}
            });
        }
    }

    /**
     * Generate a checkbox for a specified delight
     *
     * @param details
     * @returns {HTMLDivElement}
     */
    const generateDelightCheckbox = details => {

        // Wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'settings__enabledDelightsListItem';

        // Input
        const input = document.createElement('input');
        input.checked = details.enabled;
        input.className = "settings__enabledDelightsListCheckbox";
        input.id = details.id;
        input.type = 'checkbox';
        input.addEventListener('change', event => {
            saveEnabledDelight(details.id, event.currentTarget.checked);
        });
        wrapper.append(input);

        // Label
        const label = document.createElement('label');
        label.className = "settings__enabledDelightsListLabel";
        label.dataset.locale = details.i18nName;
        label.htmlFor = details.id;
        label.innerText = details.defaultName;
        wrapper.append(label);

        return wrapper;
    }

    /**
     * Sync enabled delights and update the list in the dom
     */
    const enabledDelights = () => {

        // Display the list
        const enabledDelightsList = document.querySelector('.settings__enabledDelightsList');
        allSettings.allDelights.map(delight => {
            enabledDelightsList.append(generateDelightCheckbox(delight));
        });
    };

    /**
     * Save changes to enabled delights
     *
     * @param id
     * @param checked
     */
    const saveEnabledDelight = (id, checked) => {

        let idx = allSettings.allDelights.map(delight => delight.id).indexOf(id);
        if (idx > -1) {

            // Update it locally
            allSettings.allDelights[idx].enabled = checked;

            // Store it
            chrome.storage.local.set({
                enabledDelights: {delights: allSettings.allDelights}
            });
        }
    };

    /**
     * Generate a checkbox for a special thing
     *
     * @param details
     * @returns {HTMLDivElement}
     */
    const generateSpecialThingCheckbox = details => {

        // Wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'settings__specialThingsListItem';

        // Input
        const input = document.createElement('input');
        input.checked = details.enabled;
        input.className = "settings__specialThingsListCheckbox";
        input.id = details.id;
        input.type = 'checkbox';
        input.addEventListener('change', event => {
            saveSpecialThing(details.id, event.currentTarget.checked);
        });
        wrapper.append(input);

        // Label
        const label = document.createElement('label');
        label.className = "settings__specialThingsListLabel";
        label.dataset.locale = details.i18nName;
        label.htmlFor = details.id;
        label.innerText = details.defaultName;
        wrapper.append(label);

        // Special extra value
        if (typeof details.taskAgeDays !== 'undefined') {
            const taskAgeDaysInput = document.createElement('input');
            taskAgeDaysInput.className = "settings__specialThingsSpiderWebTaskAgeDays";
            taskAgeDaysInput.id = details.id + "Status";
            taskAgeDaysInput.type = 'text';
            taskAgeDaysInput.value = details.taskAgeDays;
            taskAgeDaysInput.addEventListener('keyup', event => {
                saveSpecialThingExtraValue(details.id, event.currentTarget.value);
            });
            wrapper.append(taskAgeDaysInput);
        }

        return wrapper;
    }

    /**
     * Save changes to enabled special thing
     *
     * @param id
     * @param checked
     */
    const saveSpecialThing = (id, checked) => {

        let idx = allSettings.specialThings.map(thing => thing.id).indexOf(id);
        if (idx > -1) {

            // Update it locally
            allSettings.specialThings[idx].enabled = checked;

            // Store it
            chrome.storage.local.set({
                specialThings: {things: allSettings.specialThings}
            });
        }
    };

    /**
     * Save changes to a special thing extra value
     *
     * @param id
     * @param value
     */
    const saveSpecialThingExtraValue = (id, value) => {
        let idx = allSettings.specialThings.map(thing => thing.id).indexOf(id);
        if (idx > -1) {

            // Update it locally
            allSettings.specialThings[idx].taskAgeDays = parseInt(value.trim());

            // Store it
            chrome.storage.local.set({
                specialThings: {things: allSettings.specialThings}
            });
        }
    }

    /**
     * Sync enabled special things and update the list in the dom
     */
    const enabledSpecialThings = () => {

        // Display the list
        const enabledSpecialThingsList = document.querySelector('.settings__enabledSpecialThingsList');
        allSettings.specialThings.map(thing => {
            enabledSpecialThingsList.append(generateSpecialThingCheckbox(thing));
        });
    };

    /**
     * Constructor
     */
    loadSettings().then(response => {
        allSettings.allSites = response.allSites;
        allSettings.allDelights = response.allDelights;
        allSettings.chanceOfDelight = response.chanceOfDelight;
        allSettings.specialThings = response.specialThings;
        chanceOfDelight();
        enabledSites();
        enabledDelights();
        enabledSpecialThings();
        localize();
    })
}

document.addEventListener('DOMContentLoaded', settings);
