import businessData from '../content/business.json';
import menuData from '../content/menu.json';
import eventsData from '../content/events.json';
import brandData from '../content/brand.json';
import announcementData from '../content/announcements.json';
import {
  businessSchema,
  menuSchema,
  eventsSchema,
  brandSchema,
  announcementsSchema,
} from './schemas';
import { upcomingEvents } from './events';
export const business = businessSchema.parse(businessData);
export const menu = menuSchema.parse(menuData);
export const eventContent = eventsSchema.parse(eventsData);
export const brand = brandSchema.parse(brandData);
export const announcements = announcementsSchema
  .parse(announcementData)
  .announcements.filter((a) => a.verified && Date.parse(a.end) > Date.now());
export const events = upcomingEvents(eventContent.events);
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${business.name}, ${business.address.street}, ${business.address.city}, ${business.address.region}`)}`;
export const socialUrl = business.socials[0]?.url;
export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'The menu', href: '/menu/' },
  { label: 'What’s on', href: '/events/' },
  { label: 'Our story', href: '/about/' },
  { label: 'Visit us', href: '/contact/' },
];
