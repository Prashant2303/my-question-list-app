import { apiHandler } from 'helpers/api-handler';

export default apiHandler({
    get: handler().get,
})

function handler() {
    console.log('Inside getPublicListHandler');
    return { get };

    //CHANGE TO PRIVATE LIST
    async function get({ res, listsCollection }) {
        console.log('Inside get function');
        const cursor = await listsCollection.find({ access: 'public' }).project({ questions: 0 });
        const lists = await cursor.toArray();
        console.log('GET request SUCCESS');
        return res.status(200).json(lists);
    }
}