const sgMail = require('@sendgrid/mail')
require('dotenv').config()

//uses api key
sgMail.setApiKey(process.env.SENDGRIDKEY)


const sendTextEmail = (to,subject,text) => {
    sgMail.send({
        from:'quizit@ilaydev.com',
        to,
        subject,
        text,
    })
}


const sendHtmlEmail = (to,subject,html) => {
    sgMail.send({
        from:'quizit@ilaydev.com',
        to,
        subject,
        html,
    })
}


module.exports = {
    sendTextEmail,
    sendHtmlEmail,
}