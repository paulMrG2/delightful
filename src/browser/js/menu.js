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
        window.open(chrome.runtime.getURL('options.html'));
    }
});