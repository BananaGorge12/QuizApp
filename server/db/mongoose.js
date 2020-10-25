const mongoose = require('mongoose')

//connects to db
mongoose.connect('mongodb://127.0.0.1:27017/quiz-app',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
})