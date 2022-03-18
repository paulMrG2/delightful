/**
 * Delightful
 *
 * Delight: Nyan Cat
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 *
 * Sources used
 * https://github.com/Gowee/nyancat-svg
 */

import { delightContainer } from "./delightContainer";

export function getNyanCat(duration) {
    let width = 700;

    // todo find a cleaner way to do the class, it looks ugly :|
    let nyanCatClass = ".delightNyanCat {";
    nyanCatClass += "width:" + width + "px;height:100%;";
    nyanCatClass += "position:fixed;bottom:0;";
    nyanCatClass += "transform: translateX(calc(-50vw - " + (width / 2) + "px));";
    nyanCatClass += "}";
    nyanCatClass += ".delightNyanCatMove {";
    nyanCatClass += "transform: translateX(calc(50vw + " + (width / 2) + "px));";
    nyanCatClass += "transition: transform " + (duration - 300) + "ms cubic-bezier(0.2, 0.8, 0.8, 0.2);"
    nyanCatClass += "}";

    chrome.runtime.sendMessage({type: 'delight', delight: "nyanCat"}, response => {

        // Add css/style to document head
        const style = document.createElement('style');
        style.setAttribute('delight', 'css');
        style.innerHTML = nyanCatClass;
        document.querySelector('head').append(style);

        // Nyan Cat image
        let imageSrc = response.image;
        const image = document.createElement('img');
        image.alt = "Nyan Cat";
        image.classList.add("delightNyanCat");
        image.src = imageSrc;

        // Get container, add the image, prepend to body
        const container = delightContainer({});
        container.append(image);
        document.body.prepend(container);

        // Add class to make it move
        setTimeout(() => image.classList.add("delightNyanCatMove"), 10);

        // Cleanup after animation complete
        setTimeout(() => {
            document.querySelector('.delightContainer')?.remove();
            document.querySelector('style[delight]')?.remove();
        }, duration);

    });
}