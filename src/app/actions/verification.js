
import nodemailer from 'nodemailer'

export default async function sendVerifyCode(data) {
    const transporter = nodemailer.createTransport({
        service: process.env.Email_SERVICE_NAME,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // Compose the email
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: data.email,
        subject: 'هلا',
        html: `<h1>code</h1>`
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}