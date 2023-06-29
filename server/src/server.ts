import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import mongoose from "mongoose";
import app from "./app";
import getEnvVar from "./utils/getEnvVar";
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, async () => {
  console.log(`listening on port ${PORT}`);
  const mongoUrl = getEnvVar("MONGO_URL");
  await mongoose.connect(mongoUrl, { dbName: "notes-app" });
  console.log("DB connected");
});
