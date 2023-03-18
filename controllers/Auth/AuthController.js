const jwt = require("jsonwebtoken");
const User = require("../../db/users");
const {
  registration,
  login,
  findUser,
  logout,
  findUserId,
} = require("../../services/authService");
const { joiRegisterSchema } = require("../../schema/joiRegisterSchema");
const bCrypt = require("bcrypt");
const gravatar = require('gravatar')
const { BASE_URL } = process.env
const { sendMail } = require("../../helpers/sendEmail");


const registrationController = async (req, res) => {
  const { email, password } = req.body;

  const avatarUrl = gravatar.url(email)


  await registration(email, password,avatarUrl);

  res.json({ status: "success" });
};
// const loginController = async (req, res) => {
//     const { error } = joiRegistrationSchema.validate(req.body);
//     if (error) {
//       return res.status(400).json({ message: "Missing fields" });
//     }
//     const { email, password } = req.body;

//     const token = await login(email, password)

//     res.json({status:'success', token})

//  };

const loginController = async (req, res) => {
  const { error } = joiRegisterSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const { email, password } = req.body;
  const user = await findUser({ email });

  if (!user || !user.verify) {
    return res.status(409).json({ message: "Email in use" });
  }

  // if (!(await bCrypt.compare(password, user.password))) {
  //   return res.status(409).json({ message: "Wrong password" });
  // }

  const token = jwt.sign(
    { _id: user._id, cratedAt: user.subscription },
    process.env.JWT_SECRET
  );
  // return token
  return res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logoutController = async (req, res) => {
  const { _id } = req.user;
  await logout(_id);
    res.status(204).json({message: "No Content"});
};

const currentUserController = async (req, res) => {
  const { _id } = req.user;

  const user = await findUserId(_id);
  const { email, subscription } = user;

  return res.status(200).json({
    email: email,
    subscription: subscription,
  });
};

const verifyController = async(req, res) => { 
  const { verificationToken } = req.params
  const user = User.findOne({ verificationToken })
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: '' })
  res.status(200).json({ message: "Verification successful" });
}



const resendEmailController = async (req, res) => { 
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user || user.verify) {
    res.status(400).json({ message: "Verification has already been passed" });
  }

  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target='_blank' href='${BASE_URL}/api/users/verify/${user.verificationToken}'>Click to verify you email</a>`,
  };

  await sendMail(mail)

  res.status(200).json({ message:   "Verification email sent" });


}

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  verifyController,
  resendEmailController,
};

// async function register(req, res, next) {
//   const { email, password, username, about } = req.body;

//   const isAlreadyRegistered = await Users.exists({ email });

//   if (isAlreadyRegistered) {
//     return res.status(400).json({
//       code: 400,
//       data: { message: "Email already exists." },
//     });
//   }

//   const entity = new User({ email, username, about });
//   entity.setPassword(password);

//   await entity.save();

//   return res.status(201).end();
// }

// module.exports = {
//   login,
//   register,
// };
