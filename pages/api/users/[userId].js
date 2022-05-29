import clientPromise from "../mongo";
import jwt from 'jsonwebtoken';
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    try {
        const client = await clientPromise
        const db = client.db(process.env.DB_NAME)
        const collection = db.collection(process.env.COLLECTION_NAME);
        
        const token = req.headers.authorization.split(" ")[1];
        const existingUser = await collection.findOne({ _id: new ObjectId(req.query.userId) })
    
        const user = {
            id: existingUser._id,
            email: existingUser.email,
            username: existingUser.username,
            questions: existingUser.questions,
            token
        }
        return res.status(200).json(user)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Unable to connect with Database' })
    }
}