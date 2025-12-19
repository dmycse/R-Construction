import { defineCollection, z } from "astro:content";
import type { ImageFunction, InferEntrySchema } from 'astro:content';

export const topbarData = defineCollection({
  type: 'data',
  schema: z.object({
    visible: z.boolean(),
    title: z.string(),
    links: z.array(z.object({
      visible: z.boolean(),
      name: z.string(),
      icon: z.string(),
      text: z.string(),
      url: z.string()
    }))
  })
});

export const headerData = defineCollection({
  type: 'data',
  schema: z.object({
    visible: z.boolean(),
    title: z.string(),
    links: z.array(z.object({
      visible: z.boolean(),
      name: z.string(),
      path: z.string()
    }))
  })
});

export const collections = {
  'topbar': topbarData,
  'header': headerData,
};