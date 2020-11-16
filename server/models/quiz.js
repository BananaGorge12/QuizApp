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
    },
    students:[],
    answers:[],
    background:{},
})


//deletes private data before sending to user
quizSchema.methods.toJSON = function() {
    const userObject = this.toObject()

    delete userObject.background

    return userObject
}



const Quiz = mongoose.model('Quiz',quizSchema)

module.exports = Quiz