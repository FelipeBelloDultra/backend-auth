// Packages
import { Router } from "express";

// Controllers
import { UserController } from "../controllers/user-controller";

// Middlewares
import { ValidateRequest } from "@/shared/infra/http/middlewares/validate-request";
import { EnsureAuthenticated } from "@/shared/infra/http/middlewares/ensure-authenticated";

// Validators
import {
  createUserValidatorSchema,
  updateUserValidatorSchema,
} from "@/modules/users/validators";

const userRouter = Router();

const userController = new UserController();
const validateRequest = new ValidateRequest();
const ensureAuthenticated = new EnsureAuthenticated();

userRouter.post(
  "/user",
  validateRequest.validate(createUserValidatorSchema),
  userController.create
);

userRouter.put(
  "/user",
  ensureAuthenticated.verify,
  validateRequest.validate(updateUserValidatorSchema),
  userController.update
);

export { userRouter };
