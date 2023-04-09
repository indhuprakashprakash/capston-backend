import express from "express";
import {
  createUserHandler,
  sendOTPHandler,
  verifyOTPHandler,
} from "./controllers/userController.js";

const router = express.Router();

router.post("/api/signUp", createUserHandler);
router.post("/api/signIn", sendOTPHandler);
router.post("/api/verifyOtp", verifyOTPHandler);

export { router as routes };

const Router = express.Router();

router.get("/api/allUsers", fetchAllUsersHandler);
router.post("/api/signUp", createUserHandler);
router.post("/api/signIn", sendOTPHandler);
router.post("/api/verifyOtp", verifyOTPHandler);

//Meetings routes

router.post("/api/meetings", authenticate, createMeetingHandler);

router.put(
  "/api/meetings/:meetingId/accept",
  authenticate,
  acceptMeetingRequestHandler
);

router.put(
  "/api/meetings/:id/reject",
  authenticate,
  rejectMeetingRequestHandler
);

export { router as routes };