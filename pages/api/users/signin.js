import clientPromise from "../mongo";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
    try {
        const client = await clientPromise
        const db = client.db(process.env.DB_NAME)
        const collection = db.collection(process.env.COLLECTION_NAME);

        const { userCreds } = req.body;

        const existingUser = await collection.findOne({ email: userCreds.email })
        if(!existingUser) return res.status(400).json({ message: "User not found" });

        const isPasswordCorrect = await bcrypt.compare(userCreds.password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
        
        const user = {
            id: existingUser._id,
            email: existingUser.email,
            username: existingUser.username,
            questions: existingUser.questions
        }
        return res.status(200).json(user)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Unable to connect with Database' })
    }
}