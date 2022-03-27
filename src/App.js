import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Entry from './components/Entry';
import Recommendation from './components/Recommendation';
import Guesses from './components/Guesses';
import Notification from './components/Notification';


function App() {
  const [ guesses, setGuesses ] = useState([]);
  const [ bestWord, setBestWord ] = useState("");
  const [ notification, setNotification ] = useState([]);
  const [ wordlist, setWordlist ] = useState([]);

  return (
    <div className="App">
      <Header />
      <Recommendation bestWord={bestWord} wordlist={wordlist}/>
      <Guesses guesses={guesses} />
      <Entry 
        guesses={guesses} 
        setGuesses={setGuesses} 
        setBestWord={setBestWord} 
        setNotification={setNotification}
        wordlist={wordlist}
        setWordlist={setWordlist}
      />
      <Notification notification={notification} />
    </div>
  );
}

export default App;
