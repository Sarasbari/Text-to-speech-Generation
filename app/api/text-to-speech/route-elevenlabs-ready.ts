// READY-TO-USE: ElevenLabs TTS Implementation
// Replace the current route.ts with this code after getting your ElevenLabs API key

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { text } = await request.json();

        // Validate text input
        if (!text || typeof text !== "string" || text.trim().length === 0) {
            return NextResponse.json(
                { error: "Please enter some text to convert" },
                { status: 400 }
            );
        }

        // Check for API key
        const apiKey = process.env.ELEVENLABS_API_KEY;
        if (!apiKey) {
            console.error("ELEVENLABS_API_KEY not found in environment variables");
            return NextResponse.json(
                { error: "API key not found. Please add ELEVENLABS_API_KEY to .env.local" },
                { status: 500 }
            );
        }

        console.log(`Generating speech with ElevenLabs: "${text.trim()}"`);

        // Call ElevenLabs API
        // Voice ID: 21m00Tcm4TlvDq8ikWAM (Rachel - default voice)
        // You can find more voice IDs at: https://elevenlabs.io/voice-library
        const response = await fetch(
            "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM",
            {
                method: "POST",
                headers: {
                    "Accept": "audio/mpeg",
                    "Content-Type": "application/json",
                    "xi-api-key": apiKey,
                },
                body: JSON.stringify({
                    text: text.trim(),
                    model_id: "eleven_monolingual_v1",
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75,
                    },
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
            console.error("ElevenLabs API error:", errorData);
            return NextResponse.json(
                { error: errorData.error || `Error ${response.status}: ${response.statusText}` },
                { status: response.status }
            );
        }

        // Get audio blob
        const audioBlob = await response.blob();
        const buffer = Buffer.from(await audioBlob.arrayBuffer());

        console.log(`✅ Success! Audio size: ${buffer.length} bytes`);

        // Return audio
        return new NextResponse(buffer, {
            status: 200,
            headers: {
                "Content-Type": "audio/mpeg",
                "Content-Disposition": `attachment; filename="speech.mp3"`,
            },
        });
    } catch (error) {
        console.error("Error in text-to-speech API:", error);

        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        );
    }
}

/*
SETUP INSTRUCTIONS:

1. Sign up for ElevenLabs: https://elevenlabs.io
2. Get your API key from the dashboard
3. Add to .env.local:
   ELEVENLABS_API_KEY=your_api_key_here

4. Replace app/api/text-to-speech/route.ts with this file

5. Restart your dev server:
   npm run dev

6. Test at http://localhost:3000

FREE TIER: 10,000 characters/month
PRICING: https://elevenlabs.io/pricing

VOICE OPTIONS:
- Change voice ID in the URL (line 35)
- Browse voices: https://elevenlabs.io/voice-library
- Popular voices:
  * 21m00Tcm4TlvDq8ikWAM - Rachel (default)
  * EXAVITQu4vr4xnSDxMaL - Bella
  * ErXwobaYiN019PkySvjV - Antoni
  * MF3mGyEYCl7XYWbV9V6O - Elli
*/
