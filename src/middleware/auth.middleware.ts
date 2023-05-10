import jsonWebToken from 'jsonwebtoken';
import express from 'express';

import User from '../models/User.model';

class AuthenticationError extends Error {}

async function isAuthenticated(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    try {
        // Check for existance of Bearer auth token in the headers
        const { authorization } = req.headers;
        if (!authorization || authorization.split(' ')[0] !== 'Bearer') {
            return res
                .status(401)
                .json({ message: 'Authentication token required' });
        }

        // If a token was found, verify that it can be decrypted to a valid user ID, using our
        // secret key
        try {
            const payload = jsonWebToken.verify(
                authorization.split(' ')[1],
                process.env.TOKEN_SECRET,
            );
            if (typeof payload === 'string') {
                console.log('error:', payload);
                throw Error(`[AUTH MIDDLEWARE] Error: ${payload}`);
            }

            const user = await User.findById(payload._id);

            if (!user) {
                next(new AuthenticationError('User not found'));
            }

            const { _id, username, email } = user;
            req.user = { id: _id.toString(), username, email };

            next();
        } catch {
            return res
                .status(401)
                .json({ message: 'Invalid authentication token' });
        }
    } catch (error) {
        next(error);
    }
}

export default {
    isAuthenticated,
};
