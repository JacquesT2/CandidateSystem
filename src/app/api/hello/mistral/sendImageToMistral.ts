import axios from "axios";
import  pdf2pic from "pdf2pic";
import { MistralChatCompletion } from "../type/mistralResponseType";

export async function sendPixtraleCV(pdfBuffer: Buffer, apiKey: string) {
    const pdfToImage = pdf2pic.fromBuffer(pdfBuffer,{
      density: 100,         // DPI for better clarity
      format: "jpeg",       // Output format
      width: 800,           // Image width
      height: 1000,         // Image height
    });

    // Convert only the first page of the PDF to an image
    const imageData = await pdfToImage(1, {responseType: "base64"});
    // Send arequest
    const payload = {
      model: "pixtral-12b-2409",
      "temperature": 0,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "your role is to extract data from an image that contains a cv you need to maximize the amount of data collected you need to leave nothing out and abbreviate absolutley nothing:" },
          { type: "image_url", image_url: `data:image/jpeg;base64,${imageData.base64}` }
        ]
      }
    ]
  };
      const response = await axios.post('https://api.mistral.ai/v1/chat/completions', payload, {
          headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
          }
      })
      const data: MistralChatCompletion = response.data
    return data.choices[0].message.content
  }