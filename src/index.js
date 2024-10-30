import e from "express";
import "dotenv/config";
import "./db.js";
import vehicle_route from "./routes/vehicle_route.js";
import maintenance_route from "./routes/maintenance_route.js";
import workshop_route from "./routes/workshop_route.js";

const app = e();

app.use(e.json());

app.use("/vehicle", vehicle_route);
app.use("/maintenance", maintenance_route);
app.use("/workshop", workshop_route);

app.listen(process.env.API_PORT, () => console.log("Servidor rodando"));
