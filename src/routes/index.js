import { Router } from "express";
import authRouter from "./authRoute";
import userRoute from "./userRoute";

const apiRouter = Router();

apiRouter.use("/api/v1/auth", authRouter);
apiRouter.use("/api/v1/user", userRoute);

export default apiRouter;
