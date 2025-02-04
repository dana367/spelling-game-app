import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FlashCards from './components/FlashCards';
import CloudGame from './components/CloudGame';
import './App.css';
import Game from './components/Game';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="game-nav">
          <ul>
            <li>
              <Link to="/flash-cards">Flash Cards</Link>
            </li>
            <li>
              <Link to="/cloud-game">Cloud Game</Link>
            </li>
            <li>
              <Link to="/one-letter-game">One Letter Game</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/flash-cards" element={<FlashCards />} />
          <Route path="/cloud-game" element={<CloudGame />} />
          <Route path="/one-letter-game" element={<Game />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}



export default App;
