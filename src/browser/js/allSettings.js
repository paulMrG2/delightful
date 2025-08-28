/**
 * Delightful
 *
 * All settings variables
 *
 * @author Paul Groth (https://github.com/paulMrG2)
 */
const allSiteSettings = [
    {
        defaultName:            "Asana",
        defaultNameWithTrigger: "Asana (when you complete a task or subtask)",
        enabled:                true,
        host:                   "app.asana.com",
        i18nName:               "sites_asanaName",
        i18nNameWithTrigger:    "sites_asanaNameWithTrigger",
        id:                     "delightful_sites_asana"
    },
    {
        defaultName:            "ClickUp",
        defaultNameWithTrigger: "ClickUp (when you complete a task or subtask)",
        enabled:                true,
        host:                   "app.clickup.com",
        i18nName:               "sites_clickupName",
        i18nNameWithTrigger:    "sites_clickupNameWithTrigger",
        id:                     "delightful_sites_clickup"
    },
    {
        defaultName:            "Jira (*.atlassian.net)",
        defaultNameWithTrigger: "Jira (when you mark an issue as <status name>)",
        enabled:                true,
        host:                   "*.atlassian.net",
        i18nName:               "sites_atlassianName",
        i18nNameWithTrigger:    "sites_atlassianNameWithTrigger",
        id:                     "delightful_sites_atlassian",
        statusList:             ["Done"]
    },
    {
        defaultName:            "Github",
        defaultNameWithTrigger: "Github (when you mark an issue as <status name>)",
        enabled:                true,
        host:                   "github.com",
        i18nName:               "sites_githubName",
        i18nNameWithTrigger:    "sites_githubNameWithTrigger",
        id:                     "delightful_sites_github",
        statusList:             ["Done"]
    },
    {
        defaultName:            "Jira (*.jira.com)",
        defaultNameWithTrigger: "Jira (when you mark an issue as <status name>)",
        enabled:                true,
        host:                   "*.jira.com",
        i18nName:               "sites_jiraName",
        i18nNameWithTrigger:    "sites_jiraNameWithTrigger",
        id:                     "delightful_sites_jira",
        statusList:             ["Done"]
    },
    {
        defaultName:            "Monday.com",
        defaultNameWithTrigger: "Monday (when you mark a task as <status name>)",
        enabled:                true,
        host:                   "*.monday.com",
        i18nName:               "sites_mondayName",
        i18nNameWithTrigger:    "sites_mondayNameWithTrigger",
        id:                     "delightful_sites_monday",
        statusList:             ["Done"]
    },
    {
        defaultName:            "Productive",
        defaultNameWithTrigger: "Productive (when you mark a task as <status name>)",
        enabled:                true,
        host:                   "app.productive.io",
        i18nName:               "sites_productiveName",
        i18nNameWithTrigger:    "sites_productiveNameWithTrigger",
        id:                     "delightful_sites_productive",
        statusList:             ["Approved", "Closed", "Completed"]
    },
    {
        defaultName:            "Todoist",
        defaultNameWithTrigger: "Todoist (when you complete a task)",
        enabled:                true,
        host:                   "app.todoist.com",
        i18nName:               "sites_todoistName",
        i18nNameWithTrigger:    "sites_todoistNameWithTrigger",
        id:                     "delightful_sites_todoist"
    },
    {
        defaultName:            "Trello",
        defaultNameWithTrigger: "Trello (when you drop a card on <list name>)",
        enabled:                true,
        host:                   "trello.com",
        i18nName:               "sites_trelloName",
        i18nNameWithTrigger:    "sites_trelloNameWithTrigger",
        id:                     "delightful_sites_trello",
        statusList:             ["Done"]
    },
    {
        defaultName:            "Wrike",
        defaultNameWithTrigger: "Wrike (when you complete a task or subtask)",
        enabled:                true,
        host:                   "www.wrike.com",
        i18nName:               "sites_wrikeName",
        i18nNameWithTrigger:    "sites_wrikeNameWithTrigger",
        id:                     "delightful_sites_wrike"
    }
];

