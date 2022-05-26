import clientPromise from "../mongo";
import { ObjectId } from "mongodb";


export default async function handler(req, res) {
    const user = { _id: new ObjectId("627fa98a74c103d78cfd69c7") }
    const method = req.method;
    try {
        const client = await clientPromise
        const db = client.db(process.env.DB_NAME)
        const collection = db.collection(process.env.COLLECTION_NAME);

        switch (method) {
            case 'GET': {
                const findOneResult = await collection.findOne(user);
                res.status(200).json(findOneResult.questions);
                break;
            };
            case 'POST': {
                const { question } = req.body;  //get question from req
                const insertResult = await collection.updateOne(user, { $push: { questions: { $each: [question], $position: 0 } } })
                console.log('Insert ', insertResult);
                res.status(200).json(question);//return question
                break;
            };
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Unable to connect with Database' })
    }
}