import { z } from 'zod';

export const SettingsSchema = z.object({
  deepseekApiKey: z.string().min(1, 'API key is required'),
  googleAccessToken: z.string().optional(),
  googleRefreshToken: z.string().optional(),
  driveFolderId: z.string().min(1, 'Folder ID is required'),
  defaultTemplate: z.string().default('reel-completo'),
  autoSave: z.boolean().default(true),
});

export const ApiKeySchema = z
  .string()
  .min(1, 'API key is required')
  .regex(/^sk-/, 'API key must start with "sk-"');

export const FolderIdSchema = z
  .string()
  .min(10, 'Invalid folder ID')
  .max(100, 'Invalid folder ID');

export type SettingsInput = z.infer<typeof SettingsSchema>;
