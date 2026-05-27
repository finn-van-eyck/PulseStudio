import { Request, Response } from "express";
import { getAllEvents, getEventById, createEvent, updateEvent, Event } from "../services/events";
import { getAllLocations } from "../services/locations";
import { getSeatsByEvent } from "../services/seats";
import { upload, uploadToCloudinary } from "../services/upload";

export async function eventsList(req: Request, res: Response) {
    const events: Event[] = await getAllEvents();
    res.render("events/index", { events });
}

export async function eventsDetail(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const event = await getEventById(id);
    const locations = await getAllLocations();
    const seats = await getSeatsByEvent(id);
    res.render("events/detail", { event, locations, seats });
}

export async function eventsCreate(req: Request, res: Response) {
    const locations = await getAllLocations();
    res.render("events/create", { locations });
}

export async function eventsStore(req: Request, res: Response) {
    const { title, date, location_id, price, theme } = req.body;
    let image = "";
    if (req.file) {
        image = await uploadToCloudinary(req.file.buffer, `event_${Date.now()}`);
    }
    await createEvent(title, date, parseInt(location_id), parseFloat(price), theme, image);
    res.redirect("/events");
}

export async function eventsUpdate(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const { title, date, location_id, price, theme } = req.body;
    const event = await getEventById(id);
    let image = event.image;
    if (req.file) {
        image = await uploadToCloudinary(req.file.buffer, `event_${Date.now()}`);
    }
    await updateEvent(id, title, date, parseInt(location_id), parseFloat(price), theme, image);
    res.redirect("/events");
}

export { upload };