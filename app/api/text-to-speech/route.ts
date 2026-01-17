// TEMPORARY DEMO API - Uses browser text-to-speech
// Replace this with a real TTS service (see TTS_INTEGRATION_GUIDE.md)
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

    // Return a message indicating this is a demo
    // The actual TTS will need to be done client-side or with a paid service
    return NextResponse.json(
      {
        error: "⚠️ Demo Mode: Hugging Face free tier doesn't support TTS. Please see TTS_INTEGRATION_GUIDE.md for working solutions (ElevenLabs, OpenAI, or Web Speech API).",
        demo: true,
      },
      { status: 503 }
    );
  } catch (error) {
    console.error("Error in text-to-speech API:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
