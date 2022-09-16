const colors = {
  pallete1: [
    '#69d2e7',
    '#a7dbd8',
    '#e0e4cc',
    '#f38630',
    '#fe4365',
    '#fc9d9a',
    '#f9cdad',
    '#ecd078',
    '#c02942',
    '#4ecdc4',
    '#c7f464',
    '#ece5ce',
    '#f8ca00',
    '#8a9b0f',
    '#9de0ad',
    '#e5fcc2',
    '#edc951',
    '#e94e77',
    '#f4ead5',
    '#dad8a7',
  ],
  pallete2: [
    '#f07818',
    '#f04155',
    '#5e412f',
    '#1b676b',
    '#3b2d38',
    '#91204d',
    '#3d1c00',
    '#fa2a00',
    '#2a044a',
    '#0b2e59',
    '#0d6759',
    '#7ab317',
    '#a0c55f',
    '#26ade4',
    '#ff823a',
    '#480048',
    '#e33258',
    '#29221f',
    '#1693a7',
    '#1c2130',
  ],
};

export function useColors(pallete: keyof typeof colors) {
  const colorsPallete = colors[pallete];

  function rangeIdx(current: number, max: number): number {
    if (current <= 0) return 0;
    if (current > 0 && current <= max) return current;
    return rangeIdx(current - max - 1, max);
  }

  return (index: number) => colorsPallete[rangeIdx(index, colorsPallete.length - 1)];
}
