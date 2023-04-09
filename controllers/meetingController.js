
import {
    createMeeting,
    updateMeetingStatus,
  } from "../services/meetingServices.js";
  
  export async function createMeetingHandler(req, res) {
    try {
      const { requesterId, receiverIds, startDateTime, endDateTime } = req.body;
  
      const meeting = await createMeeting(
        requesterId,
        receiverIds,
        startDateTime,
        endDateTime
      );
  
      // if (meeting.status === "error") {
      //   return res.status(400).json({ message: meeting.message });
      // }
  
      res.status(201).json(meeting);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  
  export async function updateMeetingStatusHandler(req, res) {
    try {
      const { meetingId, receiverId, status } = req.body;
  
      const updatedMeeting = await updateMeetingStatus(
        meetingId,
        receiverId,
        status
      );
  
      if (updatedMeeting.status === "error") {
        return res.status(404).json({ message: updatedMeeting.message });
      }
  
      res.json(updatedMeeting);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  
  export async function acceptMeetingRequestHandler(req, res) {
    try {
      const meetingId = req.params.meetingId;
      const receiverId = req.body.receiverId;
      const status = req.body.status;
      const updatedMeeting = await updateMeetingStatus(
        meetingId,
        receiverId,
        "accepted"
      );
  
      if (!updatedMeeting) {
        return res.status(404).json({ message: "Meeting not found" });
      }
  
      res.json(updatedMeeting);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  
  export async function rejectMeetingRequestHandler(req, res) {
    try {
      const meetingId = req.params.id;
      const updatedMeeting = await updateMeetingStatus(meetingId, "rejected");
  
      if (!updatedMeeting) {
        return res.status(404).json({ message: "Meeting not found" });
      }
  
      res.json(updatedMeeting);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }