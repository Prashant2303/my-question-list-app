import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { apiHandler } from "helpers/api-handler";

export default apiHandler({
    post: handler
})

async function handler({ req, res, usersCollection }) {
    const { userCreds } = req.body;
    userCreds.email = userCreds.email.toLowerCase();

    const existingUser = await usersCollection.findOne({ email: userCreds.email })
    if (!existingUser) throw "User not found";

    const isPasswordCorrect = await bcrypt.compare(userCreds.password, existingUser.password);
    if (!isPasswordCorrect) throw "Invalid credentials";

    const token = jwt.sign({ id: existingUser._id }, process.env.SECRET);

    const { email, username, defaultList, defaultStatus, defaultDifficulty, defaultCategory } = existingUser;

    const user = {
        id: existingUser._id,
        email,
        username,
        defaultList,
        defaultStatus,
        defaultDifficulty,
        defaultCategory,
        token
    }
    return res.status(200).json(user)
}