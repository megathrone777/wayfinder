declare global {
  interface TActionResult {
    message: string;
    type: "error" | "success";
  }
}

export {};
