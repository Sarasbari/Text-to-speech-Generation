"use client";

import * as React from "react";
import { GenerateSpeechButton } from "@/components/ui/button-8";
import { generateSpeech, downloadAudio } from "@/lib/ttsService";

const Hero1 = () => {
  const [text, setText] = React.useState("");
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  const [audioBlob, setAudioBlob] = React.useState<Blob | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  // Auto-resize textarea up to 3 lines, then enable scrolling
  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to calculate scrollHeight
    textarea.style.height = "auto";

    // Calculate line height (approximately 1.5rem per line)
    const lineHeight = 24; // 1.5rem = 24px
    const maxHeight = lineHeight * 3; // 3 lines max

    // Set height based on content, but cap at maxHeight
    if (textarea.scrollHeight <= maxHeight) {
      textarea.style.height = `${textarea.scrollHeight}px`;
      textarea.style.overflowY = "hidden";
    } else {
      textarea.style.height = `${maxHeight}px`;
      textarea.style.overflowY = "auto";
    }
  }, [text]);

  // Cleanup audio URL when component unmounts
  React.useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  // Handle generate speech
  const handleGenerate = async () => {
    // Validate text
    if (!text || text.trim().length === 0) {
      setError("Please enter some text to convert");
      return;
    }

    // Reset states
    setError(null);
    setLoading(true);

    // Clean up previous audio URL
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setAudioBlob(null);

    try {
      // Try server-side TTS first
      const result = await generateSpeech(text);
      setAudioUrl(result.audioUrl);
      setAudioBlob(result.audioBlob);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to generate speech";
      console.error("Server TTS error:", err);

      // If server fails, try browser-based TTS
      try {
        console.log("Falling back to browser TTS...");
        const { generateSpeechBrowser } = await import("@/lib/ttsService");

        // Use browser TTS
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = 1.0;
          utterance.pitch = 1.0;
          utterance.volume = 1.0;

          // Get available voices
          const voices = window.speechSynthesis.getVoices();
          if (voices.length > 0) {
            const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
            if (englishVoice) {
              utterance.voice = englishVoice;
            }
          }

          window.speechSynthesis.speak(utterance);
          setError("🔊 Using browser text-to-speech (server TTS unavailable).");
        } else {
          setError(errorMessage + "\n\nYour browser doesn't support text-to-speech.");
        }
      } catch (browserErr) {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle download audio
  const handleDownload = () => {
    if (audioBlob) {
      const filename = `speech-${Date.now()}.wav`;
      downloadAudio(audioBlob, filename);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0414] text-white flex flex-col relative overflow-x-hidden">
      {/* Gradient */}
      <div className="flex gap-[10rem] rotate-[-20deg] absolute top-[-40rem] right-[-30rem] z-[0] blur-[4rem] skew-[-40deg]  opacity-50">
        <div className="w-[10rem] h-[20rem] bg-gradient-to-br from-white to-blue-300"></div>
        <div className="w-[10rem] h-[20rem] bg-gradient-to-br from-white to-blue-300"></div>
        <div className="w-[10rem] h-[20rem] bg-gradient-to-br from-white to-blue-300"></div>
      </div>
      <div className="flex gap-[10rem] rotate-[-20deg] absolute top-[-50rem] right-[-50rem] z-[0] blur-[4rem] skew-[-40deg]  opacity-50">
        <div className="w-[10rem] h-[20rem] bg-gradient-to-br from-white to-blue-300"></div>
        <div className="w-[10rem] h-[20rem] bg-gradient-to-br from-white to-blue-300"></div>
        <div className="w-[10rem] h-[20rem] bg-gradient-to-br from-white to-blue-300"></div>
      </div>
      <div className="flex gap-[10rem] rotate-[-20deg] absolute top-[-60rem] right-[-60rem] z-[0] blur-[4rem] skew-[-40deg]  opacity-50">
        <div className="w-[10rem] h-[30rem] bg-gradient-to-br from-white to-blue-300"></div>
        <div className="w-[10rem] h-[30rem] bg-gradient-to-br from-white to-blue-300"></div>
        <div className="w-[10rem] h-[30rem] bg-gradient-to-br from-white to-blue-300"></div>
      </div>
      {/* Header */}
      <header className="flex justify-between items-center p-6 relative z-10">
        <div className="flex items-center gap-2">

          <div className="font-bold text-md"></div>
        </div>

      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex-1 flex justify-center">
            <div className="bg-[#1c1528] rounded-full px-4 py-2 flex items-center gap-2  w-fit mx-4">
              <span className="text-xs flex items-center gap-2">
                <span className="bg-black p-1 rounded-full">🥳</span>
                Introducing AI-Powered Speech Generation
              </span>
            </div>
          </div>
          {/* Headline */}
          <h1 className="text-5xl font-bold leading-tight">
            Convert Text to Speech effortlessly
          </h1>

          {/* Subtitle */}
          <p className="text-md text-gray-300">
            Transform your text into natural-sounding speech with advanced AI technology.
          </p>

          {/* Search bar */}
          <div className="relative max-w-2xl mx-auto w-full">
            <div className="bg-[#1c1528] rounded-full p-3 flex items-center transition-all">
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text to convert to speech..."
                className="bg-transparent flex-1 outline-none text-gray-300 px-4 resize-none overflow-hidden min-h-[24px] max-h-[72px] leading-6 placeholder:text-gray-500"
                rows={1}
              />
            </div>
          </div>

          {/* Generate Speech Button */}
          <div className="flex justify-center mt-6">
            <GenerateSpeechButton
              onClick={handleGenerate}
              disabled={loading || !text.trim()}
              loading={loading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-2xl mx-auto mt-4">
              <div className="bg-red-500/20 border border-red-500/50 rounded-full px-4 py-2 text-sm text-red-300">
                {error}
              </div>
            </div>
          )}

          {/* Audio Player */}
          {audioUrl && (
            <div className="max-w-2xl mx-auto mt-6 space-y-4">
              <div className="bg-[#1c1528] rounded-full p-4 flex items-center justify-center gap-4">
                <audio
                  ref={audioRef}
                  src={audioUrl}
                  controls
                  className="flex-1 max-w-md"
                />
                <button
                  onClick={handleDownload}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full px-6 py-2 text-sm font-semibold text-white transition-all"
                >
                  Download
                </button>
              </div>
            </div>
          )}

          {/* Suggestion pills */}
          {/* <div className="flex flex-wrap justify-center gap-2 mt-12 max-w-2xl mx-auto">
            <button className="bg-[#1c1528] hover:bg-[#2a1f3d] rounded-full px-4 py-2 text-sm transition-colors">
              Generate voiceover for videos
            </button>
            <button className="bg-[#1c1528] hover:bg-[#2a1f3d] rounded-full px-4 py-2 text-sm transition-colors">
              Create audio content for podcasts
            </button>
            <button className="bg-[#1c1528] hover:bg-[#2a1f3d] rounded-full px-4 py-2 text-sm transition-colors">
              Convert articles to audio
            </button>
            <button className="bg-[#1c1528] hover:bg-[#2a1f3d] rounded-full px-4 py-2 text-sm transition-colors">
              Generate narration for presentations
            </button>
            <button className="bg-[#1c1528] hover:bg-[#2a1f3d] rounded-full px-4 py-2 text-sm transition-colors">
              Create voice messages
            </button>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export { Hero1 };
