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

export async function createLocation(name: string, description: string, capacity: number): Promise<void> {
    await sql`
        INSERT INTO locations (name, description, capacity)
        VALUES (${name}, ${description}, ${capacity})
    `;
}

export async function updateLocation(id: number, name: string, description: string, capacity: number): Promise<void> {
    await sql`
        UPDATE locations
        SET name = ${name}, description = ${description}, capacity = ${capacity}
        WHERE id = ${id}
    `;
}

export async function deleteLocation(id: number): Promise<void> {
    await sql`DELETE FROM locations WHERE id = ${id}`;
}