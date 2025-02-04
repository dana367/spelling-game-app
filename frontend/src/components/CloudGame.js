import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./CloudGame.css";
import Layout from './Layout';

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const word_to_practice = {
    "Re-words" : [
        "redo",
        "rewrite",
        "retell",
        "repaint",
        "reapply",
        "reinvite"
    ],
    "starts with E" : [
        "Eighth",
        "Enouth",
        "Exercise",
        "Experience"
    ]
};

const CloudGame = () => {

 
  const [currentCategory, setCurrentCategory] = useState("Re-words"); 
  const [wordIndex, setWordIndex] = useState(0);
  const [targetWord, setTargetWord] = useState(word_to_practice["Re-words"][0].toUpperCase());
  
  const [clouds, setClouds] = useState([]);
  const [score, setScore] = useState(0);
  const [spelledWords, setSpelledWords] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [message, setMessage] = useState('');
  const [letterQueue, setLetterQueue] = useState([]);
  const [cloudSpeed, setCloudSpeed] = useState(12); 
  
  
  const getNeededLetters = () => {
    const wordLetters = targetWord.split('');
    const queueLetters = letterQueue;
    return wordLetters.filter((letter, index) => queueLetters[index] !== letter);
  };


  const moveToNextWord = () => {
    const currentWords = word_to_practice[currentCategory];
    let nextIndex = wordIndex + 1;
    
  
    if (nextIndex >= currentWords.length) {
      
      const categories = Object.keys(word_to_practice);
      const currentCategoryIndex = categories.indexOf(currentCategory);
      const nextCategoryIndex = (currentCategoryIndex + 1) % categories.length;
      const nextCategory = categories[nextCategoryIndex];
      
      setCurrentCategory(nextCategory);
      setWordIndex(0);
      setTargetWord(word_to_practice[nextCategory][0].toUpperCase());
    } else {
      
      setWordIndex(nextIndex);
      setTargetWord(currentWords[nextIndex].toUpperCase());
    }
  };

  


  
  useEffect(() => {
    const generateCloud = () => {
      const neededLetters = getNeededLetters();
      const isNeededLetter = Math.random() < 0.4; 
      
      let newLetter;
      if (isNeededLetter && neededLetters.length > 0) {
        
        newLetter = neededLetters[Math.floor(Math.random() * neededLetters.length)];
      } else {
        
        newLetter = letters[Math.floor(Math.random() * letters.length)];
      }



      return {
        id: Date.now() + Math.random(), 
        letter: newLetter,
        positionX: Math.random() * 80 + 10,
        speed: cloudSpeed, 
      };
    };

    
    const interval1 = setInterval(() => {
      setClouds(prevClouds => [...prevClouds, generateCloud()]);
    }, 1000); 

    const interval2 = setInterval(() => {
      setClouds(prevClouds => [...prevClouds, generateCloud()]);
    }, 1500); 

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [letterQueue, targetWord, cloudSpeed]);


const resetGame = () => {
    setLetterQueue([]);
    setCurrentWord('');
    setMessage('');
    setClouds([]);
  };

  
  const handleLetterClick = (clickedCloud) => {
    const newQueue = [...letterQueue, clickedCloud.letter];
    setLetterQueue(newQueue);
    setCurrentWord(newQueue.join(''));

   
    setClouds(prevClouds => 
      prevClouds.filter(cloud => cloud.id !== clickedCloud.id)
    );

    
    if (newQueue.length === targetWord.length) {
        const spelledWord = newQueue.join('');
        
        if (spelledWord === targetWord) {
          setScore(prev => prev + 1);
          setMessage("Congratulations! You spelled it correctly!");
          setSpelledWords(prev => [...prev, spelledWord]);
          setTimeout(() => {
            resetGame();
            moveToNextWord(); 
          }, 1500);
        } else {
          setMessage("Try again!");
          setTimeout(resetGame, 1500);
        }
      }
    };

    return (
        <Layout>
        <div className="game-container">
          <div className="spelled-words-table">
            <h3>Current Category: </h3>
            <h3>{currentCategory}</h3>
            <h3>Catch letters in order</h3>
            <table>
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Letter</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: targetWord.length }).map((_, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{letterQueue[index] || '_'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
    
            <h3>Your Progress</h3>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Completed Words</th>
                </tr>
              </thead>
              <tbody>
                {spelledWords.map((word, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{word}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    
          <div className="game-info">
            <h1>Spelling Cloud Game</h1>
            <p>Click the letters to spell: {targetWord}</p>
            <p>Category: {currentCategory}</p>
            <h2>Score: {score}</h2>
            {message && <p className="message">{message}</p>}
          </div>

      

      <div className="clouds-container">
        {clouds.map((cloud) => (
          <motion.div
            key={cloud.id}
            className="cloud"
            initial={{ y: "100vh" }}
            animate={{ y: "-100vh" }}
            transition={{ 
              duration: cloud.speed, 
              ease: "linear"
            }}
            style={{ 
              left: `${cloud.positionX}%`,
              position: "absolute"
            }}
            onClick={() => handleLetterClick(cloud)} 
            onAnimationComplete={() => {
              setClouds(prevClouds => 
                prevClouds.filter(c => c.id !== cloud.id)
              );
            }}
          >
            <span className="letter">{cloud.letter}</span>
          </motion.div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default CloudGame;
