/**
 * Delightful
 *
 * Delight: Baby Yoda
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 *
 * Sources used
 * https://codepen.io/nathangath/pen/RgvzVY/
 */

import { delightContainer } from "./delightContainer";

export function getBabyYoda(duration, event) {
    let height = 500;

    // todo find a cleaner way to do the class, it looks ugly :|
    let babyYodaClass = ".delightBabyYoda {";
    babyYodaClass += "height:" + height + "px;";
    babyYodaClass += "position:fixed;bottom:0;";
    babyYodaClass += "transform: translateY(" + height + "px);";
    babyYodaClass += "transition: transform " + 350 + "ms ease;";
    babyYodaClass += "}";
    babyYodaClass += ".delightBabyYodaMove {";
    babyYodaClass += "transform: translateY(-20px);";
    babyYodaClass += "transition: transform " + 550 + "ms ease;";
    babyYodaClass += "}";
    babyYodaClass += ".delightBabyYodaShakeIt {";
    babyYodaClass += "animation: delightYodaShakeScreenWithTheForce 0.5s;";
    babyYodaClass += "animation-iteration-count: infinite;";
    babyYodaClass += "}";
    babyYodaClass += "@keyframes delightYodaShakeScreenWithTheForce {\n" +
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

    chrome.runtime.sendMessage({type: 'delight', delight: "babyYoda"}, response => {

        // Add css/style to document head
        const style = document.createElement('style');
        style.setAttribute('delight', 'css');
        style.innerHTML = babyYodaClass;
        document.querySelector('head').append(style);

        // Parrot image
        let imageSrc = response.image;
        let image = document.createElement('img');
        image.alt = "Baby Yoda";
        image.classList.add("delightBabyYoda");
        image.src = imageSrc;

        // Get container, add the image, prepend to body
        const container = delightContainer({justifyContent: 'flex-end'});
        container.append(image);
        document.body.prepend(container);

        // Add class to make it move
        setTimeout(() => image.classList.add("delightBabyYodaMove"), 10);

        // Shake the screen
        setTimeout(() => {
            event.target.closest('div').classList.add("delightBabyYodaShakeIt")
        }, 600);

        // Stop shaking the screen
        setTimeout(() => {
            event.target.closest('div').classList.remove("delightBabyYodaShakeIt")
        }, 1800);

        // Remove class to go back below the screen
        setTimeout(() => image.classList.remove("delightBabyYodaMove"), 1650);

        // Cleanup after animation complete
        setTimeout(() => {
            image.remove();
            style.remove();
            container.remove();
        }, duration);

    });
}