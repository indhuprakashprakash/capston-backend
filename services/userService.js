
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

export async function createUser(data) {
  const existingUser = await User.findOne({ phoneNumber: data.phoneNumber });
  if (existingUser) {
    return { status: "Error", message: "Mobile Number already exists" };
    // throw new Error("Mobile Number already exists");
  }
  let users = [];
  users.push(data);
  return await User.insertMany(data);
}

export async function sendOTPService(phoneNumber) {
  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return {
        status: "Error",
        message: "Mobile Number does not exist! Please register to continue",
      };
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOTP = await bcrypt.hash(otp, 10);

    user.otp = hashedOTP;
    await user.save();

    const message = `Your OTP for verification is: ${otp}`;

    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      // to: phoneNumber,
      to: `+91${phoneNumber}`,
    });

    return otp;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send OTP", error);
  }
}

export async function verifyOTPService(phoneNumber, otp) {
  try {
    const user = await User.findOne({ phoneNumber: phoneNumber });
    if (!user) {
      return {
        status: "Error",
        message: "User Does not exist",
      };
    }

    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
      return {
        status: "Error",
        message: "OTP is not matched",
      };
      
    }

    

    const token = jwt.sign(
      { name: user.username },
      `${process.env.JWT_SECRET_KEY}`,
      { expiresIn: "1h" }
    );

    return { success: "Success", message: token };
  } catch (error) {
    console.log(error);
    throw error;
  }
}