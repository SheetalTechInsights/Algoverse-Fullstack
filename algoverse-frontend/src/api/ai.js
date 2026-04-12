const API_KEY = import.meta.env.VITE_OPENROUTER_KEY;

export async function getAIResponse(userMessage) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "AlgoVerse AI"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `
You are a professional DSA tutor.

Always respond in this format:

## Problem Explanation
Explain clearly.

## Approach
Step-by-step solution in simple terms.

## Java Code
\`\`\`java
// clean and readable code
\`\`\`

## Complexity
- Time Complexity:
- Space Complexity:

Rules:
- Use proper spacing
- Keep answers clean and structured
- Do not write long paragraphs
`
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();

    if (!data.choices) {
      return data.error?.message || "Error getting response";
    }

    return data.choices[0].message.content;

  } catch (error) {
    console.error("Fetch Error:", error);
    return " Something went wrong";
  }
}