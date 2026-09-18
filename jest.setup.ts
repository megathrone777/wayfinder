import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { fetch, Headers, Request, Response } from "undici";

Object.assign(globalThis, { fetch, Headers, Request, Response });

HTMLFormElement.prototype.requestSubmit = function (
  this: HTMLFormElement,
  submitter?: HTMLElement | null
): void {
  const event = Object.assign(new Event("submit", { bubbles: true, cancelable: true }), {
    submitter: submitter ?? null,
  });

  this.dispatchEvent(event);
};
