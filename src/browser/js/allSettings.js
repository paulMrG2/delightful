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
        defaultNameWithTrigger: "Github (when you mark an issue as 'Done')",
        enabled:                true,
        host:                   "github.com",
        i18nName:               "sites_githubName",
        i18nNameWithTrigger:    "sites_githubNameWithTrigger",
        id:                     "delightful_sites_github",
        statusList:             ["Done"]
    },
    {
        defaultName:            "Trello",
        defaultNameWithTrigger: "Trello (when you drop a card on 'Done')",
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
        defaultName:                "Confetti",
        defaultNameWithDescription: "Confetti (a bunch of confetti explosions all over the screen)",
        enabled:                    true,
        i18nName:                   "delights_confettiName",
        i18nNameWithDescription:    "delights_confettiNameWithDescription",
        id:                         "delightful_delights_confetti"
    },
    {
        defaultName:                "Parrot",
        defaultNameWithDescription: "Parrot (the beloved party parrot dances across the bottom of the screen)",
        enabled:                    true,
        i18nName:                   "delights_parrotName",
        i18nNameWithDescription:    "delights_parrotNameWithDescription",
        id:                         "delightful_delights_parrot"
    }
];