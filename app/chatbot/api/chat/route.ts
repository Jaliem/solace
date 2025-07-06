import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    // Check if API key exists
    if (!process.env.COHERE_API_KEY) {
      console.error('Cohere API key is missing');
      return Response.json({ 
        reply: 'Configuration error: API key is missing.' 
      }, { status: 500 });
    }

    console.log('Sending request to Cohere with message:', message);

    const cohereRes = await fetch('https://api.cohere.com/v2/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'command-r-03-2024',
        messages: [
          {
            role: 'system',
            content: 'You are a compassionate mental health assistant.'
          },
          {
            role: 'user',
            content: message,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    console.log('Cohere response status:', cohereRes.status);

    if (!cohereRes.ok) {
      const errorData = await cohereRes.json();
      console.error('Cohere API error:', errorData);
      
      // Handle specific Cohere errors
      if (cohereRes.status === 401) {
        return Response.json({ 
          reply: 'Authentication error: Invalid API key.' 
        }, { status: 401 });
      }
      
      if (cohereRes.status === 429) {
        return Response.json({ 
          reply: 'Rate limit exceeded. Please try again later.' 
        }, { status: 429 });
      }
      
      return Response.json({ 
        reply: 'Cohere API error. Please try again.' 
      }, { status: 500 });
    }

    const data = await cohereRes.json();
    console.log('Cohere response data:', data);

    // Cohere response structure is different from OpenAI
    const reply = data.message?.content?.[0]?.text || 'Sorry, I could not generate a response.';
    
    return Response.json({ reply });

  } catch (error) {
    console.error('Server error:', error);
    return Response.json({ 
      reply: 'Server error. Please try again later.' 
    }, { status: 500 });
  }
}