const path = require("path");
const fs = require("fs");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const directory = path.join(__dirname, "sheets");

fs.readdir(directory, (err, files) => {
  if (err) {
    console.error("\x1b[31m", "Could not list the directory.", err);
  }
  if (files) {
    if (files.length === 0) {
      console.error("\x1b[31m", "No files in sheets directory");
    }
    files.forEach((file) => {
      const name = file;
      const regno = name.substr(0, 9);
      const format = name.substr(-3, 3);
      if (format === "pdf") {
        const mailOptions = {
          to: regno + "@nitt.edu",
          from: process.env.GMAIL,
          subject: process.env.SUBJECT,
          text: "Check your answer sheet in attchments",
          attachments: [
            {
              content: fs
                .readFileSync(path.join(__dirname, "sheets", file))
                .toString("base64"),
              filename: file,
              type: "application/pdf",
              disposition: "attachment",
            },
          ],
        };

        sgMail.send(mailOptions, (err) => {
          if (err)
            console.error(
              "\x1b[34m",
              file,
              "\x1b[35m",
              "file not sent to",
              "\x1b[36m",
              regno + "@nitt.edu",
              err.response.body
            );
          else {
            console.log(
              "\x1b[34m",
              file,
              "\x1b[37m",
              "file sent to",
              "\x1b[36m",
              regno + "@nitt.edu"
            );
            fs.unlinkSync(path.join(__dirname, "sheets", file));
          }
        });
      } else console.error("\x1b[34m", file, "\x1b[31m", "- Not in pdf format");
    });
  }
  console.log("\x1b[37m");
});
