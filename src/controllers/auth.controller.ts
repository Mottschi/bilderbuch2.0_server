import express from 'express';
import bcrypt from 'bcrypt';
import jsonWebToken from 'jsonwebtoken';

import User from '../models/User.model';
import { isValidEmail } from '../utils/utils';

const errors = {
    'missing email': 'No email address specified',
    'missing password': 'No password specified',
    'missing username': 'No username specified',
    'invalid email': 'Email address is invalid.',
    'invalid password': 'Password is invalid.',
    'existing email': 'Email address already in use.',
    'inexisting user': 'User not found.',
    'create user': 'User creation failed.',
};

async function login(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const {email, password} = req.body;

    if (email === undefined) {
        res.status(401).json({ message: errors['missing email']});
        return;
    }
    if (password === undefined) {
        res.status(401).json({ message: errors['missing password']});
        return;
    }

    try {
        const user = await User.findOne({ email }, {password: 1});

        if (!user) {
            res.status(401).json({ message: errors['inexisting user']});
            return;
        }
    
        if (!bcrypt.compareSync(password, user.password)) {
            res.status(401).json({ message: errors['invalid password']});
            return;
        }
    
        const payload = { _id: user._id };
    
        const authToken = jsonWebToken.sign(payload, process.env.TOKEN_SECRET, {
            algorithm: 'HS256',
            expiresIn: '2 days',
        });
    
        res.status(201).json({ authToken });

    } catch (error) {
        next(error);
    }
}

async function register(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const { email, password, username } = req.body;
    console.log('trying to register');
    if (email === undefined) {
        res.status(401).json({ message: errors['missing email']});
        return;
    }
    if (password === undefined) {
        res.status(401).json({ message: errors['missing password']});
        return;
    }
    if (username === undefined) {
        res.status(401).json({ message: errors['missing username']});
        return;
    }

    

    try {
        const existingUser = await User.findOne({ email });
    
        if (existingUser) {
            res.status(400).json({ message: errors['existing email']});
            return;
        }
    
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
    
        const createdUser = await User.create({
            email,
            password: hashedPassword,
            username,
        });
    
        if (!createdUser) {
            throw new Error(errors['create user']);
        }
        res.sendStatus(201);
    } catch (error) {
        next(error);
    }
}

async function me(req: express.Request, res: express.Response): Promise<void> {
    res.status(200).send(req.user);
}

const authController = {
    login,
    register,
    me,
};

export default authController;
