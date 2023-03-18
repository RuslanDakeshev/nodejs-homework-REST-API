const nodemailer = require('nodemailer')
require('dotenv').config()

const { META_PASSWORD } = process.env

const nodemailerConfig = {
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
        user:,
        pass:META_PASSWORD
    }
}

const transport = nodemailer.createTransport(nodemailerConfig)

const mail = {
    to: '',
    from: '',
    subject: '',
    html: ''
}

transport.sendMail(mail)
    .then(() => console.log('Email send success'))
.catch(error=> console.log(error.message))