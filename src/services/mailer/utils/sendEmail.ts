"use server";
import { createTransport, type SMTPTransportOptions } from "nodemailer";

import { generateTemplate } from "./generateTemplate";

const sendEmail = async (booking: TBooking): Promise<boolean> => {
  if (!booking.clientEmail) return false;
  const isProduction: boolean = process.env.NODE_ENV === "production";

  const smtpEmail = process.env.EMAIL_SMTP_ADDRESS!;
  const smtpHost = process.env.EMAIL_SMTP_HOST;
  const smtpPassword = process.env.EMAIL_SMTP_PASSWORD;
  const smtpPort = +process.env.EMAIL_SMTP_PORT;
  const smtpSecure = isProduction;

  const smtpOptions: SMTPTransportOptions = {
    auth: {
      pass: smtpPassword,
      user: smtpEmail,
    },
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
  };

  console.log(smtpOptions);

  try {
    const html = await generateTemplate({
      booking,
      company: {
        email: smtpEmail,
        phone: "+420 777 888 999",
        webAddress: process.env.PUBLIC_URL,
      },
    });
    const transporter = createTransport(smtpOptions);
    const info = await transporter.sendMail({
      from: smtpEmail ?? "Wayfinder <noreply@wayfinder.local>",
      html,
      subject: `${process.env.PUBLIC_URL?.replace(/^https?:\/\//, "") ?? ""}: Booking confirmation №489`,
      to: booking.clientEmail,
    });

    return info.accepted.length === 1;
  } catch (error) {
    const responseCode = (error as { responseCode?: number }).responseCode;

    console.error("Send booking email failed", error, {
      authConfigured: Boolean(smtpEmail && smtpPassword),
      hint:
        responseCode === 535
          ? "Gmail rejected the SMTP credentials (535). Regenerate the app password at " +
            "https://myaccount.google.com/apppasswords (2-Step Verification must be on) and update " +
            "EMAIL_APP_PASSWORD in Vercel, then redeploy."
          : undefined,
      host: smtpHost,
      port: smtpPort,
      responseCode,
      secure: smtpSecure,
      user: smtpEmail,
    });

    return false;
  }
};

export { sendEmail };
