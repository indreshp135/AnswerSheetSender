# AnswerSheetSender
This repo can be used to send answer sheets to students

##  Requirements
[NODESJS](https://nodejs.org/en/)

## Working 
Download **NODEJS** and install.<br>
In command prompt go to respective directory and clone the repo or download zip file and extract
```sh
git clone https://github.com/indreshp135/AnswerSheetSender
```
Then in `AnswerSheetSender` directory there will be `sheets` folder or create it.<br>
Remove files (if any) and paste all answer sheets (pdf format with first nine letters of file name as full roll no eg:-"`106119052`_ct1 - Indresh.pdf")<br>
Then fill the required details in .env file(GMAIL, PASSWORD, SUBJECT of mail).<br>
In command prompt go to AnswerSheetSender directory run 

```sh
npm start
```

If it throws Auth error, check your mail and allow current activity. (Googles latest update doesn't allow access from new devices) And then give permission for `less secure apps` using [this](https://www.google.com/settings/security/lesssecureapps) link. Then try again 
```sh
npm start
```
This will log which file is sent to which email address and other errors if any and delete the pdf after sent.

---
**NOTE**

The files that got error while sending will remain in sheets directory so we can use ```npm start``` again for sending error files

---
