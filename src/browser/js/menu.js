/**
 * Localisation
 */
document.querySelectorAll('[data-locale]').forEach(el => {
    el.innerText = chrome.i18n.getMessage(el.dataset.locale)
});

/**
 * Open options page
 */
document.querySelector('.menu__buttonsButtonSettings').addEventListener('click', function() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        let url = chrome.runtime.getURL("settings.html");
        chrome.tabs.create({url});
    }
});

/**
 * Open about page
 */
document.querySelector('.menu__buttonsButtonAbout').addEventListener('click', function() {
    let url = chrome.runtime.getURL("about.html");
    chrome.tabs.create({url});
});