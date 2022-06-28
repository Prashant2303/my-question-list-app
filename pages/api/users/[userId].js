import { apiHandler, getUserFromToken } from "helpers/api-handler";

export default apiHandler({
    patch: handler().patch
})

function handler() {
    return { patch }

    async function patch({ req, res, usersCollection }) {
        const { userId } = req.query;
        const { user, userString } = getUserFromToken(req);

        if (userId !== userString) throw 'Not Authorized';

        const { field, value } = req.body;
        const updateResult = await usersCollection.updateOne(user, { "$set": { [field]: value } });
        return res.status(200).json({ 'message': updateResult });
    }
}