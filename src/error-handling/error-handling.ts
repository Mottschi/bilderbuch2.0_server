import express from 'express';

async function notFound (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>  {
    res.status(404).json({ message: 'This route does not exist' });
}

const errorHandler: express.ErrorRequestHandler = (err, req, res, next)  => {
    console.error('ERROR', req.method, req.path, err);

    if (!res.headersSent) {
        res.status(500).json({
            message: 'Internal server error. Check the server console',
        });
    }
};

const errorHandlers = {
    notFound,
    errorHandler,
};

export default errorHandlers;