

import Meeting from "../models/meetings.js";
import Invitee from "../models/invitees.js";

export async function createMeeting(
  // meetingDesc,
  requesterId,
  receiverIds,
  startDateTime,
  endDateTime
) {
  try {
    const meeting = await Meeting.create({
      // meetingDesc,
      requesterId,
      receiverIds,
      startDateTime,
      endDateTime,
    });

    // Add meeting to invitees of each receiver
    for (const receiverId of receiverIds) {
      await Invitee.create({
        meetingId: meeting._id,
        receiverId,
        status: "pending",
      });
    }

    return meeting;
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Error while creating meeting" };
  }
}

export async function updateMeetingStatus(meetingId, receiverId, status) {
  console.log(meetingId, receiverId, status);
  try {
    const invitee = await Invitee.findOneAndUpdate(
      { meetingId, receiverId },
      { status },
      { new: true }
    ).populate("meetingId");

    console.log(invitee);
    if (!invitee) {
      return { status: "error", message: "Invitee not found" };
    }

    // Check if all invitees have accepted/rejected the meeting
    const allInvitees = await Invitee.find({ meetingId });

    console.log("Demo", allInvitees);

    const allInviteesStatuses = allInvitees.map((invitee) => invitee.status);
    console.log("second", allInviteesStatuses);
    if (!allInviteesStatuses.includes("pending")) {
      const meeting = await Meeting.findByIdAndUpdate(
        meetingId,
        { status: "completed" },
        { new: true }
      )
        .populate("requesterId")
        .populate("receiverIds");
      return meeting;
    }

    return invitee.meetingId;
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Error updating meeting status" };
  }
}