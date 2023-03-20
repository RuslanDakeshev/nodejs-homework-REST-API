const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY1 } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY1);

//    const msg = {
//      to: email,
//      from: "bil081@meta.ua",
//      subject: "Verification email address",
//      html: `<p>By clicking on the following link, you are confirming your email address.
//       <a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Confirm email address</a></p>`,
//    };

// sgMail.send(msg)
//   .then(() => console.log("Email send success"))
//   .catch(error => console.log(error.message));

const sendEmail = async(data) => {
    const mail = { ...data, from: "bil081@meta.ua" }
    await sgMail.send(mail)
    return true
}



module.exports = { sendEmail }
