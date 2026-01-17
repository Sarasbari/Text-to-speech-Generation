// Quick test script to verify the TTS API
async function testTTS() {
  try {
    const response = await fetch("http://localhost:3000/api/text-to-speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: "The answer to the universe is 42" }),
    });

    console.log("Status:", response.status);
    console.log("Status Text:", response.statusText);
    console.log("Content-Type:", response.headers.get("content-type"));

    if (!response.ok) {
      const error = await response.json();
      console.error("Error:", error);
    } else {
      const blob = await response.blob();
      console.log("Success! Audio blob size:", blob.size, "bytes");
      console.log("Audio type:", blob.type);
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
}

testTTS();
