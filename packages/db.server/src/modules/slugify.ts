import Slugify from 'slugify';

export function slugify(text: string): string {
  return Slugify(text, { lower: true, strict: true, locale: 'en' });
}
