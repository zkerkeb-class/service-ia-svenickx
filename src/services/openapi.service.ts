import OpenAI from "openai";

export default class OpenAiService {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}
