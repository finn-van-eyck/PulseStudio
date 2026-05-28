import express, { Router, Request, Response } from "express";
import { getAllLocations } from "../services/locations";
import { getAllEvents } from "../services/events";
import { getSeatsByEvent } from "../services/seats";
import sql from "../services/db";

const router: Router = express.Router();

// GET /api/locaties
router.get("/locaties", async (req: Request, res: Response) => {
    const locations = await getAllLocations();
    res.json(locations);
});

// GET /api/events
router.get("/events", async (req: Request, res: Response) => {
    const events = await getAllEvents();
    res.json(events);
});

// GET /api/seats/:eventId
router.get("/seats/:eventId", async (req: Request, res: Response) => {
    const eventId = parseInt(req.params.eventId as string);
    const seats = await getSeatsByEvent(eventId);
    res.json(seats);
});

// POST /api/book
router.post("/book", async (req: Request, res: Response) => {
    const { event_id, customer_name, customer_email, total_price, payment_method, seats } = req.body;

    const booking: any[] = await sql`
        INSERT INTO bookings (event_id, customer_name, customer_email, total_price, payment_method)
        VALUES (${event_id}, ${customer_name}, ${customer_email}, ${total_price}, ${payment_method})
        RETURNING id
    `;

    const booking_id = booking[0].id;

    for (const seat_id of seats) {
        await sql`
            INSERT INTO booking_seats (booking_id, seat_id)
            VALUES (${booking_id}, ${seat_id})
        `;
    }

    res.json({ success: true, booking_id });
});

export default router;