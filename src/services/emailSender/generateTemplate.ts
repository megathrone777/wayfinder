import fs from "fs";
import path from "path";

import pug from "pug";

import type { TGenerateTemplateInput } from "./emailSender.types";

const basedir = path.join(process.cwd(), "src", "services", "emailSender", "template");
const filename = path.join(basedir, "template.pug");

const generateTemplate = async ({ booking, company }: TGenerateTemplateInput): Promise<string> => {
  const source = await fs.promises.readFile(basedir, "utf8");
  const compile = pug.compile(source, {
    basedir,
    filename,
  });

  return compile({
    booking,
    company,
  });
};

export { generateTemplate };
