import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

// For logging requests and responses
const logToConsole = (type, data) => {
  console.log(`[CHATBOT ${type}]`, JSON.stringify(data, null, 2));
};

// This is the updated route.js file for the chatbot functionality

// Initialize the Google Gemini AI model
let ai;

try {
  // Try to initialize with environment variable
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('Gemini API key is not set in environment variables');
  } else {
    ai = new GoogleGenerativeAI(apiKey);
    console.log('Google Gemini AI initialized successfully');
  }
} catch (error) {
  console.error('Failed to initialize Google Gemini AI:', error);
}

// Helper function to convert file to generative part
async function fileToGenerativePart(data, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(data).toString('base64'),
      mimeType: mimeType
    }
  };
}

// System prompt to restrict responses to platform-related questions
const SYSTEM_PROMPT = `You are an AI assistant for the Internship Recommendation Engine platform. 
Your role is to provide helpful information ONLY about:
- Internship opportunities and recommendations
- Career advice for students and job seekers
- Resume and interview preparation
- The features and usage of this platform
- Educational resources related to career development

DO NOT provide information about:
- Topics unrelated to internships, careers, or this platform
- Personal opinions on political or controversial topics
- Medical, legal, or financial advice
- Creating harmful content or instructions

If asked about topics outside your scope, politely redirect the conversation to how you can help with internship and career-related questions.`;

export async function POST(req) {
  try {
    // Check if AI is initialized
    if (!ai) {
      const errorMessage = 'AI model not initialized. Please check your API key.';
      console.error(errorMessage);
      return NextResponse.json({
        success: false,
        message: errorMessage,
      }, { status: 500 });
    }

    // Parse the request body
    const { message, image } = await req.json();
    
    // Log the request
    logToConsole('REQUEST', { message, hasImage: !!image });

    // Validate parameters
    if (!message) {
      const errorMessage = 'Message is required';
      logToConsole('ERROR', { error: errorMessage });
      return NextResponse.json({
        success: false,
        message: errorMessage,
      }, { status: 400 });
    }

    try {
      // Generate content using Gemini model
      const model = ai.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
          topK: 40,
          topP: 0.95,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      });
      
      // Combine system prompt with user message
      const fullPrompt = `${SYSTEM_PROMPT}\n\nUser: ${message}\n\nAssistant:`;
      
      const result = await model.generateContent(fullPrompt);
      
      const response = result.response;
      const responseText = response.text();
      
      // Log the successful response
      logToConsole('RESPONSE', { success: true, responseLength: responseText.length });

      // Return the response with success status
      return NextResponse.json({
        success: true,
        message: responseText,
      });
    } catch (aiError) {
      console.error('Error in AI generation:', aiError);
      logToConsole('ERROR', { error: aiError.message, stack: aiError.stack });
      
      return NextResponse.json({
        success: false,
        message: 'Failed to generate a response. ' + aiError.message,
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    logToConsole('ERROR', { error: error.message, stack: error.stack });

    // Generic error response
    return NextResponse.json({
      success: false,
      message: 'An error occurred while processing your request. Please try again later.',
    }, { status: 500 });
  }
}