// Packages
import { Router } from "express";

// Controllers
import { SessionController } from "../controllers/session-controller";

// Middlewares
import { ValidateRequest } from "@/shared/infra/http/middlewares/validate-request";

// Validators
import { authenticateUserValidatorSchema } from "@/modules/users/validators";

const sessionRouter = Router();

const sessionController = new SessionController();
const validateRequest = new ValidateRequest();

sessionRouter.post(
  "/session",
  validateRequest.validate(authenticateUserValidatorSchema),
  sessionController.create
);

export { sessionRouter };
