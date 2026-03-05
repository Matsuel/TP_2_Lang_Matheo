import { Router } from "express";
import { defaultController } from "../controllers/defaultsController";

const defaultRouter = Router();

defaultRouter.get('/', defaultController);

export default defaultRouter;