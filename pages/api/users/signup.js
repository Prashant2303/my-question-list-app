import clientPromise from "../mongo";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
    try {
        const client = await clientPromise
        const db = client.db(process.env.DB_NAME)
        const collection = db.collection(process.env.COLLECTION_NAME);

        const { newuser } = req.body;
        const exist = await collection.findOne({ email: newuser.email })
        if (exist) return res.status(400).json({ message: "User already exists" })

        const hashedPassword = await bcrypt.hash(newuser.password, 12);

        const newUser = {
            uuid: uuidv4(),
            username: newuser.username,
            email: newuser.email,
            password: hashedPassword,
            questions: []
        }

        const insertResult = await collection.insertOne(newUser);
        newUser.id = insertResult.insertedId;
        delete newUser.uuid;
        delete newUser.password;
        delete newUser._id;
        return res.status(200).json(newUser);
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Unable to connect with Database' })
    }
}