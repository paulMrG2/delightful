import {allSiteSettings, allDelightSettings} from "./allSettings";

const allSettings = {
    allSites: [...allSiteSettings],
    allDelights: [...allDelightSettings]
};

/**
 * Storage sync enabled sites and update the list in the dom
 */
const enabledSites = () => {
    //chrome.storage.sync.remove('enabledSites');
    // Get stored list of sites
    chrome.storage.sync.get('enabledSites', result => {

        if (typeof result !== 'undefined' && result.enabledSites?.sites?.length > 0) {
            console.log('found the sites list')
            // If we found the list, update the local array
            result.enabledSites.sites.map(site => {
                let idx = allSettings.allSites.map(as => as.defaultName).indexOf(site.defaultName);
                if (idx > -1) {
                    allSettings.allSites[idx].enabled = site.enabled;
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
 * Storage sync enabled delights and update the list in the dom
 */
const enabledDelights = () => {
    //chrome.storage.sync.remove('enabledDelights');
    // Get stored list of delights
    chrome.storage.sync.get('enabledDelights', result => {

        console.log('our delights from storage', result);

        if (typeof result !== 'undefined' && result.enabledDelights?.delights?.length > 0) {
            console.log('found the delights list')
            // If we found the list, update the local array
            result.enabledDelights.delights.map(delight => {
                let idx = allSettings.allDelights.map(as => as.defaultName).indexOf(delight.defaultName);
                if (idx > -1) {
                    allSettings.allDelights[idx].enabled = delight.enabled;
                }
            });
        }

        console.log('we just got here now', allSettings.allDelights);

        // Store it
        chrome.storage.sync.set({
            enabledDelights: {delights: allSettings.allDelights}
        });
    });
};

/**
 * Initial setup
 * - Get existing lists of sites and delights
 * - Update them with any new ones
 */
enabledSites();
enabledDelights();
// Keep settings up to date
chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (typeof changes.enabledSites?.newValue !== 'undefined') {
        allSettings.allSites = changes.enabledSites.newValue.sites;
    }
    if (typeof changes.enabledDelights?.newValue !== 'undefined') {
        allSettings.allDelights = changes.enabledDelights.newValue.delights;
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
                allSites: allSettings.allSites,
                allDelights: allSettings.allDelights
            });
            break;
        case 'allSites':
            sendResponse(allSettings.allSites);
            break;
        case 'allDelights':
            sendResponse(allSettings.allDelights);
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