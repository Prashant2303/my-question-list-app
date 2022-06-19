import { apiHandler, getUserFromToken } from "helpers/api-handler";
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from "mongodb";

export default apiHandler({
    post: handler().post,
})

function handler() {
    return { post };

    async function post({ req, res, listsCollection }) {
        const { user } = getUserFromToken(req);
        const userIdFromRequest = user._id.toString();

        const { selectedList, question } = req.body;
        const targetList = { _id: ObjectId(selectedList) }

        const { ownerId } = await listsCollection.findOne(targetList, { projection: { ownerId: 1, _id: 0 } });
        const ownerOfList = ownerId.toString();

        if (userIdFromRequest !== ownerOfList) throw 'Only the list owner can modify their list';

        question.id = uuidv4();
        question.date = new Date();
        await listsCollection.updateOne(targetList, { $push: { questions: { $each: [question], $position: 0 } } })
        return res.status(200).json(question);
    }
}