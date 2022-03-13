/**
 * Delightful
 *
 * All settings variables
 */
export const allSiteSettings = [
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
        defaultName:            "Trello",
        defaultNameWithTrigger: "Trello (when you drop a card on <list name>)",
        enabled:                true,
        host:                   "trello.com",
        i18nName:               "sites_trelloName",
        i18nNameWithTrigger:    "sites_trelloNameWithTrigger",
        id:                     "delightful_sites_trello",
        statusList:             ["Done"]
    }
];

export const allDelightSettings = [
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
    }
];

export const chanceOfDelightSetting = [
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