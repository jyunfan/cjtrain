import { useState, useEffect } from 'react'
import PracticeInterface from './components/PracticeInterface'
import {
  loadWordBank,
  loadFrequentWords,
  filterByFrequentWords,
  type WordEntry,
} from './utils/wordBank'
import './App.css'

function App() {
  const [wordBank, setWordBank] = useState<WordEntry[]>([])
  const [frequentWords, setFrequentWords] = useState<Set<string>>(new Set())
  const [selectedWord, setSelectedWord] = useState<WordEntry | null>(null)

  useEffect(() => {
    // Load both word bank and frequent words in parallel
    Promise.all([loadWordBank(), loadFrequentWords()])
      .then(([words, freqWords]) => {
        console.log('freqWords', freqWords)
        setWordBank(words)
        setFrequentWords(freqWords)
        // Filter word bank to only include frequent words for initial selection
        const filteredWords = filterByFrequentWords(words, freqWords)
        // Randomly select a word from the filtered word bank
        if (filteredWords.length > 0) {
          const randomIndex = Math.floor(Math.random() * filteredWords.length)
          setSelectedWord(filteredWords[randomIndex])
        }
      })
      .catch((error) => {
        console.error('Failed to load word bank:', error)
      })
  }, [])

  const handleWordSelect = (word: WordEntry) => {
    setSelectedWord(word)
  }

  const handleNextWord = () => {
    // Filter word bank to only include frequent words
    const filteredWords = filterByFrequentWords(wordBank, frequentWords)
    if (filteredWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredWords.length)
      setSelectedWord(filteredWords[randomIndex])
    }
  }

  return (
    <div className="app">
      <div className="word-bank">
        <h2>Word Bank</h2>
        <div className="word-list">
          {wordBank.length === 0 ? (
            <p>Loading word bank...</p>
          ) : (
            wordBank.slice(0, 20).map((entry, index) => (
              <button
                key={index}
                className="word-button"
                onClick={() => handleWordSelect(entry)}
              >
                {entry.word} ({entry.spelling})
              </button>
            ))
          )}
        </div>
      </div>
      <PracticeInterface
        targetWord={selectedWord?.word || ''}
        correctSpelling={selectedWord?.spelling || ''}
        onNextWord={handleNextWord}
      />
    </div>
  )
}

export default App
