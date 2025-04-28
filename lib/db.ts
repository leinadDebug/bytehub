import mongoose from "mongoose";


const MONGODB_URL = process.env.MONGO_URL;

export const connect = async () => {
    const connectionState = mongoose.connection.readyState;

    (connectionState === 1) ? console.log('connnected') : console.log('not connected');
    (connectionState === 2) ? console.log('connnecting ...') : console.log('Didnt connect');
}
try {
    mongoose.connect(MONGODB_URL!, {
        dbName: 'ByteHub',
        bufferCommands: true
    });
    console.log('Connected');
}
catch (err: any) {
    console.log('Error:', err);
    throw new Error(err);
}