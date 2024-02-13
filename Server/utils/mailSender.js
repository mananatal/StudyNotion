const nodemailer = require("nodemailer");
require("dotenv").config();

exports.mailSender=async (email,title,body)=>{
    try{
            const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
              user:process.env.MAIL_USER ,
              pass: process.env.MAIL_PASS,
            },
          });
 
          const info = await transporter.sendMail({
            from:"StudyNotion", // sender address
            to:`${email}`, // list of receivers
            subject: `${title}`, // Subject line
            html: `${body}`, // plain text body            
          });

          return info;

    }catch(error)
    {
        console.log("Error while sending mail",error)
    }
}