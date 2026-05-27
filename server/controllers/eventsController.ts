import { Request, Response } from "express";
import { getAllEvents, getEventById, Event } from "../services/events";

export async function eventsList(req: Request, res: Response) {
    const events: Event[] = await getAllEvents();
    res.render("events/index", { events });
}

export async function eventsDetail(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const event = await getEventById(id);
    res.render("events/detail", { event });
}