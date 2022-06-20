import jwt from 'jsonwebtoken';
import { ObjectId } from "mongodb";
import { connectToDatabase } from "helpers/db";

export { apiHandler, getUserFromToken };

function getUserFromToken(req) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedUser = jwt.verify(token, process.env.SECRET);
        return {
            user: { _id: new ObjectId(decodedUser.id) },
            userString: decodedUser.id,
            token
        };
    } catch (err) {
        throw err.name;
    }
}

function apiHandler(handler) {
    console.log('Inside handler');
    return async (req, res) => {
        const method = req.method.toLowerCase();

        // check if handler supports HTTP method of incoming request
        if (!handler[method])
            return res.status(405).end(`Method ${req.method} Not Allowed`);

        try {
            const { usersCollection, listsCollection } = await connectToDatabase();
            // route handler
            await handler[method]({ req, res, usersCollection, listsCollection });
        } catch (err) {
            // global error handler
            console.log('SERVER ERROR', err);
            if (typeof (err) === 'string') {
                // custom application error
                const is404 = err.toLowerCase().endsWith('not found');
                const statusCode = is404 ? 404 : 400;
                return res.status(statusCode).json({ message: err });
            }

            if (err.name === 'UnauthorizedError') {
                // jwt authentication error
                return res.status(401).json({ message: 'Invalid Token' });
            }

            return res.status(500).json({ message: 'Server Error' });
        }
    }
}