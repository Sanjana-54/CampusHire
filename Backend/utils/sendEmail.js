import axios from "axios";

export const sendEmail = async (
  to,
  subject,
  text
) => {
     console.log(
    "BREVO_API_KEY exists:",
    !!process.env.BREVO_API_KEY
  );

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "CampusHire",
          email: "campushire.tpo@gmail.com",
        },
        to: [
          {
            email: to,
          },
        ],
        subject,
        textContent: text,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Email sent:", response.data);
  } catch (err) {
    console.log(
      "Brevo API Error:",
      err.response?.data || err.message
    );
  }
};