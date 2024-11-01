import axios from "axios";
import { MistralChatCompletion } from "../hello/type/mistralResponseType";

export async function getRagResponse(chatHistory: string) {
    // Send request
    const apiKey = process.env.API_KEY ; // Replace with your actual API key
    const payload = {
      model: "mistral-large-2407",
      //"temperature": 0.1,
      messages: chatHistory,
    "response_format": {

    "type": "text"

    },
  };
      const response = await axios.post('https://api.mistral.ai/v1/chat/completions', payload, {
          headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
              'Accept': "application/json",
          }
      })
  const data: MistralChatCompletion = response.data
    const result = data.choices[0].message.content
    return result
}
  
