const mongoose = require('mongoose')

//contactor for quiz
const classSchema = mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required:true,
    },
    students:[],
})



const Class = mongoose.model('Class',classSchema)

module.exports = Class