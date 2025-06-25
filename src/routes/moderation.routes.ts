import { Router } from "express";
import ModerationController from "../controller/moderation.controller";

export default class ModerationRouter {
  router: Router;

  constructor(private readonly moderationController: ModerationController) {
    this.router = Router();
    this.createRoutes();
  }

  private createRoutes() {
    this.router.post("/", this.moderationController.moderate);
  }
}
