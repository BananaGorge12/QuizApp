const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

//auth middleware
const auth = require('../middleware/auth')

//create new user
router.post('/api/users/signup',async (req,res) => {
    try {
        const user = new User(req.body)
        await user.save()
        //new auth token
        const token = await user.generateAuthToken()
        //send
        res.status(201).send({user,token})
    } catch (err) {
        res.sendStatus(500)
    }
})


//login user
router.post('/api/users/login', async (req,res) => {
    try {
        //looks for user
        const user = await User.findOne({email:req.body.email})

        //if user was not found
        if(!user){
            throw new Error('Email or password are not correct.')
        }

        const isPasswordOk = await bcrypt.compare(req.body.password,user.password)

        //if password in correct
        if(!isPasswordOk){
            throw new Error('Email or password are not correct.')
        }

        //new auth token
        const token = await user.generateAuthToken()
        //send
        res.send({ user, token })
    } catch (err) {
        console.log(err)
        res.status(400).send({ error:'Please make a vaild request' })
    }
})


//logout user and delete token
router.post('/api/users/logout',auth,async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        })

        await req.user.save()
        res.send(req.user)
        
    } catch (err) {
        res.status(500).send(err)
    }
})


//get user data
router.get('/api/users/me',auth,(req,res) => {
    try {
        res.send(req.user)
    } catch (err) {
        res.status(500).send(err)
    }
})


//edit user
router.patch('/api/users/me',auth, async (req,res) => {
    //checks for invaild operations
    const updates = Object.keys(req.body)
    const allowedUpdate = ['name','email','password']
    const isVaildOperation = updates.every(update => allowedUpdate.includes(update))

    if(!isVaildOperation){
        return res.status(400).send({error:'invalid operation'})
    }

    try {
        
        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()

        res.send(req.user)
    } catch (err) {
        res.status(400).send({error:'invalid operation'})
    }
})


//delete user
router.delete('/api/users/me',auth,async (req,res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (err) {
        res.status(500).send(err)
    }
})


module.exports = router