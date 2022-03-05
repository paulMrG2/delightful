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

        let className = target.getAttribute('class') || '';

        // Asana task complete button top of open task pane
        if (className.includes('TaskCompletionToggleButton--isNotPressed') || target.closest('.TaskCompletionToggleButton--isNotPressed')) {
            return true;
        }

        // Asana task complete button in main task list or subtask in open task pane
        if (className.includes('TaskCompletionStatusIndicator--incomplete') || target.closest('.TaskCompletionStatusIndicator--incomplete')) {
            return true;
        }

        // Github projects, select 'Done'
        // todo get status name from user settings, could even loop through multiple statuses
        if((target.hasAttribute('name') && target.getAttribute('name') === 'Done') || target.closest("div[name='Done']")) {
            return true;
        }

        // Github issues button on comment block 'Close issue' or 'Close with comment'
        if((target.hasAttribute('name') && target.getAttribute('name') === 'comment_and_close') || target.closest("button[name='comment_and_close']")) {
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