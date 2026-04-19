// controller
const axios = require("axios")

exports.getResponse = async (req, res) => {
    const { question } = req.body;



    // Here is data:
    // ${JSON.stringify(products)}

    // 2. Create prompt
    const prompt = `
    You are a dashboard assistant.
    Question: ${question}
    Answer clearly:
    `;

    // 3. Call Ollama
    const response = await axios.post("http://localhost:11434/api/generate", {
        method: "POST",
        model: "mistral",
        prompt: prompt,
        stream: false
    });

    res.json({ answer: response.data.response });
}