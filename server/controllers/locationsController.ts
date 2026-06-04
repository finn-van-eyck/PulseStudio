import { Request, Response } from "express";
import { getAllLocations, getLocationById, createLocation, updateLocation, Location, deleteLocation } from "../services/locations";

export async function locationsList(req: Request, res: Response) {
    const locations: Location[] = await getAllLocations();
    res.render("locations/index", { locations });
}

export async function locationsDetail(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const location = await getLocationById(id);
    res.render("locations/detail", { location });
}

export async function locationsCreate(req: Request, res: Response) {
    res.render("locations/create");
}

export async function locationsStore(req: Request, res: Response) {
    const { name, description, capacity } = req.body;
    await createLocation(name, description, parseInt(capacity));
    res.redirect("/locations");
}

export async function locationsUpdate(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const { name, description, capacity } = req.body;
    await updateLocation(id, name, description, parseInt(capacity));
    res.redirect("/locations");
}

export async function locationsDelete(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    await deleteLocation(id);
    res.redirect("/locations");
}