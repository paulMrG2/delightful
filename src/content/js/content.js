import {getConfetti} from "./delightConfetti";
import {getParrot} from './delightParrot';

if (typeof window.delightfulActivated === 'undefined') {

    /**
     * Stop executeScript from background from executing multiple times
     *
     * @type {boolean}
     */
    window.delightfulActivated = true;

    /**
     * Reference vars
     */
    const ref = {
        delightfulAnimationRunning: false,
        mouseDownVal:               null
    };

    /**
     * List of settings
     */
    const allSettings = {
        allDelights:     null,
        allSites:        null,
        chanceOfDelight: null
    };

    /**
     * Keep settings up to date
     */
    chrome.runtime.sendMessage({type: 'allSettings'}, response => {
        allSettings.allSites = response.allSites;
        allSettings.allDelights = response.allDelights;
        allSettings.chanceOfDelight = response.chanceOfDelight;
    });
    chrome.storage.onChanged.addListener(function (changes, namespace) {
        if (typeof changes.enabledSites?.newValue !== 'undefined') {
            allSettings.allSites = changes.enabledSites.newValue.sites;
        }
        if (typeof changes.enabledDelights?.newValue !== 'undefined') {
            allSettings.allDelights = changes.enabledDelights.newValue.delights;
        }
        if (typeof changes.chanceOfDelight?.newValue !== 'undefined') {
            allSettings.chanceOfDelight = changes.chanceOfDelight.newValue.chance;
        }
    });

    /**
     * Mousedown event for tracking drag/drop
     */
    document.addEventListener('mousedown', event => {

        // Reset the value
        ref.mouseDownVal1 = null;
        ref.mouseDownVal2 = null;

        // Trello
        let trello = allSettings.allSites.map(site => site.host).indexOf('trello.com');
        if ((trello > -1) && allSettings.allSites[trello].enabled) {
            let listContent = event.target.closest('.js-list-content');
            if (listContent !== null) {
                let listName = listContent.querySelector('.js-list-name-assist');
                if (listName !== null) {
                    // Name of the list we're starting from (don't run animation if dropped in same list)
                    ref.mouseDownVal1 = listName.innerHTML;
                }
                // Record the current task to match with
                let task = event.target.closest('a.list-card');
                if (task !== null) {
                    ref.mouseDownVal2 = task.getAttribute("href").toString();
                }
            }
        }
    }, true);

    /**
     * Main document event listener for clicks on any element
     */
    document.addEventListener('mouseup', event => {

        if (!ref.delightfulAnimationRunning) {
            if ((allSettings.allSites !== null) && matchTrigger(event.target)) {
                doAnimation();
            }
        }
    }, true);

    /**
     * Initiate the animation
     */
    const doAnimation = () => {

        // Use settings from user to determine percentage chance of a delight happening
        let userDefinedChance = 0;
        allSettings.chanceOfDelight.map(chance => {
            if(chance.selected) {
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
            // todo add more animations
            switch (delight.defaultName) {
                case 'Confetti Explosions': // If this is changed, also change the defaultName in allSettings.js
                    getConfetti(2000);
                    endAnimation(2000);
                    break;
                case 'Party Parrot': // If this is changed, also change the defaultName in allSettings.js
                    getParrot(2000);
                    endAnimation(2000);
                    break;
            }
        }
    };

    /**
     * Check if a match is found
     *
     * @param target
     * @returns {boolean}
     */
    const matchTrigger = target => {

        let className = target.getAttribute('class') || '';

        // Asana
        // todo trigger for drag/drop on Board view, with user-defined section names
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
                let closest = target.closest("div[name='" + status + "']");
                if (closest !== null) {
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

        // Trello (drag and drop makes for a bit of a challenge)
        let trello = allSettings.allSites.map(site => site.host).indexOf('trello.com');
        if ((trello > -1) && allSettings.allSites[trello].enabled) {
            setTimeout(() => {
                let task = target.closest('a.list-card');
                if (task !== null) {
                    let taskHref = task.getAttribute("href").toString();
                    let listContent = document.querySelectorAll('.js-list-content');
                    listContent.forEach(list => {
                        let anchors = list.querySelectorAll('.list-card');
                        anchors.forEach(anchor => {
                            let href = anchor.getAttribute('href');
                            if (href !== null) {
                                href = href.toString();
                                if ((href === taskHref) && (ref.mouseDownVal2 === taskHref)) {
                                    let listName = list.querySelector('.js-list-name-assist');
                                    if (listName !== null) {
                                        // Loop through multiple status list
                                        for (let i = 0; i < allSettings.allSites[trello].statusList.length; i++) {
                                            let status = allSettings.allSites[trello].statusList[i];
                                            if ((listName.innerHTML === status) && (listName.innerHTML !== ref.mouseDownVal1)) {
                                                doAnimation();
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    });
                }
            }, 100);
        }

        return false;
    };

    /**
     * Set animation not running
     *
     * @param duration
     */
    const endAnimation = duration => {
        setTimeout(() => {
            ref.delightfulAnimationRunning = false;
        }, duration);
    };
}