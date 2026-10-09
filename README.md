# Single-page Theme Demo

A responsive HTML/CSS/JavaScript website with light/dark themes, mobile navigation and an explicitly local contact-form demonstration. InnovateCorp, services, prices and business details are fictional sample content.

![Original light theme](light.png)
![Original dark theme](dark.png)

These existing screenshots preserve the original visual design; navigation, accessibility and form feedback have since been improved.

## Run and use

Run `python -m http.server 8774` in this directory and open http://localhost:8774. No npm install or build is needed. Google Fonts is optional; system fonts are the fallback.

The native theme switch responds to mouse and keyboard. Without an explicit choice, the site follows the operating system's color preference and subsequent changes. Selecting a theme stores `business-theme` for this origin and browser. Invalid saved values are ignored; blocked/full storage leaves the choice in memory and adds a session-only notice. Remove the key in browser tools to resume system theme tracking.

On mobile, Toggle navigation reveals the menu. Escape closes it and restores button focus; choosing a section closes the menu and focuses that section. Calls to action lead to real sections. Native anchors and CSS scroll offsets support fixed-header navigation, with reduced-motion scrolling respected. Without JavaScript, navigation remains visible.

The contact form validates required trimmed values and shows “Your message was not sent or stored.” It has no backend, email service, analytics, checkout or account. Fields are not logged or sent in request parameters. All pricing is illustrative.

## Structure and checks

`index.html` contains semantic sections and labelled controls. `styles.css` contains theme variables, grid layouts and mobile menu rules. `theme-state.js` isolates theme preference/persistence rules; `script.js` binds the DOM. `tests/theme.test.cjs` verifies system tracking, explicit persistence, invalid values and storage failure.

With Node.js 22.19+, run `npm run check` and `npm test`. GitHub Actions runs both. There are no npm dependencies. Browser storage is origin-specific and not synchronized between devices.

## Hosting and future work

Suitable for GitHub Pages static hosting; no verified public demo is configured. A real contact service and verified business content must be configured before commercial reuse. Cross-tab theme synchronization could be added separately.

Author: Shazeel Ahmed. No license file is present.
