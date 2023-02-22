// Packages
import { Router } from "express";

// Controllers
import { SessionController } from "../controllers/session-controller";

const sessionRouter = Router();

const sessionController = new SessionController();

sessionRouter.post("/session", sessionController.create);

export { sessionRouter };
