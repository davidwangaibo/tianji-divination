import { GoogleGenerativeAI } from "@google/generative-ai";

const testApi = async () => {
    try {
        const apiKey = "AIzaSyBcj_3n2XzjIvPvMGQnEpHQq2gzVnh2wF0";
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        console.log("Testing API connection...");
        const result = await model.generateContent("Hi");
        const response = await result.response;
        const text = response.text();

        console.log("SUCCESS! API Response:", text);
        process.exit(0);
    } catch (error) {
        console.log("FAILED!");
        console.log("Error name:", error.name);
        console.log("Error message:", error.message);
        console.log("Error stack:", error.stack);
        if (error.response) {
            console.log("Response data:", JSON.stringify(error.response, null, 2));
        }
        process.exit(1);
    }
};

testApi();
