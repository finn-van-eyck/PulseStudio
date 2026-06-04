import express, { Router } from "express";
import { eventsList, eventsDetail, eventsCreate, eventsStore, eventsUpdate, upload, eventsDelete } from "../controllers/eventsController";
import { verifyCSRF } from "../middleware/csrf";

const router: Router = express.Router();

router.get("/", eventsList);
router.get("/create", eventsCreate);
router.get("/:id", eventsDetail);
router.post("/", verifyCSRF, upload.single("image"), eventsStore);
router.post("/:id", verifyCSRF, upload.single("image"), eventsUpdate);
router.post("/:id/delete", verifyCSRF, eventsDelete);

export default router;