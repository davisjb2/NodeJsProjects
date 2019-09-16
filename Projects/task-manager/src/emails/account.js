const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'davisjb2@appstate.edu',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${ name }`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'davisjb2@appstate.edu',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${ name }`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}