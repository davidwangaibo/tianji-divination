import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyBcj_3n2XzjIvPvMGQnEpHQq2gzVnh2wF0"; // Using the key from your source
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        // Note: listModels might not be directly available on the genAI instance in some SDK versions,
        // but usually it is on the ModelManager or similar. 
        // However, the google-generative-ai Node SDK doesn't expose listModels directly on the client in all versions.
        // We can try to rely on a known model to see if it works, or use the REST API if SDK fails.

        // Attempting to generate with a fallback to see if we can get a clearer error or success.
        const modelName = "gemini-1.5-flash";
        console.log(`Checking ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Test");
        console.log(`${modelName} is WORKING.`);
    } catch (error) {
        console.log("SDK Check Failed:", error.message);
    }
}

// Since the SDK might not output the list easily, let's use fetch for the REST API to list models.
// Endpoint: https://generativelanguage.googleapis.com/v1beta/models?key=API_KEY
async function listModelsRest() {
    console.log("Listing models via REST API...");
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${m.name}`);
                }
            });
        } else {
            console.log("No models found or error:", data);
        }
    } catch (e) {
        console.error("REST request failed:", e);
    }
}

listModelsRest();
