const express = require('express')
const path = require('path')
const history = require('connect-history-api-fallback')


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



//configre express to use the vue router
const staticFileMiddleware = express.static(path.join(__dirname,'/dist'));
app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  verbose: true
}));
app.use(staticFileMiddleware);


app.listen(port,() => {
    console.log(`Runing on port ${port}`)
})