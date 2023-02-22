// Packages
import { Router } from "express";

// Routes
import { userRouter, sessionRouter } from "@/modules/users/infra/http/routes";

const apiRouter = Router();

apiRouter.use(userRouter);
apiRouter.use(sessionRouter);

export { apiRouter };
