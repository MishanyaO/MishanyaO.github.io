import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    tag: z.string(),
    // Shorter topic for the home page table (falls back to `tag`).
    shortTag: z.string().optional(),
    summary: z.string(),
    date: z.coerce.date(),
    // Every article is a draft until the "Publish article" workflow flips this to false.
    draft: z.boolean().default(true),
    takeaways: z.array(z.string()).max(5).optional(),
    // Optional cover image (PNG or JPG, ideally 1200x630) shown on the post and used for link previews.
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    // Headline result shown in the home page table, e.g. { arrow: '▼', count: 70, decimals: 1, suffix: '% LOC' }.
    result: z.object({
      arrow: z.string().optional(),
      count: z.number(),
      decimals: z.number().default(0),
      suffix: z.string(),
    }).optional(),
    // Key figures shown in the article sidebar. Give `count` (+ optional `unit`) for a number that
    // counts up, or `value` for plain text. The first two counted figures also show on mobile.
    figures: z.array(z.object({
      label: z.string(),
      count: z.number().optional(),
      unit: z.string().optional(),
      value: z.string().optional(),
      tone: z.enum(['good', 'bad']).optional(),
      mobileLabel: z.string().optional(),
    })).max(6).optional(),
  }),
});

export const collections = { posts };
