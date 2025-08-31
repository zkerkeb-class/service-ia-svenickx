import { Request, Response } from "express";
import OpenAiService from "../services/openapi.service";

export default class MessageController {
  constructor(private readonly openAiService: OpenAiService) {}

  preview = async (req: Request, res: Response) => {
    const { messages } = req.body;
    if (!messages) {
      res.status(200).json({ data: "" });
      return;
    }
    const response = await this.openAiService.openai.responses.create({
      model: "gpt-4o",
      input: [
        {
          role: "developer",
          content:
            "I will give you the lastest messages of a conversation, from the lastest to the newest. You will give me an answer that is the most relevant to the conversation. Act like a normal human being",
        },
        {
          role: "user",
          content: messages.map((message: any) => message.content).join("\n"),
        },
      ],
    });
    console.log("🚀 ~ MessageController ~ preview= ~ response:", response);

    res.status(200).json(response.output_text);
    return;
  };
}
