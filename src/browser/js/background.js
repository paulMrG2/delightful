/**
 * Delightful
 *
 * Background file
 * Note: This will run only while it's being used.
 * After 5 minutes of activity in Chrome without using this file, it will sleep (although the listeners
 * will continue to listen). If there's no activity in Chrome at all, it will sleep after 30 seconds.
 * That's roughly how it works, and why you don't put anything here that needs to persist.
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */

/**
 * For testing
 * Clear all storage for this extension
 */
//chrome.storage.local.clear();

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
 * Receive and respond to requests from the front end
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.type) {
        case 'delight':
            switch (request.delight) {
                case "allOfTheThings":
                    getImageData('assets/img/all-of-the-things.svg').then(dataUrl => {
                        sendResponse({image: dataUrl});
                    });
                    break;
                case "babyYoda":
                    getImageData('assets/img/baby-yoda-force.svg').then(dataUrl => {
                        sendResponse({image: dataUrl});
                    });
                    break;
                case "badger":
                    getImageData('assets/img/badger.svg').then(dataUrl => {
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
                case "smugThugPewPew":
                    getImageData('assets/img/smug-thug-pew-pew.svg').then(dataUrl => {
                        sendResponse({image: dataUrl});
                    });
                    break;
                case "spiderWeb":
                    getImageData('assets/img/spider-web.svg').then(dataUrl => {
                        sendResponse({image: dataUrl});
                    });
                    break;
                case "successKid":
                    getImageData('assets/img/success-kid.svg').then(dataUrl => {
                        sendResponse({image: dataUrl});
                    });
                    break;
                case "vaultBoy":
                    getImageData('assets/img/vault-boy.svg').then(dataUrl => {
                        sendResponse({image: dataUrl});
                    });
                    break;
            }
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
