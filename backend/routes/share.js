const sgMail = require("@sendgrid/mail");
const express = require("express");

const router = express.Router();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { email, content } = req.body;
    const msg = {
      to: email,
      from: "your-email@example.com",
      subject: "Shared Annotations",
      text: content,
    };
    await sgMail.send(msg);
    res.json({ message: "Email sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while sending the email" });
  }
});

module.exports = router;
