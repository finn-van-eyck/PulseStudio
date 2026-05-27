import express, { Router } from "express";
import { locationsList, locationsDetail, locationsCreate, locationsStore, locationsUpdate } from "../controllers/locationsController";
import { verifyCSRF } from "../middleware/csrf";

const router: Router = express.Router();

router.get("/", locationsList);
router.get("/create", locationsCreate);
router.get("/:id", locationsDetail);
router.post("/", verifyCSRF, locationsStore);
router.post("/:id", verifyCSRF, locationsUpdate);

export default router;