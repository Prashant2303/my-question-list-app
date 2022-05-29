import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const dbName = process.env.DB_NAME
const collectionName = process.env.COLLECTION_NAME

if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local')
}

if (!dbName) {
    throw new Error('Define the DB_NAME environmental variable');
}

if (!collectionName) {
    throw new Error('Define the COLLECTION_NAME environmental variable');
}

// https://www.section.io/engineering-education/build-nextjs-with-mongodb-and-deploy-on-vercel/

let cachedClient = null;
let cachedDb = null;
let cachedCollection = null;

export async function connectToDatabase() {
    console.log('cachedCollection', cachedCollection);
    if (cachedClient && cachedDb && cachedCollection) {
        console.log('CACHE HIT');
        return {
            client: cachedClient,
            db: cachedDb,
            collection: cachedCollection
        }
    }
    
    const client = new MongoClient(uri);
    await client.connect();
    console.log('CACHE MISS - Connected to DB');
    const db = client.db(dbName)
    const collection = db.collection(collectionName);

    cachedClient = client;
    cachedDb = db;
    cachedCollection = collection;

    return {
        client: cachedClient,
        db: cachedDb,
        collection: cachedCollection
    }
}