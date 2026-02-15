import { defineCollection, z } from "astro:content";
import type { ImageFunction, InferEntrySchema } from 'astro:content';

export const topbarData = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    sectionId: z.string(),
    contacts: z.array(z.object({
      visible: z.boolean(),
      name: z.string(),
      icon: z.string(),
      text: z.string().optional(),
      url: z.string()
    })),
    socialLinks: z.array(z.object({
      visible: z.boolean(),
      name: z.string(),
      icon: z.string(),
      text: z.string().optional(),
      url: z.string()
    }))
  })
});

export const headerData = defineCollection({
  type: 'data',
  schema: ({ image })  => z.object({
    title: z.string(),
    sectionId: z.string(),
    logo: z.object({
      visible: z.boolean(),
      name: z.string(),
      image: image()
    }),
    links: z.array(z.object({
      visible: z.boolean(),
      name: z.string(),
      path: z.string()
    })),
    mobileIcons: z.object({
      open: z.string(),
      close: z.string()
    }),
    ctaBtn: z.object({
      visible: z.boolean(),
      label: z.string(),
      path: z.string(),
      icon: z.string().optional()
    })
  })
});

export const heroData = defineCollection({
  type: 'data',
  schema: ({ image })  => z.object({
    title: z.string(),
    sectionId: z.string(),
    heroTitle: z.string(),
    heroSubtitle: z.string(),
    heroText: z.string(),
    heroImage: image(),
    ctaBtn: z.object({
      visible: z.boolean(),
      label: z.string(),
      path: z.string(),
      icon: z.string().optional()
    })
  })
});

export const collections = {
  'topbar': topbarData,
  'header': headerData,
  'hero': heroData,
};

type TobBarSchema = InferEntrySchema<'topbar'>;
export type ContactsType = TobBarSchema['contacts'];