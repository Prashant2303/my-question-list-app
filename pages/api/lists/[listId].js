import { apiHandler, getUserFromToken } from 'helpers/api-handler';
import { ObjectId } from 'mongodb';

export default apiHandler({
    get: handler().get,
    delete: handler()._delete
})

function handler() {
    return { get, _delete };

    async function get({ req, res, listsCollection }) {
        const { listId } = req.query;
        const result = await listsCollection.findOne({ _id: ObjectId(listId) }, { projection: { questions: 1, _id: 0 } });
        return res.status(200).json(result?.questions);
    }

    async function _delete({ req, res, listsCollection, usersCollection }) {
        const { listId } = req.query;
        const { user } = getUserFromToken(req);
        const userDefaultList = usersCollection.findOne(user, { projection: { defaultList: 1, _id: 0 } });

        if (userDefaultList === listId) throw 'Cannot delete default List';

        const result = await listsCollection.deleteOne({ _id: ObjectId(listId) });
        return res.status(200).json(result);
    }
}