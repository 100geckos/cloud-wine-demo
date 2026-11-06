import { z } from 'zod';
const sourceId = z.string().min(1);
const safeLink = z
  .url()
  .refine((v) => v.startsWith('https://'), 'Use an HTTPS link');
const offsetDate = z.iso.datetime({ offset: true });
export const businessSchema = z.object({
  name: z.string().min(1),
  locationLabel: z.string(),
  timezone: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    region: z.string(),
    country: z.string(),
  }),
  phone: z
    .object({
      display: z.string(),
      href: z.string().regex(/^\+\d+$/),
      status: z.enum(['verified', 'directory-listed']),
      source: safeLink,
    })
    .nullish(),
  email: z.union([z.email(), z.literal('')]).nullish(),
  hours: z.array(z.object({ day: z.string(), hours: z.string() })).default([]),
  hoursNote: z.string(),
  socials: z.array(z.object({ name: z.string(), url: safeLink })).default([]),
  verifiedOn: z.iso.date(),
  intro: z.string(),
  story: z.string(),
  storyNote: z.string(),
  offerings: z.array(
    z.object({
      id: sourceId,
      number: z.string(),
      title: z.string(),
      description: z.string(),
      detail: z.string(),
      source: sourceId,
    }),
  ),
  sources: z.array(
    z.object({
      id: sourceId,
      label: z.string(),
      url: safeLink,
      details: z.string(),
    }),
  ),
});
export const menuSchema = z.object({
  note: z.string(),
  categories: z.array(
    z.object({
      id: z.string().regex(/^[a-z-]+$/),
      name: z.string(),
      eyebrow: z.string(),
      description: z.string(),
      emptyMessage: z.string(),
      items: z
        .array(
          z.object({
            name: z.string().min(1),
            description: z.string().nullish(),
            price: z.number().nonnegative().nullish(),
            verified: z.boolean(),
            source: safeLink,
          }),
        )
        .default([]),
    }),
  ),
});
export const eventSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    title: z.string().min(1),
    description: z.string(),
    start: offsetDate,
    end: offsetDate,
    verified: z.boolean(),
    source: safeLink,
  })
  .refine(
    (e) => Date.parse(e.end) > Date.parse(e.start),
    'Event end must follow start',
  );
export const eventsSchema = z.object({
  note: z.string(),
  events: z.array(eventSchema).default([]),
});
export const brandSchema = z.object({
  agency: z.string(),
  demo: z.boolean(),
  colors: z.record(z.string(), z.string().regex(/^#[0-9a-fA-F]{6}$/)),
  hero: z.object({
    eyebrow: z.string(),
    title: z.string(),
    accent: z.string(),
    description: z.string(),
  }),
  images: z
    .array(
      z.object({
        id: sourceId,
        file: z
          .string()
          .regex(/^(\/src\/assets\/)?[a-z0-9-]+\.(jpg|png|webp)$/),
        alt: z.string(),
        caption: z.string(),
        photographer: z.string(),
        source: safeLink,
      }),
    )
    .refine(
      (images) =>
        images.length === 3 &&
        ['wine', 'bar', 'cocktail'].every(
          (id) => images.filter((image) => image.id === id).length === 1,
        ),
      'Provide exactly one wine, bar, and cocktail image',
    ),
});
export const announcementsSchema = z.object({
  announcements: z
    .array(
      z.object({
        id: sourceId,
        text: z.string(),
        end: offsetDate,
        verified: z.boolean(),
      }),
    )
    .default([]),
});
export type WineEvent = z.infer<typeof eventSchema>;
export type MenuCategory = z.infer<typeof menuSchema>['categories'][number];
