const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
require('dotenv').config();
const directory = path.join( __dirname,'sheets');

var transporter = nodemailer.createTransport({
    service:'gmail',
    pool:true,
    auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD
    }
});

fs.readdir(directory,(err,files)=>{
    if (err) {
        console.error("\x1b[31m","Could not list the directory.", err);
    }
    if(files){
        if(files.length===0){
            console.error("\x1b[31m","No files in sheets directory");
        }
        files.forEach(file=>{
            const name = file;
            const regno = name.substr(0,9)
            const format = name.substr(-3,3)
            if(format==="pdf"){
                const mailOptions = {
                    from: process.env.GMAIL,
                    to: regno+'@nitt.edu',
                    subject: process.env.SUBJECT,
                    attachments: [
                        {
                            filename: file,
                            path: path.join(__dirname, 'sheets', file),
                            contentType: 'application/pdf'
                        }
                    ]
                }
                transporter.sendMail(mailOptions,(err)=>{
                    if(err)
                        console.error(err)
                    else
                        console.log("\x1b[34m",file,"\x1b[37m",'file sent to',"\x1b[36m", regno +'@nitt.edu' )
                })
            }
            else
                console.error("\x1b[34m",file,"\x1b[31m",'- Not in pdf format');
        })
    }
    console.log("\x1b[37m")
})