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
        console.log('Create List');
        // const { user } = getUserFromToken(req);
        // const cursor = await listsCollection.find({ ownerId: user._id }).project({ questions: 0 });
        // const lists = await cursor.toArray();
        // return res.status(200).json(lists);
    }
}