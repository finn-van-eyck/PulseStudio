import express, { Application } from "express";
import path from "path";
import expressLayouts from "express-ejs-layouts";

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

app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});