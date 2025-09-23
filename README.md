# KitCraft.AI

![KitCraft.AI Logo](https://raw.githubusercontent.com/user-attachments/assets/19323b78-b570-4f59-9ac0-c2474f3780f2)

**KitCraft.AI is a modern, AI-powered marketplace for DIY projects. Describe any project idea, and our AI will instantly generate a comprehensive, text-based 'DIY kit' for you.**

This application is built with a unique constraint: **no AI-generated images**. Instead, it leverages the descriptive power of the Gemini model to create evocative, text-based mockups and visual guides, offering a fresh take on instructional content.

---

## ✨ Core Features

-   **🤖 AI-Powered Project Generation**: Simply describe a project idea and select a skill level (Beginner, Intermediate, Advanced) to get a complete project plan.
-   **📝 Text-Only Visuals**: Instead of images, the AI generates a `mockupDescription` (a rich, paragraph-long description of the finished project) and a `visualDescription` for each step.
-   **🇮🇳 Localized for India**: All material costs are estimated in Indian Rupees (₹), and purchase links direct to `Amazon.in`.
-   **🛒 Interactive Shopping Cart**: Materials lists come with estimated prices and direct "Buy" links. Add items from any project to a persistent shopping cart.
-   **🗣️ Voice & Speech Integration**:
    -   **Speech-to-Text**: Dictate your project ideas directly into the input field.
    -   **Text-to-Speech**: Have project instructions read aloud to you, perfect for when your hands are busy.
-   **🌗 Light & Dark Mode**: A sleek, modern UI with a theme toggle that saves your preference.
-   **🚀 Top-Notch UI/UX**: Built with fluid animations, skeleton loaders, and a responsive design that works seamlessly on any device.
-   **🔒 Local Persistence**: All user accounts, projects, and cart items are saved securely in your browser's `localStorage`.

## 🛠️ Technology Stack

-   **Framework**: React 18+ with TypeScript
-   **Build Tool**: Vite
-   **AI Integration**: Google Gemini API (`@google/genai`) using the `gemini-2.5-flash` model.
-   **Styling**: Tailwind CSS for a utility-first, responsive design system.
-   **Animations**: `react-transition-group` for smooth view transitions.
-   **Speech**: Web Speech API (`SpeechRecognition` and `SpeechSynthesis`).

---

## 🚀 Getting Started

To run KitCraft.AI locally, follow these steps:

### 1. Prerequisites

-   Node.js (v18 or higher recommended)
-   `npm` or a compatible package manager.
-   A valid Google AI Studio API Key.

### 2. Installation

Clone the repository and install the dependencies:

```bash
git clone <repository_url>
cd kitcraft-ai
npm install
```

### 3. Environment Configuration

The application requires a Google Gemini API key. Create a `.env` file in the root of the project directory and add your key:

```
# .env

VITE_API_KEY="YOUR_GOOGLE_API_KEY_HERE"
```

The application is hardcoded to access this key via `process.env.API_KEY`. **Do not modify this variable name.**

### 4. Running the Application

Start the Vite development server:

```bash
npm run dev
```

The application should now be running on your local development server (usually `http://localhost:5173`).

---

## 🏛️ Architectural Highlights

-   **Component-Based**: Built with a clean, modular component structure.
-   **Service Layer**: Business logic (like AI calls and authentication) is separated into a `services` directory.
-   **Custom Hooks**: Functionality like theme management (`useTheme`), speech services (`useSpeech`), and local storage interaction (`useUserStorage`) are encapsulated in reusable custom hooks.
-   **Type Safety**: Fully typed with TypeScript to ensure code quality and maintainability.
