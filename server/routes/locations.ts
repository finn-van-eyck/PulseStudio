import express, { Router } from "express";
import { locationsList, locationsDetail } from "../controllers/locationsController";

const router: Router = express.Router();

router.get("/", locationsList);
router.get("/:id", locationsDetail);

export default router;