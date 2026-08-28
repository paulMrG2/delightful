/**
 * Delightful
 *
 * Delight: Grogu (AKA Baby Yoda)
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 *
 * Sources used
 * https://codepen.io/nathangath/pen/RgvzVY/
 */

import { delightContainer } from "./delightContainer";

const imagePromise = new Promise(resolve =>
  chrome.runtime.sendMessage({type: 'delight', delight: "grogu"}, r =>
    resolve(r?.image ?? null)
  )
);

const getShakeTarget = (siteId, event) => {
    switch (siteId) {
        case 'delightful_sites_asana':
            return event.target.closest('[data-testid="task-row-completed-checkbox"]')?.closest('[data-testid="task-row"]')
              ?? event.target.closest('div');
        case 'delightful_sites_wrike':
            return event.target.closest('.task-wrapper') ?? event.target.closest('div');
        default:
            return null;
    }
};

export function getGrogu(duration, event, siteId) {
    let height = 500;

    // todo find a cleaner way to do the class, it looks ugly :|
    let groguClass = ".delightGrogu {";
    groguClass += "height:" + height + "px;";
    groguClass += "position:fixed;bottom:0;";
    groguClass += "transform: translateY(" + height + "px);";
    groguClass += "transition: transform " + 350 + "ms ease;";
    groguClass += "}";
    groguClass += ".delightGroguMove {";
    groguClass += "transform: translateY(-20px);";
    groguClass += "transition: transform " + 550 + "ms ease;";
    groguClass += "}";
    groguClass += ".delightGroguShakeIt {";
    groguClass += "animation: delightGroguShakeScreenWithTheForce 0.5s;";
    groguClass += "animation-iteration-count: infinite;";
    groguClass += "}";
    groguClass += "@keyframes delightGroguShakeScreenWithTheForce {\n" +
        "  0% { transform: translate(8px, 8px) rotate(0deg); }\n" +
        "  10% { transform: translate(-8px, -4px) rotate(-2deg); }\n" +
        "  20% { transform: translate(-6px, 0px) rotate(2deg); }\n" +
        "  30% { transform: translate(6px, 4px) rotate(0deg); }\n" +
        "  40% { transform: translate(8px, -8px) rotate(2deg); }\n" +
        "  50% { transform: translate(-8px, 4px) rotate(-2deg); }\n" +
        "  60% { transform: translate(-6px, 8px) rotate(0deg); }\n" +
        "  70% { transform: translate(6px, 8px) rotate(-2deg); }\n" +
        "  80% { transform: translate(-8px, -8px) rotate(2deg); }\n" +
        "  90% { transform: translate(8px, 4px) rotate(0deg); }\n" +
        "  100% { transform: translate(8px, -4px) rotate(-2deg); }\n" +
        "}";

    imagePromise.then(imageSrc => {
        if (!imageSrc) return;

        // Add css/style to document head
        let style = document.createElement('style');
        style.setAttribute('delight', 'css');
        style.innerHTML = groguClass;
        document.querySelector('head').append(style);

        // Grogu image
        let image = document.createElement('img');
        image.alt = "Grogu";
        image.classList.add("delightGrogu");
        image.src = imageSrc;

        // Get container, add the image, prepend to body
        let container = delightContainer({justifyContent: 'flex-end'});
        container.append(image);
        document.body.prepend(container);

        // Add class to make it move
        setTimeout(() => image.classList.add("delightGroguMove"), 10);

        // Shake the screen
        const shakeTarget = getShakeTarget(siteId, event);
        if (shakeTarget) {
            setTimeout(() => shakeTarget.classList.add("delightGroguShakeIt"), 600);
            setTimeout(() => shakeTarget.classList.remove("delightGroguShakeIt"), 1800);
        }

        // Remove class to go back below the screen
        setTimeout(() => image.classList.remove("delightGroguMove"), 1650);

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