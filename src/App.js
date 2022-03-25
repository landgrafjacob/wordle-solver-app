import React, { useState } from 'react'
import './App.css';
import Header from './components/Header'
import Entry from './components/Entry'
import Recommendation from './components/Recommendation'
import Guesses from './components/Guesses'


function App() {
  const [ guesses, setGuesses ] = useState([])
  const [ bestWord, setBestWord ] = useState("")

  return (
    <div className="App">
      <Header />
      <Recommendation bestWord={bestWord} />
      <Guesses guesses={guesses} />
      <Entry guesses={guesses} setGuesses={setGuesses} setBestWord={setBestWord} />
    </div>
  );
}

export default App;
