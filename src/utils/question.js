import axios from "axios"

const qustions = async (data)=>{

    const geminiUrl = process.env.GEMINI_URL
    const geminiApiKey = process.env.GEMINI_API_KEY

    const input = {
        contents: [
      {
        parts: [
          {
            text: `${data}`
          },
        ],
      },
    ],
    }

    const result  = await axios.post(`${geminiUrl}?key=${geminiApiKey}`,input)
  
    return result.data.candidates[0]?.content.parts[0].text;
    
}

export default qustions;