const express = require('express')


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
const imgRoutes = require('./routes/img')
app.use(imgRoutes)



//route from prod
app.use(express.static(__dirname + '/dist/'))

app.get(/.*/, (req,res) => {
    res.sendFile(__dirname + '/dist/index.html')
})

//listens for port (3000 for dev)
app.listen(port,() => {
    console.log(`Runing on port ${port}`)
})