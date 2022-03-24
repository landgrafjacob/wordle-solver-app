import React, { useState } from 'react'
import './App.css';
import Header from './components/Header'
import Entry from './components/Entry'


function App() {
  const [ formData, setFormData ] = useState("slate")
  const [ feedbackData, setFeedbackData ] = useState("00000")

  return (
    <div className="App">
      <Header />
      <Entry formData={formData} setFormData={setFormData} feedbackData={feedbackData} setFeedbackData={setFeedbackData} />
    </div>
  );
}

export default App;
