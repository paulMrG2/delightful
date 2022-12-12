# Changelog

[comment]: <> (Added: This section contains new features released.)
[comment]: <> (Changed: It contains changes made to an existing feature.)
[comment]: <> (Deprecated: changes removed in future.)
[comment]: <> (Removed : removed features.)
[comment]: <> (Fixed: any bugs fixed.)
[comment]: <> (Security: security issues are declared here)

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
