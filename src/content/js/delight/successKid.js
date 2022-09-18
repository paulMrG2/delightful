/**
 * Delightful
 *
 * Delight: Success Kid
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 *
 * Sources used
 * Original image of Sammy Griner by Laney Griner (2007)
 * Conversion to SVG and animation by Paul Groth
 */

import { delightContainer } from "./delightContainer";

export function getSuccessKid(duration, event) {

    let successKidClass = ".delightSuccessKid {";
    successKidClass += "height:100vh;";
    successKidClass += "width:100vw;";
    successKidClass += "}";

    chrome.runtime.sendMessage({type: 'delight', delight: "successKid"}, response => {

        // Add css/style to document head
        const style = document.createElement('style');
        style.setAttribute('delight', 'css');
        style.innerHTML = successKidClass;
        document.querySelector('head').append(style);

        // Parrot image
        let imageSrc = response.image;
        let image = document.createElement('img');
        image.alt = "Success Kid";
        image.classList.add("delightSuccessKid");
        image.src = imageSrc;

        // Get container, add the image, prepend to body
        const container = delightContainer({});
        container.append(image);
        document.body.prepend(container);

        // Cleanup after animation complete
        setTimeout(() => {
            image.remove();
            style.remove();
            container.remove();
        }, duration);

    });
}