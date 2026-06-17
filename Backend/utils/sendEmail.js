import nodemailer from "nodemailer";

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (
  to,
  subject,
  text
) => {
  try {
    await transporter.sendMail({
  from: "campushire.tpo@gmail.com",
  to,
  subject,
  text,
});

   console.log("Email sent successfully to:", to);
  } catch (err) {
    console.log("Email error full:", err);
  }
};