import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const persons = [
    { name: 'Arto Hellas' }
  ]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App persons={persons} />
);

