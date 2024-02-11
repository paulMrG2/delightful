# Changelog

[comment]: <> (Added: This section contains new features released.)
[comment]: <> (Changed: It contains changes made to an existing feature.)
[comment]: <> (Deprecated: changes removed in future.)
[comment]: <> (Removed : removed features.)
[comment]: <> (Fixed: any bugs fixed.)
[comment]: <> (Security: security issues are declared here)

## [1.2.1] - 2024-02-11
### Fixed
- Asana spider web not showing sometimes

## [1.2.0] - 2024-02-11
### Fixed
- Todoist
  - Changed the host from todoist.com to app.todoist.com
  - Triggers
- Wrike triggers. Only the checkbox in the task modal works in the new UI
- Trello drag and drop trigger
- Asana spider web
  - Task description background transparency removed again
  - Some older duplicated tasks weren't showing
### Changed
- Improved performance
- Many other minor changes throughout

## [1.1.5] - 2023-09-30
### Added
- Smug Thug Pew Pew delight

## [1.1.4] - 2023-09-22
### Added
- Badger Badger Badger delight
### Fixed
- ClickUp triggers
- Asana old task message banner transparent background

## [1.1.3] - 2023-09-19
### Fixed
- Major restructure to move settings management to content scripts rather than relying on the service worker. This might actually fix the settings bug, but you never know.

## [1.1.2] - 2023-09-11
### Fixed
- Fixed the settings bug where they sometimes revert to default values. 99.9 percent sure it's fixed this time.

## [1.1.1] - 2023-02-23
### Fixed
- Additional correction for the settings bug.

## [1.1.0] - 2023-02-26
### Added
- Monday.com: Trigger for completing a task - currently not available for kanban drag and drop.

## [1.0.9] - 2023-02-23
### Fixed
- Actually fixed the bug where settings revert to defaults! Well I'd say I'm 99.8 percent sure it's fixed this time.

## [1.0.8] - 2023-02-10
### Fixed
- Finally maybe but I really think so - I fixed the bug where settings revert to defaults!

## [1.0.7] - 2022-12-14
### Fixed
- Spider web functionality improved for different Asana layouts

## [1.0.6] - 2022-12-12
### Fixed
- Spider web background updated to recognise different date formats

## [1.0.5] - 2022-12-11
### Added
- Old tasks: Spider web background
### Fixed
- Changed storage from synced to standard local to fix issues with multiple people using the same Google account

## [1.0.4] - 2022-09-23
### Added
- Delight: All of the things animation

## [1.0.3] - 2022-09-19
### Fixed
- Improved memory management so that delights are removed from memory quicker once they've run
- Removed a console.log() where every click was logging the event target (that was an annoying day as a developer)

## [1.0.2] - 2022-09-18
### Added
- Delight: Success Kid animation

## [1.0.1] - 2022-08-28
### Added
- ClickUp: Triggers for completing a task or subtask, including board view.

## [1.0.0] - 2022-08-28
### Fixed
- Bug where settings were being overwritten in storage sync if storage sync fails e.g. no internet. The extension is now stable, so incrementing to version 1.0.0.

## [0.1.6] - 2022-07-04
### Fixed
- Bug from previous update where the new 'previous two delights' variable was not available when required.

## [0.1.5] - 2022-07-03
### Changed
- Changed random delight selection to not choose the previous two delights. Could do with a better solution, but this is ok for now.

## [0.1.4] - 2022-03-26
### Changed
- Changed host permissions to content_scripts with <all_urls> so we don't have to get permission for every new site.

## [0.1.3] - 2022-03-20
### Changed
- Changed the gross yellow background throughout to blue.

## [0.1.2] - 2022-03-19
### Added
- 'About' page: Shows automatically when extension first installed, or via button in menu.
- Wrike: New triggers for all 'Completed' buttons and checkboxes on Wrike.com.
- Jira: New triggers for <user-defined-status> buttons on *.atlassian.net.
- Todoist: New triggers for completing a task.
- Delight: Baby Yoda - with and extra surprise (dis gon be good).
### Changed
- Restructured a lot of files and functions to make it cleaner and easier to understand where things are.

## [0.1.1] - 2022-03-12
### Added
- Delight: Nyan Cat.
- App icon/logo.
### Changed
- Styled the settings page.
