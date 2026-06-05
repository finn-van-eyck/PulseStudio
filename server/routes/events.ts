import express, { Router } from "express";
import { eventsList, eventsDetail, eventsCreate, eventsStore, eventsUpdate, upload, eventsDelete } from "../controllers/eventsController";
import { verifyCSRF } from "../middleware/csrf";

const router: Router = express.Router();

router.get("/", eventsList);
router.get("/create", eventsCreate);
router.post("/", upload.single("image"), verifyCSRF, eventsStore);
router.post("/:id/delete", verifyCSRF, eventsDelete);        
router.post("/:id", upload.single("image"), verifyCSRF, eventsUpdate);
router.get("/:id", eventsDetail);

export default router;