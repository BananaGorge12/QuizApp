const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//constrctor for user
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        validate(email){
            if(!validator.default.isEmail(email)){
                throw new Error('Please proived a valid email')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    assignedQuizzes:[]
})

userSchema.virtual('quizs', {
    ref: 'Quiz',
    localField: '_id',
    foreignField: 'owner'
})


// hashes password on create/change
userSchema.pre('save', async function(next){

    //if password was set/changes
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8)
    }

    next()
})


//methods for new jwt
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'secretTokenKey')
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

//deletes private data before sending to user
userSchema.methods.toJSON = function() {
    const userObject = this.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

const User = mongoose.model('User',userSchema) 

//exports it
module.exports = User