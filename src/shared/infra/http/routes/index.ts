// Packages
import { Router } from "express";

// Routes
import { userRouter } from "@/modules/users/infra/http/routes/users-routes";

const apiRouter = Router();

apiRouter.use(userRouter);

export { apiRouter };
