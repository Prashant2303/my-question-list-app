import { apiHandler, getUserFromToken } from "helpers/api-handler";

export default apiHandler({
    get: handler().get,
    post: handler().post,
})

function handler() {
    return { get, post };

    async function get(req, res, collection) {
        const { user } = getUserFromToken(req);
        const findOneResult = await collection.findOne(user);
        return res.status(200).json(findOneResult.questions);
    }

    async function post(req, res, collection) {
        const { user } = getUserFromToken(req);
        const { question } = req.body;
        await collection.updateOne(user, { $push: { questions: { $each: [question], $position: 0 } } })
        return res.status(200).json(question);
    }
}