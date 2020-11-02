const express = require('express')
const router = new express.Router()
const Quiz = require('../models/quiz')
const email = require('../emails/quizEmails')

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
        res.status(500).send('Unable to create a new Quiz')
    }
})


// delete quiz by id
router.delete('/api/quiz/:id',auth,async (req,res) => {
    try {
        const quiz = await Quiz.findOneAndRemove({ _id:req.params.id, owner:req.user._id })

        if(!quiz){
            return res.status(404).send({ error:'Quiz was not found' })
        }

        //deleted the quiz from users
        quiz.students.forEach(async student => {
            student = await User.findById(student.id)

            student.assignedQuizzes = student.assignedQuizzes.filter(assignedquiz => `${assignedquiz.id}` != `${quiz._id}`)

            await student.save()
        })
        
        res.send(quiz)
    } catch (err) {
        res.status(500).send('Server error') 
    }
})


//get all tests
router.get('/api/quiz',auth,async (req,res) => {
    try {
        const quizzes = await Quiz.find({owner:req.user._id})

        if(!quizzes){
            return res.status(404).send({ error:'Unable to find quizzes' })
        }

        res.send(quizzes)
    } catch (err) {
        res.status(500).send('Server error') 
    }
})


//get quiz by id
router.get('/api/quiz/:id',async (req,res) => {
    try {
       const quiz = await Quiz.findById(req.params.id)
       
       if(!quiz){
           return res.status(404).send({ error:'Unable to find quiz' })
       }

       res.send(quiz)
    } catch (err) {
        res.status(500).send('Server error') 
    }
})


//update quiz by id
router.patch('/api/quiz/:id',auth,async (req,res) => {
    try {
        const quiz = await Quiz.findOne({ owner:req.user._id, _id:req.params.id })

        if(!quiz){
            return res.status(404).send({ error:'Unable to find quiz' })
        }

        quiz.name = req.body.name
        quiz.questions = req.body.questions

        await quiz.save()

        res.send(quiz)

    } catch (err) {
        res.status(500).send('Server error') 
    }
})


//add a student to quiz
router.post('/api/quiz/:id/students', auth, async (req,res) => {
    try {
        const quiz = await Quiz.findOne({ _id:req.params.id, owner:req.user._id })
        const student = await User.findOne({ email:req.body.email })

        if(!quiz){
            return res.status(404).send({ error:'Cannot find quiz' })
        }

        if(!student){
            return res.status(404).send({ error:'Cannot find student' })
        }

        //checks if owner is trying to add them self
        if(req.user.email === student.email){
            return res.status(400).send({ error:'You cannot add yourself.' })
        }

        //checks if user has already been assigned
        const isUserAlreadyAssigned = student.assignedQuizzes.filter(assignedquiz => assignedquiz.id == quiz._id)
        console.log(isUserAlreadyAssigned)
        if(isUserAlreadyAssigned.length > 0){
            return res.status(400).send({ error:'Student has already been assigned to this quiz.' })
        }

        //adds a student to quiz
        quiz.students.push({
            name:student.name,
            email:student.email,
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
            id:student._id,
            score:null
        })
    } catch (err) {
        res.status(500).send('Server error')  
    }
})


router.delete('/api/quiz/:id/students',auth,async (req,res) => {
    try {
        const quiz = await Quiz.findOne({ _id:req.params.id, owner:req.user._id })
        const student = await User.findById(req.query.sid)

        if(!quiz){
            return res.status(404).send({ error:'No quiz found' })
        }

        if(!student){
            return res.status(404).send({ error:'No student found' })
        }

        //remove student from studets field
        quiz.students = quiz.students.filter(student => student.id != req.query.sid)

        //remove students answers from db
        quiz.answers = quiz.answers.filter(answer => answer.email != student.email)
        
        //remove quiz from student's assigned quizzes
        student.assignedQuizzes = student.assignedQuizzes.filter(assignedquiz => `${assignedquiz.id}` != `${quiz._id}`)

        await quiz.save()
        await student.save()

        res.send(student)

    } catch (err) {
        res.status(500).send('Server error')  
    }
})


//saves quiz submit
router.post('/api/quiz/:id/answer',auth,async (req,res) => {
    try {
        const quiz = await Quiz.findById(req.params.id)
        const quizOwner = await User.findById(quiz.owner)
        
        if(!quiz){
            return res.status(404).send({ error:'Quiz not found' })
        }

        const studentAlreadyAnswers = quiz.answers.filter(answer => answer.email == req.user.email)

        if(studentAlreadyAnswers.length > 0){
            return res.status(400).send({ error:'Student has already answered' })
        }

        quiz.answers.push({...req.body})


        //makes the email message
        let emailAnswerString = `<h1>${req.user.name} has answered your quiz!<h1><h2>score: ${req.body.score}</h2><ul>`

        //adds answers
        req.body.answers.forEach(answer => {
            emailAnswerString += `<li><h3>Question: ${answer.title}</h3><h3>His Answer: ${answer.answer}</h3><li>`
        })
        
        emailAnswerString += '</ul>'

        email.sendHtmlEmail(quizOwner.email,`${req.user.name} has answered you quiz!`,''+emailAnswerString)


        // await quiz.save()

        res.send(quiz)
    } catch (err) {
        res.status(500).send('Server error')  
    }
})


module.exports = router