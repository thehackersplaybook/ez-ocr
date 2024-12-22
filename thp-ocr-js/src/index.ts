/**
 *
 * @file index.ts
 * @description 🚀 THP-OCR: AI-Powered Optical Character Recognition
 *
 * This is the main entry point for the THP-OCR library. It exports the core
 * functionality for image text extraction using advanced AI models and provides
 * a CLI interface for direct usage.
 *
 * @author Aditya Patange <contact.adityapatange@gmail.com>
 * @date December 2024
 * @version 1.0.0
 *
 */

import { Cli } from "./cli";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

/**
 * Initializes and runs the CLI application.
 *
 * This function handles:
 * - CLI initialization.
 * - Command processing.
 * - Error handling with proper exit codes
 *
 * @async
 * @throws {Error} When CLI encounters an unrecoverable error
 *
 */
async function main() {
  const cli = new Cli();
  cli.run().catch((error) => {
    console.error(chalk.red("Unexpected error:", error));
    process.exit(1);
  });
}

if (require.main === module) {
  main();
}
