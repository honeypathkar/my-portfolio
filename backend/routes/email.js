import express from "express";
import { transporter } from "../config/transporter.js";
import {
  ownerEmailTemplate,
  userConfirmationTemplate,
} from "../config/emailTemplate.js";

const router = express.Router();

router.post("/send-email", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).send("All form fields are required.");
  }

  const ownerMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECEIVING_EMAIL,
    ...ownerEmailTemplate({ name, email, subject, message }),
  };

  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    ...userConfirmationTemplate({ name, subject, message }),
  };

  transporter.sendMail(ownerMailOptions, (error, info) => {
    if (error) {
      console.error("Error sending to owner:", error);
      return sendEmailToUser(
        userMailOptions,
        res,
        "Error sending message. Please try again."
      );
    } else {
      console.log("Email sent to owner:", info.response);
      return sendEmailToUser(
        userMailOptions,
        res,
        "Your message has been sent successfully!"
      );
    }
  });
});

function sendEmailToUser(mailOptions, res, successMessage) {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending to user:", error);
      res.status(500).send("There was an error sending your message.");
    } else {
      console.log("Email sent to user:", info.response);
      res.status(200).send(successMessage);
    }
  });
}

export default router;
