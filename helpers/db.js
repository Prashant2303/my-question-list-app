import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const dbName = process.env.DB_NAME2
const usersCollectionName = process.env.USERS_COLLECTION_NAME
const listsCollectionName = process.env.LISTS_COLLECTION_NAME

if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local')
}

if (!dbName) {
    throw new Error('Define the DB_NAME environmental variable');
}

if (!usersCollectionName) {
    throw new Error('Define the USERS_COLLECTION_NAME environmental variable');
}

if (!listsCollectionName) {
    throw new Error('Define the LISTS_COLLECTION_NAME environmental variable');
}

// https://www.section.io/engineering-education/build-nextjs-with-mongodb-and-deploy-on-vercel/
console.log('Server started');
let cachedClient = null;
let cachedDb = null;
let cachedUsersCollection = null;
let cachedListsCollection = null;

export async function connectToDatabase() {
    //return cached values if connection is already established
    if (cachedClient && cachedDb && cachedUsersCollection && cachedListsCollection) {
        console.log('CACHE HIT');
        return {
            client: cachedClient,
            db: cachedDb,
            usersCollection: cachedUsersCollection,
            listsCollection: cachedListsCollection
        }
    }

    console.log('CACHE MISS');
    const client = new MongoClient(uri);

    try {
        //CONNECT
        await client.connect();
        console.log('Connected to DB...');
        const db = client.db(dbName)
        const usersCollection = db.collection(usersCollectionName);
        const listsCollection = db.collection(listsCollectionName);

        //CACHE
        cachedClient = client;
        cachedDb = db;
        cachedUsersCollection = usersCollection;
        cachedListsCollection = listsCollection;

        //RETURN
        return {
            client: cachedClient,
            db: cachedDb,
            usersCollection: cachedUsersCollection,
            listsCollection: cachedListsCollection
        }
    } catch (err) {
        console.log(err);
        throw "COULDN'T CONNECT TO DATABASE"
    }
}