"use server";
import { createTransport } from "nodemailer";

import { generateTemplate } from "./generateTemplate";

const sendEmail = async (booking: TBooking): Promise<boolean> => {
  if (!booking.clientEmail) return false;
  const emailAddress = process.env.EMAIL_ADDRESS;
  const emailPassword = process.env.EMAIL_APP_PASSWORD;
  const isProduction: boolean = process.env.NODE_ENV === "production";

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
      auth: isProduction ? { pass: emailPassword, user: emailAddress } : undefined,
      host: process.env.EMAIL_SMTP_HOST,
      port: 1025,
      secure: false,
      service: isProduction ? "gmail" : undefined,
    });
    const info = await transporter.sendMail({
      from: emailAddress ?? "Wayfinder <noreply@wayfinder.local>",
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
