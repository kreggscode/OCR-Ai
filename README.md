# OCR & Translation Toolbox

A Chrome extension that extracts text from images, screenshots, or PDFs using OCR, and provides instant translation or AI-based simplification powered by Pollinations AI.

## Features

- **OCR Extraction**: Extract text from images and PDFs client-side for privacy.
- **Translation**: Translate text into multiple languages.
- **Simplification**: Simplify complex text using AI.
- **User-Friendly UI**: Drag-and-drop file upload with modern interface.

## Installation

1. Clone the repository.
2. Load the extension in Chrome: Go to `chrome://extensions/`, enable Developer mode, and load the unpacked extension from the project folder.

## Usage

1. Click the extension icon.
2. Upload or drag-drop an image or PDF.
3. Extracted text appears in the textarea.
4. Select language and click Translate or Simplify.

## Permissions

- `activeTab`: For potential screenshot capture.
- `storage`: To save user preferences.
- `host_permissions`: To call Pollinations AI API.

## API

Uses Pollinations AI for text generation with temperature set to 1.

## Docs

See [docs/](docs/) for privacy policy, terms, and landing page.

## Contributing

Feel free to submit issues or pull requests.

## License

MIT
