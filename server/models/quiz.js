const mongoose = require('mongoose')

//contactor for quiz
const quizSchema = mongoose.Schema({
    questions:[{
        question:{
            title:{type:String,required},
            options:[{
                option:{type:String},
                correct:{type:Boolean}
            }]
        }
    }]
})


const Quiz = mongoose.model('Quiz',quizSchema)

module.exports = Quiz