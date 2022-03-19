/**
 * Delightful
 *
 * Trigger: Wrike
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */
import {doAnimation} from "../animation";

export const wrike = (allSettings, ref, event) => {

    if (document.location.host === 'www.wrike.com') {
        let className = event.target.getAttribute('class') || '';

        // Wrike
        // Only works on buttons and checkboxes. Event propagation is cancelled before we can use it.
        let idx = allSettings.allSites.map(site => site.host).indexOf('www.wrike.com');
        if ((idx > -1) && allSettings.allSites[idx].enabled) {

            // Wrike task complete button in right panel in multi-select mode
            if (className.includes('select-list-item-content')) {
                if (event.target.innerText === 'Completed') {
                    doAnimation(allSettings, ref, event);
                }
            }

            // Wrike task complete button in right panel in multi-select mode
            if (className.includes('select-list-item')) {
                const selectListItemContent = event.target.querySelector('.select-list-item-content');
                if (selectListItemContent && selectListItemContent.innerText === 'Completed') {
                    doAnimation(allSettings, ref, event);
                }
            }

            // Wrike task complete button in right panel in multi-select mode (if not directly on the text of the button)
            if (event.target.closest('.select-list-item')) {
                const selectListItem = event.target.closest('.select-list-item');
                if (selectListItem) {
                    const selectListItemContent = selectListItem.closest('.select-list-item-content');
                    if (selectListItemContent && selectListItemContent.innerText === 'Completed') {
                        doAnimation(allSettings, ref, event);
                    }
                }
            }

            // Wrike task complete button in right panel in multi-select mode (if not directly on the text of the button 2)
            if (event.target.closest('.select-list-item-content')) {
                const selectListItemContent = event.target.closest('.select-list-item-content');
                if (selectListItemContent && selectListItemContent.innerText === 'Completed') {
                    doAnimation(allSettings, ref, event);
                }
            }

            if (className.includes('status-widget-completer__checkbox')) {
                if ((event.target.getAttribute('aria-label') === 'Mark task as Completed') && (event.target.getAttribute('aria-checked') === 'false')) {
                    doAnimation(allSettings, ref, event);
                }
            }

            if (className.includes('status-widget-trigger__toggle')) {
                const completerCheckbox = event.target.querySelector('.status-widget-completer__checkbox');
                if (completerCheckbox && (completerCheckbox.getAttribute('aria-label') === 'Mark task as Completed') && (completerCheckbox.getAttribute('aria-checked') === 'true')) {
                    doAnimation(allSettings, ref, event);
                }
            }
        }
    }
};