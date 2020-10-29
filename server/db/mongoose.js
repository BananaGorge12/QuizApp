const mongoose = require('mongoose')
const os = require('os')
const keys = require('../secret/keys')

let uri = null

//switch between pord and dev
if(os.hostname() == 'IlayBIgPc'){
    uri = 'mongodb://127.0.0.1:27017/quiz-app'
}else{
    uri = keys.mongodbKey
}

console.log(process.env.MONGODB_URI)


//connects to db
mongoose.connect(process.env.MONGODB_URI || uri,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
})