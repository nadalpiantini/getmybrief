import { z } from 'zod';

export const TemplateTypeSchema = z.enum([
  'tip',
  'storytelling',
  'proceso',
  'motivacional',
  'educativo',
]);

export const TemplateSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string(),
  type: TemplateTypeSchema,
  structure: z.string(),
  prompts: z.array(z.string()),
});

export const TomaSchema = z.object({
  number: z.number().min(1).max(10),
  timeRange: z.string(),
  label: z.string(),
  visual: z.string(),
  texto: z.string(),
  audio: z.string(),
  cta: z.string().optional(),
});

export const ReelScriptSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  type: z.string(),
  duration: z.string(),
  symbols: z.array(z.string()),
  tomas: z.array(TomaSchema),
  caption: z.string(),
  hashtags: z.array(z.string()),
  createdAt: z.number(),
});

export const CalendarDaySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  reelId: z.string().optional(),
  status: z.enum(['empty', 'planned', 'completed']),
  title: z.string().optional(),
});

export type TemplateType = z.infer<typeof TemplateTypeSchema>;
export type Template = z.infer<typeof TemplateSchema>;
export type Toma = z.infer<typeof TomaSchema>;
export type ReelScript = z.infer<typeof ReelScriptSchema>;
export type CalendarDay = z.infer<typeof CalendarDaySchema>;
