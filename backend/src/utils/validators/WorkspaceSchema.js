import { z } from "zod";

// Regex to validate MongoDB ObjectId format
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const workspaceZodSchema = z.object({
  name: z.string().min(1)
})