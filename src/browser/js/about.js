/**
 * Delightful
 *
 * About page
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */
const about = () => {

    /**
     * Localisation
     */
    const localize = () => {
        document.title = chrome.i18n.getMessage("about_pageTitle");
        document.querySelectorAll('[data-locale]').forEach(el => {
            let html = chrome.i18n.getMessage(el.dataset.locale);
            if ((typeof html !== 'undefined') && html !== '') {
                el.innerHTML = html;
            }
        });
    };

    /**
     * Update appVersion elements
     */
    const showVersion = () => {
        let manifestData = chrome.runtime.getManifest();
        const appVersionElements = document.querySelectorAll('.about_appVersion');
        for (let i = 0; i < appVersionElements.length; i++) {
            appVersionElements[i].innerHTML = manifestData.version;
        }
    };

    /**
     * Constructor
     */
    localize();
    showVersion();

};

document.addEventListener('DOMContentLoaded', about);