const express = require('express')
const puppeteer = require('puppeteer');
const multer = require('multer')
const jwt = require('jsonwebtoken')

const auth = require('../middleware/auth')
const Quiz = require('../models/quiz')
const User = require('../models/user');
const router = new express.Router()



//get preview image of quiz
router.get('/api/preview/quiz/:id',auth,async (req,res) => {
    try {
        const url = req.protocol + '://' + req.get('host')
    

        const browser = await puppeteer.launch({args:['--no-sandbox']});
        const page = await browser.newPage();

        page.setViewport({
            width:1100,
            height:900,
            deviceScaleFactor:.2,
        })
            
        await page.goto(`${url}/quiz/${req.params.id}/take?token=${req.token}`);

        await setTimeout(async () => {
            let img = await page.screenshot()
            img = img.toString('base64')
            
            await browser.close();
            res.send(img)
        },500)
    } catch (err) {
        res.status(500).send(`${err}`)
    }
})



const upload = multer({
    limits:{
        fileSize:1000000,
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/i)){
            return cb(new Error('Please upload a an image.')) 
        }
        cb(undefined,true)
    },
    
})



//set background img
router.post('/api/quiz/:id/background', auth, upload.single('quizBackground'),async (req,res) => {
    try {
        let fileBuffer = req.file.buffer
        const quiz = await Quiz.findOne({ _id:req.params.id,owner:req.user._id })
    
        if(!quiz){
            res.status(404).send({ error:'Quiz not found.' })
        }
    
        quiz.background = fileBuffer
    
        await quiz.save()
    
        res.send()
    } catch (err) {
        res.status(500).send('Server Error')
    }
},(err,req,res,next) => {
    res.status(400).send({ error:err.message })
})


//get bg image
router.get('/api/quiz/:id/background',async (req,res) =>{
    try {
        const quiz = await Quiz.findById(req.params.id)

        if(!quiz){
            return res.status(404).send({ error:'Quiz not found' })
        }
    
        if(!quiz.background){
            return res.status(404).send({ error:'No Background Image' })
        }
    
        const token = req.query.token
        const decoded = jwt.verify(token,'secretTokenKey')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token':token })
    
        if(!user){
            return res.status(404).send({ error:'No User With This Token Was Found.' })
        }
    
        let isUserAllowed = false
    
        if(`${quiz.owner}` == `${user._id}`){
            isUserAllowed = true
        }
    
        if(!isUserAllowed){
            quiz.students.forEach(student => {
                if(`${student.id}` == `${user._id}`){
                    return isUserAllowed = true
                }
            })
        }
    
        if(isUserAllowed){
            res.set('Content-type','image/jpg')
            res.send(quiz.background.buffer)
        }else{
            res.send()
        }
    } catch (err) {
        res.status(500).send('Server Error')
    }

})


router.delete('/api/quiz/:id/background',auth,async (req,res) => {
    try {
        const quiz = await Quiz.findOne({ _id:req.params.id,owner:req.user._id })

        if(!quiz){
            return res.status(404).send({ error:'Quiz not found.' })
        }
    
        quiz.background = null
    
        await quiz.save()

        res.send()
    } catch (err) {
        res.status(500).send('Server Error')
    }
})


module.exports = router