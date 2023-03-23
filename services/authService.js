const { User } = require("../db/users");
const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { sendEmail } = require("../helpers/sendEmail");

const { v4: uuidv4 } = require("uuid");
const { BASE_URL } = process.env;

async function registration(email, password) {
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  const user = new User({ email, password, avatarURL, verificationToken });
  await user.save();

  const msg = {
    to: email,
    from: "bil081@meta.ua",
    subject: "Verification email address",
    html: `<p>By clicking on the following link, you are confirming your email address.
      <a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Confirm email address</a></p>`,
  };

  await sendEmail(msg);
}

async function login(_id, token) {
  await User.findByIdAndUpdate(_id, { token });
}

async function logout(_id) {
  return await User.findByIdAndUpdate(
    _id,
    { token: null },
    {
      new: true,
    }
  );
}

async function findUserId(_id) {
  return await User.findById(_id);
}

async function findUser(email) {
  const user = await User.findOne({ email });
  return user;
}

const updateUserAvatar = async (_id, avatarURL) => {
  const updatedAvatar = await User.findByIdAndUpdate(
    _id,
    { avatarURL },
    {
      new: true,
    }
  );

  return updatedAvatar;
};

module.exports = {
  registration,
  login,
  findUser,
  logout,
  findUserId,
  updateUserAvatar,
};
