const mongoose = require('mongoose')
const os = require('os')
const keys = require('../keys/keys')
//file at ./server/keys/keys.js

let uri = null

if(!keys){
    console.log('Db key not found. Please contact me to get key.(only if I told you to check it out)')
}


//switch between pord and dev
if(os.hostname() == 'IlayBIgPc'){
    uri = 'mongodb://127.0.0.1:27017/quiz-app'
}else{
    uri = keys.mongodbKey
}

//connects to db
mongoose.connect(uri,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
})