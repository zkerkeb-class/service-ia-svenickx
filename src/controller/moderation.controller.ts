import OpenAiService from "../services/openapi.service";

export default class ModerationController {
  constructor(private readonly openAiService: OpenAiService) {}

  moderate = async (req: any, res: any) => {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: "Text is required" });

    try {
      // OpenAI moderation API
      const result = await this.openAiService.openai.moderations.create({
        input: content,
      });
      const moderation = result.results[0];

      const flagged = moderation?.flagged;
      const categories = Object.entries(moderation?.categories!)
        .filter(([_, val]) => val)
        .map(([key]) => key);

      return res.json({
        flagged,
        reason: flagged ? categories.join(", ") : null,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
