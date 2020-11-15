const express = require('express')
const puppeteer = require('puppeteer');


const auth = require('../middleware/auth')
const router = new express.Router()

const port = process.env.PORT


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
        },2000)
    } catch (err) {
        res.status(500).send(`${err}`)
    }
})



module.exports = router