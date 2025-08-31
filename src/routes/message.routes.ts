import { Router } from "express";
import MessageController from "../controller/message.controller";

export default class MessageRoutes {
  router: Router;
  constructor(private readonly messageController: MessageController) {
    this.router = Router();
    this.createRoutes();
  }

  private createRoutes() {
    this.router.post("/preview", this.messageController.preview);
  }
}
