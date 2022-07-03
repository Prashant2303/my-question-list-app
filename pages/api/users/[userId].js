import { apiHandler, getUserFromToken } from "helpers/api-handler";

export default apiHandler({
    patch: handler().patch,
    delete: handler()._delete
})

function handler() {
    return { patch, _delete }

    async function patch({ req, res, usersCollection }) {
        const { userId } = req.query;
        const { user, userString } = getUserFromToken(req);

        if (userId !== userString) throw 'Not Authorized';

        const { field, value } = req.body;
        const updateResult = await usersCollection.updateOne(user, { "$set": { [field]: value } });
        return res.status(200).json({ 'message': updateResult });
    }

    async function _delete({ req, res, usersCollection, listsCollection }) {
        const { userId } = req.query;
        const { user, userString } = getUserFromToken(req);

        if (userId !== userString) throw 'Not Authorized';

        await listsCollection.deleteMany({ ownerId: user._id });
        const deleteResult = await usersCollection.deleteOne(user);
        return res.status(200).json({ 'message': deleteResult });
    }
}