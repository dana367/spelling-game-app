import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="layout">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Games
      </button>
      {children}
    </div>
  );
};

export default Layout;
