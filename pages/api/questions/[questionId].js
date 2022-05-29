import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../db";
const user = { _id: new ObjectId("627fa98a74c103d78cfd69c7") }

export default async function handler(req, res) {

    const method = req.method;
    try {
        const { collection } = await connectToDatabase();

        switch (method) {
            case 'DELETE': {
                const { questionId } = req.query;
                const removeResult = await collection.updateOne(user, { $pull: { questions: { id: questionId } } })
                res.status(200).json({ message: removeResult });
                break;
            }
            case 'PATCH': {
                const { questionId } = req.query;
                const [field] = Object.keys(req.body);
                const target = "questions.$." + field;
                const updateValue = req.body[field];
                // const updateResult = await collection.updateOne({ username: "StrongestSorcerer", "questions.id": 3 }, { "$set": { "questions.$.site": "GfG" } })
                const updateResult = await collection.updateOne({ ...user, "questions.id": questionId }, { "$set": { [target]: updateValue } })
                res.status(200).json({ 'message': updateResult })
            }
        }
    } catch (err) {
        console.error(e)
        res.status(500).json({ message: 'Unable to connect with Database' })
    }
}