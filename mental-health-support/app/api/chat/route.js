import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client with server-side environment variable
const geminiApiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(geminiApiKey);

// Base context for mental health support
const BASE_SYSTEM_PROMPT = `
You are a supportive AI assistant specializing in mental health support for students. 
Your role is to provide empathetic responses, coping strategies, and resources for common 
mental health challenges faced by students such as anxiety, stress, depression, and sleep issues.

Guidelines:
- Be empathetic and supportive in your responses
- Provide practical coping strategies when appropriate
- Suggest resources for further support
- Recognize the limits of AI assistance and recommend professional help when needed
- If a student mentions self-harm or suicide, prioritize their safety and direct them to immediate help
- Focus on student-specific mental health concerns like academic pressure, social anxiety, and burnout
- Keep responses concise and conversational

Remember that you are not a replacement for professional mental health support.
`;

// Response style variations
const RESPONSE_STYLES = {
  supportive: `Maintain a warm, empathetic tone. Validate feelings and experiences. Offer gentle encouragement.`,
  informative: `Provide clear, factual information. Include relevant research or evidence when appropriate. Focus on educational content about mental health.`,
  practical: `Emphasize actionable advice and concrete steps. Suggest specific exercises, techniques, or resources. Be direct and solution-oriented.`,
  brief: `Keep responses concise and to the point. Prioritize clarity and brevity. Focus on the most essential information or advice.`,
  conversational: `Use a casual, friendly tone. Respond in a more natural, dialogue-like manner. Include occasional questions to encourage reflection.`
};

export async function POST(request) {
  try {
    const { message, responseStyle = 'supportive', customPrompt = '' } = await request.json();
    
    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Build the system prompt based on user preferences
    let systemPrompt = BASE_SYSTEM_PROMPT;
    
    // Add response style if valid
    if (RESPONSE_STYLES[responseStyle]) {
      systemPrompt += `\n\nTone and Style: ${RESPONSE_STYLES[responseStyle]}`;
    }
    
    // Add custom prompt if provided
    if (customPrompt) {
      systemPrompt += `\n\nAdditional Instructions: ${customPrompt}`;
    }
    
    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    // Generate content with the model directly
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: message }] }],
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
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
      ],
      systemInstruction: systemPrompt
    });
    
    // Extract the response text
    const responseText = result.response.text();
    
    return new Response(JSON.stringify({ response: responseText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating Gemini response:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Failed to generate response',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}