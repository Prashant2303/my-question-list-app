import { apiHandler, getUserFromToken } from "helpers/api-handler";

export default apiHandler({
    get: handler
})

async function handler(req, res, collection) {
    const { user, token } = getUserFromToken(req);
    const existingUser = await collection.findOne(user);

    const userData = {
        id: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
        questions: existingUser.questions,
        token
    }
    return res.status(200).json(userData)
}
//THIS WAS CREATED TO FETCH USER DATA WHEN SIGNING IN USUNG SESSION