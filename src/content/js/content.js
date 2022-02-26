import {getConfetti} from "./delightConfetti";
import {getParrot} from './delightParrot';

let animationRunning = false;

/**
 * Main document event listener for clicks on any element
 */
document.addEventListener('click', event => {

    if (!animationRunning && checkMatch(event.target)) {

        // Use settings from user to determine percentage chance of a delight happening
        // todo build percentage chance into user settings, then get from chromeStorage
        let tempPercentageForTesting = 1.0; // 100% chance (0.8 = 80% etc.)
        if (Math.random() < tempPercentageForTesting) {

            // Build an array of delights from user settings
            // todo build custom user delight settings, then get them from chromeStorage
            const tempListOfDelightNames = [
                'confetti',
                'parrot'
            ];

            // Randomly choose a delight
            let delightName = tempListOfDelightNames[(Math.floor(Math.random() * tempListOfDelightNames.length))];

            // Flag start of animation
            animationRunning = true;

            // Call the animation
            // todo add more animations
            switch (delightName) {
                case 'confetti':
                    getConfetti();
                    endAnimation(4000);
                    break;
                case 'parrot':
                    getParrot();
                    endAnimation(3000);
            }
        }
    }
}, true);

/**
 * Check if a match is found
 *
 * @param target
 * @returns {boolean}
 */
const checkMatch = target => {
    // Asana task complete button top of open task pane
    if (target.className.includes('TaskCompletionToggleButton--isPressed') || target.closest('.TaskCompletionToggleButton--isPressed')) {
        return true;
    }
    /**
     * todo
     * subtask completion not firing, probably because of stopPropagation or preventDefault?
     * also need to check/choose complete/incomplete status, which is a few steps up the dom
     * already using capture=true on the event listener, but not sure if that even helps?
     */
    // Asana subtask complete button in main task list or subtask in open task pane
    if (target.className.includes('TaskRowCompletionStatus-checkbox--enabled') || target.closest('.TaskRowCompletionStatus-checkbox--enabled')) {
        return true;
    }

    // TESTING
    if (target.className.includes('bc-browsers') || target.closest('.bc-browsers')) {
        return true;
    }

    return false;
};

const endAnimation = duration => {
    setTimeout(() => {
        animationRunning = false;
    }, duration);
};