import { useState, useEffect, useRef } from 'react'
import { spellingToComponents } from '../utils/cangjieMapping'
import './PracticeInterface.css'

interface PracticeInterfaceProps {
  targetWord: string
  correctSpelling: string
  onClear: () => void
  onNextWord: () => void
}

function PracticeInterface({ targetWord, correctSpelling, onClear, onNextWord }: PracticeInterfaceProps) {
  const [userInput, setUserInput] = useState('')
  const [showAnswer, setShowAnswer] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [waitingForNext, setWaitingForNext] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Convert user input to Chinese components in real-time
  const userInputComponents = spellingToComponents(userInput)
  const correctSpellingComponents = spellingToComponents(correctSpelling)

  // Clear T2 and T3 when target word changes
  useEffect(() => {
    setUserInput('')
    setShowAnswer(false)
    setIsCorrect(null)
    // Auto-focus T2 after word selection
    if (targetWord && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [targetWord])

  // Auto-check answer as user types
  useEffect(() => {
    if (!targetWord || !correctSpelling || !userInput.trim()) {
      setIsCorrect(null)
      setShowAnswer(false)
      setWaitingForNext(false)
      return
    }

    const trimmedInput = userInput.trim().toUpperCase()
    const trimmedCorrect = correctSpelling.trim().toUpperCase()

    // Check if input matches exactly
    if (trimmedInput === trimmedCorrect) {
      setIsCorrect(true)
      setShowAnswer(false)
      setWaitingForNext(true)
    } else if (trimmedInput.length === trimmedCorrect.length) {
      // If length matches but content doesn't, mark as incorrect
      setIsCorrect(false)
      setShowAnswer(true)
      setWaitingForNext(true)
    } else {
      // Still typing, reset state
      setIsCorrect(null)
      setShowAnswer(false)
      setWaitingForNext(false)
    }
  }, [userInput, targetWord, correctSpelling])

  // Listen for key press when waiting for next word
  useEffect(() => {
    if (!waitingForNext) return

    const handleKeyPress = () => {
      // Ignore if user is typing in the input field
      if (document.activeElement === inputRef.current) {
        return
      }
      // Any key press triggers next word
      onNextWord()
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [waitingForNext, onNextWord])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (waitingForNext) {
      // When waiting for next word, any key triggers next word
      e.preventDefault()
      onNextWord()
      return
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      checkAnswer()
    }
  }

  const checkAnswer = () => {
    if (!targetWord || !correctSpelling) return

    const trimmedInput = userInput.trim().toUpperCase()
    const trimmedCorrect = correctSpelling.trim().toUpperCase()
    const correct = trimmedInput === trimmedCorrect

    setIsCorrect(correct)
    if (!correct) {
      setShowAnswer(true)
    } else {
      setShowAnswer(false)
    }
  }

  const handleClear = () => {
    setUserInput('')
    setShowAnswer(false)
    setIsCorrect(null)
    setWaitingForNext(false)
    onClear()
  }

  const getInputClassName = () => {
    if (isCorrect === true) return 'correct'
    if (isCorrect === false) return 'incorrect'
    return ''
  }

  return (
    <div className="practice-interface">
      {/* Target Character Section */}
      <div className="section">
        <textarea
          className="textarea-display target-character"
          value={targetWord}
          readOnly
          rows={1}
        />
      </div>

      {/* Input Section */}
      <div className="section">
        <div className="label">入力</div>
        <div className={`dual-field ${isCorrect !== null ? (isCorrect ? 'dual-field-correct' : 'dual-field-incorrect') : ''}`}>
          <textarea
            ref={inputRef}
            className={`textarea-input ${getInputClassName()}`}
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type Cangjie..."
            rows={1}
          />
          <textarea
            className={`textarea-display component-display ${getInputClassName()}`}
            value={userInputComponents}
            readOnly
            rows={1}
          />
        </div>
      </div>

      {/* Correct Answer Section */}
      <div className="section">
        <div className="label">正確答案</div>
        <div className="dual-field">
          <textarea
            className="textarea-display"
            value={showAnswer ? correctSpelling : ''}
            readOnly
            rows={1}
          />
          <textarea
            className="textarea-display component-display"
            value={showAnswer ? correctSpellingComponents : ''}
            readOnly
            rows={1}
          />
        </div>
      </div>

      {/* Control Buttons */}
      <div className="controls">
        <button onClick={handleClear} className="clear-button">
          Clear
        </button>
        <button onClick={checkAnswer} className="check-button" disabled={!targetWord || !userInput.trim()}>
          Check Answer
        </button>
      </div>
    </div>
  )
}

export default PracticeInterface

