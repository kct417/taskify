import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from 'dotenv';
const ENV_PATH = '../../.env';
config({ path: ENV_PATH });

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ...

// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

// ...

async function promptGemini(prompt) {
	const result = await model.generateContent(prompt);
	const response = await result.response;
	const text = response.text();
	console.log(text);
}

promptGemini('Write a story about a magic backpack.');
