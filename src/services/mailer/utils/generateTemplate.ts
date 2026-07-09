import { readFile } from "fs/promises";
import path from "path";

import pug from "pug";

import type { TGenerateTemplateInput } from "./types";

const basedir = path.join(process.cwd(), "src", "services", "mailer", "template");
const filename = path.join(basedir, "template.pug");

const generateTemplate = async ({ booking, company }: TGenerateTemplateInput): Promise<string> => {
  const source = await readFile(filename, "utf8");
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
