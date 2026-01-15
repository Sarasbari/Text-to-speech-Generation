# Setup Instructions

## Project Setup Complete ✅

Your project has been set up with:
- ✅ Next.js 14 with App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ shadcn/ui structure
- ✅ Hero1 component integrated
- ✅ All dependencies configured

## Quick Start

### 1. Install Dependencies

Run the following command in your terminal:

```bash
npm install
```

This will install all required packages including:
- Next.js, React, TypeScript
- Tailwind CSS and PostCSS
- lucide-react (for icons)
- shadcn/ui utilities (clsx, tailwind-merge, class-variance-authority)

### 2. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Project Structure

```
Text-to-speech AI/
├── app/
│   ├── globals.css          # Tailwind CSS styles
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Home page (uses Hero1)
├── components/
│   ├── ui/                  # shadcn/ui components folder
│   │   └── hero-1.tsx       # Your Hero1 component
│   └── demo.tsx             # Demo component
├── lib/
│   └── utils.ts             # Utility functions (cn helper)
├── components.json          # shadcn/ui configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## Why `/components/ui` is Important

The `/components/ui` folder is the **default path** for shadcn/ui components. This is crucial because:

1. **shadcn CLI Compatibility**: When you run `npx shadcn@latest add button`, components are automatically installed to `/components/ui`
2. **Standard Convention**: All shadcn/ui projects use this structure
3. **Component Discovery**: Tools and IDEs recognize this path for component autocomplete
4. **Consistency**: Keeps your project aligned with shadcn/ui best practices

## Component Integration

### Hero1 Component
- **Location**: `components/ui/hero-1.tsx`
- **Usage**: Imported in `app/page.tsx` and `components/demo.tsx`
- **Features**: 
  - Beautiful gradient backgrounds
  - Responsive design
  - Interactive search bar
  - Suggestion pills

### Changes Made
1. Fixed `bg-linear-90` class → Changed to `bg-gradient-to-br` (standard Tailwind gradient)
2. Replaced external logo image → Created a simple gradient logo placeholder
3. Updated text content → Changed to text-to-speech specific content
4. Added proper z-index layering for gradients and content

## Next Steps for Hugging Face Integration

1. **Install Hugging Face SDK**:
   ```bash
   npm install @huggingface/inference
   ```

2. **Create API Route** (for server-side inference):
   - Create `app/api/text-to-speech/route.ts`
   - Use Hugging Face Inference API
   - Handle text input and return audio

3. **Add Environment Variables**:
   - Create `.env.local` file
   - Add `HUGGINGFACE_API_KEY=your_key_here`

4. **Implement Audio Player**:
   - Add audio playback component
   - Handle loading states
   - Add download functionality

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Adding More shadcn/ui Components

To add more components from shadcn/ui:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

Components will automatically be added to `/components/ui`.

## Troubleshooting

### If Tailwind styles aren't working:
- Make sure `app/globals.css` is imported in `app/layout.tsx`
- Check that `tailwind.config.ts` includes the correct content paths

### If TypeScript errors occur:
- Run `npm install` to ensure all types are installed
- Check that `tsconfig.json` paths are correct

### If components aren't found:
- Verify the import path uses `@/components/ui/hero-1`
- Check that `tsconfig.json` has the correct path aliases
