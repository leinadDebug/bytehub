import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGO_URL;

if (!MONGODB_URL) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
    global.mongoose = cached;
}

export const connect = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            dbName: 'ByteHub',
        };

        cached.promise = mongoose.connect(MONGODB_URL!, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
};






// const MONGODB_URL = process.env.MONGO_URL;
// const connectionState = mongoose.connection.readyState;

// (connectionState === 1) ? console.log('connnected') : console.log('not connected');
// (connectionState === 2) ? console.log('connnecting ...') : console.log('Didnt connect');
// }
// try {
// mongoose.connect(MONGODB_URL!, {
//     dbName: 'ByteHub',
//     bufferCommands: true
// });
// console.log('Connected');
// }
// catch (err: any) {
// console.log('Error:', err);
// throw new Error(err);
// }