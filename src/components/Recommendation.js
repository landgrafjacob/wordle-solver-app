import React from 'react';

// This component shows the current recommended word,
// along with the number of possible words remaining given the users choices
const Recommendation = ({ bestWord, wordlist }) => {
  return (
    <div className='rec'>
      <h3>Recommendation: {bestWord}</h3>
      <h4>Words Left: {wordlist.length}</h4>
    </div>
  )
}

export default Recommendation;