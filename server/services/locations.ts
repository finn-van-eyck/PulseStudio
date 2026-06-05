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
    const result = await sql`
        INSERT INTO locations (name, description, capacity)
        VALUES (${name}, ${description}, ${capacity})
        RETURNING id
    `;
    const locationId = result[0].id;

    for (let i = 1; i <= capacity; i++) {
        await sql`
            INSERT INTO seats (location_id, label)
            VALUES (${locationId}, ${String(i)})
        `;
    }
}

export async function updateLocation(id: number, name: string, description: string, capacity: number): Promise<void> {
    await sql`
        UPDATE locations
        SET name = ${name}, description = ${description}, capacity = ${capacity}
        WHERE id = ${id}
    `;

    await sql`DELETE FROM seats WHERE location_id = ${id}`;
    for (let i = 1; i <= capacity; i++) {
        await sql`
            INSERT INTO seats (location_id, label)
            VALUES (${id}, ${String(i)})
        `;
    }
}

export async function deleteLocation(id: number): Promise<void> {
    await sql`
        DELETE FROM booking_seats
        WHERE booking_id IN (
            SELECT b.id FROM bookings b
            JOIN events e ON b.event_id = e.id
            WHERE e.location_id = ${id}
        )
    `;
    await sql`
        DELETE FROM bookings
        WHERE event_id IN (
            SELECT id FROM events WHERE location_id = ${id}
        )
    `;

    await sql`DELETE FROM events WHERE location_id = ${id}`;
    await sql`DELETE FROM seats WHERE location_id = ${id}`;
    await sql`DELETE FROM locations WHERE id = ${id}`;
}