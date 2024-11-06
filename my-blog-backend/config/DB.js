import { MongoClient } from 'mongodb';

let db;

async function connectToDb(cb) {
    const client = new MongoClient('mongodb+srv://My-Blog:My-Blog@react-blog-db.thdyj.mongodb.net/?retryWrites=true&w=majority');
    await client.connect();
    const db = client.db('react-blog-db');
    cb();
}

export {
    db,
    connectToDb,
};
