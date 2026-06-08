### Description

A simple portfolio template for developer/designers built with React. 

### Install Packages

npm install --legacy-peer-deps

### Update LinkedIn skills (optional)

This project can write your LinkedIn skills into `src/data/linkedin_skills.json` using Playwright.

1) Save a login session (recommended; avoids storing passwords):

`npm run linkedin:save-state`

This opens a browser window; log into LinkedIn, then it saves a storage state file at `secrets/linkedin.storageState.json`.

2) Scrape and write skills JSON:

`LINKEDIN_STORAGE_STATE=secrets/linkedin.storageState.json LINKEDIN_PROFILE_URL=https://www.linkedin.com/in/<your-handle>/ npm run update:linkedin-skills`

Notes:
- Set `HEADFUL=1` if LinkedIn blocks headless mode.
- Set `SKIP_LINKEDIN_SCRAPE=1` to skip scraping (useful for CI).
