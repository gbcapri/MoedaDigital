import e from "express";
import "dotenv/config";
import "./config/db.js";
import transation_route from "./routes/transation_route.js";
import user_route from "./routes/user_route.js";
import wallet_route from "./routes/wallet_route.js";

const app = e();

app.use(e.json());

app.use("/transation", transation_route);
app.use("/user", user_route);
app.use("/wallet", wallet_route);

app.listen(process.env.API_PORT, () => console.log("Servidor rodando"));
