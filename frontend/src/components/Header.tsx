import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/book">Book</Link>
          </li>
          <li>
            <Link to="/chat">Chat</Link>
          </li>
          <li>
            <a href="http://localhost:3000/docs/chapter-1-introduction" target="_blank" rel="noopener noreferrer">Chapter 1</a>
          </li>
          <li>
            <a href="http://localhost:3000/docs/chapter-2-ai-agents" target="_blank" rel="noopener noreferrer">Chapter 2</a>
          </li>
          <li>
            <a href="http://localhost:3000/docs/chapter-3-rag-systems" target="_blank" rel="noopener noreferrer">Chapter 3</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