const allDelightSettings = [
    {
        defaultName:                "All of the things", // If this is changed, also change the case for switch(delight.defaultName){} in content.js
        defaultNameWithDescription: "All of the things meme",
        enabled:                    true,
        i18nName:                   "delights_allOfTheThingsName",
        i18nNameWithDescription:    "delights_allOfTheThingsNameWithDescription",
        id:                         "delightful_delights_all_of_the_things"
    },
    {
        defaultName:                "Baby Yoda", // If this is changed, also change the case for switch(delight.defaultName){} in content.js
        defaultNameWithDescription: "Baby Yoda (uses the force of course)",
        enabled:                    true,
        i18nName:                   "delights_babyYodaName",
        i18nNameWithDescription:    "delights_babyYodaNameWithDescription",
        id:                         "delightful_delights_baby_yoda"
    },
    {
        defaultName:                "Badger Badger Badger", // If this is changed, also change the case for switch(delight.defaultName){} in content.js
        defaultNameWithDescription: "Badger Badger Badger - from The Badger Song",
        enabled:                    true,
        i18nName:                   "delights_badgerBadgerBadger",
        i18nNameWithDescription:    "delights_badgerBadgerBadgerWithDescription",
        id:                         "delightful_delights_badger_badger_badger"
    },
    {
        defaultName:                "Confetti Explosions", // If this is changed, also change the case for switch(delight.defaultName){} in content.js
        defaultNameWithDescription: "Confetti Explosions (a bunch of confetti explosions all over the screen)",
        enabled:                    true,
        i18nName:                   "delights_confettiName",
        i18nNameWithDescription:    "delights_confettiNameWithDescription",
        id:                         "delightful_delights_confetti"
    },
    {
        defaultName:                "Nyan Cat", // If this is changed, also change the case for switch(delight.defaultName){} in content.js
        defaultNameWithDescription: "Nyan Cat (no description required, you know what it is)",
        enabled:                    true,
        i18nName:                   "delights_nyanCatName",
        i18nNameWithDescription:    "delights_nyanCatNameWithDescription",
        id:                         "delightful_delights_nyan_cat"
    },
    {
        defaultName:                "Party Parrot", // If this is changed, also change the case for switch(delight.defaultName){} in content.js
        defaultNameWithDescription: "Party Parrot (the beloved party parrot dances across the bottom of the screen)",
        enabled:                    true,
        i18nName:                   "delights_parrotName",
        i18nNameWithDescription:    "delights_parrotNameWithDescription",
        id:                         "delightful_delights_parrot"
    },
    {
        defaultName:                "Success Kid", // If this is changed, also change the case for switch(delight.defaultName){} in content.js
        defaultNameWithDescription: "Success Kid (the success kid meme of memes)",
        enabled:                    true,
        i18nName:                   "delights_successKidName",
        i18nNameWithDescription:    "delights_successKidNameWithDescription",
        id:                         "delightful_delights_success_kid"
    },
    {
        defaultName:                "Smug Thug Pew Pew", // If this is changed, also change the case for switch(delight.defaultName){} in content.js
        defaultNameWithDescription: "Smug Thug Pew Pew (some weird new creation)",
        enabled:                    true,
        i18nName:                   "delights_smugThugPewPewName",
        i18nNameWithDescription:    "delights_smugThugPewPewNameWithDescription",
        id:                         "delightful_delights_smug_thug_pew_pew"
    },
    {
        defaultName:                "Vault Boy", // If this is changed, also change the case for switch(delight.defaultName){} in content.js
        defaultNameWithDescription: "Vault Boy. A poor effort of animation... I'm not proud, but still happy he's there. If you can do better, please send it my way, or send a pull request!",
        enabled:                    true,
        i18nName:                   "delights_vaultBoyName",
        i18nNameWithDescription:    "delights_vaultBoyNameWithDescription",
        id:                         "delightful_delights_vault_boy"
    }
];

