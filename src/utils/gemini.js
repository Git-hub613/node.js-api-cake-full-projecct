import axios from "axios"

const geminiConnect = async (product)=>{

    const geminiUrl = process.env.GEMINI_URL
    const geminiApiKey = process.env.GEMINI_API_KEY

    const data = {
        contents: [
      {
        parts: [
          {
            text: `Generate a compelling product description for the following item.HighLight ites key features benefits,
             and ideal use cases while maintaining an engaging and persuasive 
             tone.Ensure the description is clear, informative and optimized for e-commerce.
            and optimized for e-commerce.
            product name : ${product.name}, product brand :  ${product.brand}, product category :  ${product.category}`
          },
        ],
      },
    ],
    }

    const result  = await axios.post(`${geminiUrl}?key=${geminiApiKey}`,data)
  
    return result.data.candidates[0]?.content.parts[0].text;
    
}

export default geminiConnect;