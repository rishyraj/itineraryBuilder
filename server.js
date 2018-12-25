var express = require('express');
var bodyParser = require('body-parser')
var app = express();

var cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res){
    var calFile = req.body.calFile
    var tripFileName = req.body.tripFileName
    var email = req.body.email
    var person = req.body.person
    emailCalFile(calFile,tripFileName,email, person)
    res.send("email sent")
})



var port = 3000;
app.listen(port)
console.log('Listening on port: ' + port);

function emailCalFile (calFile, tripFileName, receiver, person) {
    const nodemailer = require('nodemailer');
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: false,
        port: 25,
        auth: { //code will not run until these credentials are updated
            user: '**Enter Sender Email**',
            pass: '**Enter Sender Password**'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    
    // setup email data with unicode symbols
    let mailOptions = {
        from: '**Enter Sender Address**', // sender address
        to: receiver, // list of receivers
        subject: 'CalFile', // Subject line
        text: 'Dear '+person+',\nThe .ics file is attached. Import the .ics file to your calendar application of choice(i.e Google Calendar, iCal, Microsoft Outlook etc.)\nEnjoy Your Trip', // plain text body
        attachments: [{
            filename: tripFileName,
            content: calFile
        }]
    };
    
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}

