// Packages
import { Router } from "express";

// Controllers
import { UserController } from "../controllers/user-controller";

const userController = new UserController();
const userRouter = Router();

userRouter.post("/user", userController.create);

export { userRouter };
