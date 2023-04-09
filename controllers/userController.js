
import jwt from "jsonwebtoken"
import {
  createUser,
  sendOTPService,
  verifyOTPService,
} from "../services/userService.js";

export async function createUserHandler(req, res) {
  try {
    const user = await createUser(req.body);
    if (user.status === "error") {
      return res.status(401).send(user.message);
    } else {
      return res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).send("Error While Creating User", err);
  }
}

export async function sendOTPHandler(req, res) {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res
        .status(400)
        .json({ message: "Phone number is required to send OTP" });
    }

    const result = await sendOTPService(phoneNumber);

    return res.status(200).json({ message: result });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while sending OTP" });
  }
}

export async function verifyOTPHandler(req, res) {
  try {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber) {
      return res
        .status(400)
        .json({ message: "Phone number is required to verify OTP" });
    }

    if (!otp) {
      return res.status(400).json({ message: "OTP is required to verify OTP" });
    }

    const user = await verifyOTPService(phoneNumber, otp);
    if (user.status === "error") {
      return res.status(401).send(user.message);
    } else {
      return res
        .status(200)
        .json({ message: "OTP verifies successfully", status: user.message });
    }

    //  
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while verifying OTP" });
  }
} 