export function scaleHeight(node: HTMLElement, { duration = 300 }) {
  const o = node.clientHeight;

  return {
    duration,
    css: (t) => `height: calc(${t} * ${o}px);`,
  };
}
