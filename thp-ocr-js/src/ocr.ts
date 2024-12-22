/**
 *
 * @file ocr.ts
 * @description 🔍 Core OCR Engine for THP-OCR
 *
 * This module provides the core OCR functionality using Claude 3.5 Sonnet.
 * It handles image processing, text extraction, and format conversion with
 * robust error handling and type safety.
 *
 * @author Aditya Patange <contact.adityapatange@gmail.com>
 * @date December 2024
 * @version 1.0.0
 *
 */

import fs from "fs/promises";
import { generateObject } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { OcrFormat, ocrResponseSchema as schema } from "./models";
import chalk from "chalk";
import { getOCRPromptMessages } from "./prompts";

/**
 * Core OCR class for handling image-to-text conversion
 * @class Ocr
 */
export class Ocr {
  private imagePath: string;

  /**
   * Creates an instance of the OCR processor
   * @param imagePath Path to the image file to process
   */
  constructor(imagePath: string) {
    this.imagePath = imagePath;
  }

  /**
   * Validates if the image file exists
   * @returns Promise<boolean> True if file exists, false otherwise
   */
  public async checkImageExistence(): Promise<boolean> {
    return fs
      .access(this.imagePath)
      .then(() => true)
      .catch(() => false);
  }

  /**
   * Loads and converts image to base64 format
   * @private
   * @returns Promise<string> Base64 encoded image data
   * @throws Error if file reading fails
   */
  private async loadImageBase64(): Promise<string> {
    const image = await fs.readFile(this.imagePath);
    const base64Image = image.toString("base64");
    return base64Image;
  }

  /**
   * Processes image using AI OCR
   * @private
   * @param imageBase64 Base64 encoded image data
   * @param format Desired output format
   * @returns Promise<string | null> Extracted text or null on failure
   */
  private async aiOCR(imageBase64: string, format: OcrFormat) {
    const messages = getOCRPromptMessages(imageBase64, format);

    return await generateObject({
      model: anthropic("claude-3-5-sonnet-20240620"),
      schema,
      messages,
    })
      .then((res) => res.object.response)
      .catch((err) => {
        console.error(err);
        console.error(
          chalk.red(
            "Error: Failed to extract text from image. Please try again. "
          )
        );
        return null;
      });
  }

  /**
   * Main method to extract text from image
   * @public
   * @param options.format Output format (text|json|markdown)
   * @returns Promise<string | Record<string, string> | null> Extracted content
   * @throws Error if image processing fails
   *
   * @example
   * const ocr = new Ocr("image.png");
   * const text = await ocr.extractTextFromImage({ format: "text" });
   */
  public async extractTextFromImage({
    format = "text",
  }: {
    format?: OcrFormat;
  }): Promise<string | Record<string, string> | null> {
    const imageBase64 = await this.loadImageBase64();
    const ocrResult = await this.aiOCR(imageBase64, format);

    if (!ocrResult) {
      return null;
    }

    if (format === "json") {
      return JSON.parse(ocrResult);
    }

    return ocrResult;
  }
}
