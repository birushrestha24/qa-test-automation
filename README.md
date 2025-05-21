# QA Test Automation

Automated end-to-end testing project using [Playwright](https://playwright.dev/).

# Installation
```bash
  git clone git@github.com:birushrestha24/qa-test-automation.git
  cd qa-test-automation
  npm install
```

# Environment Setup
Create a .env file in the root directory and add the following environment variables:

`BASE_URL=https://demoqa.com`

`USERNAME=test987`

`PASSWORD=Test@987`

*Note: These are test credentials for demo purposes only*

# Running Tests
1. Install Playwright
```bash
  npx playwright install
```
2. Execute Tests

Run tests using the Playwright Test Runner:

- Launch UI Test Runner
```bash
  npx playwright test -—ui
```
- Run in CLI (Headless)
```bash
  npx playwright test 
```