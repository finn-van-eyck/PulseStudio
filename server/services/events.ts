import sql from "./db";

export interface Event {
    id: number;
    title: string;
    date: string;
    location_id: number;
    location_name: string;
    price: number;
    theme: string;
    image: string;
}

export async function getAllEvents(): Promise<Event[]> {
    const events: Event[] = await sql`
        SELECT e.*, l.name as location_name,
        l.capacity - COUNT(DISTINCT bs.seat_id) as available_seats
        FROM events e
        JOIN locations l ON e.location_id = l.id
        LEFT JOIN bookings b ON b.event_id = e.id
        LEFT JOIN booking_seats bs ON bs.booking_id = b.id
        GROUP BY e.id, l.name, l.capacity
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

export async function createEvent(title: string, date: string, location_id: number, price: number, theme: string, image: string): Promise<void> {
    await sql`
        INSERT INTO events (title, date, location_id, price, theme, image)
        VALUES (${title}, ${date}, ${location_id}, ${price}, ${theme}, ${image})
    `;
}

export async function updateEvent(id: number, title: string, date: string, location_id: number, price: number, theme: string, image: string): Promise<void> {
    await sql`
        UPDATE events
        SET title = ${title}, date = ${date}, location_id = ${location_id}, price = ${price}, theme = ${theme}, image = ${image}
        WHERE id = ${id}
    `;
}

export async function deleteEvent(id: number): Promise<void> {
    await sql`DELETE FROM bookings WHERE event_id = ${id}`;
    await sql`DELETE FROM events WHERE id = ${id}`;
}