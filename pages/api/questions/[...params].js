import { apiHandler, getUserFromToken } from "helpers/api-handler";
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from "mongodb";

export default apiHandler({
    post: handler().post,
    delete: handler()._delete,
    patch: handler().patch,
})

function handler() {
    return { post, _delete, patch };

    async function post({ req, res, listsCollection }) {
        const selectedList = req.query.params[0];
        const targetList = { _id: ObjectId(selectedList) }

        const { ownerId } = await listsCollection.findOne(targetList, { projection: { ownerId: 1, _id: 0 } });
        const ownerOfList = ownerId.toString();
        const { userString } = getUserFromToken(req);
        if (userString !== ownerOfList) throw 'Only the list owner can modify their list';

        const { question } = req.body;
        question.id = uuidv4();
        question.date = new Date();
        await listsCollection.updateOne(targetList, { $push: { questions: { $each: [question], $position: 0 } } })
        return res.status(200).json(question);
    }

    async function _delete({ req, res, listsCollection }) {
        const { params } = req.query;
        const selectedList = params[0];
        const targetList = { _id: ObjectId(selectedList) }

        const { ownerId } = await listsCollection.findOne(targetList, { projection: { ownerId: 1, _id: 0 } });
        const ownerOfList = ownerId.toString();
        const { userString } = getUserFromToken(req);
        if (userString !== ownerOfList) throw 'Only the list owner can modify their list';

        const questionId = params[1];
        const removeResult = await listsCollection.updateOne(targetList, { $pull: { questions: { id: questionId } } })
        if(removeResult.modifiedCount) return res.status(200).json({ message: removeResult });
        return res.status(400).json({ message: 'Item not found' })
    }

    async function patch({ req, res, listsCollection }) {
        const { params } = req.query;
        const selectedList = params[0];
        const targetList = { _id: ObjectId(selectedList) }

        const { ownerId } = await listsCollection.findOne(targetList, { projection: { ownerId: 1, _id: 0 } });
        const ownerOfList = ownerId.toString();
        const { userString } = getUserFromToken(req);
        if (userString !== ownerOfList) throw 'Only the list owner can modify their list';

        const questionId = params[1];
        const [field] = Object.keys(req.body);
        const target = "questions.$." + field;
        const updateValue = req.body[field];
        // const updateResult = await collection.updateOne({ username: "StrongestSorcerer", "questions.id": 3 }, { "$set": { "questions.$.site": "GfG" } })
        const updateResult = await listsCollection.updateOne({ ...targetList, "questions.id": questionId }, { "$set": { [target]: updateValue } })
        return res.status(200).json({ 'message': updateResult })
    }
}