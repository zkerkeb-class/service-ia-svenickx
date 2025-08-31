import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import MessageController from "./controller/message.controller";
import ModerationController from "./controller/moderation.controller";
import MessageRoutes from "./routes/message.routes";
import ModerationRouter from "./routes/moderation.routes";
import OpenAiService from "./services/openapi.service";

dotenv.config({ path: __dirname + "/../../.env" });

const app: Express = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const openAiService = new OpenAiService();

const moderationController = new ModerationController(openAiService);
const messageController = new MessageController(openAiService);

const moderationRoutes = new ModerationRouter(moderationController);
const messageRoutes = new MessageRoutes(messageController);

app.use("/moderate", moderationRoutes.router);
app.use("/message", messageRoutes.router);

const port = process.env.IA_SERVICE_PORT || 2004;
app.listen(port, () => {
  console.log(`[server]: IA is running at http://localhost:${port}`);
});
