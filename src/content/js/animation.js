/**
 * Delightful
 *
 * Do an animation
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */

import {getAllOfTheThings} from './delight/allOfTheThings';
import {getGrogu} from './delight/grogu';
import {getBadgerBadgerBadger} from './delight/badger';
import {getConfetti} from './delight/confetti';
import {getNyanCat} from './delight/nyanCat';
import {getParrot} from './delight/partyParrot';
import {getSmugThugPewPew} from './delight/smugThugPewPew';
import {getSuccessKid} from './delight/successKid';
import {getVaultBoy} from './delight/vaultBoy';

/**
 * Initiate the animation
 */
export const doAnimation = (allSettings, ref, event, siteId) => {

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

        // Make sure the same delight doesn't happen too often (don't use the previous two delights)
        if (enabledDelights.length > 3) {
            while (delight.id === allSettings.lastDelightNames[0] || delight.id === allSettings.lastDelightNames[1] || delight.id === allSettings.lastDelightNames[2]) {
                delight = enabledDelights[(Math.floor(Math.random() * enabledDelights.length))];
            }
        }

        allSettings.lastDelightNames = [delight.id, allSettings.lastDelightNames[0], allSettings.lastDelightNames[1]];
        // Call the animation
        switch (delight.id) {
            case 'delightful_delights_all_of_the_things':
                getAllOfTheThings(2000, event);
                endAnimation(2000, ref);
                break;
            case 'delightful_delights_badger_badger_badger':
                getBadgerBadgerBadger(2000, event);
                endAnimation(2000, ref);
                break;
            case 'delightful_delights_confetti':
                getConfetti(2000);
                endAnimation(2000, ref);
                break;
            case 'delightful_delights_grogu':
                getGrogu(2000, event, siteId);
                endAnimation(2000, ref);
                break;
            case 'delightful_delights_nyan_cat':
                getNyanCat(2000);
                endAnimation(2000, ref);
                break;
            case 'delightful_delights_parrot':
                getParrot(2000);
                endAnimation(2000, ref);
                break;
            case 'delightful_delights_smug_thug_pew_pew':
                getSmugThugPewPew(2000);
                endAnimation(2000, ref);
                break;
            case 'delightful_delights_success_kid':
                getSuccessKid(2000);
                endAnimation(2000, ref);
                break;
            case 'delightful_delights_vault_boy':
                getVaultBoy(2000);
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
