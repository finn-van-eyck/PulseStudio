import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import cookieParser from "cookie-parser";
import Tokens from "csrf";
import eventsRouter from "./routes/events";
import locationsRouter from "./routes/locations";
import bookingsRouter from "./routes/bookings";
import apiRouter from "./routes/api";
import { dashboard } from "./controllers/dashboardController";

const app: Application = express();
const PORT: number = 3000;
const tokens = new Tokens();
const secret = process.env.CSRF_SECRET || "fallback_geheim";

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Template engine
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "server", "views"));

// Layouts
app.use(expressLayouts);
app.set("layout", "layouts/main");

// Static files
app.use(express.static(path.join(process.cwd(), "server", "public")));

// CSRF middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.csrfToken = tokens.create(secret);
    next();
});

// Routes
app.get("/", dashboard);
app.use("/events", eventsRouter);
app.use("/locations", locationsRouter);
app.use("/bookings", bookingsRouter);
app.use("/api", apiRouter);

app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});