const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const mail = {
  to: "",
  from: "",
  subject: "",
  html: "",
};

sgMail
  .send(mail)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });