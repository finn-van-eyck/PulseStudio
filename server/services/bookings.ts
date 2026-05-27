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
export async function getTodayBookingsCount(): Promise<number> {
    const result: any[] = await sql`
        SELECT COUNT(*) as total
        FROM bookings
        WHERE DATE(created_at) = CURRENT_DATE
    `;
    return parseInt(result[0].total);
}

export async function getMonthlyBookings(): Promise<any[]> {
    const result: any[] = await sql`
        SELECT 
            TO_CHAR(created_at, 'Month') as month,
            COUNT(*) as total
        FROM bookings
        GROUP BY TO_CHAR(created_at, 'Month'), EXTRACT(MONTH FROM created_at)
        ORDER BY EXTRACT(MONTH FROM created_at) ASC
    `;
    return result;
}

export async function getYearlyRevenue(): Promise<number> {
    const result: any[] = await sql`
        SELECT COALESCE(SUM(total_price), 0) as total
        FROM bookings
        WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
    `;
    return parseFloat(result[0].total);
}