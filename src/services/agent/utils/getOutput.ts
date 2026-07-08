const collectParts = (messages: TAgentUIMessage[]): TAgentPart[] =>
  messages.filter(({ role }) => role === "assistant").flatMap(({ parts }) => parts);

const getOutput = <T extends TAgentPart["type"]>(
  messages: TAgentUIMessage[],
  type: T
): Extract<TAgentPart, { state: "output-available"; type: T }> | undefined => {
  const parts: TAgentPart[] = collectParts(messages);

  return [...parts]
    .reverse()
    .find(
      (part): part is Extract<TAgentPart, { state: "output-available"; type: T }> =>
        part.type === type && "state" in part && part.state === "output-available"
    );
};

export { getOutput };
