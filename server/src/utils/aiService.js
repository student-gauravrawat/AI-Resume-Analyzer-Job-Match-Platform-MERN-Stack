import {GoogleGenAI} from "@google/genai";

const genAI = new GoogleGenAI({
   apiKey: process.env.GEMINI_API_KEY
})

export const generateSuggestions = async({ role, missingSkills, score, resumeText }) => {

    try {
  
      const prompt = `
         You are an ATS resume expert.
  
         Job Role: ${role}
         Resume Score: ${score}%
  
         Missing Skills: ${missingSkills.join(", ")}
  
         Resume Text: ${resumeText}
  
         Give: 
         1. Skills improvement suggestion
         2. Resume improvement tips
         3. A short professional summary
      `;
  
     const response =  await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
     })

    //  console.log(response)
     return response.text;

    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }

}