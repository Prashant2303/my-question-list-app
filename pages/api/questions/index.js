import clientPromise from "../mongo";

const dbName = 'myFirstDatabase';
const user = { username: "StrongestSorcerer" }

export default async function handler(req, res) {
    const method = req.method;
    try {
        const client = await clientPromise
        const db = client.db(dbName)
        const collection = db.collection('testuser');

        // Then you can execute queries against your database like so:
        // db.find({}) or any of the MongoDB Node Driver commands
        switch (method) {
            case 'GET': {
                const findResult = await collection.find({}).toArray();
                console.log('Found documents =>', findResult[0].questions);
                res.status(200).json(findResult[0].questions);
                break;
            };
            case 'POST': {
                const { question } = req.body;  //get question from req
                const insertResult = await collection.updateOne(user, { $push: { questions: question } })
                console.log('Insert ', insertResult);
                res.status(200).json(question);//return question
                break;
            };
            case 'DELETE': {
                const { questionId } = JSON.parse(req.body);    //req.body is coming as string
                console.log('Qid', questionId);
                // const toDelete = questions.find((question) => question.id === questionId)
                // if (!toDelete)
                //     res.status(404).json({ 'message': "Item doesn't exist" })
                // else {
                //     const index = questions.findIndex(question => question.id === questionId);
                //     questions.splice(index, 1);
                // Del question from array              $pull
                const removeResult = await collection.updateOne(user, { $pull: { questions: { id: questionId } } })
                console.log('REMOVE RESULT', removeResult);
                res.status(200).json({ message: 'Deleted Succesfully' });
                // }
                break;
            }
            case 'PATCH': {
                console.log(req.body);
                // Update fields of question in array   $set
                const updateResult = await collection.updateOne({ ...user, "questions.id": 3 }, { "$set": { "questions.$.site": "GfG" } })
                console.log('Insert result', updateResult);
                res.status(200).json({ message: updateResult });
            }
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Unable to connect with Database' })
    }
}