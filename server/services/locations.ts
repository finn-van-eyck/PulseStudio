import sql from "./db";

export interface Location {
    id: number;
    name: string;
    description: string;
    image: string;
    capacity: number;
}

export async function getAllLocations(): Promise<Location[]> {
    const locations: Location[] = await sql`
        SELECT * FROM locations
        ORDER BY name ASC
    `;
    return locations;
}

export async function getLocationById(id: number): Promise<Location> {
    const locations: Location[] = await sql`
        SELECT * FROM locations
        WHERE id = ${id}
    `;
    return locations[0];
}