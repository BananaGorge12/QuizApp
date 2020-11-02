const { sendGridApiKey } = require('../keys/keys')
const sgMail = require('@sendgrid/mail')

//uses api key
sgMail.setApiKey(sendGridApiKey)


const sendTextEmail = (to,subject,text) => {
    sgMail.send({
        from:'quizapp@ilaydev.com',
        to,
        subject,
        text,
    })
}


const sendHtmlEmail = (to,subject,html) => {
    sgMail.send({
        from:'quizapp@ilaydev.com',
        to,
        subject,
        html,
    })
}


module.exports = {
    sendTextEmail,
    sendHtmlEmail,
}