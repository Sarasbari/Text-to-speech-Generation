# Text-to-Speech AI

A clean Text-to-Speech web interface powered by Hugging Face Inference. Users type text in a fixed-width, auto-expanding container and generate audio with one click. The UI stays simple, responsive, and focused on fast input and smooth speech output.

A modern Next.js application for converting text to speech using AI technology, featuring a beautiful UI built with shadcn/ui and Tailwind CSS.

## Features

- 🎨 Modern, responsive UI with shadcn/ui components
- 🎤 Text-to-speech conversion using Hugging Face inference
- ⚡ Built with Next.js 14 and TypeScript
- 🎨 Styled with Tailwind CSS
- 📱 Fully responsive design

## Project Structure

This project follows the shadcn/ui structure:

```
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── ui/                  # shadcn/ui components (default path)
│   │   └── hero-1.tsx       # Hero component
│   └── demo.tsx             # Demo component
├── lib/
│   └── utils.ts             # Utility functions (cn helper)
└── components.json          # shadcn/ui configuration
```

## Why `/components/ui`?

The `/components/ui` folder is the default path for shadcn/ui components. This is important because:

1. **Consistency**: shadcn/ui CLI automatically installs components to this path
2. **Organization**: Separates reusable UI components from feature-specific components
3. **Convention**: Follows the standard shadcn/ui project structure
4. **Tooling**: Works seamlessly with shadcn/ui CLI commands

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### 3. Install Additional shadcn/ui Components (Optional)

If you need more shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

## Dependencies

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **lucide-react**: Icon library
- **shadcn/ui**: Component library (via components.json)

## Next Steps

1. Integrate Hugging Face Inference API for text-to-speech
2. Add audio playback functionality
3. Implement voice selection options
4. Add download functionality for generated audio

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
