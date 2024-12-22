/**
 *
 * @file cli.ts
 * @description 🎯 Command Line Interface for THP-OCR
 * @author Aditya Patange <contact.adityapatange@gmail.com>
 * @date December 2024
 * @version 1.0.0
 *
 */

import chalk from "chalk";
import fs from "fs/promises";
import path from "path";
import { Ocr } from "./ocr";
import { Common } from "./common";

type Format = "text" | "json" | "markdown";

interface CliOptions {
  format?: Format;
  imagePath?: string;
  showHelp: boolean;
  showVersion: boolean;
}

export class Cli {
  private readonly SUPPORTED_FORMATS = ["text", "json", "markdown"] as const;
  private readonly VERSION = "1.0.0";

  /**
   * Parse command line arguments into structured options
   */
  private parseArgs(args: string[]): CliOptions {
    const options: CliOptions = {
      showHelp: args.includes("-h") || args.includes("--help"),
      showVersion: args.includes("-v") || args.includes("--version"),
    };

    const formatIndex = args.findIndex(
      (arg) => arg === "-t" || arg === "--type"
    );
    if (formatIndex !== -1) {
      const formatValue = args[formatIndex + 1];
      if (this.isValidFormat(formatValue)) {
        options.format = formatValue;
        args.splice(formatIndex, 2);
      }
    }

    if (args.length > 0) {
      options.imagePath = Common.isUrl(args[0])
        ? args[0]
        : path.resolve(args[0]);
    }

    return options;
  }

  /**
   * Display CLI help information
   */
  private showHelp(): void {
    const sections = {
      usage: ["Usage:", "  thp-ocr <image-path> [options]\n"],
      options: [
        "Options:",
        "  -h, --help              Show help information",
        "  -v, --version           Show version number",
        "  -t, --type <format>     Output format (text|json|markdown)\n",
      ],
      examples: [
        "Examples:",
        "  thp-ocr image.png",
        "  thp-ocr image.png -t json",
        "  thp-ocr /path/to/scan.jpg -t markdown",
        "  thp-ocr --help\n",
      ],
      info: [
        `For more information, visit: https://github.com/thehackersplaybook/thp-ocr\n`,
      ],
    };

    console.log(chalk.cyan("\n" + sections.usage[0]));
    console.log(...sections.usage.slice(1));
    console.log(chalk.cyan(sections.options[0]));
    console.log(...sections.options.slice(1));
    console.log(chalk.cyan(sections.examples[0]));
    console.log(...sections.examples.slice(1));
    console.log(chalk.gray(...sections.info));
  }

  /**
   * Validate and process the image file
   */
  private async processImage(
    imageSource: string,
    format: Format = "text"
  ): Promise<void> {
    try {
      // For URLs, skip the file system checks
      if (!Common.isUrl(imageSource)) {
        const stats = await fs.stat(imageSource);
        if (!stats.isFile()) {
          throw new Error("Path exists but is not a file");
        }
      }

      console.log(chalk.green(`Processing image: ${imageSource}`));
      const ocr = new Ocr(imageSource);
      const result = await ocr.extract({ format });

      if (result) {
        this.displayResult(result, format);
      } else {
        console.error(chalk.red("Error: Failed to process image."));
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to process image: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Display OCR results based on format
   */
  private displayResult(
    result: string | Record<string, string>,
    format: Format
  ): void {
    if (format === "json") {
      console.log(chalk.green(JSON.stringify(result, null, 2)));
    } else {
      console.log(chalk.green(result));
    }
  }

  private isValidFormat(format: string): format is Format {
    return this.SUPPORTED_FORMATS.includes(format as Format);
  }

  private showFormatError(): void {
    console.error(chalk.red("\nError: Invalid format specified!"));
    console.log(
      chalk.gray(`Supported formats: ${this.SUPPORTED_FORMATS.join(", ")}`)
    );
    this.showHelp();
    process.exit(1);
  }

  private showVersion(): void {
    console.log(`THP-OCR 🍁: v${this.VERSION}`);
  }

  /**
   * Main CLI execution method
   */
  public async run(): Promise<void> {
    try {
      console.log(chalk.green("Welcome to THP-OCR! 🍁\n"));

      const options = this.parseArgs(process.argv.slice(2));

      // Handle flags
      if (options.showHelp && options.showVersion) {
        this.showHelp();
        this.showVersion();
        return;
      }

      if (options.showVersion) {
        this.showVersion();
        return;
      }

      if (options.showHelp) {
        this.showHelp();
        return;
      }

      if (!options.imagePath) {
        this.showHelp();
        console.error(chalk.red("\nError: Please provide an image path!"));
        process.exit(1);
      }

      if (options.format && !this.isValidFormat(options.format)) {
        this.showFormatError();
        return;
      }

      await this.processImage(options.imagePath, options.format);
    } catch (error) {
      console.error(
        chalk.red(
          error instanceof Error ? error.message : "Unexpected error occurred"
        )
      );
      process.exit(1);
    }
  }
}
