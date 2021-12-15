const nodemailer = require("nodemailer");
const appRoot = require('app-root-path');

let mailer = {};
// async..await is not allowed in global scope, must use a wrapper
mailer.send = async function(to, subject, html, fileName,projectId) {
try{
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //if( (typeof to !='object')||(to.length <= 0)) return 'to should be an array of emails'

  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: ENV.SMTP_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: ENV.SMTP_USER, // generated ethereal user
      pass: ENV.SMTP_PASSWORD, // generated ethereal password
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: ENV.MAIL_SENDER, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: html, // html body
    attachments: [{ // use URL as an attachment
      filename: fileName.split('/').slice(-1)[0],
      path: fileName
    }]
  });

  let newMailHistory = new Models.MailHistory({
    mail_from: ENV.MAIL_SENDER, // sender address
    mail_to: to, // list of receivers
    subject: subject, // Subject line
    body: html, // html body});
    send_date: new Date(),
    Project:projectId
  });
  newMailHistory.save();

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log(info);
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...}
}
catch(err){
  console.error(err)
}
}

module.exports = mailer;
