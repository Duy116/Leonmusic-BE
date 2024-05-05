import nodemailer from 'nodemailer'

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nguyenduykhuongtqtpy@gmail.com',
    pass: 'duamqdclabbkwesy',
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
