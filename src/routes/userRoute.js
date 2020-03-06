import { Router } from "express";
import { jwtProtect } from "../middlewares/jwtAuthMiddleware";
import { getAllUsers } from "../controllers/userController";

const router = Router();

router.get("/", jwtProtect, getAllUsers);

export default router;
