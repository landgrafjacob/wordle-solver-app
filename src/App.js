import React, { useState } from 'react'
import './App.css';
import Header from './components/Header'
import Entry from './components/Entry'


function App() {
  const [ formData, setFormData ] = useState("slate")

  return (
    <div className="App">
      <Header />
      <Entry formData={formData} setFormData={setFormData} />
    </div>
  );
}

export default App;
