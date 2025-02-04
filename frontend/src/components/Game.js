import { useState } from 'react';
import './Game.css';
import Layout from './Layout';

const wordCategories = {
  occupations: [
    "magician",
    "musician",
    "mathematician",
    "beautician",
    "electrician",
    "librarian",
  ],
  basic: ["disappear", "early", "earth", "eight"],
};

const wordToPractice = {
  "Re-words" : [
      "rewrite",
      "retell",
      "repaint",
      "reapply",
      "redo",
      "reinvite"
  ],
  "Starts with E" : [
      "Eighth",
      "Enouth",
      "Exercise",
      "Experience"
  ]
};

function Game() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentWord, setCurrentWord] = useState('');
  const [remainingWords, setRemainingWords] = useState([]);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(1);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [gameComplete, setGameComplete] = useState(false);
  const [message, setMessage] = useState('');

  const chooseCategory = (categoryIndex) => {
    const category = Object.keys(wordToPractice)[categoryIndex];
    const words = [...wordToPractice[category]];
    setSelectedCategory(category);
    setRemainingWords(words.slice(1)); 
    
    
    setCurrentWord(words[0]);
    setCurrentLetterIndex(1);
    setScore({ correct: 0, total: words[0].length - 1 });
    setMessage(`Let's start! The word has ${words[0].length} letters.`);
  };

  const handleLetterGuess = (e) => {
    e.preventDefault();
    
    if (!userInput) {
      setMessage('Please enter a letter!');
      return;
    }

    const correctLetter = currentWord[currentLetterIndex];
    const isCorrect = userInput.toLowerCase() === correctLetter.toLowerCase();

    if (isCorrect) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
      setMessage('Correct!');
    } else {
      setMessage(`Wrong! The correct letter was "${correctLetter}"`);
    }

    setUserInput('');

 
    if (currentLetterIndex < currentWord.length - 1) {
      setCurrentLetterIndex(prev => prev + 1);
    } else {
    
      const finalScore = ((score.correct + (isCorrect ? 1 : 0)) / (currentWord.length - 1)) * 100;
      setMessage(`Word complete! Your score: ${finalScore.toFixed(1)}%`);
      setGameComplete(true);
    }
  };

  const startNewWord = () => {
    if (remainingWords.length > 0) {
      const newWord = remainingWords[0];
      setCurrentWord(newWord);
      setRemainingWords(remainingWords.slice(1));
      setCurrentLetterIndex(1);
      setScore({ correct: 0, total: newWord.length - 1 });
      setGameComplete(false);
      setMessage(`New word has ${newWord.length} letters.`);
    } else {
      setMessage('No more words left in this category!');
      setGameComplete(true);
    }
  };

  const playAgain = () => {
    setSelectedCategory(null);
    setCurrentWord('');
    setRemainingWords([]);
    setCurrentLetterIndex(1);
    setScore({ correct: 0, total: 0 });
    setGameComplete(false);
    setMessage('');
  };


  if (!selectedCategory) {
    return (
      <div className="game-container">
        <h2>Choose a category:</h2>
        <div className="category-selection">
          {Object.keys(wordToPractice).map((category, index) => (
            <button
              key={category}
              onClick={() => chooseCategory(index)}
              className="category-button"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Layout>
        <div className="game-container">
            {currentWord && !gameComplete && (
                <div className="game-layout">
                    <div className="game-play">
                        <h3>Current Word</h3>
                        <form onSubmit={handleLetterGuess}>
                            <label>
                                Enter letter: 
                                <input
                                    type="text"
                                    maxLength={1}
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    className="letter-input"
                                    autoFocus
                                />
                            </label>
                            <button type="submit" className="submit-button">
                                Submit
                            </button>
                        </form>
                    </div>

                    <div className="hints-table">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Word Length:</td>
                                    <td>{currentWord.length} letters</td>
                                </tr>
                                <tr>
                                    <td>First letter:</td>
                                    <td>{currentWord[0]}</td>
                                </tr>
                                <tr>
                                    <td>Guess next letter:</td>
                                    <td>{currentLetterIndex + 1}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {message && <p className="message">{message}</p>}

            {gameComplete && (
                <div className="game-complete">
                    {remainingWords.length > 0 ? (
                        <button onClick={startNewWord} className="next-button">
                            Next Word
                        </button>
                    ) : (
                        <button onClick={playAgain} className="play-again-button">
                            Play Again
                        </button>
                    )}
                </div>
            )}

            <div className="score-display">
                <p>Current Score: {score.correct} correct out of {currentWord.length - 1} letters</p>
            </div>
        </div>
    </Layout>
  );
}


export default Game;
