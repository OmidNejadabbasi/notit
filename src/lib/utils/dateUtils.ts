export function daysSinceEpoch(date: Date) {
  return date.getTime() / (1000 * 86400);
}
