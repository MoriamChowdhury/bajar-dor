import dns from "node:dns";
import { MongoClient } from "mongodb";

// কিছু ISP SRV lookup আটকে দেয়, তাই local-এ Google/Cloudflare DNS ব্যবহার করছি
if (process.env.NODE_ENV !== "production") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

const uri = process.env.BETTER_AUTH_DB_URL ?? process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MongoDB connection string পাওয়া যায়নি (.env.local চেক করুন)");
}

const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };

export const client = globalForMongo._mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClient = client;
}

export const db = client.db();