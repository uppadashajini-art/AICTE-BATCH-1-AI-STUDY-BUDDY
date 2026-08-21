import Groq from "groq-sdk";

async function askAI(prompt) {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "openai/gpt-oss-120b",
  });

  return completion.choices[0].message.content;
}

export default askAI;