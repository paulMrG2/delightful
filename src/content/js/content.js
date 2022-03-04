import {getConfetti} from "./delightConfetti";
import {getParrot} from './delightParrot';

let delightfulAnimationRunning = false;

if (typeof window.delightfulActivated === 'undefined') {
    window.delightfulActivated = true;
    
    /**
     * Main document event listener for clicks on any element
     */
    document.addEventListener('click', event => {
        if (!delightfulAnimationRunning && checkMatch(event.target)) {

            // Use settings from user to determine percentage chance of a delight happening
            // todo build percentage chance into user settings, then get from chromeStorage
            let tempPercentageForTesting = 1.0; // 100% chance (0.8 = 80% etc.)
            if (Math.random() < tempPercentageForTesting) {

                // Flag start of animation
                delightfulAnimationRunning = true;

                // Build an array of delights from user settings
                // todo build custom user delight settings, then get them from chromeStorage
                const tempListOfDelightNames = [
                    'confetti',
                    'parrot'
                ];

                // Randomly choose a delight
                let delightName = tempListOfDelightNames[(Math.floor(Math.random() * tempListOfDelightNames.length))];

                // Call the animation
                // todo add more animations
                switch (delightName) {
                    case 'confetti':
                        getConfetti();
                        endAnimation(4500);
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

        let className = target.getAttribute('class');

        // Asana task complete button top of open task pane
        if (className.includes('TaskCompletionToggleButton--isNotPressed') || target.closest('.TaskCompletionToggleButton--isNotPressed')) {
            return true;
        }

        // Asana subtask complete button in main task list or subtask in open task pane
        if (className.includes('TaskCompletionStatusIndicator--incomplete') || target.closest('.TaskCompletionStatusIndicator--incomplete')) {
            return true;
        }

        // TESTING
        if (className.includes('bc-browsers') || target.closest('.bc-browsers')) {
            return true;
        }

        return false;
    };

    const endAnimation = duration => {
        setTimeout(() => {
            delightfulAnimationRunning = false;
        }, duration);
    };
}