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


//delete class
router.delete('/api/classes/:id',auth,async (req,res) => {
    try{
        const userClass = await Class.findOneAndRemove({ _id:req.params.id,owner:req.user._id })

        if(!userClass){
            return res.status(404).send({ error:'Class Not Found' })
        }

        res.send(userClass)
    }
    catch{
        res.status(500).send({ error:'Server Error' })
    }
})



//edit class
router.patch('/api/classes/:id',auth,async (req,res) => {
    try {
        const userClass = await Class.findOne({ owner:req.user._id,_id:req.params.id })

        if(!userClass){
            return res.status(404).send({ error:'Class Not Found' })
        }

        if(userClass.students.length < 3){
            return res.status(400).send({ error:'Class Must Have At Least 3 Students' })
        }

        const newStudentsArr = []

        for(let index = 0; index < req.body.students.length;index++){
            const emails = req.body.students
            const studnet = await User.findOne({ email:emails[index] })
    
            if(studnet){
                newStudentsArr.push({
                    email:studnet.email,
                    name:studnet.name,
                })
            }
        }

        userClass.students = newStudentsArr

        userClass.name = req.body.name

        await userClass.save()
        
        res.send(userClass)
    } catch (err) {
        res.status(500).send({ error:'Server Error' })
    }
})

module.exports = router