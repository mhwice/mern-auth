import nodemailer from "nodemailer";
import { genVerificationTemplate } from "./email-templates.js";

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (toEmail, verificationCode) => {

  const mailOptions = {
    from: `"Welcome " <${process.env.EMAIL_SENDER}>`,
    to: toEmail,
    subject: 'Welcome', 
    html: genVerificationTemplate(verificationCode)
  };

  try {
    await transporter.sendMail(mailOptions); 
    console.log("email sent");
    return true; 
  } catch (error) {
    console.log(error);
    return false;
  }
}