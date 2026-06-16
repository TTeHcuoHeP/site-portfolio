import "server-only";

import { readdirSync } from "node:fs";
import { extname, join, parse } from "node:path";

export type BrandLogo = {
  name: string;
  src: string;
};

const SUPPORTED_EXTENSIONS = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);

export function getLogos(): BrandLogo[] {
  const logosDirectory = join(process.cwd(), "public", "logos");

  return readdirSync(logosDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && SUPPORTED_EXTENSIONS.has(extname(entry.name).toLowerCase()))
    .map((entry) => ({
      name: parse(entry.name).name.replaceAll("-", " ").replaceAll("_", " "),
      src: `/logos/${encodeURIComponent(entry.name)}`,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
