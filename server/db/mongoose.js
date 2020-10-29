const mongoose = require('mongoose')
const os = require('os')
const keys = require('../secret/keys')

let url = null

//switch between pord and dev
if(os.hostname() == 'IlayBIgPc'){
    url = 'mongodb://127.0.0.1:27017/quiz-app'
}else{
    url = keys.mongodbKey
}


//connects to db
mongoose.connect(url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
})