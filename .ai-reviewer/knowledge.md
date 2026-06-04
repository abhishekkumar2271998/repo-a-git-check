# StenoAI reviewer notes

## Architecture
StenoAI is a macOS application designed for recording, transcribing, and summarizing meetings using local AI models. The project is structured into an Electron app frontend (located in the `app/` directory) and a Python backend for processing (found in the `src/` directory). The frontend utilizes React and is built with Vite, while the backend handles audio operations and AI model interactions.

## Conventions
- **Python Code Style**: The project adheres to PEP 8 for styling, utilizes type hints, and requires docstrings for functions and classes, as indicated in `CONTRIBUTING.md`.
- **JavaScript Code Style**: The JavaScript files follow a set style including mandatory semicolons, usage of `const` and `let` over `var`, and adherence to existing code patterns. For instance, the main application logic in `app/main.js` uses these conventions.
- **File Structure**: The repo’s file layout is organized into two primary sections: `src/` for backend Python scripts like `audio_recorder.py` and `transcriber.py`, and `app/` for the Electron application which includes main files (`main.js`, `renderer/`) and a structured `package.json` for dependencies.
- **Testing**: The Electron app includes commands for end-to-end testing (`test:e2e` in `app/package.json`), emphasizing the need for functional testing of the app’s UI interactions.
- **Environment Variables**: The backend loads environment variables from a `.env` file (not included in the repo) to avoid hardcoding sensitive credentials. This is a critical practice for maintaining security and should be honored in implementations.

## Intentional non-standard choices
- The backend includes specific checks for system audio capture capabilities which differ depending on macOS versions. For instance, `isCoreAudioTapSupported()` in `app/main.js` enables functionality only if the operating system is 14.4 or later. This check allows the application to avoid silent recordings on incompatible systems, a deliberate design choice rather than a generic fallback approach.
- The usage of `@electron/notarize` within the build process signals adherence to macOS security policies, which is non-standard for many projects but shows a clear intention of maintaining application integrity and security compliance.

## Watch out for
- Ensure environmental dependencies and system configurations are correctly set up per the instructions in `CONTRIBUTING.md`. Missing these steps can lead to runtime failures.
- Be vigilant about potential missing error handling in IPC communication as seen throughout `app/preload.js` and `app/main.js`, where processes could silently fail without user notification.
- Inconsistent use of syntax such as ignoring ESLint warnings could lead to harder-to-maintain code, especially evident in places where the linting process isn’t clearly invoked based on the provided scripts.
- Be cautious of memory management, particularly in the handling of large audio files in the backend. The performance implications haven’t been covered extensively and should be checked during code reviews for optimization opportunities.