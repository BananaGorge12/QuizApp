const express = require('express')

const auth = require('../middleware/auth')
const router = new express.Router()
const Class = require('../models/classes')
const User = require('../models/user')


//create new class
router.post('/api/classes',auth,async (req,res) => {
    try {
        const newClassContactor = {
            students:[],
            name:req.body.name,
            owner:req.user._id
        }
    
        for(let index = 0; index < req.body.students.length;index++){
            const emails = req.body.students
            const studnet = await User.findOne({ email:emails[index] })
    
            newClassContactor.students.push({
                email:studnet.email,
                name:studnet.name,
            })
        }
    
        const newClass = new Class(newClassContactor)
    
        await newClass.save()
    
        res.status(201).send(newClass)
    } catch (err) {
        res.status(500).send({ error:'Server Error' })
    }
})


//get all user's classes
router.get('/api/classes',auth,async (req,res) => {
    try {
        const classes = await Class.find({ owner:req.user._id })

        res.send(classes)
        
    } catch (err) {
        res.status(500).send({ error:'Server Error' })
    }
})


module.exports = router