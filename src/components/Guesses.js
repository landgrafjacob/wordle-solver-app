const Guesses = ({guesses}) => {
  return (
    <div className="guess">
      {guesses.map((g,i) => <div key={i}>Guess: {g}</div>)}
    </div>
  )
}

export default Guesses;