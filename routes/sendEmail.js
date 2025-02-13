require("dotenv").config(); 
const { Router } = require("express");
const nodemailer = require("nodemailer");
const validator = require("validator");

const router = Router();

router.post("/send-email", async (req, res) => {
    const { to, subject, text } = req.body;

   

     if (!validator.isEmail(to)){
          throw new Error("Invalid email address");
      }

      if (!subject || !text) {
        return res.status(400).json({ error: "Missing required fields: subject, text" });
    }  

    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

module.exports = router;
