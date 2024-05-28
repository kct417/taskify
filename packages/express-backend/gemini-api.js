import {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} from '@google/generative-ai';
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
	const generationConfig = {
		temperature: 0.9,
		topK: 1,
		topP: 1,
		maxOutputTokens: 2048,
	};

	const safetySettings = [
		{
			category: HarmCategory.HARM_CATEGORY_HARASSMENT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
	];

	const chat = model.startChat({
		generationConfig,
		safetySettings,
		history: [
			{
				role: 'user',
				parts: [
					{
						text:
							'System prompt: Your are an AI system that will be prompted with information about a reminders list.' +
							'When given information about the reminder you should reply in the correct format for each type.' +
							'If you are prompted to create a divider you should reply with dividerName: "{insert the divider name here}"' +
							'If you are prompted to create a folder you should reply with dividerName: "{insert the divider name here}", folderName: "{insert the folder name here}", description: "{insert folder description here}"' +
							'If you are not given one of these parameters when prompted to create a folder you should ask the user if they wish to provide one. If they choose not to provide a description, you may leave it as an empty string' +
							'If you are prompted to create a fask you should reply with taskName: "{insert the task name here}", dueDate: "{insert due date here}", description: "{insert folder description here}"' +
							'If you are not given one of these parameters when prompted to create a task you should ask the user if they wish to provide one. If they choose not to provide a description, you may leave it as an empty string',
					},
				],
			},
			{
				role: 'model',
				parts: [{ text: 'Understood.' }],
			},
		],
	});

	const result = await chat.sendMessage(prompt);
	const response = result.response;
	console.log(response.text());
}

promptGemini('Write a story about a magic backpack.');
