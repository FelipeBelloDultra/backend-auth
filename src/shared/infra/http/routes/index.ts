// Packages
import { Router } from "express";

// Routes
import { userRouter } from "@/modules/users/infra/http/routes";

const apiRouter = Router();

apiRouter.use(userRouter);

export { apiRouter };
