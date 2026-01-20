export function stripHtml(html) {
  if (!html && html !== 0) return '';
  return String(html).replace(/<[^>]*>/g, '');
}

export function truncateWords(input, wordCount = 4) {
  const text = stripHtml(input).trim();
  if (!text) return '';
  const words = text.split(/\s+/);
  if (words.length <= wordCount) return text;
  return words.slice(0, wordCount).join(' ') + '...';
}
