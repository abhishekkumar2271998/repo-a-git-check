# StenoAI reviewer notes

## Architecture
The StenoAI codebase is structured as a hybrid application encompassing an Electron desktop client and a Python backend. The main directories include `app` for the Electron app files and `src` for the Python backend services, along with a root-level CLI script (`simple_recorder.py`) for command-line interactions.

## Conventions
- **File Structure**: The project retains a clear separation between the frontend (Electron + React in `app`) and backend (Python in `src`). The Electron app follows standard Electron conventions, with `main.js` for the main process, and additional routes and components in `renderer/src/`.
- **JavaScript**:
  - Use semicolons at the end of statements.
  - Utilize `const` and `let` over `var` (notable in `app/main.js`).
  - Follow consistent asynchronous handling patterns, leveraging Promises and async/await to avoid callback hell, as seen in functions like `isBackendRecording()` in `main.js`.
- **Python**:
  - Follow PEP 8 guidelines, use type hints, and include docstrings (demonstrated in `src/audio_recorder.py`).
  - Linting is enforced using `ruff`: `ruff check .`.
  
- **React Components**: Use functional components with hooks (e.g., `useEffect`, `useLayoutEffect`), as seen in `App.tsx`. State management seems to be handled with context providers (e.g., `AskBarProvider`).

## Intentional non-standard choices
- The `.env` file is used to avoid hardcoded secrets in the source code, a practice not commonly found in many repositories, which may confuse bots expecting configuration to be managed differently (documented in `main.js`).
- The project distinguishes between development and production paths for assets and binaries, supporting a clean separation for builds versus development (`getBackendPath()` function in `main.js`). 

## Watch out for
- **Hard-Coded Dependencies**: Ensure that any required services (like Ollama and ffmpeg) are mentioned in your PRs to avoid installation issues. They must be installed manually as per `CONTRIBUTING.md`.
- **Versioning**: The team uses manual semantic versioning which can lead to irregularities; reviewers should ensure version changes in `package.json` align with the actual code modifications in PRs.
- **Test Coverage**: Review for missing tests, especially around critical functionalities like recording or summarizing actions that could lead to substantial user impact.
- **Handling Environment Variables**: Be cautious with any changes that might affect the loading or usage of environment variables — changes in their handling can introduce unwanted behavior, especially across varied environments (development vs. production).