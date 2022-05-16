import clientPromise from "../mongo";

const user = { username: "StrongestSorcerer" }

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
            console.log(req.body);
            console.log('QID', questionId);
            // Update fields of question in array   $set
            const updateResult = await collection.updateOne({ username: "StrongestSorcerer", "questions.id": 3 }, { "$set": { "questions.$.site": "GfG" } })
            console.log('Insert result', updateResult);
            res.status(200).json({ 'message': updateResult })
        }
    }
}