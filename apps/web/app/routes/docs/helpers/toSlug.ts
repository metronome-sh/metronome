export function toSlug(text: string) {
  return text.toLowerCase().replace(/\s|\.|;/g, '-');
}
