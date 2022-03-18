/**
 * Delightful
 *
 * Do an animation
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */
import {getBabyYoda} from "./delight/babyYoda";
import {getConfetti} from "./delight/confetti";
import {getNyanCat} from "./delight/nyanCat";
import {getParrot} from "./delight/partyParrot";

/**
 * Initiate the animation
 */
export const doAnimation = (allSettings, ref, event) => {

    // Use settings from user to determine percentage chance of a delight happening
    let userDefinedChance = 0;
    allSettings.chanceOfDelight.map(chance => {
        if (chance.selected) {
            userDefinedChance = chance.value;
        }
    });

    if (Math.random() < userDefinedChance) {

        // Flag start of animation
        ref.delightfulAnimationRunning = true;

        // Randomly choose a delight
        let enabledDelights = [];
        for (let i = 0; i < allSettings.allDelights.length; i++) {
            if (allSettings.allDelights[i].enabled) {
                enabledDelights.push(allSettings.allDelights[i]);
            }
        }
        let delight = enabledDelights[(Math.floor(Math.random() * enabledDelights.length))];

        // Call the animation
        switch (delight.defaultName) {
            case 'Baby Yoda': // If this is changed, also change the defaultName in allSettings.js
                getBabyYoda(2000, event);
                endAnimation(2000, ref);
                break;
            case 'Confetti Explosions': // If this is changed, also change the defaultName in allSettings.js
                getConfetti(2000);
                endAnimation(2000, ref);
                break;
            case 'Nyan Cat': // If this is changed, also change the defaultName in allSettings.js
                getNyanCat(2000);
                endAnimation(2000, ref);
                break;
            case 'Party Parrot': // If this is changed, also change the defaultName in allSettings.js
                getParrot(2000);
                endAnimation(2000, ref);
                break;
        }
    }
};

/**
 * Set animation not running
 *
 * @param duration
 */
const endAnimation = (duration, ref) => {
    setTimeout(() => {
        ref.delightfulAnimationRunning = false;
    }, duration);
};