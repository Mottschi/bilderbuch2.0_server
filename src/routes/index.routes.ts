import express from "express";
const router = express.Router();

router.get('/', (req, res)=>{
    console.log('called /')
    res.send('hello')
})

export default router