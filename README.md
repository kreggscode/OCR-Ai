# 🧠 OCR & Translation Toolbox

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Coming%20Soon-blue?style=for-the-badge&logo=google-chrome)](https://chromewebstore.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/kreggscode/OCR-Ai?style=social)](https://github.com/kreggscode/OCR-Ai)
[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)](https://github.com/kreggscode)

> Extract text from images instantly, then translate or simplify with AI magic! 🌟

A stunning Chrome extension that uses **Pollinations AI vision** to extract text from images and screenshots, then provides instant translation into **28+ languages** or AI-powered text simplification. Features a beautiful dark/light mode toggle and drag-and-drop interface.

![Extension Preview](https://via.placeholder.com/800x400/667eea/ffffff?text=OCR+AI+Extension+Preview)

## ✨ Features

### 🔍 **Smart OCR Extraction**

- **AI-Powered Vision**: Uses Pollinations AI's advanced vision models for accurate text extraction
- **Image Support**: Works with JPG, PNG, and other common image formats
- **Privacy-First**: Images processed securely via API, no local storage

### 🌍 **Global Translation**

- **28 Languages**: Translate to English, French, Spanish, German, Chinese, Japanese, Arabic, Russian, Korean, Hindi, and more!
- **AI Precision**: Context-aware translations powered by GPT models
- **Instant Results**: Get translations in seconds

### ✨ **AI Text Simplification**

- **Smart Simplification**: Make complex text easy to understand
- **Educational Focus**: Perfect for learning and accessibility
- **Creative Output**: Temperature-tuned for natural, readable results

### 🎨 **Beautiful UI/UX**

- **Dark/Light Mode**: Toggle between themes with a single click
- **Drag & Drop**: Intuitive file upload interface
- **Responsive Design**: Works perfectly in Chrome's extension popup
- **Loading Animations**: Visual feedback during processing
- **Copy to Clipboard**: One-click text copying

### 🔒 **Privacy & Security**

- **Zero Permissions**: No access to your browsing data
- **API-Only Calls**: Secure communication with Pollinations AI
- **No Data Storage**: Your images and text are not saved
- **Open Source**: Transparent, auditable code

## 🚀 Installation

### From Chrome Web Store (Coming Soon)

1. Visit the [Chrome Web Store](https://chromewebstore.google.com/)
2. Search for "OCR & Translation Toolbox"
3. Click **Add to Chrome**

### Manual Installation (Developer Mode)

1. **Download** or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top right)
4. Click **Load unpacked**
5. Select the `OCR/` folder from this repository

## 📖 How to Use

### Step-by-Step Guide

1. **🖱️ Open Extension**: Click the extension icon in your Chrome toolbar
2. **📁 Upload Image**: Drag & drop an image or click to browse files
3. **👀 View Text**: Extracted text appears instantly below
4. **🌙 Theme Toggle**: Click the moon/sun icon for dark/light mode
5. **🌍 Choose Language**: Select target language from dropdown (28 options!)
6. **🔄 Process**: Click **Translate** or **Simplify** for AI processing
7. **📋 Copy**: Use the copy button to save results

### Supported File Types

- ✅ JPEG, PNG, GIF, BMP, WebP
- ✅ Screenshots and camera photos
- ✅ High-resolution images

### Tips for Best Results

- 📸 **Clear Images**: Better quality = better OCR accuracy
- 📝 **Straight Text**: Avoid skewed or curved text
- 🌟 **Good Lighting**: Well-lit photos work best
- 🔤 **Standard Fonts**: Common fonts extract more accurately

## 🛠️ Technical Details

### AI Integration

- **OCR Engine**: Pollinations AI Vision API (GPT-4o models)
- **Translation/Simplification**: Pollinations AI Text API
- **Temperature**: Set to 1.0 for creative, accurate outputs
- **Rate Limiting**: Built-in delays to respect API limits

### Architecture

- **Manifest V3**: Modern Chrome extension format
- **Popup-Based**: Lightweight, no background processes
- **Vanilla JS**: No external dependencies
- **Inline CSS**: Reliable styling in extension context

### Browser Compatibility

- ✅ Chrome 88+
- ✅ Edge 88+
- ✅ Opera 74+
- ✅ Brave, Vivaldi (Chromium-based)

## 🤝 Contributing

We love contributions! Here's how you can help:

### Ways to Contribute

- 🐛 **Bug Reports**: Found an issue? [Open an issue](https://github.com/kreggscode/OCR-Ai/issues)
- 💡 **Feature Requests**: Have ideas? [Suggest features](https://github.com/kreggscode/OCR-Ai/discussions)
- 🔧 **Code Contributions**: Fork, improve, and submit PRs
- 📖 **Documentation**: Help improve this README or docs

### Development Setup

```bash
# Clone the repo
git clone https://github.com/kreggscode/OCR-Ai.git
cd OCR-Ai

# Load in Chrome developer mode
# (Follow installation steps above)
```

## 📊 Stats & Impact

- 🌍 **Languages**: 28 supported languages
- 🤖 **AI Models**: Powered by Pollinations AI
- 📱 **Users**: Free for everyone
- 🔄 **Updates**: Regular improvements and new features

## 🎯 Roadmap

- [ ] PDF support (when Pollinations adds it)
- [ ] Batch processing multiple images
- [ ] Voice-to-text integration
- [ ] Custom language models
- [ ] Mobile app version

## 🙏 Acknowledgments

- **Pollinations AI**: For their amazing free AI APIs
- **Chrome Extensions**: For the robust platform
- **Open Source Community**: For inspiration and tools

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ by [kreggscode](https://github.com/kreggscode)**

⭐ **Star this repo** if you found it useful!

[🐛 Report Bug](https://github.com/kreggscode/OCR-Ai/issues) • [💡 Request Feature](https://github.com/kreggscode/OCR-Ai/discussions) • [📧 Contact](mailto:kreg9da@gmail.com)

</div>
