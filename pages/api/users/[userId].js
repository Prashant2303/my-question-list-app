import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../db";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedUser = jwt.verify(token, process.env.SECRET);
        const user = { _id: new ObjectId(decodedUser.id) };

        const { collection } = await connectToDatabase();

        const existingUser = await collection.findOne(user);

        const userData = {
            id: existingUser._id,
            email: existingUser.email,
            username: existingUser.username,
            questions: existingUser.questions,
            token
        }
        return res.status(200).json(userData)
    } catch (err) {
        console.error(err)
        if (typeof (err) === 'string')
            return res.status(500).json({ message: err });
        return res.status(500).json({ message: err });
    }
}