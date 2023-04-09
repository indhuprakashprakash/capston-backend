
import mongoose from "mongoose";

const { Schema } = mongoose;

const meetingSchema = new Schema(
  {
    // meetingDesc: {
    //   type: String,
    //   required: true,
    // },
    requesterId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    startDateTime: {
      type: Date,
      required: true,
    },
    endDateTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;