/**
 * Delightful
 *
 * Delight: Smug Thug Pew Pew
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 *
 * Inspired by the pew pew emoji from Slack
 * SVG and animation by Paul Groth
 */

import { delightContainer } from "./delightContainer";

export function getSmugThugPewPew(duration, event) {

    let smugThugPewPewClass = ".delightSmugThugPewPew {";
    smugThugPewPewClass += "width:min(80%, 800px);";
    smugThugPewPewClass += "}";

    chrome.runtime.sendMessage({type: 'delight', delight: "smugThugPewPew"}, response => {

        // Add css/style to document head
        let style = document.createElement('style');
        style.setAttribute('delight', 'css');
        style.innerHTML = smugThugPewPewClass;
        document.querySelector('head').append(style);

        // Smug Thug Pew Pew image
        let imageSrc = response.image;
        let image = document.createElement('img');
        image.alt = "Smug Thug Pew Pew";
        image.classList.add("delightSmugThugPewPew");
        image.src = imageSrc;

        // Get container, add the image, prepend to body
        let container = delightContainer({alignItems: 'flex-end', bottom: '100px'});
        container.append(image);
        document.body.prepend(container);

        // Cleanup after animation complete
        setTimeout(() => {
            image.remove();
            style.remove();
            container.remove();
            image = null;
            style = null;
            container = null;
        }, duration);

    });
}