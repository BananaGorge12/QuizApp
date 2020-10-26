const mongoose = require('mongoose')

//contactor for quiz
const quizSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        default:'New Quiz'
    },
    questions:[],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    }
})


const Quiz = mongoose.model('Quiz',quizSchema)

module.exports = Quiz