import express, { Router } from "express";
import { bookingsList, bookingsDetail, bookingsDelete } from "../controllers/bookingsController";
import { verifyCSRF } from "../middleware/csrf";

const router: Router = express.Router();

router.get("/", bookingsList);
router.get("/:id", bookingsDetail);
router.post("/:id/delete", verifyCSRF, bookingsDelete);

export default router;