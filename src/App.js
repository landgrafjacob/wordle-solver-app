import React, { useState } from 'react'
import './App.css';
import Header from './components/Header'
import Entry from './components/Entry'
import Recommendation from './components/Recommendation'
import Guesses from './components/Guesses'


function App() {
  const [ guesses, setGuesses ] = useState([])

  return (
    <div className="App">
      <Header />
      <Recommendation />
      <Guesses guesses={guesses} />
      <Entry guesses={guesses} setGuesses={setGuesses}/>
    </div>
  );
}

export default App;
