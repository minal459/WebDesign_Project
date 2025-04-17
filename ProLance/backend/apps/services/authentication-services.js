import { User } from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { findById } from "./job-applications-services.js";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'prolance502@gmail.com',
      pass: 'uuss lvkm eunh vlej',
    },
  });
  
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
}

export const save = async (newUser) => {    
    const hashPassword = bcrypt.hashSync(newUser.body.password, 5);
    const activationToken = generateUUID();
    const postUser = new User({
        ...newUser.body,
        password: hashPassword,
        token: activationToken,
    });
    const user = new User(postUser);
    const createdUser =  await user.save();
    const {password, ...data} = createdUser._doc;
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: postUser.email,
        subject: 'Account Activation',
        text: `Dear ${postUser.name},\n\nWelcome to ProLance! We are delighted to have you on board.\n\nTo activate your account, please click on the following link:\nhttp://localhost:3000/activate/${activationToken}\n\nIf you did not create an account with us, kindly ignore this email.\n\nThank you for choosing ProLance.\n\nBest Regards,\nThe ProLance Support Team`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        }
        console.log('Email sent: ' + info.response);
      });
    
    return data;
}

export const login = async (request) => {

    const user = await User.findOne({ username: request.body.username});
    if(!user){
        return {token: null,user: null,status: 404};
    }
    const comparePassword = bcrypt.compareSync(request.body.password,user.password);
    if(!comparePassword){
        return {token: null,user: null,status: 401};
    }
    const jwtToken = jwt.sign({
        id: user._id,
        isSeller : user.isSeller,
    }, process.env.JWT_SECRET);
    const {password, ...data} = user._doc;

    return {token: jwtToken,user: data,status: 201};
}

export const logout = async (response) => {

    response.clearCookie("accessToken",{
        sameSite: "none",
        secure: true
    }).status(200).json({"message":"User logged out!"});
}

// export const activateAccount = async (request) => {

//     const activationToken = request.params.token;
//     const user = await User.findOneAndUpdate(
//         {
//           token: activationToken,
//         },
//         {
//           $set: {
//             isActivated: true,
//           },
//         },
//         { new: true }
//       );
//       return user;

// }

export const activateAccount = async (request) => {
  const activationToken = request.params.token;
  console.log("Activation Token from URL:", activationToken);

  // Look for the user with the given token
  const user = await User.findOneAndUpdate(
    { token: activationToken },
    { $set: { isActivated: true } },
    { new: true }
  );
  console.log("User found:", user);

  // If the token is not found, return an error
  if (!user) {
      throw new Error('Invalid or expired activation link');
  }

  return user;
}
