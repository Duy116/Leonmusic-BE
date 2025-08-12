import nodemailer from 'nodemailer'

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_ADMIN,
    pass: process.env.PASS_MAIL_ADMIN,
  },
})

interface ISendMail {
  from: string
  to: string
  subject: string
  text: string
}

export const sendMail = (options: ISendMail) => {
  transporter.sendMail(options, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}
