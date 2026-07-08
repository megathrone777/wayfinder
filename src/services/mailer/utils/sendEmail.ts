"use server";
import { createTransport } from "nodemailer";

import { generateTemplate } from "./generateTemplate";

const sendEmail = async (booking: TBooking): Promise<boolean> => {
  if (process.env.EMAIL_ORDER_CONFIRMATION_ENABLED !== "true") return false;
  const emailAddress = process.env.EMAIL_ADDRESS;
  const emailPassword = process.env.EMAIL_APP_PASSWORD;

  try {
    const html = await generateTemplate({
      booking,
      company: {
        email: emailAddress,
        phone: "+420 777 888 999",
        webAddress: process.env.PUBLIC_URL,
      },
    });
    const transporter = createTransport({
      auth: { pass: emailPassword, user: emailAddress },
      host: "smtp.gmail.com",
      secure: false,
      service: "gmail",
    });
    const info = await transporter.sendMail({
      from: emailAddress,
      html,
      subject: `${process.env.PUBLIC_URL?.replace(/^https?:\/\//, "") ?? ""}: Booking confirmation №489`,
      to: booking.clientEmail,
    });

    return info.accepted.length === 1;
  } catch (error) {
    console.error("Send booking email failed", error);

    return false;
  }
};

export { sendEmail };
