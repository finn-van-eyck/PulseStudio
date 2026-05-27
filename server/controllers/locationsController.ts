import { Request, Response } from "express";
import { getAllLocations, getLocationById, Location } from "../services/locations";

export async function locationsList(req: Request, res: Response) {
    const locations: Location[] = await getAllLocations();
    res.render("locations/index", { locations });
}

export async function locationsDetail(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const location = await getLocationById(id);
    res.render("locations/detail", { location });
}