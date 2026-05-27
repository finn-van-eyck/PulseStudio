import sql from "./db";

export interface Booking {
    id: number;
    event_id: number;
    event_title: string;
    customer_name: string;
    customer_email: string;
    total_price: number;
    payment_method: string;
    created_at: string;
}

export async function getAllBookings(): Promise<Booking[]> {
    const bookings: Booking[] = await sql`
        SELECT b.*, e.title as event_title
        FROM bookings b
        JOIN events e ON b.event_id = e.id
        ORDER BY b.created_at DESC
    `;
    return bookings;
}

export async function getBookingById(id: number): Promise<Booking> {
    const bookings: Booking[] = await sql`
        SELECT b.*, e.title as event_title
        FROM bookings b
        JOIN events e ON b.event_id = e.id
        WHERE b.id = ${id}
    `;
    return bookings[0];
}

export async function getBookingSeats(booking_id: number): Promise<any[]> {
    const seats = await sql`
        SELECT s.label
        FROM booking_seats bs
        JOIN seats s ON bs.seat_id = s.id
        WHERE bs.booking_id = ${booking_id}
    `;
    return seats;
}