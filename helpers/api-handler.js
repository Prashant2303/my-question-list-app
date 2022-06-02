import { connectToDatabase } from "db";

export { apiHandler };

function apiHandler(handler) {
    console.log('IN HANDLER');
    return async (req, res) => {
        const method = req.method.toLowerCase();

        // check handler supports HTTP method
        if (!handler[method])
            return res.status(405).end(`Method ${req.method} Not Allowed`);

        try {
            // global middleware
            // await jwtMiddleware(req, res);

            // route handler
            const { collection } = await connectToDatabase();
            await handler[method](req, res, collection);
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
        
            return res.status(500).json({ message: 'Unable to connect with Database' });
        }
    }
}