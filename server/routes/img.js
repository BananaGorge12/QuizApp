const express = require('express')
const Pageres = require('pageres')
const auth = require('../middleware/auth')
const router = new express.Router()

const port = process.env.PORT


router.get('/api/preview/quiz/:id',auth,async (req,res) => {
    try {
        let img;
    
        await new Pageres().src(`http://localhost:${port || 8080}/quiz/${req.params.id}/take?token=${req.token}`, ['1080x920'], {crop: true,scale:.2,}).run().then(res => {
            img = res[0].toString('base64')
        })
    
    
        res.send(img)
    } catch (err) {
        res.status(500).send(`${err}`)
    }
})



module.exports = router