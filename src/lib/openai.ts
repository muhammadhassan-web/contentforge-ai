import OpenAI from "openai";

// Groq exposes an OpenAI-compatible API — free tier, no card required.
export const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});
