/**
 * Delightful
 *
 * Trigger: Trello
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */
import {doAnimation} from "../animation";

export const trello = (allSettings, ref, event) => {

    // Trello (drag and drop makes for a bit of a challenge)
    if(document.location.host === 'trello.com') {
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
                                                doAnimation(allSettings, ref, event);
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
    }
};