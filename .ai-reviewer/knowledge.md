# StenoAI reviewer notes

## Architecture
StenoAI is an Electron-based application that integrates Python for backend processing of audio recordings, employing AI models for transcription and summarization. The repository is structured with the frontend (React) within the `app` directory and the backend Python components within the `src` directory, enabling clear separation of concerns between the client and server functionalities.

## Conventions
- **File Structure**: The main structure consists of two primary directories: `app` for the Electron app and UI-related files, and `src` for the backend Python scripts (e.g., `audio_recorder.py`, `transcriber.py`, and `summarizer.py`).
- **Naming Conventions**: Python files typically use snake_case (e.g., `simple_recorder.py`), while JavaScript/TypeScript files use camelCase and PascalCase for components (e.g., `App.tsx`, `BottomDockSlot.tsx`), consistent with React and TypeScript conventions.
- **JavaScript Style**: JavaScript files follow ESNext standards. Team enforces usage of `const` and `let` for variables (prefer over `var`), and semicolons are consistently used.
- **Python Style**: The team adheres to PEP 8 for Python with type hints and docstrings to enhance readability and maintainability, as stated in CONTRIBUTING.md. Linting is performed using `ruff`.
- **Commit Messages**: Commit messages should be descriptive and follow a conventional format (e.g., “Add feature for recording session”), ensuring clarity in code history.

## Intentional non-standard choices
- **Environment Variables Handling**: The project includes a custom solution for loading environment variables from a `.env` file to avoid hard-coding sensitive configs. This approach is visible in `app/main.js`, which intentionally skips error handling on reading the `.env` file.
- **Shortcut Protocol**: Custom URL protocol (`stenoai://`) for deep linking is integrated, allowing external applications (like calendar apps) to trigger recording in StenoAI. This non-standard approach ensures smooth integration with macOS features.

## Watch out for
- **Missed TypeScript Type Checks**: Ensure type consistency and correctness due to TypeScript's strict settings. Use `tsc` regularly to catch type errors.
- **Electron Security Best Practices**: Be vigilant about potential security risks when using `nodeIntegration`. Confirm that necessary precautions are in place to restrict potential malicious content in the renderer.
- **Incorrect Dependency Versions**: When updating dependencies in `package.json`, verify compatibility with the rest of the stack to prevent breaking changes, especially since the project uses specific older Node.js versions.
- **Linting and Formatting**: Ensure all code is linted and formatted according to defined standards before committing, as described in CONTRIBUTING.md. 
- **Testing Requirements**: Ensure that all new features are accompanied by relevant tests, especially in the Python backend, as the current workflow emphasizes local testing and automated quality assurance.