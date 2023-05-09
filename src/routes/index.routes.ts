import express from "express";

import authRouter from './auth.routes'
import apiRouter from './api.routes'

const router = express.Router();

router.get('/', (req, res)=>{
    console.log('called /')
    res.send('hello')
})

router.use('/auth', authRouter)

router.use('/api', apiRouter)

export default router