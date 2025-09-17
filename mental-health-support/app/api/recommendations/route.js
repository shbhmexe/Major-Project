import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize the Gemini API client with server-side environment variable
const geminiApiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(geminiApiKey);

// System prompt for resource recommendations
const RECOMMENDATION_PROMPT = `
You are a mental health resource recommendation system for students. Your task is to analyze the user's query, concerns, or interests and recommend appropriate mental health resources from our database.

When recommending resources:
1. Focus on student-specific mental health concerns
2. Consider the user's specific interests, concerns, or needs mentioned in their query
3. Provide a brief explanation of why each resource might be helpful
4. Format recommendations in a structured JSON format
5. Include relevant tags that match the user's needs

Your response should be in the following JSON format only:
{
  "recommendations": [
    {
      "id": "unique_id",
      "title": "Resource Title",
      "description": "Brief description of the resource",
      "type": "video|audio|guide",
      "relevance": "Why this resource is relevant to the query",
      "tags": ["tag1", "tag2"]
    }
  ]
}
`;

export async function POST(request) {
  try {
    const { query, userPreferences = {} } = await request.json();
    
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }
    
    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    // Prepare the prompt with user query and preferences
    const userPrompt = `
      User Query: ${query}
      
      User Preferences: ${JSON.stringify(userPreferences)}
      
      Please recommend mental health resources that would be most helpful for this user based on their query and preferences.
    `;
    
    // Generate content with the model
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      generationConfig: {
        temperature: 0.2, // Lower temperature for more focused recommendations
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
      systemInstruction: RECOMMENDATION_PROMPT
    });
    
    // Extract the response text
    const responseText = result.response.text();
    
    // Parse the JSON response
    let recommendations;
    try {
      recommendations = JSON.parse(responseText);
    } catch (error) {
      console.error('Error parsing Gemini response as JSON:', error);
      return NextResponse.json({ 
        error: 'Failed to parse recommendations', 
        rawResponse: responseText 
      }, { status: 500 });
    }
    
    return NextResponse.json(recommendations, { status: 200 });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    
    return NextResponse.json({ 
      error: 'Failed to generate recommendations',
      details: error.message 
    }, { status: 500 });
  }
}