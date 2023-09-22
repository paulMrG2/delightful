/**
 * Delightful
 *
 * Delight: Badger Badger Badger
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 *
 * Sources used
 * https://www.youtube.com/watch?v=NL6CDFn2i3I
 */

import {delightContainer} from "./delightContainer";

function getBadger(bNum) {
    let width = Math.round(document.body.clientWidth / 3) - (bNum * 70);
    let pos = {x: 10, y: 15};
    switch (bNum) {
        case 0:
            pos.x = 20;
            pos.y = 50;
            break;
        case 1:
            pos.x = 70;
            pos.y = 45;
            break;
        case 2:
            pos.x = 40;
            pos.y = 30;
            break;
        case 3:
            pos.x = 30;
            pos.y = 20;
            break;
        case 4:
            pos.x = 60;
            pos.y = 15;
            break;
        case 5:
            pos.x = 20;
            pos.y = 10;
            break;
    }
    let badgerClass = `.delightBadger${bNum} {`;
    badgerClass += `width:${width}px;`;
    badgerClass += `position:fixed;`;
    badgerClass += `left:${pos.x}%;top:${pos.y}%;`;
    badgerClass += `z-index:${5-bNum}`;
    badgerClass += "}";
    return badgerClass;
}

export function getBadgerBadgerBadger(duration) {

    let badgerClasses = '';
    for (let i = 0; i < 6; i++) {
        badgerClasses += getBadger(i);
    }

    chrome.runtime.sendMessage({type: 'delight', delight: "badger"}, response => {

        // Add css/style to document head
        let style = document.createElement('style');
        style.setAttribute('delight', 'css');
        style.innerHTML = badgerClasses;
        document.querySelector('head').append(style);

        // Get container, add the image, prepend to body
        let container = delightContainer({});

        let images = [];

        document.body.prepend(container);

        for (let i = 0; i < 6; i++) {
            // Badger image
            let imageSrc = response.image;
            images.push(document.createElement('img'));
            images[i].alt = "Badger";
            images[i].classList.add(`delightBadger${i}`);
            images[i].src = imageSrc;

            setTimeout(() => {
                container.append(images[i]);
            }, (350 * i));

            // Cleanup after animation complete
            setTimeout(() => {
                images[i].remove();
                images[i] = null;
            }, duration);
        }


        // Cleanup after animation complete
        setTimeout(() => {
            style.remove();
            container.remove();
            style = null;
            container = null;
        }, duration);

    });
}