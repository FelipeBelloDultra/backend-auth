// Packages
import { Router } from "express";

// Controllers
import { SessionController } from "../controllers/session-controller";

// Middlewares
import { ValidateRequest } from "@/shared/infra/http/middlewares/validate-request";
import { EnsureAuthenticated } from "@/shared/infra/http/middlewares/ensure-authenticated";

// Validators
import { authenticateUserValidatorSchema } from "@/modules/users/validators";

const sessionRouter = Router();

const sessionController = new SessionController();
const validateRequest = new ValidateRequest();
const ensureAuthenticated = new EnsureAuthenticated();

sessionRouter.post(
  "/session",
  validateRequest.validate(authenticateUserValidatorSchema),
  sessionController.create
);

sessionRouter.post(
  "/session/me",
  ensureAuthenticated.verify,
  sessionController.index
);

export { sessionRouter };
