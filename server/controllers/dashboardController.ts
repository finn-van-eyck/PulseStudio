import { Request, Response } from "express";
import { getTodayBookingsCount, getMonthlyBookings, getYearlyRevenue } from "../services/bookings";

export async function dashboard(req: Request, res: Response) {
    const todayCount = await getTodayBookingsCount();
    const monthlyBookings = await getMonthlyBookings();
    const yearlyRevenue = await getYearlyRevenue();

    res.render("dashboard", { todayCount, monthlyBookings, yearlyRevenue });
}