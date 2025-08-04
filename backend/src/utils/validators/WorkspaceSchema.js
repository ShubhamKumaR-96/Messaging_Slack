import { z } from "zod";

// Regex to validate MongoDB ObjectId format

export const workspaceZodSchema = z.object({
  name: z.string().min(1)
})