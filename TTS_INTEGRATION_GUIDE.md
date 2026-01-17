# Text-to-Speech Integration Guide

## Current Status

✅ **Frontend is fully integrated and working!**
- Text input field
- Generate button
- Loading states
- Error handling  
- Audio player
- Download functionality

⚠️ **Backend TTS API Issue**

The Hugging Face free tier Inference API does not support text-to-speech models. The models you want to use (including `ResembleAI/chatterbox`) require either:
1. Hugging Face Pro subscription ($9/month)
2. Dedicated Inference Endpoints (paid)
3. A different TTS service

## Working Solutions

### Option 1: Use ElevenLabs (Recommended - Best Quality)

ElevenLabs provides excellent TTS with a free tier (10,000 characters/month).

1. Sign up at https://elevenlabs.io
2. Get your API key
3. Update `.env.local`:
```bash
ELEVENLABS_API_KEY=your_api_key_here
```

4. Update `app/api/text-to-speech/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { text } = await request.json();
  const apiKey = process.env.ELEVENLABS_API_KEY;

  const response = await fetch(
    "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM",
    {
      method: "POST",
      headers: {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": apiKey!,
      },
      body: JSON.stringify({
        text: text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    }
  );

  const audioBlob = await response.blob();
  const buffer = Buffer.from(await audioBlob.arrayBuffer());

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Disposition": `attachment; filename="speech.mp3"`,
    },
  });
}
```

### Option 2: Use OpenAI TTS

OpenAI provides high-quality TTS at $15 per 1M characters.

1. Get API key from https://platform.openai.com
2. Install: `npm install openai`
3. Update `.env.local`:
```bash
OPENAI_API_KEY=your_api_key_here
```

4. Update the API route to use OpenAI TTS

### Option 3: Use Web Speech API (Free, Browser-based)

Move TTS to the frontend using the browser's built-in speech synthesis:

```typescript
// In your frontend component
const handleGenerate = () => {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
};
```

### Option 4: Upgrade Hugging Face (If you want ResembleAI/chatterbox)

1. Subscribe to Hugging Face Pro ($9/month)
2. Or set up a dedicated Inference Endpoint
3. The current code will then work with your token

## Current Implementation

The frontend is ready to go! Just choose one of the options above and update the backend API route accordingly.

**Test the frontend:**
1. Navigate to http://localhost:3000
2. Enter text in the input field
3. Click "Generate speech"
4. Audio player will appear when generation is complete
5. Click "Download" to save the audio file

## Files Modified

- ✅ `components/ui/hero-1.tsx` - Frontend UI (working)
- ✅ `lib/ttsService.ts` - TTS service functions (working)
- ⚠️ `app/api/text-to-speech/route.ts` - Needs TTS service update
- ✅ `.env.local` - Environment variables configured

Let me know which option you'd like to implement!
