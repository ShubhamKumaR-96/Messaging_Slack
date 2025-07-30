import express from 'express'

const router=express.Router()

router.get('/',(req,res)=>{
    res.json({msg:"Get/users"})
})

export default router