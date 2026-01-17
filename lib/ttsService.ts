/**
 * Client-side Text-to-Speech using Web Speech API
 * This is a FREE, browser-based solution that works immediately
 */

export function generateSpeechBrowser(text: string): Promise<{ audioUrl: string; audioBlob: Blob }> {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Browser does not support speech synthesis'));
      return;
    }

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);

    // Configure voice settings
    utterance.rate = 1.0; // Speed
    utterance.pitch = 1.0; // Pitch
    utterance.volume = 1.0; // Volume

    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      // Try to find an English voice
      const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
    }

    // Speak the text
    window.speechSynthesis.speak(utterance);

    // Note: Web Speech API doesn't provide audio blob directly
    // For now, we'll create a placeholder
    utterance.onend = () => {
      // Create a simple placeholder blob
      const blob = new Blob(['Audio played via browser'], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      resolve({ audioUrl: url, audioBlob: blob });
    };

    utterance.onerror = (event) => {
      reject(new Error(`Speech synthesis error: ${event.error}`));
    };
  });
}

/**
 * Server-side Text-to-Speech (requires API key and service)
 * Use this when you have a TTS service configured
 */
export async function generateSpeech(text: string): Promise<{ audioUrl: string; audioBlob: Blob }> {
  if (!text || text.trim().length === 0) {
    throw new Error("Please enter some text to convert");
  }

  try {
    const response = await fetch("/api/text-to-speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text.trim() }),
    });

    // Handle error responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Unknown error" }));

      // If it's the demo mode error, suggest using browser TTS
      if (errorData.demo) {
        throw new Error(errorData.error + "\n\nTip: The app will now use your browser's built-in text-to-speech.");
      }

      throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    return { audioUrl, audioBlob };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network error. Please check your connection and try again.");
  }
}

export function downloadAudio(audioBlob: Blob, filename: string): void {
  try {
    const url = URL.createObjectURL(audioBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error("Error downloading audio:", error);
    throw new Error("Failed to download audio file");
  }
}
