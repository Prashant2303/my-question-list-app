import { apiHandler, getUserFromToken } from 'helpers/api-handler';

export default apiHandler({
    get: handler().get,
    post: handler().post,
})

function handler() {
    console.log('Inside getPublicListHandler');
    return { get, post };

    async function get({ req, res, listsCollection }) {
        const { user } = getUserFromToken(req);
        const cursor = await listsCollection.find({ ownerId: user._id }).project({ questions: 0 });
        const lists = await cursor.toArray();
        return res.status(200).json(lists);
    }

    async function post({ req, res, listsCollection }) {
        const { listBody } = req.body;
        const { user } = getUserFromToken(req);

        const listExists = await listsCollection.findOne({ name: listBody.name, ownerId: user._id }, { projection: { _id: 1 } });
        if (listExists) {
            console.log('List exits', listExists);
            throw 'List with this name already exists';
        }
        listBody.likes = 0;
        listBody.ownerId = user._id;
        listBody.questions = [];
        await listsCollection.insertOne(listBody);
        return res.status(200).json(listBody);
    }
}