import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import eventsRouter from "./routes/events";
import locationsRouter from "./routes/locations";
import bookingsRouter from "./routes/bookings";

const app: Application = express();
const PORT: number = 3000;

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Layouts
app.use(expressLayouts);
app.set("layout", "layouts/main");

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req: Request, res: Response) => {
    res.render("index");
});
app.use("/events", eventsRouter);
app.use("/locations", locationsRouter);
app.use("/bookings", bookingsRouter);

app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});