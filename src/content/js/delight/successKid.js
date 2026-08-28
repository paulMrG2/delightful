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

const imagePromise = new Promise(resolve =>
  chrome.runtime.sendMessage({type: 'delight', delight: "successKid"}, r =>
    resolve(r?.image ?? null)
  )
);

export function getSuccessKid(duration, event) {

    let successKidClass = ".delightSuccessKid {";
    successKidClass += "height:100vh;";
    successKidClass += "width:100vw;";
    successKidClass += "}";

    imagePromise.then(imageSrc => {
        if (!imageSrc) return;

        // Add css/style to document head
        let style = document.createElement('style');
        style.setAttribute('delight', 'css');
        style.innerHTML = successKidClass;
        document.querySelector('head').append(style);

        // Success Kid image
        let image = document.createElement('img');
        image.alt = "Success Kid";
        image.classList.add("delightSuccessKid");
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