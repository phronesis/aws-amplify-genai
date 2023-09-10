// src/App.js
import React from 'react';
import './App.css';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Co-founder Assistant</h1>
      </header>
      <main>
        <ChatInterface />
      </main>
    </div>
  );
}

export default App;