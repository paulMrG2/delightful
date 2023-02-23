/**
 * Delightful
 *
 * Browser Menu
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */

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
    let url = chrome.runtime.getURL("settings.html?v=" + Date.now()); // Avoid caching :|
    chrome.tabs.create({url});
});

/**
 * Open about page
 */
document.querySelector('.menu__buttonsButtonAbout').addEventListener('click', function() {
    let url = chrome.runtime.getURL("about.html?v=" + Date.now()); // Avoid caching
    chrome.tabs.create({url});
});