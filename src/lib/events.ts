import type { WineEvent } from './schemas';
export function upcomingEvents(
  events: WineEvent[],
  now = new Date(),
): WineEvent[] {
  return events
    .filter((e) => e.verified && Date.parse(e.end) > now.getTime())
    .sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
}
export function eventIsPast(end: string, now = new Date()): boolean {
  return Date.parse(end) <= now.getTime();
}
