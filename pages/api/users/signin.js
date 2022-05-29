import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { connectToDatabase } from "../../../db";

export default async function handler(req, res) {
    try {
        const { collection } = await connectToDatabase();
        const { userCreds } = req.body;

        const existingUser = await collection.findOne({ email: userCreds.email })
        if (!existingUser) return res.status(400).json({ message: "User not found" });

        const isPasswordCorrect = await bcrypt.compare(userCreds.password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: existingUser._id }, 'test', { expiresIn: '7d' });

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