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
  schema: ({ image }) => z.object({
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

const sectionHeaderSchema = z.object({
  title: z.string(),
  sectionId: z.string(),
  sectionTitle: z.string(),
  sectionSubtitle: z.string()
});

const ctaSchema = z.object({
  ctaText:z.object({
    visible: z.boolean(),
    text: z.string(),
  }),
  ctaBtn: z.object({
    visible: z.boolean(),
    label: z.string(),
    path: z.string(),
    icon: z.string().optional(),
  }),
});

export const sectionData = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    sectionHeaderSchema
      .extend({
        sectionText: z.array(z.string()),
        sectionImage: image(),
      })
      .merge(ctaSchema)
});

export const statsData = defineCollection({
  type: 'data',
  schema: sectionHeaderSchema
    .extend({
      statsData: z.array(z.object({
        id: z.number(),
        countNum: z.number(),
        countText: z.string(),
        text: z.string()
      })) 
    })
});

export const servicesData = defineCollection({
  type: 'data',
  schema: ({ image }) => 
    sectionHeaderSchema
      .extend({
        sectionText: z.array(z.string()),
        servicesData: z.array(z.object({
          id: z.number(),
          name: z.string(),
          title: z.string(),
          icon: z.string(),
          images: z.array(image()),
          description: z.string(),
          serviceList: z.array(z.string())
        }))
      })
      .merge(ctaSchema)
});

export const projectsData = defineCollection({
  type: 'data',
  schema: ({ image }) => 
    sectionHeaderSchema
      .extend({
        sectionText: z.array(z.string()),
        projectsData: z.array(z.object({
          id: z.number(),
          name: z.string(),
          title: z.string(),
          icon: z.string(),
          image: image(),
          description: z.string(),
          worksList: z.array(z.string())
        }))
      })
      .merge(ctaSchema)
});

export const reviewsData = defineCollection({
  type: 'data',
  schema: ({ image }) => 
    sectionHeaderSchema
      .extend({
        sectionText: z.array(z.string()),
        reviewsData: z.array(z.object({
          id: z.number(),
          name: z.string(),
          location: z.string(),
          time: z.string(),
          text: z.string(),
        }))
      })
      .merge(ctaSchema)
});

export const faqData = defineCollection({
  type: 'data',
  schema: sectionHeaderSchema
    .extend({
      sectionText: z.array(z.string()),
      faqData: z.array(z.object({
        id: z.number(),
        question: z.string(),
        answer: z.array(z.string())
      }))
    })
});

export const contactsData = defineCollection({
  type: 'data',
  schema: sectionHeaderSchema
    .extend({
      sectionText: z.array(z.string()),
      contactsData: z.array(z.object({
        id: z.number(),
        title: z.string(),
        subtitleText: z.string(),
        contactInfo: z.object({
          label: z.string(),
          href: z.string(),
          icon: z.string()
        })
      }))
    })
});

export const footerData = defineCollection({
  type: 'data',
  schema: sectionHeaderSchema
    .extend({
      sectionText: z.array(z.string()),
      privacyPolicy: z.object({
        visible: z.boolean(),
        title: z.string(),
        content: z.array(z.string())
      }),
      lowerFooter: z.object({
        visible: z.boolean(),
        content: z.object({
          text: z.string(),
          link: z.string(),
          creator: z.string(),
          creatorLink: z.string()
        })
      })  
    })
});

export const collections = {
  'topbar': topbarData,
  'header': headerData,
  'hero': sectionData,
  'about': sectionData,
  'stats': statsData,
  'services': servicesData,
  'projects': projectsData,
  'reviews': reviewsData,
  'faq': faqData,
  'contacts': contactsData,
  'footer': footerData
};

export type CtaDataSchema = z.infer<typeof ctaSchema>;

type TobBarSchema = InferEntrySchema<'topbar'>;
export type ContactsType = TobBarSchema['contacts'];

export type HeaderDataSchema = InferEntrySchema<'header'>;
export type ServicesDataSchema = InferEntrySchema<'services'>;
export type ProjectsDataSchema = InferEntrySchema<'projects'>;
export type ReviewsDataSchema = InferEntrySchema<'reviews'>;
export type FaqDataSchema = InferEntrySchema<'faq'>;
export type ContactsDataSchema = InferEntrySchema<'contacts'>;
export type FooterDataSchema = InferEntrySchema<'footer'>;