const express = require('express')
const app = express()
const nodemailer = require('nodemailer')

// respond with "hello world" when a GET request is made to the homepage
app.get('/', async (req, res) => {
    res.send('hello world')
    try {
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "msanroman@uap.edu.pe", // generated ethereal user
                pass: "Uap.2022", // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <msanroman@uap.edu.pe>', // sender address
            to: "msanroman@uap.edu.pe, msanroman@uap.edu.pe", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    catch (e) {
        console.log(e)
    }
})

if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
}