import express from 'express';

import authController from '../controllers/auth.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', (req, res) => {
    console.log('called /');
    res.send('hello auth');
});

router.post('/login', authController.login);

router.post('/register', authController.register);

router.get('/me', authMiddleware.isAuthenticated, authController.me);

export default router;
