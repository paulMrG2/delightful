import {getConfetti} from "./delightConfetti";
import {getParrot} from './delightParrot';

let delightfulAnimationRunning = false;

/**
 * List of settings
 */
const allSettings = {
    allDelights: null,
    allSites:    null
};

if (typeof window.delightfulActivated === 'undefined') {
    window.delightfulActivated = true;

    /**
     * Keep settings up to date
     */
    chrome.runtime.sendMessage({type: 'allSettings'}, response => {
        allSettings.allSites = response.allSites;
        allSettings.allDelights = response.allDelights;
    });
    chrome.storage.onChanged.addListener(function (changes, namespace) {
        if (typeof changes.enabledSites?.newValue !== 'undefined') {
            allSettings.allSites = changes.enabledSites.newValue.sites;
        }
        if (typeof changes.enabledDelights?.newValue !== 'undefined') {
            allSettings.allDelights = changes.enabledDelights.newValue.delights;
        }
    });

    /**
     * Main document event listener for clicks on any element
     */
    document.addEventListener('mouseup', event => {

        if (!delightfulAnimationRunning) {

            if ((allSettings.allSites !== null) && matchTrigger(event.target)) {

                // Use settings from user to determine percentage chance of a delight happening
                // todo build percentage chance into user settings, then get from chromeStorage
                let tempPercentageForTesting = 1.0; // 100% chance (0.8 = 80% etc.)
                if (Math.random() < tempPercentageForTesting) {

                    // Flag start of animation
                    delightfulAnimationRunning = true;

                    // Randomly choose a delight
                    let enabledDelights = [];
                    for(let i = 0; i < allSettings.allDelights.length; i++) {
                        if(allSettings.allDelights[i].enabled) {
                            enabledDelights.push(allSettings.allDelights[i]);
                        }
                    }
                    let delight = enabledDelights[(Math.floor(Math.random() * enabledDelights.length))];

                    // Call the animation
                    // todo add more animations
                    switch (delight.defaultName) {
                        case 'Confetti':
                            getConfetti(2000);
                            endAnimation(2000);
                            break;
                        case 'Parrot':
                            getParrot(2000);
                            endAnimation(2000);
                            break;
                    }
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
    const matchTrigger = target => {

        let className = target.getAttribute('class') || '';

        // Asana
        let asana = allSettings.allSites.map(site => site.host).indexOf('app.asana.com');
        if ((asana > -1) && allSettings.allSites[asana].enabled) {

            // Asana task complete button top of open task pane
            if (className.includes('TaskCompletionToggleButton--isNotPressed') || target.closest('.TaskCompletionToggleButton--isNotPressed')) {
                return true;
            }

            // Asana task complete button in main task list or subtask in open task pane
            if (className.includes('TaskCompletionStatusIndicator--incomplete') || target.closest('.TaskCompletionStatusIndicator--incomplete')) {
                return true;
            }
        }

        // Github
        let github = allSettings.allSites.map(site => site.host).indexOf('github.com');
        if ((github > -1) && allSettings.allSites[github].enabled) {

            // Loop through multiple status list
            for (let i = 0; i < allSettings.allSites[github].statusList.length; i++) {

                let status = allSettings.allSites[github].statusList[i];

                // Match the target
                if (target.hasAttribute('name') && (target.getAttribute('name') === status)) {
                    // Make sure status doesn't already have a checkmark next to it
                    if (!target.firstChild.hasChildNodes()) {
                        return true;
                    }
                }

                // Match the target via child node
                if (target.closest(("div[name='" + status + "']"))) {
                    let closest = target.closest(("div[name='" + status + "']"));
                    // Make sure status doesn't already have a checkmark next to it
                    if (!closest.firstChild.hasChildNodes()) {
                        return true;
                    }
                }
            }

            // Github issues button on comment block 'Close issue' or 'Close with comment'
            if ((target.hasAttribute('name') && target.getAttribute('name') === 'comment_and_close') || target.closest("button[name='comment_and_close']")) {
                return true;
            }
        }

        return false;
    };

    const endAnimation = duration => {
        setTimeout(() => {
            delightfulAnimationRunning = false;
        }, duration);
    };
}