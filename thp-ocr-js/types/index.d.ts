/**
 * THP-OCR Type Definitions
 * @packageDocumentation
 */

declare module "thp-ocr" {
  /**
   * Supported output formats for OCR
   */
  export type OcrFormat = "text" | "json" | "markdown";

  /**
   * OCR response schema
   */
  export interface OcrResponse {
    response: string;
  }

  /**
   * Options for OCR processing
   */
  export interface OcrOptions {
    format?: OcrFormat;
  }

  /**
   * Main OCR class for text extraction
   */
  export class ThpOcr {
    /**
     * Creates an instance of ThpOcr
     * @param imageSource Path to image file or URL
     */
    constructor(imageSource: string);

    /**
     * Extract text from image
     * @param options OCR options
     */
    extract(
      options?: OcrOptions
    ): Promise<string | Record<string, string> | null>;
  }
}
