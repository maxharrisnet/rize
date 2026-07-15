import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const workshops = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/workshops' }),
  schema: z.object({
    path: z.enum(['everyday-life', 'career', 'entrepreneurship', 'creative-work']),
    title: z.string(),
    tagline: z.string(),
    summary: z.string(),
    whoFor: z.array(z.string()),
    outcomes: z.array(z.string()),
    skillLevel: z.string(),
    format: z.string(),
    requestCtaLabel: z.string().default('Request This Workshop'),
    order: z.number(),
  }),
});

const courses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
  schema: z.object({
    path: z.enum(['everyday-life', 'career', 'entrepreneurship', 'creative-work']),
    title: z.string(),
    tagline: z.string(),
    summary: z.string(),
    whoFor: z.array(z.string()),
    topics: z.array(z.string()),
    outcomes: z.array(z.string()),
    order: z.number(),
  }),
});

export const collections = { workshops, courses };
