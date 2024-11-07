import { config } from "dotenv";

config()

export const NATS_SERVER = process.env.NATS_SERVER;
export const JWT_KEY = process.env.JWT_KEY;
export const DATABASE_URL = process.env.DATABASE_URL;