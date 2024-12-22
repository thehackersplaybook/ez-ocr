import { z } from "zod";

export type OcrFormat = "json" | "markdown" | "text";

export interface OcrResponse {
  response: any;
}

export const ocrResponseSchema = z.object({
  response: z.string(),
});
