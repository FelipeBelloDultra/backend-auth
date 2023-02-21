// Packages
import { Router } from "express";

// Controllers
import { UserController } from "../controllers/user-controller";

// Middlewares
import { ValidateRequest } from "@/shared/infra/http/middlewares/validate-request";

// Validators
import { createUserValidatorSchema } from "@/modules/users/validators";

const userRouter = Router();

const userController = new UserController();
const validateRequest = new ValidateRequest();

userRouter.post(
  "/user",
  validateRequest.validate(createUserValidatorSchema),
  userController.create
);

export { userRouter };
