import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import express from "express";
import allRoutes from "./routes/index";
import globalMiddleware from "./middleware/globalMiddleware/globalMiddleware";
import notFound from "./middleware/notFound";
import errHandler from "./middleware/errHandler";

const app = express();

app.use(globalMiddleware);
app.use(allRoutes);
app.use(notFound);
app.use(errHandler);

export default app;
