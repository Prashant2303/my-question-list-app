import { apiHandler } from 'helpers/api-handler';
import { ObjectId } from 'mongodb';

export default apiHandler({
    get: handler().get
})

function handler() {
    return { get };

    async function get({ req, res, listsCollection }) {
        const { listId } = req.query;
        const result = await listsCollection.findOne({ _id: ObjectId(listId) }, { projection: { questions: 1 } });
        return res.status(200).json(result);
    }
}