/**
 * Delightful
 *
 * Trigger: Productive
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */
import {doAnimation} from "../animation";

export const productive = (allSettings, ref, event) => {
  let className = event.target.getAttribute('class') || '';

  let idx = allSettings.allSites.map(site => site.host).indexOf('app.productive.io');
  if ((idx > -1) && allSettings.allSites[idx].enabled) {

    if (ref.mouseDownVal1 === 'standardClickEvent' && (ref.mouseDownVal2 === event.target.className)) { // Stop cheating by matching mousedown and mouseup className

      // Productive task complete checkbox in task pane view
      if (className.includes('form-checkbox-field__checkbox-field-input') && !event.target.disabled) {
        // This is the checkbox input element. It's set to disabled instead of checked when the task is complete.
        doAnimation(allSettings, ref, event);
      } else if (event.target.closest('[class^="_closeButton"]')) {
        // This is the close button div that contains the checkbox input element.
        const closeButton = event.target.closest('[class^="_closeButton"]');
        if (closeButton === null) return;
        const checkbox = closeButton.querySelector('.form-checkbox-field__checkbox-field-input');
        if (checkbox === null || checkbox.disabled) return;
        doAnimation(allSettings, ref, event);
      } else {
        // Changing status with the dropdown select in the task pane view.

        // Make sure it's not already closed (clicking on the unopened combobox while the status is closed)
        if(event.target.closest('div[role="combobox"][aria-expanded="false"]')) return;

        if(className.includes('select-field-standard-item__title') && allSettings.allSites[idx].statusList.some(s => event.target.innerText.toLowerCase().includes(s.toLowerCase()))) {
          // This is the closed status in the dropdown in the task pane view.
          doAnimation(allSettings, ref, event);
        } else if (!event.target.querySelector('label') && allSettings.allSites[idx].statusList.some(s => event.target.querySelector('.select-field-standard-item__title')?.innerText.toLowerCase().includes(s.toLowerCase()))) {
          // This is the closed status in the dropdown in the task pane view.
          doAnimation(allSettings, ref, event);
        } else if(allSettings.allSites[idx].statusList.some(s => event.target.closest('.select-field-standard-item')?.querySelector('.select-field-standard-item__title')?.innerText.toLowerCase().includes(s.toLowerCase()))) {
          // This is inside the closed status in the dropdown in the task pane view.
          // This will handle anything inside the closed status item e.g. the SVG icon.
          doAnimation(allSettings, ref, event);
        }
      }
    }
  }
};