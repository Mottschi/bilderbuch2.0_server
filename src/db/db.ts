import mongoose from "mongoose";

type DatabaseConnectorType = {
    connect: () => void,
    close: () => void,
}

const db: DatabaseConnectorType = {
    connect: () => {
        const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/FIXYOURDOTENV";

        mongoose.connect(MONGO_URI)
            .then((x) => {
                const dbName = x.connection.name;
                console.log(`[MONGO] Connected to Mongo! Database name: "${dbName}"`);
            })
            .catch((error: Error) => {
                console.error("[MONGO] Error connecting to database: ", error);
        });
    },
    close: () => {
        mongoose.connection.close()
            .then(()=>{
                console.log("[MONGO] Database connection closed!");
            })
            .catch((error: Error) => {
                console.error("[MONGO] Error closing database connection: ", error);
        });
    }
};

export default db;