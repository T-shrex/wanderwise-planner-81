exports.reply = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: "Message is required" });

  res.json({
    reply:
      "Thanks for your question! This is a placeholder response. Swap this endpoint with your AI provider (OpenAI, Gemini, etc.) to get smart travel suggestions.",
  });
};

