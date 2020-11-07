const express = require('express')
const path = require('path')


//start express
const app = express()

//confing express to parse json
app.use(express.json())


//port swich for prod and dev
const port = process.env.PORT || 3000


//runs file which connects to db
require('./db/mongoose.js')

//loads routes
const userRoutes = require('./routes/user')
app.use(userRoutes)
const quizRoutes = require('./routes/quiz')
app.use(quizRoutes)




app.use(express.static(__dirname + '/dist/'))

//handel SPA
app.get(/.*/, (req,res) => {
    res.sendFile(__dirname + '/dist/index.html')
})


app.listen(port,() => {
    console.log(`Runing on port ${port}`)
})