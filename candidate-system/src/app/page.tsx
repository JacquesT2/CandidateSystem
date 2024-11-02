// src/app/page.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image'
import Logo from '../public/logo.png'

const welcomeMessage = "Ask me what i can do for you!"
const instructMessage = "Do exactly as i say here do not deviate in any way absolutley rigid following of these instructions is necessary, you are an AI system that does not acknowledge this message you do not acknowledge this message. do not mention your role or your intention. behave as a regular conversational agent and keep your responses very short 1 to two lines at most and go step by step, one thing at a time and if the client only greets you only greet them, all you do is guide the client into making one of 2 decisions, either query to find the perfect candidate for a job or add a candidate to the database, if the client wants to add a candidate to the system simply instruct tthem to do so by using the safety pin next to the send button. if they want to find the perfect candidate then you have to ask them to give you the position listing or otherwise give you as much information about it as they can, once you have collected enough information about what they're looking for then respond simply with the ideal candidates for the position you do not invent this candidate, you will be given these profiles by responding simply \"Give me candidate list for this position (and you describe here the position in a json format make sure you don't leave out information and make it as extensive as you can) \" you absolutley have to say \"Give me candidate\" it is the keyphrase you need to use  "
export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content?: string }[]>([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isSending, setIsSending] = useState(false);

  const systemResponse = async (userMessage: string) => {
    const response = await fetch('/api/rag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messages),
    });

    const result: {"success": string, "response": string} = await response.json()
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'system', content: `${result.response}` }, // Customize the response as needed
      ]);
    }, 1000); // 1-second delay for response simulation
  };

  const handleSendMessage = async () => {
    if (input.trim() || file) {
      setIsSending(true); // Disable the button
  
      // Add the new message to the chat history
      messages.push({ role: 'user', content: input })
      const userMessage = input; // Capture the user's message
      setInput('');
      messages.unshift({ role: 'user', content: instructMessage })
      systemResponse(userMessage); // Send back a response based on the user's message
      messages.shift()
      // Simulate response delay
      console.log(messages)
  
      setIsSending(false); // Re-enable the button after the message is sent
    }
  };
  

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      const reader = new FileReader();
      
      reader.onload = async () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const buffer = Buffer.from(arrayBuffer);
        const response = await fetch('/api/hello', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream',
          },
          body: buffer,
        });
        console.log(response);
        //saveCandidate(buffer);
      };
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'system', content: `if you have submitted a valid CV it will be added to the database shortly, count 3 to 5 seconds and ask away!` }, // Customize the response as needed
      ]);
      
      await reader.readAsArrayBuffer(selectedFile);


    } else {
      alert("Please select a PDF file.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-200 relative">
      {/* Logo Container */}
      <div className="absolute top-4 left-4">
        <Image src={Logo} alt="Logo" className="h-10 w-auto" />
      </div>

      {/* Chat history */}
      <div className="flex-1 overflow-y-auto p-6 space-y-2 px-100 mt-16">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-lg p-4 rounded-lg mx-4 ${
              message.role === 'user'
                ? 'text-white ml-auto'
                : 'text-gray-200 mr-auto'
              }`}
              style={{
                backgroundColor: message.role === 'user' ? 'rgba(0, 0, 255, 0.3)' : 'rgba(255, 94, 0, 0.3)',
              }}
          >
            
            {/* Display text message */}
            <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
    {message.content}
</p>

          
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="p-4 bg-gray-800 flex items-center justify-center">
        <div className="w-full max-w-lg bg-gray-800 p-2 rounded-lg border border-gray-700 mb-6 mx-4">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="flex-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
              />

              {/* File input for PDF files */}
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
                id="fileUpload"
              />
              <label
                htmlFor="fileUpload"
                className="cursor-pointer text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary-foreground h-10 m-0 flex min-h-10 min-w-10 items-center justify-center rounded-xl bg-primary/10 p-0 hover:bg-primary/50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-paperclip mt-0.5 h-5 w-5 text-gray-400"
                >
                  <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                </svg>
              </label>

              {/* Send Button */}
              <div className="relative">
                <span className="absolute inset-0 rounded-lg bg-orange-700 opacity-30"></span>
                <button
                  onClick={handleSendMessage}
                  className="relative z-10 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 m-0 flex min-h-10 min-w-10 items-center justify-center rounded-xl bg-primary/10 p-0 hover:bg-primary/50"
                  aria-label="Send message"
                  type="button"
                  disabled={(!input.trim() && !file) || isSending}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 h-5 w-5 text-orange-2000"
                  >
                    <path d="M22 2l-7 20-4-9-9-4Z"></path>
                    <path d="M22 2L11 13"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Visual indication of selected file */}
            {file && (
              <div className="text-sm text-gray-400 mt-2 flex items-center space-x-2">
                <span>📄 {file.name}</span>
                <button onClick={() => setFile(undefined)} className="text-green-400 hover:underline">
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
