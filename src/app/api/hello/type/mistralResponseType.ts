export interface MistralChatCompletion {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Choice[];
    usage: Usage;
  }
  
  interface Choice {
    index: number;
    message: ChatMessage;  
    finish_reason: string;
  }
  
  interface Usage {
    prompt_tokens: number;
    total_tokens: number;
    completion_tokens: number;
  }
  
  interface ChatMessage {
    role: string;
    content: string;
    tool_calls: null | any;  // Adjust the type based on actual tool_calls structure if available
  }