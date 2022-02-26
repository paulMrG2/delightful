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
            }, function (tabs) {
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
        switch (request.delight) {
            case "parrot":
                getImageData('assets/img/parrot.svg').then(dataUrl => {
                    sendResponse({image: dataUrl});
                });
                break;
        }
        // Return true here to keep connection open during async calls
        return true;
    }
);

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