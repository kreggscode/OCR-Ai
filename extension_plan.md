# OCR & Translation Toolbox Chrome Extension Plan

## Project Overview

Develop a visually stunning and fully functional Chrome extension called "OCR & Translation Toolbox" that extracts text from images, screenshots, or PDFs, and provides instant translation or AI-based simplification using Pollinations AI. The extension must adhere to Google Web Store policies, requesting only necessary permissions.

## Features

- **Text Extraction**: Extract text from uploaded images, screenshots, or PDF files using client-side OCR.
- **Translation**: Translate extracted text into multiple languages using Pollinations AI.
- **Simplification**: Generate simplified versions of the text using AI.
- **User Interface**: Modern, intuitive popup interface with drag-and-drop file upload and real-time processing.
- **Offline Capability**: OCR processing works without internet for text extraction.
- **Privacy-Focused**: No data storage or transmission except for API calls to Pollinations AI.

## Technologies and Libraries

- **Chrome Extension Framework**: Manifest V3 for compatibility with modern Chrome.
- **OCR Engine**: Tesseract.js (client-side JavaScript library for OCR, no external API needed).
- **PDF Handling**: pdf-parse or PDF.js for text extraction from PDFs.
- **AI Integration**: Pollinations AI Text API for translation and simplification (temperature set to 1 for creative outputs).
- **UI Framework**: Vanilla JavaScript with HTML/CSS for simplicity, or React for more complex UI if needed.
- **Icons and Styling**: Lucide icons and TailwindCSS for a modern look.
- **Build Tools**: Webpack or Vite for bundling the extension.

## Architecture

- **Manifest.json**: Defines extension permissions, scripts, and resources.
- **Popup**: Main UI for file upload, text display, and action buttons.
- **Background Script**: Handles API calls to Pollinations AI.
- **Content Script**: Optional for injecting into pages (e.g., screenshot capture).
- **Options Page**: For user preferences like default language.

## Permissions

- **host_permissions**: ["https://text.pollinations.ai/*"] – Required for API calls to Pollinations AI.
- **activeTab**: To capture screenshots from the current tab if needed.
- No unnecessary permissions like storage, history, or tabs unless implemented.

## Implementation Steps

1. **Setup Project Structure**:

   - Create manifest.json with V3 format.
   - Set up folders: popup/, background/, options/, assets/, docs/.

2. **Implement OCR Functionality**:

   - Integrate Tesseract.js for image-to-text conversion.
   - Add support for PDF text extraction using PDF.js.
   - Handle file uploads via input or drag-and-drop.

3. **Integrate Pollinations AI**:

   - Use the Text Generation API (<https://text.pollinations.ai/{prompt}>).
   - For translation: Prompt like "Translate this text to [language]: [extracted_text]".
   - For simplification: Prompt like "Simplify this text: [extracted_text]".
   - Set temperature to 1 in API calls for balanced creativity.
   - Handle responses in JSON format for better parsing.

4. **Build User Interface**:

   - Design a clean popup with file upload area, text output, and buttons for translate/simplify.
   - Add language selection dropdown.
   - Ensure responsive design.

5. **Create Documentation**:

   - Create a `docs/` folder.
   - Add a landing page (HTML/Markdown) describing the extension features.
   - Create a Privacy Policy page including contact email: kreg9da@gmail.com.
   - Create a Terms and Conditions page.

6. **Handle Errors and Edge Cases**:

   - Validate file types (images: PNG, JPG, JPEG; PDFs).
   - Show loading indicators during processing.
   - Handle API rate limits (anonymous tier: 1 request every 15s).

7. **Testing and Polishing**:

   - Test OCR accuracy on various images and PDFs.
   - Verify translations and simplifications.
   - Ensure compliance with Web Store policies (no deceptive features, clear privacy practices).

8. **Version Control and Publishing**:

   - Push the project to GitHub with a suitable repository name.
   - Package the extension as a ZIP file.
   - Submit to Chrome Web Store with screenshots and description.

## Suggested Extension Names

- **OCRAI**: Short and catchy, emphasizing OCR and AI.
- **ScanTranslate AI**: Highlights scanning and translation.
- **TextExtract Pro**: Focuses on text extraction with a pro feel.
- **VisionTranslate**: Suggests vision-based translation.
- **OCR Toolbox**: Simple and descriptive.

Choose a name that aligns with branding and availability on Chrome Web Store/GitHub.

## Using Pollinations AI

- **API Endpoint**: <https://text.pollinations.ai/openai> (POST for advanced, or GET for simple).
- **Authentication**: No signup required for basic use; use anonymous access.
- **Rate Limits**: Respect 15s delay between requests.
- **Temperature**: Always set to 1 as specified.

- **Example Call** (JavaScript):

  ```javascript
  const response = await fetch('https://text.pollinations.ai/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'openai',
      temperature: 1,
      messages: [{ role: 'user', content: `Translate to French: ${text}` }]
    })
  });
  const data = await response.json();
  const translated = data.choices[0].message.content;
  ```

## Best Practices

- Keep code modular and well-commented.
- Avoid hardcoding sensitive data (no API keys needed for Pollinations).
- Test on multiple browsers if possible, but focus on Chrome.
- Document the code for maintainability.

This plan provides a comprehensive roadmap for building the extension. Proceed to implementation once reviewed.
