// src/App.tsx
import React from 'react';
import HomePage from './components/HomePage'; // Importez votre nouveau composant HomePage
// Assurez-vous d'importer votre fichier CSS global si vous en avez un pour Tailwind.
// D'après votre structure, il devrait s'agir de index.css ou App.css.
import './index.css'; // Ou le chemin vers votre fichier CSS principal si différent

function App() {
  // Pour une application React/Vite simple, nous rendons directement le composant HomePage.
  // Si vous ajoutez un routeur plus tard (ex: React Router DOM), ce fichier serait l'endroit pour le configurer.
  return (
    <HomePage />
  );
}

export default App;
