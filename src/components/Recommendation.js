import React from 'react';

const Recommendation = ({ bestWord }) => {

  return (
    <div className='rec'>
      <h3>Recommendation:</h3>
      <h4>{bestWord}</h4>
    </div>
  )
}

export default Recommendation;