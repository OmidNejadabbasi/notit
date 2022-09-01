export function prefix(src: string, prefix: string): string {
  if (!src.startsWith(prefix)) {
    return prefix + src;
  }
  return src;
}
