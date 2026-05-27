import express, { Router } from "express";
import { locationsList, locationsDetail, locationsCreate, locationsStore, locationsUpdate } from "../controllers/locationsController";

const router: Router = express.Router();

router.get("/", locationsList);
router.get("/create", locationsCreate);
router.get("/:id", locationsDetail);
router.post("/", locationsStore);
router.post("/:id", locationsUpdate);

export default router;