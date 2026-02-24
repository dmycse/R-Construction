import { defineCollection, z } from "astro:content";
import type { InferEntrySchema } from 'astro:content';

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
      path: z.string(),
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

export const sectionData = defineCollection({
  type: 'data',
  schema: ({ image })  => z.object({
    title: z.string(),
    sectionId: z.string(),
    sectionTitle: z.string(),
    sectionSubtitle: z.string(),
    sectionText: z.array(z.string()),
    sectionImage: image(),
    ctaBtn: z.object({
      visible: z.boolean(),
      label: z.string(),
      path: z.string(),
      icon: z.string().optional()
    })
  })
});

export const statsData = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    sectionId: z.string(),
    sectionTitle: z.string(),
    statsData: z.array(z.object({
      id: z.string(),
      countNum: z.number(),
      countText: z.string(),
      text: z.string()
    }))
  })
});

export const servicesData = defineCollection({
  type: 'data',
  schema: ({ image })  => z.object({
    title: z.string(),
    sectionId: z.string(),
    sectionTitle: z.string(),
    sectionSubtitle: z.string(),
    sectionText: z.array(z.string()),
    ctaText: z.string(),
    ctaBtn: z.object({
      visible: z.boolean(),
      label: z.string(),
      path: z.string(),
      icon: z.string().optional()
    }),
    servicesData: z.array(z.object({
      id: z.string(),
      name: z.string(),
      title: z.string(),
      icon: z.string(),
      images: z.array(image()),
      description: z.string(),
      serviceList: z.array(z.string())
    }))
  })
});

export const projectsData = defineCollection({
  type: 'data',
  schema: ({ image })  => z.object({
    title: z.string(),
    sectionId: z.string(),
    sectionTitle: z.string(),
    sectionSubtitle: z.string(),
    sectionText: z.array(z.string()),
    ctaText: z.string(),
    ctaBtn: z.object({
      visible: z.boolean(),
      label: z.string(),
      path: z.string(),
      icon: z.string().optional()
    }),
    projectsData: z.array(z.object({
      id: z.string(),
      name: z.string(),
      title: z.string(),
      icon: z.string(),
      image: image(),
      description: z.string(),
      worksList: z.array(z.string())
    }))
  })
});

export const collections = {
  'topbar': topbarData,
  'header': headerData,
  'hero': sectionData,
  'about': sectionData,
  'stats': statsData,
  'services': servicesData,
  'projects': projectsData
};

type TobBarSchema = InferEntrySchema<'topbar'>;
export type ContactsType = TobBarSchema['contacts'];
export type StatsDataSchema = InferEntrySchema<'stats'>;
export type ServicesDataSchema = InferEntrySchema<'services'>;
export type ProjectsDataSchema = InferEntrySchema<'projects'>;