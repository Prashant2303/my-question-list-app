import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../db";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    const method = req.method;
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedUser = jwt.verify(token, process.env.SECRET);
        const user = { _id: new ObjectId(decodedUser.id) };

        const { collection } = await connectToDatabase();

        switch (method) {
            case 'DELETE': {
                const { questionId } = req.query;
                const removeResult = await collection.updateOne(user, { $pull: { questions: { id: questionId } } })
                return res.status(200).json({ message: removeResult });
            }
            case 'PATCH': {
                const { questionId } = req.query;
                const [field] = Object.keys(req.body);
                const target = "questions.$." + field;
                const updateValue = req.body[field];
                // const updateResult = await collection.updateOne({ username: "StrongestSorcerer", "questions.id": 3 }, { "$set": { "questions.$.site": "GfG" } })
                const updateResult = await collection.updateOne({ ...user, "questions.id": questionId }, { "$set": { [target]: updateValue } })
                return res.status(200).json({ 'message': updateResult })
            }
        }
    } catch (err) {
        console.error(err)
        if (typeof (err) === 'string')
            return res.status(500).json({ message: err });
        return res.status(500).json({ message: err });
    }
}