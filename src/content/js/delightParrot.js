/**
 * Delightful
 *
 * Delight: Party parrot
 *
 * Sources used
 * https://codepen.io/nathangath/pen/RgvzVY/
 */

import { delightContainer } from "./delightContainter";

export function getParrot(duration) {
    let width = 400;

    // todo find a cleaner way to do the class, it looks ugly :|
    let parrotClass = ".delightParrot {";
    parrotClass += "width:" + width + "px;max-height:100vh;";
    parrotClass += "position:fixed;bottom:0;";
    parrotClass += "transform: translateX(calc(-50vw - " + (width / 2) + "px));";
    parrotClass += "}";
    parrotClass += ".delightParrotMove {";
    parrotClass += "transform: translateX(calc(50vw + " + (width / 2) + "px));";
    parrotClass += "transition: transform " + (duration - 300) + "ms cubic-bezier(0.2, 0.8, 0.8, 0.2);"
    parrotClass += "}";

    chrome.runtime.sendMessage({type: 'delight', delight: "parrot"}, response => {

        // Add css/style to document head
        const style = document.createElement('style');
        style.setAttribute('delight', 'css');
        style.innerHTML = parrotClass;
        document.querySelector('head').append(style);

        // Parrot image
        let imageSrc = response.image;
        const image = document.createElement('img');
        image.alt = "Dancing parrot";
        image.classList.add("delightParrot");
        image.src = imageSrc;

        // Get container, add the image, prepend to body
        const container = delightContainer({});
        container.append(image);
        document.body.prepend(container);

        // Add class to make it move
        setTimeout(() => image.classList.add("delightParrotMove"), 10);

        // Cleanup after animation complete
        setTimeout(() => {
            document.querySelector('.delightContainer')?.remove();
            document.querySelector('style[delight]')?.remove();
        }, duration);

    });
}