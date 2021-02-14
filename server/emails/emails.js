const fs = require('fs')

const verifyEmail = fs.readFileSync(`${__dirname}/verifyEmail.html`).toString()


module.exports = {
    verifyEmail,
}