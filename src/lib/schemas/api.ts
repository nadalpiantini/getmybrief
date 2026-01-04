import { z } from 'zod';

// DeepSeek API Schemas
export const DeepSeekMessageSchema = z.object({
  role: z.enum(['system', 'user', 'assistant']),
  content: z.string(),
});

export const DeepSeekChoiceSchema = z.object({
  index: z.number(),
  message: z.object({
    role: z.string(),
    content: z.string(),
  }),
  finish_reason: z.string().nullable(),
});

export const DeepSeekResponseSchema = z.object({
  id: z.string(),
  object: z.string(),
  created: z.number(),
  model: z.string(),
  choices: z.array(DeepSeekChoiceSchema),
  usage: z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number(),
    total_tokens: z.number(),
  }).optional(),
});

export const DeepSeekStreamDeltaSchema = z.object({
  choices: z.array(
    z.object({
      index: z.number(),
      delta: z.object({
        role: z.string().optional(),
        content: z.string().optional(),
      }),
      finish_reason: z.string().nullable().optional(),
    })
  ),
});

// Google Drive API Schemas
export const GoogleDriveFileSchema = z.object({
  id: z.string(),
  name: z.string(),
  mimeType: z.string(),
  createdTime: z.string().optional(),
  modifiedTime: z.string().optional(),
  size: z.string().optional(),
});

export const GoogleDriveFilesListSchema = z.object({
  files: z.array(GoogleDriveFileSchema),
  nextPageToken: z.string().optional(),
});

// Google Docs API Schemas
export const GoogleDocSchema = z.object({
  documentId: z.string(),
  title: z.string(),
  body: z.object({
    content: z.array(z.any()),
  }).optional(),
});

// Type exports
export type DeepSeekMessage = z.infer<typeof DeepSeekMessageSchema>;
export type DeepSeekResponse = z.infer<typeof DeepSeekResponseSchema>;
export type GoogleDriveFile = z.infer<typeof GoogleDriveFileSchema>;
export type GoogleDoc = z.infer<typeof GoogleDocSchema>;
