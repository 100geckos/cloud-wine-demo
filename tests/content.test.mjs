import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { upcomingEvents, eventIsPast } from '../src/lib/events.ts';
import {
  businessSchema,
  menuSchema,
  eventsSchema,
  brandSchema,
  announcementsSchema,
  eventSchema,
} from '../src/lib/schemas.ts';

const now = new Date('2026-11-05T20:00:00Z');
const sample = (id, start, end, verified = true) => ({
  id,
  title: 'TEST FIXTURE ONLY',
  description: 'Synthetic test data, never public content',
  start,
  end,
  verified,
  source: 'https://example.com/test',
});
test('all editable content conforms to its schema', () => {
  for (const [file, schema] of [
    ['business', businessSchema],
    ['menu', menuSchema],
    ['events', eventsSchema],
    ['brand', brandSchema],
    ['announcements', announcementsSchema],
  ]) {
    schema.parse(
      JSON.parse(
        readFileSync(
          new URL(`../src/content/${file}.json`, import.meta.url),
          'utf8',
        ),
      ),
    );
  }
});
test('expired and unverified events are excluded; ongoing events stay and future events sort', () => {
  const records = [
    sample('late', '2026-11-07T18:00:00-05:00', '2026-11-07T20:00:00-05:00'),
    sample('expired', '2026-11-05T12:00:00-05:00', '2026-11-05T15:00:00-05:00'),
    sample('ongoing', '2026-11-05T14:00:00-05:00', '2026-11-05T16:00:00-05:00'),
    sample(
      'unconfirmed',
      '2026-11-06T18:00:00-05:00',
      '2026-11-06T20:00:00-05:00',
      false,
    ),
    sample('early', '2026-11-06T18:00:00-05:00', '2026-11-06T20:00:00-05:00'),
  ];
  assert.deepEqual(
    upcomingEvents(records, now).map((e) => e.id),
    ['ongoing', 'early', 'late'],
  );
  assert.equal(records.length, 5);
});
test('expiry uses absolute time through daylight saving transition and exact end boundary', () => {
  assert.equal(
    eventIsPast(
      '2026-11-01T01:30:00-04:00',
      new Date('2026-11-01T01:00:00-05:00'),
    ),
    true,
  );
  assert.equal(eventIsPast('2026-11-05T15:00:00-05:00', now), true);
  assert.equal(eventIsPast('2026-11-05T15:01:00-05:00', now), false);
});
test('events reject timezone ambiguity, invalid links and reversed dates', () => {
  const valid = sample(
    'valid',
    '2026-11-06T18:00:00-05:00',
    '2026-11-06T20:00:00-05:00',
  );
  assert.equal(eventSchema.safeParse(valid).success, true);
  assert.equal(
    eventSchema.safeParse({ ...valid, start: '2026-11-06T18:00:00' }).success,
    false,
  );
  assert.equal(
    eventSchema.safeParse({ ...valid, end: valid.start }).success,
    false,
  );
  assert.equal(
    eventSchema.safeParse({ ...valid, source: 'javascript:alert(1)' }).success,
    false,
  );
});
