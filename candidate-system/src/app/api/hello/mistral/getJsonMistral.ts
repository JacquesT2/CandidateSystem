import axios from "axios";
import { MistralChatCompletion } from "../type/mistralResponseType";
import { extractJson } from "../ops/strOps/extractJson";

export async function getJsonMixtrale(cvDescription: string) {
    // Send request
    const apiKey = process.env.API_KEY; // Replace with your actual API key
    const format = jsonFormat;
    const payload = {
      model: "open-mixtral-8x22b",
      "temperature": 0,
    messages: [
      {
        role: "user",
        content: [
            {
                type: "text", text: `Turn this data into a JSON making sure it abides by this format : ${format}",
          here is the data you need to place : ${cvDescription}`},
        ]
      }
    ]
  };
      const response = await axios.post('https://api.mistral.ai/v1/chat/completions', payload, {
          headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
              'Accept': "application/json",
          }
      })
      const data: MistralChatCompletion = response.data
    const result = extractJson(data.choices[0].message.content)
    return result
}
  

const jsonFormat = `{
  "personal_information": {
    "name": "FULL_NAME",
    "job_title": "JOB_TITLE",
    "contact": {
      "phone": "PHONE_NUMBER",
      "email": "EMAIL_ADDRESS",
      "address": "ADDRESS",
      "gitlab": "GITLAB_PROFILE",
      "linkedin": "LINKEDIN_PROFILE"
    }
  },
  "education": [
    {
      "institution": "INSTITUTION_NAME",
      "degree": "DEGREE_NAME",
      "year": "YEAR_OF_GRADUATION"
    }
  ],
  "certifications": [
    "CERTIFICATION_1",
    "CERTIFICATION_2",
    "CERTIFICATION_3"
  ],
  "skills": [
    "SKILL_1",
    "SKILL_2",
    "SKILL_3",
    "SKILL_4"
  ],
  "tools": [
    "TOOL_1",
    "TOOL_2",
    "TOOL_3",
    "TOOL_4",
    "TOOL_5",
    "TOOL_6"
  ],
  "profile": "PROFILE_DESCRIPTION",
  "experience": [
    {
      "role": "ROLE_1",
      "company": "COMPANY_1",
      "duration": {
        "start": "START_DATE_1",
        "end": "END_DATE_1"
      },
      "responsibilities": [
        "RESPONSIBILITY_1_1",
        "RESPONSIBILITY_1_2",
        "RESPONSIBILITY_1_3"
      ]
    },
    {
      "role": "ROLE_2",
      "company": "COMPANY_2",
      "duration": {
        "start": "START_DATE_2",
        "end": "END_DATE_2"
      },
      "responsibilities": [
        "RESPONSIBILITY_2_1",
        "RESPONSIBILITY_2_2",
        "RESPONSIBILITY_2_3",
        "RESPONSIBILITY_2_4",
        "RESPONSIBILITY_2_5"
      ]
    }
  ],
  "technical_environment": [
    "TECHNOLOGY_1",
    "TECHNOLOGY_2",
    "TECHNOLOGY_3",
    "TECHNOLOGY_4"
  ],
  "languages": [
    {
      "language": "LANGUAGE_1",
      "proficiency": "PROFICIENCY_LEVEL_1"
    },
    {
      "language": "LANGUAGE_2",
      "proficiency": "PROFICIENCY_LEVEL_2"
    }
  ],
  "projects": [
    {
      "name": "PROJECT_NAME_1",
      "description": "PROJECT_DESCRIPTION_1",
      "technologies": ["TECHNOLOGY_1", "TECHNOLOGY_2", "TECHNOLOGY_3"]
    }
  ],
  "hobbies": [
    "HOBBY_1",
    "HOBBY_2",
    "HOBBY_3"
  ],
  "references": [
    {
      "name": "REFERENCE_NAME_1",
      "position": "REFERENCE_POSITION_1",
      "contact": "REFERENCE_CONTACT_1"
    }
  ],
  "additional_information": {
    "availability": "AVAILABILITY",
    "preferred_work_environment": "PREFERRED_WORK_ENVIRONMENT",
    "visa_status": "VISA_STATUS"
  }
}`