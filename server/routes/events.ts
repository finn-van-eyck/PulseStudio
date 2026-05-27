import express, { Router } from "express";
import { eventsList, eventsDetail } from "../controllers/eventsController";

const router: Router = express.Router();

router.get("/", eventsList);
router.get("/:id", eventsDetail);

export default router;