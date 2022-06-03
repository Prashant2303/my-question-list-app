import { apiHandler, getUserFromToken } from "helpers/api-handler";
import { v4 as uuidv4 } from 'uuid';

export default apiHandler({
    post: handler().post,
})

function handler() {
    return { post };

    async function post(req, res, collection) {
        const { user } = getUserFromToken(req);
        const { question } = req.body;
        question.id = uuidv4();
        question.date = new Date();
        await collection.updateOne(user, { $push: { questions: { $each: [question], $position: 0 } } })
        return res.status(200).json(question);
    }
}