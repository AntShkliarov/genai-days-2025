# Copilot Instructions for AI Coding Agents

## Overview
This repository contains two main areas:
- `todomvc-react/`: A React-based TodoMVC application using Webpack for builds and Jest for tests.
- `excercises/`: Playwright-based end-to-end and prompt-driven tests, with custom organization for Gen AI Days demos.

## Architecture & Key Patterns
- **TodoMVC App** (`todomvc-react/`):
  - Follows a loose MVC pattern:
    - Model: `src/todo/reducer.js` (state logic)
    - View: `src/todo/components/` (UI components)
    - Controller: `src/todo/app.jsx` (main logic, uses `useReducer`)
  - Webpack config split into `webpack.common.js`, `webpack.dev.js`, `webpack.prod.js`.
  - Uses React 17, React Router, and classnames. Styling via `todomvc-app-css`.
- **Testing & Exercises** (`excercises/`):
  - Playwright config in `playwright.config.js` (HTML reports, Chromium only, baseURL defaults to `http://localhost:8080`).
  - Tests organized by topic (e.g., `1-mode-model-selection`, `2-planning`). Prompt files in `prompts/` subfolders.
  - Legacy tests in `tests-legacy/`.

## Developer Workflows
- **Build TodoMVC**:
  - `npm install` in `todomvc-react/`
  - `npm run build` for production build (outputs to `dist/`)
  - `npm run dev` for local development (Webpack dev server)
  - `npm run serve` to serve static build via `http-server` on port 7002
- **Run Playwright Tests**:
  - `npm install` in `excercises/`
  - Playwright tests run via `npx playwright test` (see `playwright.config.js` for options)
  - HTML reports generated in `playwright-report/`

## Project-Specific Conventions
- **General Coding Rules** (see `.cursor/rules/general-coding-rules.mdc`):
  - Avoid duplicated logic; prefer DRY, KISS, YAGNI unless user instructs otherwise.
  - Do not introduce external libraries unless explicitly authorized.
- **React Patterns**:
  - State managed via reducer in `reducer.js`.
  - Components are function-based, organized in `src/todo/components/`.
  - App entry point is `src/index.js`.
- **Testing Patterns**:
  - Playwright tests use HTML reporting and are grouped by exercise topic.
  - Prompt-driven exercises use markdown files in `prompts/`.

## Integration Points
- **External Dependencies**:
  - React, React Router, classnames, Playwright, Jest, Webpack, http-server.
- **Cross-Component Communication**:
  - State flows via React context/hooks; reducer is the single source of truth.

## Examples
- To add a new UI feature, create a component in `src/todo/components/` and update state logic in `reducer.js`.
- To add a new Playwright test, place it in the appropriate `excercises/tests/` subfolder and update `playwright.config.js` if needed.

## References
- `.cursor/rules/general-coding-rules.mdc`: Coding principles enforced for all agents.
- `todomvc-react/readme.md`: App build and run instructions.
- `excercises/playwright.config.js`: E2E test configuration.

---
For questions or unclear conventions, ask for clarification or review the referenced files above.
