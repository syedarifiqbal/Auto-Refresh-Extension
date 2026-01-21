# Dashboard Auto Refresh

A simple browser extension to auto-refresh pages at random intervals.

Useful for monitoring dashboards, internal tools, admin panels, or any page that needs periodic updates without manual reloads.

---

## Why this exists

Many dashboards and internal tools do not update in real time.

Refreshing too often is risky.
Refreshing on a fixed interval is predictable and sometimes blocked.

This extension refreshes pages **randomly within a safe range**, making updates natural and less intrusive.

---

## Features

- Random refresh between a min and max interval
- Per-site refresh rules
- Enable or disable refresh per domain
- Smart pause when user is active
- Manual pause and resume
- Safe limits to avoid excessive reloads

---

## How it works

1. Choose a minimum and maximum refresh interval
2. The extension picks a random time within that range
3. The page reloads automatically
4. A new random time is calculated after each refresh

Each website can have its own settings.

---

## Use cases

- Monitoring internal dashboards
- Watching admin panels or reports
- QA testing auto-updating pages
- Avoiding stale sessions on internal tools
- Kiosk or display screens

This tool is **not designed** to bypass platform rules or automate third-party services.

---

## Installation (development)

1. Clone this repository
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the project folder

---

## Permissions

The extension uses only required permissions:

- `tabs` – to refresh the current tab
- `storage` – to save site rules and settings

No data is sent outside the browser.

---

## Tech stack

- Chrome Extension Manifest v3
- TypeScript
- Plain HTML / CSS
- Chrome Storage API

No backend required.

---

## Project status

This is a small side project built for learning and productivity.

Planned improvements are tracked in the TODO list.

---

## License

MIT
