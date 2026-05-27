import express, { Router } from "express";
import { eventsList, eventsDetail, eventsCreate, eventsStore, eventsUpdate } from "../controllers/eventsController";
import { verifyCSRF } from "../middleware/csrf";

const router: Router = express.Router();

router.get("/", eventsList);
router.get("/create", eventsCreate);
router.get("/:id", eventsDetail);
router.post("/", verifyCSRF, eventsStore);
router.post("/:id", verifyCSRF, eventsUpdate);

export default router;