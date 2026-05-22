const express = require("express");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static("."));

app.post("/api/chat", async (req, res) => {
  try {
    console.log("Request received:", req.body.messages);

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.GROQ_API_KEY
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: req.body.messages
      })
    });

    const data = await response.json();
    console.log("Groq response:", JSON.stringify(data));
    res.json({ reply: data.choices[0].message.content });

  } catch (error) {
    console.error("Error:", error.message);
    res.json({ reply: "Error connecting AI" });
  }
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});