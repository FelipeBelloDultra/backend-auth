// Packages
import { Router } from "express";

// Controllers
import { UserController } from "../controllers/user-controller";

// Middlewares
import { validateRequest } from "@/shared/infra/http/middlewares/validate-request";

// Validators
import { createUserValidatorSchema } from "@/modules/users/validators";

const userRouter = Router();
const userController = new UserController();

userRouter.post(
  "/user",
  validateRequest(createUserValidatorSchema),
  userController.create
);

export { userRouter };
