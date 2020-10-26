const express = require('express')
const router = new express.Router()
const Quiz = require('../models/quiz')

//auth middlware
const auth = require('../middleware/auth')

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


// delete user by id
router.delete('/api/quiz/:id',auth,async (req,res) => {
    try {
        const quiz = await Quiz.findOneAndRemove({ _id:req.params.id, owner:req.user._id })
        res.send(quiz)
    } catch (err) {
        res.status(500).send(err)
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
router.get('/api/quiz/:id',auth,async (req,res) => {
    try {
       const quiz = await Quiz.findOne({ owner:req.user._id, _id:req.params.id })
       
       res.send(quiz)
    } catch (err) {
        res.status(404).send(err)
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
        res.status(404).send(err)
    }
})

module.exports = router