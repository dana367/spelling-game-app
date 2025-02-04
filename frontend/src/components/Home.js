import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
      <div className="home">
        <h1>Welcome to Learning Games</h1>
        <div className="game-selection">
            
          <Link to="/flash-cards" className="game-card">
            <h2>Flash Cards</h2>
            <p>Practice with interactive flash cards</p>
          </Link>

          <Link to="/cloud-game" className="game-card">
            <h2>Cloud Game</h2>
            <p>Catch floating letters to spell words</p>
          </Link>

          <Link to="/one-letter-game" className="game-card">
            <h2>One Letter Game</h2>
            <p>Guess one letter at a time</p>
          </Link>

        </div>
      </div>
    );
  };

export default Home;