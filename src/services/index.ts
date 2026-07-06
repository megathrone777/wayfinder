import { streamMessages } from "./ai";
import { sendBookingEmail } from "./emailSender";

export const ai = {
  streamMessages,
};

export const emailSender = {
  sendBookingEmail,
};
