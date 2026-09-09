# StenoAI reviewer notes

## Architecture
This codebase consists of an Electron application that serves as a desktop client for audio recording, transcription, and summarization. The top-level directory is organized into two main components: the `app` directory contains the Electron front-end built with React and Vite, while the `src` directory holds the Python backend responsible for audio processing and AI integrations.

## Conventions
- **File Structure**: The main entry point of the Electron application is located in `app/main.js`, while the front-end UI is managed within `app/renderer/src`. The Python backend source files are contained in `src/`.
- **Naming Conventions**: JavaScript files, particularly for React components, use PascalCase (e.g., `App.tsx`, `Chat.tsx`). Python files follow snake_case, as seen in `audio_recorder.py`.
- **Type Coverage**: TypeScript is utilized for the renderer; type checking is enforced using the TypeScript compiler. The configuration is defined in `app/renderer/tsconfig.json`.
- **Linting and Formatting**: Python code follows PEP 8 guidelines and is linted using `ruff`. For JS/TS, ESLint and Prettier are configured, with scripts available in `app/package.json` (e.g., `lint:renderer`).
- **Semantic Versioning**: The project employs a manual semantic versioning strategy, with version bumps handled via `npm version` commands as stated in `CONTRIBUTING.md`.

## Intentional non-standard choices
- **Use of Electron and React**: The integration of Electron with React might seem unconventional due to potential performance overheads for a desktop application. However, this choice supports rapid UI development and provides a rich user interface for features like audio recording and live transcription.
- **Manual Semantic Versioning**: While automatic versioning is common in many projects, manual handling allows for finer control over the release process, in alignment with the project’s specific release management needs.

## Watch out for
- **Not Using "var" in JavaScript**: Ensure that `let` and `const` are used consistently to prevent variable hoisting issues, especially in the JavaScript files (notably in `app/main.js`).
- **Hard-Coding Process Information**: In `app/main.js`, sensitive information such as API keys should never be hard-coded. Ensure that environment variables are used (as implemented) to avoid security risks.
- **Error Handling**: While most functions handle errors gracefully (e.g., `isBackendRecording` in `app/main.js`), it's vital to ensure robustness in error handling across all asynchronous operations, especially within Electron IPC communications.
- **Code Duplication**: Maintainability could be impacted by potential code duplication, notably in managing audio capture setups. Refactoring shared functionality into utility functions could be advantageous.