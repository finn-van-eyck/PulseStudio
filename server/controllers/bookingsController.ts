import { Request, Response } from "express";
import { getAllBookings, getBookingById, getBookingSeats, Booking, deleteBooking } from "../services/bookings";

export async function bookingsList(req: Request, res: Response) {
    const bookings: Booking[] = await getAllBookings();
    res.render("bookings/index", { bookings });
}

export async function bookingsDetail(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const booking = await getBookingById(id);
    const seats = await getBookingSeats(id);
    res.render("bookings/detail", { booking, seats });
}

export async function bookingsDelete(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    await deleteBooking(id);
    res.redirect("/bookings");
}