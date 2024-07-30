const nodemailer = require('nodemailer');

module.exports.sendEmail = (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SEND_MAIL_EMAIL,
      pass: process.env.SEND_MAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.SEND_MAIL_EMAIL,
    to: email,
    subject: subject,
    html: html
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}