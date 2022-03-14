import {getConfetti} from "./delightConfetti";
import {getParrot} from './delightParrot';
import {getNyanCat} from "./delightNyanCat";

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
            if ((allSettings.allSites !== null) && matchTrigger(event)) {
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
            // todo add more animations
            switch (delight.defaultName) {
                case 'Confetti Explosions': // If this is changed, also change the defaultName in allSettings.js
                    getConfetti(2000);
                    endAnimation(2000);
                    break;
                case 'Nyan Cat': // If this is changed, also change the defaultName in allSettings.js
                    getNyanCat(2000);
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
     * @param event
     * @returns {boolean}
     */
    const matchTrigger = event => {

        let className = event.target.getAttribute('class') || '';

        // Asana
        // todo trigger for drag/drop on Board view, with user-defined section names
        let asana = allSettings.allSites.map(site => site.host).indexOf('app.asana.com');
        if ((asana > -1) && allSettings.allSites[asana].enabled) {

            // Asana task complete button top of open task pane
            if (className.includes('TaskCompletionToggleButton--isNotPressed') || event.target.closest('.TaskCompletionToggleButton--isNotPressed')) {
                return true;
            }

            // Asana task complete button in main task list or subtask in open task pane
            if (className.includes('TaskCompletionStatusIndicator--incomplete') || event.target.closest('.TaskCompletionStatusIndicator--incomplete')) {
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
                if (event.target.hasAttribute('name') && (event.target.getAttribute('name') === status)) {
                    // Make sure status doesn't already have a checkmark next to it
                    if (!event.target.firstChild.hasChildNodes()) {
                        return true;
                    }
                }

                // Match the target via child node
                let closest = event.target.closest("div[name='" + status + "']");
                if (closest !== null) {
                    // Make sure status doesn't already have a checkmark next to it
                    if (!closest.firstChild.hasChildNodes()) {
                        return true;
                    }
                }
            }

            // Github issues button on comment block 'Close issue' or 'Close with comment'
            if ((event.target.hasAttribute('name') && event.target.getAttribute('name') === 'comment_and_close') || event.target.closest("button[name='comment_and_close']")) {
                return true;
            }
        }

        // Trello (drag and drop makes for a bit of a challenge)
        let trello = allSettings.allSites.map(site => site.host).indexOf('trello.com');
        if ((trello > -1) && allSettings.allSites[trello].enabled) {
            setTimeout(() => {
                let task = event.target.closest('a.list-card');
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

        // Wrike
        // Only works on buttons and checkboxes. Event propagation is cancelled before we can use it.
        let wrike = allSettings.allSites.map(site => site.host).indexOf('wrike.com');
        if ((wrike > -1) && allSettings.allSites[wrike].enabled) {

            // Wrike task complete button in right panel in multi-select mode
            if (className.includes('select-list-item-content')) {
                if (event.target.innerText === 'Completed') {
                    return true;
                }
            }

            // Wrike task complete button in right panel in multi-select mode
            if (className.includes('select-list-item')) {
                const selectListItemContent = event.target.querySelector('.select-list-item-content');
                if (selectListItemContent && selectListItemContent.innerText === 'Completed') {
                    return true;
                }
            }

            // Wrike task complete button in right panel in multi-select mode (if not directly on the text of the button)
            if (event.target.closest('.select-list-item')) {
                const selectListItem = event.target.closest('.select-list-item');
                if (selectListItem) {
                    const selectListItemContent = selectListItem.closest('.select-list-item-content');
                    if (selectListItemContent && selectListItemContent.innerText === 'Completed') {
                        return true;
                    }
                }
            }

            // Wrike task complete button in right panel in multi-select mode (if not directly on the text of the button 2)
            if (event.target.closest('.select-list-item-content')) {
                const selectListItemContent = event.target.closest('.select-list-item-content');
                if (selectListItemContent && selectListItemContent.innerText === 'Completed') {
                    return true;
                }
            }

            if (className.includes('status-widget-completer__checkbox')) {
                if ((event.target.getAttribute('aria-label') === 'Mark task as Completed') && (event.target.getAttribute('aria-checked') === 'false')) {
                    return true;
                }
            }

            if (className.includes('status-widget-trigger__toggle')) {
                const completerCheckbox = event.target.querySelector('.status-widget-completer__checkbox');
                if (completerCheckbox && (completerCheckbox.getAttribute('aria-label') === 'Mark task as Completed') && (completerCheckbox.getAttribute('aria-checked') === 'true')) {
                    return true;
                }
            }
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