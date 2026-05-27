import express, { Router } from "express";
import { eventsList, eventsDetail, eventsCreate, eventsStore, eventsUpdate } from "../controllers/eventsController";

const router: Router = express.Router();

router.get("/", eventsList);
router.get("/create", eventsCreate);
router.get("/:id", eventsDetail);
router.post("/", eventsStore);
router.post("/:id", eventsUpdate);

export default router;