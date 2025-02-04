import React, { useState, useEffect } from "react";
import './FlashCards.css';
import words1 from '../data/words1.json';
import Layout from './Layout';

const FlashCards = () => {
    const [cards, setCards] = useState([]);
    const [flippedIndices, setFlippedIndices] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);

  
    useEffect(() => {
        if (words1.slips.length > 0) {
            
            const cardPairs = words1.slips.slice(0, 10).flatMap(slip => [
                { id: Math.random(), text: slip.advice },
                { id: Math.random(), text: slip.advice }
            ]);
            
           
            setCards(cardPairs.sort(() => Math.random() - 0.5));
        }
    }, []);

    const handleCardClick = (index) => {
        
        if (flippedIndices.length === 2) return;
        
        
        if (matchedPairs.includes(index) || flippedIndices.includes(index)) return;

        const newFlippedIndices = [...flippedIndices, index];
        setFlippedIndices(newFlippedIndices);

  
        if (newFlippedIndices.length === 2) {
            const [firstIndex, secondIndex] = newFlippedIndices;
            
            if (cards[firstIndex].text === cards[secondIndex].text) {
                
                setMatchedPairs([...matchedPairs, firstIndex, secondIndex]);
                setFlippedIndices([]);
            } else {
                
                setTimeout(() => {
                    setFlippedIndices([]);
                }, 1000);
            }
        }
    };

    const isCardFlipped = (index) => {
        return flippedIndices.includes(index) || matchedPairs.includes(index);
    };

    return (
        <Layout>
            <div className="memory-game-container">
                <div className="cards-grid">
                    {cards.map((card, index) => (
                        <div
                            key={card.id}
                            className={`memory-card ${isCardFlipped(index) ? 'flipped' : ''}`}
                            onClick={() => handleCardClick(index)}
                        >
                            <div className="card-inner">
                                <div className="card-front">
                                    <p>?</p>
                                </div>
                                <div className="card-back">
                                    <p>{card.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default FlashCards;
