import express from "express";
import User from "../models/User.model"

const router = express.Router();

router.get('/', (req, res)=>{
    console.log('called /')
    res.send('hello auth')
})

export default router