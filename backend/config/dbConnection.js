import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const connectDatabase = async () => {
    let DB_URI = "";

    if (process.env.NODE_ENV === "DEVELOPMENT") {
        DB_URI = process.env.DB_LOCAL_URI;
    }

    if (process.env.NODE_ENV === "PRODUCTION") {
        DB_URI = process.env.DB_URI;
    }

    console.log("DB URI:", DB_URI); // ✅ Now it's placed after initialization

    try {
        const client = new MongoClient(DB_URI);
        await client.connect();

        const dbName = new URL(DB_URI).pathname.slice(1); // extract DB name
        const admin = client.db().admin();

        const dbs = await admin.listDatabases();
        const dbExists = dbs.databases.some(db => db.name === dbName);

        if (!dbExists) {
            console.log(`🆕 Database "${dbName}" does not exist. It will be created on first write.`);
        } else {
            console.log(`✅ Database "${dbName}" already exists.`);
        }

        await client.close();

        // Now connect using Mongoose
        const con = await mongoose.connect(DB_URI);
        console.log(`✅ Mongoose connected to MongoDB host: ${con.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDatabase;
