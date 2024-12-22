/**
 * @file cli.ts
 * @description 🎯 Command Line Interface for THP-OCR
 *
 * This is where the magic begins! Our CLI handles all the user interactions
 * with style and grace (and some fun emojis too! 🎨).
 *
 * @author Aditya Patange <contact.adityapatange@gmail.com>
 * @date December 2024
 * @version 1.0.0
 *
 */

import chalk from "chalk";
import fs from "fs/promises";
import path from "path";

/**
 * Command Line Interface for THP-OCR
 * @class Cli
 * @description Handles all command line operations with a sprinkle of fun! ✨
 */
export class Cli {
  /**
   * Displays help information and usage instructions
   * @private
   * @returns {void}
   */
  private showHelp(): void {
    console.log(chalk.cyan("\nUsage:"));
    console.log("  thp-ocr <image-path>\n");
    console.log(chalk.cyan("Options:"));
    console.log("  -h, --help     Show help information");
    console.log("  -v, --version  Show version number\n");
    console.log(chalk.cyan("Examples:"));
    console.log("  thp-ocr image.png");
    console.log("  thp-ocr /path/to/scan.jpg");
    console.log("  thp-ocr --help\n");
    console.log(
      chalk.gray(
        "For more information, visit: https://github.com/thehackersplaybook/thp-ocr\n"
      )
    );
  }

  /**
   * Displays version information
   * @private
   * @returns {void}
   */
  private showVersion(): void {
    console.log("THP-OCR 🍁: v1.0.0");
  }

  /**
   * Shows a welcoming intro message
   * @private
   * @returns {void}
   */
  private showIntro(): void {
    console.log(chalk.green("Welcome to THP-OCR! 🍁\n"));
  }

  /**
   * Main CLI execution method
   * @public
   * @async
   * @returns {Promise<void>}
   * @throws {Error} When file access or processing fails
   *
   * @example
   * const cli = new Cli();
   * await cli.run();
   */
  async run(): Promise<void> {
    try {
      const args = process.argv.slice(2);
      const hasHelp = args.includes("-h") || args.includes("--help");
      const hasVersion = args.includes("-v") || args.includes("--version");

      // Handle flags with priority order
      if (hasHelp && hasVersion) {
        this.showHelp();
        this.showVersion();
        process.exit(0);
      }

      if (hasVersion) {
        this.showVersion();
        process.exit(0);
      }

      if (hasHelp) {
        this.showHelp();
        process.exit(0);
      }

      this.showIntro();

      if (!args[0]) {
        this.showHelp();
        console.error(chalk.red("\nError: Please provide an image path!"));
        process.exit(1);
      }

      const imagePath = path.resolve(args[0]);
      try {
        await fs.access(imagePath);
        console.log(chalk.green(`Processing image: ${imagePath}`));
      } catch {
        console.error(chalk.red(`Error: Image file not found at ${imagePath}`));
        process.exit(1);
      }
    } catch (error) {
      console.error(chalk.red("Unexpected error:", error));
      process.exit(1);
    }
  }
}
