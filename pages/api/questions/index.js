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
    } catch (err) {
        console.error(err)
        if (typeof (err) === 'string')
            return res.status(500).json({ message: err });
        return res.status(500).json({ message: err });
    }
}