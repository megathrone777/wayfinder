"use server";
import { mailer } from "@/services";

const sendBooking = async (booking: TBooking): Promise<boolean> => mailer.sendEmail(booking);

export { sendBooking };
