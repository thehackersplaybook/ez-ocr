/**
 * @file index.ts
 * @description 🚀 THP-OCR: AI-Powered Optical Character Recognition
 */

import { Cli } from "./cli";
import chalk from "chalk";
import dotenv from "dotenv";

export { Ocr as ThpOcr } from "./ocr";
export { OcrFormat, OcrResponse } from "./models";

dotenv.config();

/**
 * Main CLI entry point
 * @internal
 */
export async function main() {
  const cli = new Cli();
  cli.run().catch((error) => {
    console.error(chalk.red("Unexpected error:", error));
    process.exit(1);
  });
}

// Run CLI if executed directly
if (require.main === module) {
  main();
}
