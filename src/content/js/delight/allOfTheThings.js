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

// Preload: fetch and decode the SVG text at module load so the display path
// is fully synchronous — no async gap between setting img.src and first paint.
const svgTextPromise = new Promise(resolve =>
  chrome.runtime.sendMessage({ type: 'delight', delight: "allOfTheThings" }, r =>
    r?.image ? fetch(r.image).then(res => res.text()).then(resolve) : resolve(null)
  )
);

export function getAllOfTheThings(duration, event) {

    let allOfTheThingsClass = ".delightAllOfTheThings {";
    allOfTheThingsClass += "height:100vh;";
    allOfTheThingsClass += "width:100vw;";
    allOfTheThingsClass += "}";

    svgTextPromise.then(svgText => {
        if (!svgText) return;

        // Add css/style to document head
        let style = document.createElement('style');
        style.setAttribute('delight', 'css');
        style.innerHTML = allOfTheThingsClass;
        document.querySelector('head').append(style);

        // Unique data URI per display so the browser creates a fresh SVG document
        // and begin="0s" animations always restart. Built synchronously from the
        // cached SVG text so there is no async gap before the first paint.
        const uniqueSvg = svgText.replace('</svg>', `<!-- ${Date.now()} --></svg>`);
        let image = document.createElement('img');
        image.alt = "All of the things";
        image.classList.add("delightAllOfTheThings");
        image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(uniqueSvg)}`;

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