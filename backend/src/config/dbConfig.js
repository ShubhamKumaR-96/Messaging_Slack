import mongoose from "mongoose";

import { DEV_DB_URL, NODE_ENV, PROD_DB_URL } from "./serverConfig.js";

export const connectDB = async () => {
  try {
    const dbUrl = NODE_ENV === "development" ? DEV_DB_URL : PROD_DB_URL;
    await mongoose.connect(dbUrl);
    console.log(`✅ Connected to MongoDB [${NODE_ENV}]`);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
  }
};
