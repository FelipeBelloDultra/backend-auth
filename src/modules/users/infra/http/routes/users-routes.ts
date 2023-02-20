// Packages
import { Router } from "express";

// Controllers
import { UserController } from "../controllers/user-controller";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/user", (req, res) => userController.create(req, res));

export { userRouter };
