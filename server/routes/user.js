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
        if(err.keyPattern.email){
            return res.status(400).send('Email already taken')
        }
        res.status(500).send(err)
    }
})


//login user
router.post('/api/users/login', async (req,res) => {
    try {
        //looks for user
        const user = await User.findOne({email:req.body.email})

        //if user was not found
        if(!user){
            return res.status(400).send({error:'Email or password are incorrect.'})
        }

        const isPasswordOk = await bcrypt.compare(req.body.password,user.password)

        //if password in correct
        if(!isPasswordOk){
            return res.status(400).send({error:'Email or password are incorrect.'})
        }

        //new auth token
        const token = await user.generateAuthToken()

        //send
        res.send({ user, token })
    } catch (err) {
        res.status(500).send('Server error') 
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
        res.status(500).send('Server error')
    }
})


//get user data
router.get('/api/users/me',auth,(req,res) => {
    try {
        res.send(req.user)
    } catch (err) {
        res.status(500).send('Server error')
    }
})


//edit user
router.patch('/api/users/me',auth, async (req,res) => {
    try{

        //checks for invaild operations
        const updates = Object.keys(req.body)
        const allowedUpdate = ['name','email','password']
        const isVaildOperation = updates.every(update => allowedUpdate.includes(update))


        if(!isVaildOperation){
            return res.status(500).send({ error:'Unallowed changes' })
        }
        

        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()

        res.send(req.user)
    } catch (err) {
        res.status(500).send('Server error') 
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