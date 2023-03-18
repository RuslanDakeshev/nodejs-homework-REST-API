const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const mail = {
  to: "ruha08@live.com",
  from: "bil081@meta.ua",
  subject: "Когда уже",
  html: "Пиво",
};

sgMail
  .send(mail)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });