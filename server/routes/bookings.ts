import express, { Router } from "express";
import { bookingsList, bookingsDetail } from "../controllers/bookingsController";

const router: Router = express.Router();

router.get("/", bookingsList);
router.get("/:id", bookingsDetail);

export default router;