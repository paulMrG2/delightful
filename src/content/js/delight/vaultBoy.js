/**
 * Delightful
 *
 * Delight: Vault Boy
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 *
 * Sources used
 * https://seeklogo.com/vector-logo/284917/vault-boy
 */

import { delightContainer } from "./delightContainer";

export function getVaultBoy(duration) {
    const height = 500;
    const moveX = 600;


    // todo find a cleaner way to do the class, it looks ugly :|
    let vaultBoyClass = ".delightVaultBoy {";
    vaultBoyClass += "height:" + height + "px;";
    vaultBoyClass += "position:fixed;bottom:0;";
    vaultBoyClass += "transform: translateX(" + moveX + "px);";
    vaultBoyClass += "transition: transform " + 350 + "ms ease;";
    vaultBoyClass += "}";
    vaultBoyClass += ".delightVaultBoyMove {";
    vaultBoyClass += "transform: translateX(0);";
    vaultBoyClass += "transition: transform " + 550 + "ms ease;";
    vaultBoyClass += "}";

    chrome.runtime.sendMessage({type: 'delight', delight: "vaultBoy"}, response => {

        // Add css/style to document head
        let style = document.createElement('style');
        style.setAttribute('delight', 'css');
        style.innerHTML = vaultBoyClass;
        document.querySelector('head').append(style);

        // Vault Boy image
        let imageSrc = response.image;
        let image = document.createElement('img');
        image.alt = "Vault Boy";
        image.classList.add("delightVaultBoy");
        image.src = imageSrc;

        // Get container, add the image, prepend to body
        let container = delightContainer({justifyContent: 'flex-end'});
        container.append(image);
        document.body.prepend(container);

        // Add class to make it move
        setTimeout(() => image.classList.add("delightVaultBoyMove"), 10);

        // Remove class to go back below the screen
        setTimeout(() => image.classList.remove("delightVaultBoyMove"), 1650);

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