import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    tag: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    // Every article is a draft until the "Publish article" workflow flips this to false.
    draft: z.boolean().default(true),
    takeaways: z.array(z.string()).max(5).optional(),
  }),
});

export const collections = { posts };
