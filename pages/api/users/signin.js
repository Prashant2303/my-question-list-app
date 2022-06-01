import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { connectToDatabase } from "../../../db";
import { apiHandler } from "../../../api-handler";

export default apiHandler({
    post: handler
})

async function handler(req, res) {

    const { collection } = await connectToDatabase();
    const { userCreds } = req.body;

    const existingUser = await collection.findOne({ email: userCreds.email })
    if (!existingUser) throw "User not found";

    const isPasswordCorrect = await bcrypt.compare(userCreds.password, existingUser.password);
    if (!isPasswordCorrect) throw "Invalid credentials";

    const token = jwt.sign({ id: existingUser._id }, process.env.SECRET);

    const user = {
        id: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
        questions: existingUser.questions,
        token
    }
    return res.status(200).json(user)
}