require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const Work = require("./models/work-model");

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://honeypathkar.github.io/my-portfolio",
    ],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Routes
app.get("/", async (req, res) => {
  try {
    const works = await Work.find();
    res.status(200).json({ status: true, works });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch works" });
  }
});

app.post("/send-email", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).send("All form fields are required.");
  }

  const mailOptionsForOwner = {
    from: process.env.EMAIL_USER,
    to: process.env.RECEIVING_EMAIL,
    subject: `Portfolio Contact: ${subject} from ${name}`,
    text: `
You have received a new message:

Name: ${name}
Email: ${email}
Subject: ${subject}
Message:
${message}
    `,
  };

  const mailOptionsForUser = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Thank you for contacting me!`,
    text: `
Hi ${name},

Thank you for your message! I will get back to you soon.

Your message:
Subject: ${subject}
Message:
${message}

Best,
[Honey Pathkar]
    `,
  };

  transporter.sendMail(mailOptionsForOwner, (error, info) => {
    if (error) {
      console.error("Error sending to owner:", error);
      sendEmailToUser(
        mailOptionsForUser,
        res,
        "Error sending message. Please try again."
      );
    } else {
      console.log("Email sent to owner:", info.response);
      sendEmailToUser(
        mailOptionsForUser,
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