const chanceOfDelightSetting = [
    {
        defaultName: "ALL OF THE THINGS!",
        i18nName:    "chance_allOfTheThings",
        selected:    false,
        value:       1.0
    },
    {
        defaultName: "Lots of delight",
        i18nName:    "chance_lotsOfDelight",
        selected:    true,
        value:       0.75
    },
    {
        defaultName: "Sometimes",
        i18nName:    "chance_sometimes",
        selected:    false,
        value:       0.5
    },
    {
        defaultName: "Too much delight ruins the fun",
        i18nName:    "chance_tooMuchDelightRuinsTheFun",
        selected:    false,
        value:       0.25
    },
    {
        defaultName: "OFF",
        i18nName:    "chance_off",
        selected:    false,
        value:       0
    }
];

const specialThingsSetting = [
    {
        defaultName: "Old task spider web (Asana and Productive)",
        enabled:     true,
        i18nName:    "special_oldTaskSpiderWeb",
        id:          "delightful_special_spider_web",
        taskAgeDays: 30
    }
];

export const loadSettings = async () => {
    const allSettings = {
        allSites:        JSON.parse(JSON.stringify(allSiteSettings)),
        allDelights:     JSON.parse(JSON.stringify(allDelightSettings)),
        chanceOfDelight: JSON.parse(JSON.stringify(chanceOfDelightSetting)),
        specialThings:   JSON.parse(JSON.stringify(specialThingsSetting))
    };

    // Get stored list of sites
    const resultEnabledSites = await chrome.storage.local.get('enabledSites');
    if (resultEnabledSites.enabledSites?.sites?.length > 0) {
        // If we found the list, update the local array
        resultEnabledSites.enabledSites.sites.map(site => {
            let idx = allSettings.allSites.map(as => as.defaultName).indexOf(site.defaultName);
            if (idx > -1) {
                allSettings.allSites[idx].enabled = site.enabled;
                if (typeof site.statusList !== 'undefined') {
                    allSettings.allSites[idx].statusList = site.statusList;
                }
            }
        });
    }

    // Get stored list of delights
    const resultEnabledDelights = await chrome.storage.local.get('enabledDelights');
    if (resultEnabledDelights.enabledDelights?.delights?.length > 0) {
        // If we found the list, update the local array
        resultEnabledDelights.enabledDelights.delights.map(delight => {
            let idx = allSettings.allDelights.map(as => as.defaultName).indexOf(delight.defaultName);
            if (idx > -1) {
                allSettings.allDelights[idx].enabled = delight.enabled;
            }
        });
    }

    // Get stored list of chance of delights
    const resultChanceOfDelight = await chrome.storage.local.get('chanceOfDelight');
    if (resultChanceOfDelight.chanceOfDelight?.chance?.length > 0) {
        // If we found the list, update the local array
        resultChanceOfDelight.chanceOfDelight.chance.map(chance => {
            let idx = allSettings.chanceOfDelight.map(cd => cd.defaultName).indexOf(chance.defaultName);
            if (idx > -1) {
                allSettings.chanceOfDelight[idx].selected = chance.selected;
            }
        });
    }

    // Get stored list of special things
    const resultSpecialThings = await chrome.storage.local.get('specialThings');
    if (resultSpecialThings.specialThings?.things?.length > 0) {
        // If we found the list, update the local array
        resultSpecialThings.specialThings.things.map(thing => {
            let idx = allSettings.specialThings.map(cd => cd.defaultName).indexOf(thing.defaultName);
            if (idx > -1) {
                allSettings.specialThings[idx].enabled = thing.enabled;
                allSettings.specialThings[idx].taskAgeDays = thing.taskAgeDays;
            }
        });
    }

    return allSettings;
}
