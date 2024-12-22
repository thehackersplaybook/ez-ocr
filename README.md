# EZ-OCR, A Gen AI-powered OCR Tool 🍁
[![GitHub license](https://img.shields.io/badge/license-MIT-blue)](#license)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16.x-green)](https://nodejs.org/)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen)](#contributors)

> 🚦 Disclaimer: ez-ocr is still in development, and is not ready for production yet. Please be patient with us. 

## Introduction 🖋️
**EZ-OCR** is a lightweight, Gen AI-powered OCR library designed for TypeScript (Node.js) and Python (coming soon). With it's support for frontier models like GPT-4O by OpenAI and Claude 3.5 Sonnet by Anthropic, ez-ocr is designed to be powerful and easily adoptable into the usual Gen AI workflows. ✨

Built at [_The Hackers Playbook_]([https://www.linkedin.com/in/thehackersplaybook](https://www.linkedin.com/company/the-hackers-playbook/)), it helps extract text from handwritten notes, scanned documents, and complex diagrams, making raw data accessible for workflows. At THP, we're building large-scale knowledge harnessing systems to support our mission of educating and upskilling the global tech workforce. 🚀


![Retro Dog](https://img.freepik.com/premium-photo/retro-wave-synthwave-portrait-dog-with-dark-sunglasses_835197-7495.jpg)



---

## Table of Contents 📚
- [Introduction](#introduction)
- [Problem Statement](#problem-statement)
- [Leveraging Gen AI](#leveraging-gen-ai)
- [Business Applications & Use-Cases](#business-applications--use-cases)
- [Setup Instructions](#setup-instructions)
- [Usage (API Reference)](#usage-api-reference)
- [Contributors](#contributors)
- [License](#license)

---



---

## Problem Statement 💡
At _The Hackers Playbook_, we handle diverse data formats—handwritten notes, invoices, and images of diagrams—that demand transformation into structured text. Traditional OCR tools fall short in parsing context-rich and diverse formats. EZ-OCR steps in with AI-powered adaptability to fill this gap.

---

## Leveraging Gen AI ⚙️
Our solution integrates Gen AI models to:
- Enhance accuracy in text recognition from non-standard fonts, handwriting, and low-quality scans.
- Extract semantic meaning, making the text more contextually relevant.
- Support multi-format inputs, including PDFs and images.

---

## Business Applications & Use-Cases 💼
### 1. **Digital Transformation**
   - Automate document digitization across industries.
   - Convert invoices, contracts, and handwritten notes into searchable formats.

### 2. **Education & Research**
   - Extract text from lecture slides, handwritten notes, and scanned textbooks.

### 3. **Data Analytics**
   - Parse data from receipts, tickets, and forms for analytics pipelines.

### 4. **Creative Workflows**
   - Extract and organize text from design mockups, visual notes, or sketches.

---

## Setup Instructions 🔧
### Prerequisites:
- Node.js v16+
- TypeScript 4.x

### Installation
Clone the repository and navigate to the TypeScript library folder:
```bash
git clone <repository-url>
cd ez-ocr/typescript
npm install
```

### Build and Run
1. **Build the project:**
   ```bash
   npm run build
   ```
2. **Run tests:**
   ```bash
   npm run test
   ```
3. **Run CLI locally:**
   ```bash
   npm run start -- <filePath|URL>
   ```
   _Note: CLI will be published on NPM in future updates._

---

## Usage (API Reference) 🔍
### **`ezOcr.extract(image)`**
Extract text from various formats.

#### Parameters:
- `image` (required): Accepts image URL, image buffer, or PDF document.

#### Examples:
1. **Extract text from an image URL:**
   ```typescript
   const ezOcr = require('ez-ocr');
   const text = await ezOcr.extract('https://example.com/image.png');
   console.log(text);
   ```

2. **Extract text from a PDF:**
   ```typescript
   const ezOcr = require('ez-ocr');
   const text = await ezOcr.extract('/path/to/document.pdf');
   console.log(text);
   ```

---

## Contributors 🤝
- **Aditya Patange** (Lead Developer)

Want to contribute? Check out our [Contribution Guidelines](#) and make a difference!

---

## License 📄
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

> _"Your notes just got a digital twin!"_ ✨
