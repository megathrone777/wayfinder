import React from "react";

import { uuid } from "@/utils";

import type { TProps } from "./Messages.types";

const Messages: React.FC<TProps> = ({ addToolOutput, messages }) => {
  return (
    <div
      style={{
        flexGrow: 1,
        maxWidth: "100%",
        overflowY: "auto",
        scrollbarWidth: "none",
        width: "100%",
      }}
    >
      <ul style={{ display: "flex", flexDirection: "column", gap: 15, paddingBottom: 20 }}>
        {messages.map<React.ReactElement>((message) => (
          <li key={`${message.id}-${uuid()}`}>
            <strong>{message.role}</strong>

            {message.parts.map<null | React.ReactElement>((part) => {
              if (part.type === "text") {
                return <p key={`${message.id}-text-${uuid()}`}>{part.text}</p>;
              }

              if (part.type === "tool-bookTrip") {
                if (part.state === "input-available") {
                  const { itinerarySummary, totalPrice } = part.input;

                  return (
                    <div key={part.toolCallId}>
                      <p>Approval needed — book this trip?</p>
                      <p>{itinerarySummary}</p>
                      <p>Total: ${totalPrice}</p>

                      <button
                        onClick={(): void => {
                          void addToolOutput({
                            output: {
                              confirmed: true,
                              itinerarySummary: "",
                              totalPrice: 0,
                            },
                            tool: "bookTrip",
                            toolCallId: part.toolCallId,
                          });
                        }}
                        type="button"
                      >
                        Approve &amp; book
                      </button>

                      <button
                        onClick={(): void => {
                          void addToolOutput({
                            output: { confirmed: false },
                            tool: "bookTrip",
                            toolCallId: part.toolCallId,
                          });
                        }}
                        type="button"
                      >
                        Reject
                      </button>
                    </div>
                  );
                }

                if (part.state === "output-available") {
                  return <p key={part.toolCallId}>Booking: {JSON.stringify(part.output)}</p>;
                }

                return <p key={part.toolCallId}>Preparing booking…</p>;
              }

              // ---- Search tool calls (inspector-style dump) ------------
              if (part.type === "tool-searchFlights" || part.type === "tool-searchHotels") {
                return (
                  <details key={part.toolCallId}>
                    <summary>
                      {part.type} · {part.state}
                    </summary>
                    <pre>
                      {JSON.stringify(
                        part.state === "output-available" ? part.output : part.input,
                        null,
                        2
                      )}
                    </pre>
                  </details>
                );
              }

              return null;
            })}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Messages };
