# Candidate RAG Application

Welcome to the Candidate RAG Application! This project provides an intuitive interface to find the ideal job candidates through a conversational AI powered by Mistral. 

## 🚀 Getting Started

### Prerequisites
- Ensure you have **Node.js** and **npm** installed.
- Set up your **Mistral API key** for authentication.

### Running the Project

1. **Start the Application**
   - Open a terminal at the root of the project.
   - Run the command:
     ```bash
     npm run msitral
     ```
   - This will build and launch the application.

2. **Accessing the Application**
   - Once you see the message `Ready in xxxms` in the terminal, open a browser and go to [localhost:3000](http://localhost:3000).
   - If `localhost:3000` doesn’t work, check the terminal output. Look just above the `Ready` message; under the Next.js version, you’ll find the correct URL. Copy and paste this URL into your browser.

3. **Setting Up the API Key**
   - When the page loads, hover over the **orange key icon** at the top right corner. An input bar will appear.
   - Enter your **Mistral API key** to activate the application.

---

## 💼 Using the Application

This project is a conversational **Retrieval-Augmented Generation (RAG)** system that enables you to search for job candidates based on specific job listings.

### Adding Candidates to the Database

- To add candidates, click the **safety pin icon** next to the send button and upload CVs one at a time in PDF format.
- Uploaded documents are processed as follows:
  - They are converted to images and scanned by Pixtrale.
  - The raw data is transformed into JSON format by Mixtrale.
  - Finally, the JSON data is stored in a MongoDB database.

### Finding Candidates

1. **Start a Conversation**: Use the chatbot to initiate a candidate search.
2. **Provide Job Listing Details**: When prompted, describe the position requirements and other key information about the listing.
3. **Retrieve Matching Candidates**: The system will perform a similarity search within the database and return the top 3 matching candidates.
4. **Get In-Depth Information**: Mistral’s `mistral-large-2` model will then provide a curated summary of each candidate. You can ask specific questions about the candidates’ CVs, such as hobbies, job experiences, and other relevant information.

---

## 🛠️ Technical Details

- **Frontend**: Built with **Next.js** for a responsive, interactive experience.
- **Backend**: Uses **MongoDB** to store candidate data in JSON format.
- **AI Integration**: Mistral’s model powers the conversational responses, while **Pixtrale** and **Mixtrale** handle document processing and data transformation.

---

Thank you for exploring this project! Feel free to contribute or provide feedback to enhance the application.
