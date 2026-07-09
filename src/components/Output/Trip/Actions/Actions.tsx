"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Form from "next/form";

import { agent } from "@/services";
import { useAgentStore } from "@/store";
import { Button, Icon, Spinner } from "@/ui";

import { sendBooking } from "./sendBooking";

import {
  layoutClass,
  errorClass,
  fieldClass,
  fieldIconClass,
  formClass,
  inputClass,
  statusClass,
} from "./Actions.css";

type TStatus = "error" | "idle" | "sending" | "sent";

const Actions: React.FC = () => {
  const t = useTranslations("Trip");
  const messages = useAgentStore(({ messages }) => messages);
  const booking = agent.getOutput(messages, "tool-bookTrip");

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [status, setStatus] = useState<TStatus>("idle");
  const [sentTo, setSentTo] = useState<string>("");

  const handleDownloadClick = (): void => {
    window.print();
  };

  const handleSendClick = (): void => {
    setIsOpened(true);
  };

  const handleCloseClick = (): void => {
    setIsOpened(false);
    setStatus("idle");
  };

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const email = `${new FormData(event.currentTarget).get("email") || ""}`.trim();

    if (!booking || !email) return;
    setStatus("sending");

    const sent = await sendBooking({
      bookedAt: booking.output.bookedAt ?? new Date().toISOString(),
      clientEmail: email,
      confirmed: booking.output.confirmed,
      itinerarySummary: booking.output.itinerarySummary ?? "",
      totalPrice: booking.output.totalPrice ?? 0,
    });

    setSentTo(email);
    setStatus(sent ? "sent" : "error");
  };

  if (status === "sent") {
    return <p className={statusClass}>{t("sent", { email: sentTo })}</p>;
  }

  return (
    <>
      {isOpened ? (
        <div className={layoutClass}>
          {status === "error" && <p className={errorClass}>{t("sendError")}</p>}

          <Form
            action="#"
            className={formClass}
            onSubmit={handleSubmit}
          >
            <div className={fieldClass}>
              <Icon
                className={fieldIconClass}
                id="mail"
              />

              <input
                autoComplete="new-password"
                autoFocus
                className={inputClass}
                name="email"
                placeholder={t("emailPlaceholder")}
                required
                type="email"
              />
            </div>

            <Button
              disabled={status === "sending"}
              size="small"
              template="tertiary"
              type="submit"
            >
              {status === "sending" ? <Spinner template="small" /> : t("send")}
            </Button>

            <Button
              iconId="close"
              onClick={handleCloseClick}
              size="small"
              template="tertiary"
              type="button"
            />
          </Form>
        </div>
      ) : (
        <Button
          iconId="mail"
          onClick={handleSendClick}
          size="small"
          template="tertiary"
        >
          {t("sendToEmail")}
        </Button>
      )}

      <Button
        iconId="download"
        onClick={handleDownloadClick}
        size="small"
        template="secondary"
      >
        {t("download")}
      </Button>
    </>
  );
};

export { Actions };
