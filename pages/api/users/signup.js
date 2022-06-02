import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { connectToDatabase } from "../../../db";
import { apiHandler } from "helpers/api-handler";

export default apiHandler({
    post: handler
})

async function handler(req, res) {
   
        const { collection } = await connectToDatabase();
        const { newuser } = req.body;

        const exist = await collection.findOne({ email: newuser.email })
        if (exist) throw "User already exists";

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
}