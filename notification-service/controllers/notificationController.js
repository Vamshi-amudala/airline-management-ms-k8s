import { sendEmail } from "../services/emailService.js";

export const sendNotification = async (req, res) => {
  const { to, subject, message } = req.body;

  const success = await sendEmail(to, subject, message);
  if (success) {
    return res.status(200).json({ message: "Notification sent successfully" });
  } else {
    return res.status(500).json({ error: "Failed to send notification" });
  }
};
