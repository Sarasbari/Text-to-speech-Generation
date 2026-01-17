// API route for text-to-speech conversion using fal.ai
import { NextRequest, NextResponse } from "next/server";
import * as fal from "@fal-ai/serverless-client";

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
        const apiKey = process.env.HUGGINGFACE_API_KEY;
        if (!apiKey) {
            console.error("HUGGINGFACE_API_KEY not found in environment variables");
            return NextResponse.json(
                { error: "API key not found. Please add HUGGINGFACE_API_KEY to .env.local" },
                { status: 500 }
            );
        }

        try {
            console.log(`Generating speech with text: "${text.trim()}"`);

            // Configure fal.ai client
            fal.config({
                credentials: apiKey,
            });

            // Call fal.ai TTS API
            const result: any = await fal.subscribe("fal-ai/resemble-enhance", {
                input: {
                    audio_url: text.trim(), // Note: This might need adjustment based on actual API
                },
            });

            console.log("fal.ai result:", result);

            if (result.audio_url) {
                // Fetch the audio from the URL
                const audioResponse = await fetch(result.audio_url);
                const audioBlob = await audioResponse.blob();
                const buffer = Buffer.from(await audioBlob.arrayBuffer());

                console.log(`✅ Success! Audio size: ${buffer.length} bytes`);

                return new NextResponse(buffer, {
                    status: 200,
                    headers: {
                        "Content-Type": "audio/wav",
                        "Content-Disposition": `attachment; filename="speech.wav"`,
                    },
                });
            } else {
                throw new Error("No audio URL in response");
            }
        } catch (error: any) {
            console.error("fal.ai error:", error);
            return NextResponse.json(
                { error: `Failed to generate speech: ${error.message}` },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Error in text-to-speech API:", error);

        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        );
    }
}
