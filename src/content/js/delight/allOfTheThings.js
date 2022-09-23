/**
 * Delightful
 *
 * Delight: All of the things
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 *
 * Sources used
 * Original image by Allie Brosh (2010)
 * Conversion to SVG and animation by Paul Groth
 */

import { delightContainer } from "./delightContainer";

export function getAllOfTheThings(duration, event) {

    let allOfTheThingsClass = ".delightAllOfTheThings {";
    allOfTheThingsClass += "height:100vh;";
    allOfTheThingsClass += "width:100vw;";
    allOfTheThingsClass += "}";

    chrome.runtime.sendMessage({type: 'delight', delight: "allOfTheThings"}, response => {

        // Add css/style to document head
        let style = document.createElement('style');
        style.setAttribute('delight', 'css');
        style.innerHTML = allOfTheThingsClass;
        document.querySelector('head').append(style);

        // All of the things image
        let imageSrc = response.image;
        let image = document.createElement('img');
        image.alt = "All of the things";
        image.classList.add("delightAllOfTheThings");
        image.src = imageSrc;

        // Get container, add the image, prepend to body
        let container = delightContainer({});
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