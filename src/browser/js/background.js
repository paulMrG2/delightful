import {allSiteSettings, allDelightSettings, chanceOfDelightSetting} from "./allSettings";

/**
 * List of settings
 */
const allSettings = {
    allSites:        [...allSiteSettings],
    allDelights:     [...allDelightSettings],
    chanceOfDelight: [...chanceOfDelightSetting]
};

/**
 * Storage sync enabled sites
 */
const enabledSites = () => {

    // Get stored list of sites
    chrome.storage.sync.get('enabledSites', result => {

        if (typeof result !== 'undefined' && result.enabledSites?.sites?.length > 0) {
            // If we found the list, update the local array
            result.enabledSites.sites.map(site => {
                let idx = allSettings.allSites.map(as => as.defaultName).indexOf(site.defaultName);
                if (idx > -1) {
                    allSettings.allSites[idx].enabled = site.enabled;
                    if (typeof site.statusList !== 'undefined') {
                        allSettings.allSites[idx].statusList = site.statusList;
                    }
                }
            });
        }

        // Store it
        chrome.storage.sync.set({
            enabledSites: {sites: allSettings.allSites}
        });
    });
};

/**
 * Storage sync enabled delights
 */
const enabledDelights = () => {

    // Get stored list of delights
    chrome.storage.sync.get('enabledDelights', result => {

        if (typeof result !== 'undefined' && result.enabledDelights?.delights?.length > 0) {
            // If we found the list, update the local array
            result.enabledDelights.delights.map(delight => {
                let idx = allSettings.allDelights.map(as => as.defaultName).indexOf(delight.defaultName);
                if (idx > -1) {
                    allSettings.allDelights[idx].enabled = delight.enabled;
                }
            });
        }

        // Store it
        chrome.storage.sync.set({
            enabledDelights: {delights: allSettings.allDelights}
        });
    });
};

/**
 * Storage sync chance of delight
 */
const chanceOfDelight = () => {

    // Get stored list of delights
    chrome.storage.sync.get('chanceOfDelight', result => {

        if (typeof result !== 'undefined' && result.chanceOfDelight?.chance?.length > 0) {
            // If we found the list, update the local array
            result.chanceOfDelight.chance.map(chance => {
                let idx = allSettings.chanceOfDelight.map(cd => cd.defaultName).indexOf(chance.defaultName);
                if (idx > -1) {
                    allSettings.chanceOfDelight[idx].selected = chance.selected;
                }
            });
        }

        // Store it
        chrome.storage.sync.set({
            chanceOfDelight: {chance: allSettings.chanceOfDelight}
        });
    });
}

/**
 * Constructor
 * - Get existing lists of sites and delights
 * - Update them with any new ones
 */
enabledSites();
enabledDelights();
chanceOfDelight();
// Keep settings up to date
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
 * Main listener for every active tab
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        if (typeof tab.url !== 'undefined') {
            chrome.action.enable(tabId);
            chrome.tabs.query({
                active:        true,
                currentWindow: true
            }, tabs => {
                chrome.scripting.executeScript({
                    target: {tabId: tabId},
                    files:  ["app.js"]
                });
            });
        }
    }
});

/**
 * Receive and respond to requests from the front end
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.type) {
        case 'delight':
            switch (request.delight) {
                case "parrot":
                    getImageData('assets/img/parrot.svg').then(dataUrl => {
                        sendResponse({image: dataUrl});
                    });
                    break;
            }
            break;
        case 'allSettings':
            sendResponse({
                allSites:        allSettings.allSites,
                allDelights:     allSettings.allDelights,
                chanceOfDelight: allSettings.chanceOfDelight
            });
            break;
        case 'allSites':
            sendResponse(allSettings.allSites);
            break;
        case 'allDelights':
            sendResponse(allSettings.allDelights);
            break;
        case 'chanceOfDelight':
            sendResponse(allSettings.chanceOfDelight);
            break;
    }
    // Return true here to keep connection open during async calls
    return true;
});

/**
 * Read image file and return base64 encoded data url
 *
 * @param url
 * @returns {Promise<unknown>}
 */
const getImageData = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }));