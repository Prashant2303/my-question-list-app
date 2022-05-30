import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { connectToDatabase } from "../../../db";

export default async function handler(req, res) {
    try {
        const { collection } = await connectToDatabase();

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

        const token = jwt.sign({ id: insertResult.insertedId }, process.env.SECRET);

        newUser.id = insertResult.insertedId;
        newUser.token = token;
        delete newUser.uuid;
        delete newUser.password;
        delete newUser._id;
        return res.status(200).json(newUser);
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Unable to connect with Database' })
    }
}