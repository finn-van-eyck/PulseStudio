import sql from "./db";

export interface Event {
    id: number;
    title: string;
    date: string;
    location_id: number;
    price: number;
    theme: string;
    image: string;
}

export async function getAllEvents(): Promise<Event[]> {
    const events: Event[] = await sql`
        SELECT e.*, l.name as location_name 
        FROM events e
        JOIN locations l ON e.location_id = l.id
        ORDER BY e.date ASC
    `;
    return events;
}

export async function getEventById(id: number): Promise<Event> {
    const events: Event[] = await sql`
        SELECT e.*, l.name as location_name 
        FROM events e
        JOIN locations l ON e.location_id = l.id
        WHERE e.id = ${id}
    `;
    return events[0];
}