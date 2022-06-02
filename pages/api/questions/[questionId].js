import { apiHandler, getUserFromToken } from "helpers/api-handler";

export default apiHandler({
    delete: handler()._delete,
    patch: handler().patch,
})

function handler() {
    return { _delete, patch };

    async function _delete(req, res, collection) {
        const { user } = getUserFromToken(req);
        const { questionId } = req.query;
        const removeResult = await collection.updateOne(user, { $pull: { questions: { id: questionId } } })
        return res.status(200).json({ message: removeResult });
    }

    async function patch(req, res, collection) {
        const { user } = getUserFromToken(req);
        const { questionId } = req.query;
        const [field] = Object.keys(req.body);
        const target = "questions.$." + field;
        const updateValue = req.body[field];
        // const updateResult = await collection.updateOne({ username: "StrongestSorcerer", "questions.id": 3 }, { "$set": { "questions.$.site": "GfG" } })
        const updateResult = await collection.updateOne({ ...user, "questions.id": questionId }, { "$set": { [target]: updateValue } })
        return res.status(200).json({ 'message': updateResult })
    }
}