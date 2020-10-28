const express = require('express')
const router = new express.Router()
const Quiz = require('../models/quiz')

//auth middlware
const auth = require('../middleware/auth')
const User = require('../models/user')

//create new quiz
router.post('/api/quiz',auth,async (req,res) => {
    try {
        const quiz = new Quiz({
            ...req.body,
            owner:req.user._id
        })
        await quiz.save()
        res.status(201).send(quiz)
    } catch (err) {
        res.status(500).send(err)
    }
})


// delete quiz by id
router.delete('/api/quiz/:id',auth,async (req,res) => {
    try {
        const quiz = await Quiz.findOneAndRemove({ _id:req.params.id, owner:req.user._id })
        // const quiz = await Quiz.findOne({ _id:req.params.id, owner:req.user._id })

        if(!quiz){
            throw new Error('Quiz was not found')
        }

        //deleted the quiz from users
        quiz.students.forEach(async student => {
            student = await User.findById(student.id)
            student.assignedQuizzes = student.assignedQuizzes.filter(assignedquiz => `${assignedquiz.id}` != `${quiz._id}`)

            await student.save()
        })
        
        res.send(quiz)
    } catch (err) {
        res.status(500).send(`${err}`)
    }
})


//get all tests
router.get('/api/quiz',auth,async (req,res) => {
    try {
        const quizzes = await Quiz.find({owner:req.user._id})
        res.send(quizzes)
    } catch (err) {
        res.status(500).send(err)
    }
})


//get quiz by id
router.get('/api/quiz/:id',async (req,res) => {
    try {
       const quiz = await Quiz.findById(req.params.id)
       
       res.send(quiz)
    } catch (err) {
        res.status(404).send({ error:'no quiz found' })
    }
})


//update quiz by id
router.patch('/api/quiz/:id',auth,async (req,res) => {
    try {
        const quiz = await Quiz.findOne({ owner:req.user._id, _id:req.params.id })

        quiz.name = req.body.name
        quiz.questions = req.body.questions

        await quiz.save()

        res.send(quiz)

    } catch (err) {
        res.status(404).send({ error:'no quiz found' })
    }
})


//add a student to quiz
router.post('/api/quiz/:id/students', auth, async (req,res) => {
    try {
        const quiz = await Quiz.findOne({ _id:req.params.id, owner:req.user._id })
        const student = await User.findOne({ email:req.body.email })

        if(!quiz){
            throw new Error('Cannot find quiz')
        }

        if(!student){
            throw new Error('Cannot find student')
        }

        //checks if owner is trying to add them self
        if(req.user.email === student.email){
            throw new Error('You cannot add your self.')
        }

        //checks if user has already been assigned
        const isUserAlreadyAssigned = student.assignedQuizzes.filter(assignedquiz => assignedquiz.id != quiz._id)
        if(isUserAlreadyAssigned.length > 0){
            throw new Error('Student has already been assigned to this quiz.')
        }

        //adds a student to quiz
        quiz.students.push({
            name:student.name,
            email:student.email,
            score:null,
            id:student._id,
        })

        //assigns quiz to student
        student.assignedQuizzes.push({
            name:quiz.name,
            id:quiz._id,
        })


        //saves data to db
        await quiz.save()
        await student.save()

        res.send({
            name:student.name,
            email:student.email,
            score:null
        })
    } catch (err) {
        res.status(400).send(`${err}`)    
    }
})



module.exports = router