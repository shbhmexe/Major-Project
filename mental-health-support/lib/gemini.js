// Client-side utility for interacting with the Gemini API through our server API route

// Context for mental health support
const SYSTEM_PROMPT = `
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

// Function to generate a response from Gemini via API route
export async function generateGeminiResponse(userMessage, options = {}) {
  try {
    // Extract options for customization
    const { responseStyle = 'supportive', customPrompt = '' } = options;
    
    // Call our API route instead of directly using the Gemini API
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        message: userMessage,
        responseStyle,
        customPrompt
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API error:', errorData);
      throw new Error(errorData.error || 'Failed to get response');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error generating Gemini response:', error);
    return "I'm having trouble connecting right now. Please try again in a moment.";
  }
}

// Function to split long responses into multiple messages
export function splitResponseIntoMessages(response, maxLength = 150) {
  // If response is short enough, return as a single message
  if (response.length <= maxLength) {
    return [response];
  }
  
  // Split by sentences or paragraphs
  const sentences = response.split(/(?<=\.|\?|\!)\s+/);
  const messages = [];
  let currentMessage = '';
  
  for (const sentence of sentences) {
    // If adding this sentence would exceed max length, start a new message
    if (currentMessage.length + sentence.length > maxLength && currentMessage.length > 0) {
      messages.push(currentMessage.trim());
      currentMessage = sentence;
    } else {
      currentMessage += (currentMessage ? ' ' : '') + sentence;
    }
  }
  
  // Add the last message if there's anything left
  if (currentMessage.trim()) {
    messages.push(currentMessage.trim());
  }
  
  return messages;
}