import sql from "./db";

export interface Seat {
    id: number;
    label: string;
    is_booked: boolean;
}

export async function getSeatsByEvent(event_id: number): Promise<Seat[]> {
    const seats: Seat[] = await sql`
        SELECT DISTINCT ON (s.id)
            s.id,
            s.label,
            CASE 
                WHEN bs.seat_id IS NOT NULL THEN true 
                ELSE false 
            END as is_booked
        FROM seats s
        JOIN events e ON s.location_id = e.location_id
        LEFT JOIN booking_seats bs ON bs.seat_id = s.id
            AND bs.booking_id IN (
                SELECT id FROM bookings WHERE event_id = ${event_id}
            )
        WHERE e.id = ${event_id}
        ORDER BY s.id ASC
    `;
    return seats;
}