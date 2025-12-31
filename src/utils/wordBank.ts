export interface WordEntry {
  word: string
  spelling: string
}

export async function loadWordBank(): Promise<WordEntry[]> {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}data/Cangjie5_TC.txt`)
    if (!response.ok) {
      throw new Error(`Failed to load word bank: ${response.statusText}`)
    }
    const text = await response.text()
    return parseWordBank(text)
  } catch (error) {
    console.error('Error loading word bank:', error)
    // Return sample data for development if file not found
    return [
      { word: '倉', spelling: 'OIAR' },
      { word: '人', spelling: 'O' },
      { word: '一', spelling: 'M' },
    ]
  }
}

export async function loadFrequentWords(): Promise<Set<string>> {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}data/freqword.txt`)
    if (!response.ok) {
      throw new Error(`Failed to load frequent words: ${response.statusText}`)
    }
    const text = await response.text()
    return parseFrequentWords(text)
  } catch (error) {
    console.error('Error loading frequent words:', error)
    return new Set()
  }
}

function parseFrequentWords(text: string): Set<string> {
  const frequentWords = new Set<string>()
  // put all characters in the text into the set
  for (const char of text) {
    if (/[\u4e00-\u9fff]/.test(char)) {
      frequentWords.add(char)
    }
  }

  return frequentWords
}

export function filterByFrequentWords(
  wordBank: WordEntry[],
  frequentWords: Set<string>
): WordEntry[] {
  if (frequentWords.size === 0) {
    return wordBank
  }
  return wordBank.filter(entry => frequentWords.has(entry.word))
}

function parseWordBank(text: string): WordEntry[] {
  const lines = text.split('\n')
  const entries: WordEntry[] = []
  const seenWords = new Set<string>()

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    // Expected format: word<TAB>spelling or word<spaces>spelling
    const parts = trimmed.split(/\s+/)
    if (parts.length >= 2) {
      const word = parts[0]
      const spelling = parts.slice(1).join(' ').trim()
      if (word && spelling) {
        // Only add if we haven't seen this word before
        if (!seenWords.has(word)) {
          seenWords.add(word)
          entries.push({ word, spelling })
        }
      }
    }
  }

  return entries
}

