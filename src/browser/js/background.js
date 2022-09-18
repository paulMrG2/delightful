/**
 * Delightful
 *
 * Background file
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */
import {allSiteSettings, allDelightSettings, chanceOfDelightSetting} from "./allSettings";

/**
 * For testing
 * Clear all storage for this extension
 */
//chrome.storage.sync.clear();

/**
 * List of settings
 */
const allSettings = {
    allSites:        [...allSiteSettings],
    allDelights:     [...allDelightSettings],
    chanceOfDelight: [...chanceOfDelightSetting]
};
const settingsSyncAttempts = {
    allSites:        0,
    allDelights:     0,
    chanceOfDelight: 0
}

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
        } else {
            setTimeout(() => {
                if(settingsSyncAttempts.allSites < 5) {
                    settingsSyncAttempts.allSites++;
                    enabledSites();
                }
            }, 5000);
        }
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
        } else {
            setTimeout(() => {
                if(settingsSyncAttempts.allDelights < 5) {
                    settingsSyncAttempts.allDelights++;
                    enabledDelights();
                }
            }, 5000);
        }
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
        } else {
            setTimeout(() => {
                if(settingsSyncAttempts.chanceOfDelight < 5) {
                    settingsSyncAttempts.chanceOfDelight++;
                    enabledDelights();
                }
            }, 5000);
        }
    });
};

/**
 * Storage sync initiate last two delights if not already exists
 */
const lastTwoDelights = () => {

    // Get stored list of delights
    chrome.storage.sync.get('lastTwoDelightNames', result => {

        if (Object.prototype.toString.call(result.lastTwoDelightNames) !== '[object Array]') {
            // Initiate it
            chrome.storage.sync.set({
                lastTwoDelightNames: ['', '']
            });
        }
    });
};

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

/**
 * Constructor
 * - Get existing lists of sites and delights
 * - Update them with any new ones
 */
enabledSites();
enabledDelights();
chanceOfDelight();
lastTwoDelights();
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
 * Receive and respond to requests from the front end
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.type) {
        case 'delight':
            switch (request.delight) {
                case "babyYoda":
                    getImageData('assets/img/baby-yoda-force.svg').then(dataUrl => {
                        sendResponse({image: dataUrl});
                    });
                    break;
                case "nyanCat":
                    getImageData('assets/img/nyan-cat.svg').then(dataUrl => {
                        sendResponse({image: dataUrl});
                    });
                    break;
                case "parrot":
                    getImageData('assets/img/parrot.svg').then(dataUrl => {
                        sendResponse({image: dataUrl});
                    });
                    break;
                case "successKid":
                    getImageData('assets/img/success-kid.svg').then(dataUrl => {
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
 * Show welcome/changes pages for new install/updated
 */
chrome.runtime.onInstalled.addListener(details => {
    if (details.reason === 'install') {
        let url = chrome.runtime.getURL("about.html");
        chrome.tabs.create({url});
    }
});