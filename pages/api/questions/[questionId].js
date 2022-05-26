import clientPromise from "../mongo";
import { ObjectId } from "mongodb";

const user = { _id: new ObjectId("627fa98a74c103d78cfd69c7") }

export default async function handler(req, res) {
    const method = req.method;
    const client = await clientPromise
    const db = client.db(process.env.DB_NAME)
    const collection = db.collection(process.env.COLLECTION_NAME);
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
            const target = "questions.$."+field;
            const updateValue = req.body[field];
            // const updateResult = await collection.updateOne({ username: "StrongestSorcerer", "questions.id": 3 }, { "$set": { "questions.$.site": "GfG" } })
            const updateResult = await collection.updateOne({ ...user, "questions.id": questionId }, { "$set": { [target]: updateValue } })
            res.status(200).json({ 'message': updateResult })
        }
    }
}