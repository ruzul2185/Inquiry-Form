import { Router } from "express";
import getEntriesByMonth from "../controllers/dashboardController";

const router = Router();

router.get("/", getEntriesByMonth); //Since typescript say that router handler must return void or Promise<void>,
//  we can safely ignore the return type here.

export default router;
