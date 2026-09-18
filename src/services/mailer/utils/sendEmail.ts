"use server";
import { createTransport } from "nodemailer";

import { generateTemplate } from "./generateTemplate";

const sendEmail = async (booking: TBooking): Promise<boolean> => {
  if (!booking.clientEmail) return false;
  const emailAddress = process.env.EMAIL_ADDRESS?.trim();
  const emailPassword = process.env.EMAIL_APP_PASSWORD?.trim();
  const isProduction: boolean = process.env.NODE_ENV === "production";

  if (isProduction && (!emailAddress || !emailPassword)) {
    console.error(
      "Send booking email failed: EMAIL_ADDRESS and/or EMAIL_APP_PASSWORD are not configured."
    );

    return false;
  }

  const smtpHost = process.env.EMAIL_SMTP_HOST ?? (isProduction ? "smtp.gmail.com" : "localhost");
  const smtpPort = +(process.env.EMAIL_SMTP_PORT ?? (isProduction ? 465 : 1025));
  const smtpSecure = isProduction ? smtpPort === 465 : false;

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
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
    });
    const info = await transporter.sendMail({
      from: emailAddress ?? "Wayfinder <noreply@wayfinder.local>",
      html,
      subject: `${process.env.PUBLIC_URL?.replace(/^https?:\/\//, "") ?? ""}: Booking confirmation №489`,
      to: booking.clientEmail,
    });

    return info.accepted.length === 1;
  } catch (error) {
    const responseCode = (error as { responseCode?: number }).responseCode;

    console.error("Send booking email failed", error, {
      authConfigured: Boolean(emailAddress && emailPassword),
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
      user: emailAddress,
    });

    return false;
  }
};

export { sendEmail };
