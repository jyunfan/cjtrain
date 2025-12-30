// Cangjie input method code to Chinese character component mapping
const CANGJIE_TO_COMPONENT: Record<string, string> = {
  A: '日',
  B: '月',
  C: '金',
  D: '木',
  E: '水',
  F: '火',
  G: '土',
  H: '竹',
  I: '戈',
  J: '十',
  K: '大',
  L: '中',
  M: '一',
  N: '弓',
  O: '人',
  P: '心',
  Q: '手',
  R: '口',
  S: '尸',
  T: '廿',
  U: '山',
  V: '女',
  W: '田',
  X: '難',
  Y: '卜',
  Z: '重',
}

/**
 * Converts a Cangjie spelling (Latin letters) to Chinese character components
 * @param spelling - The Cangjie spelling (e.g., "OIAR")
 * @returns The corresponding Chinese character components (e.g., "人戈日口")
 */
export function spellingToComponents(spelling: string): string {
  return spelling
    .toUpperCase()
    .split('')
    .map((char) => CANGJIE_TO_COMPONENT[char] || char)
    .join('')
}

