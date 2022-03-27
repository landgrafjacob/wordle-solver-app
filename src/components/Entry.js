import React, {useEffect, useState } from 'react';
import axios from 'axios';


// The Entry component. First asks user which word they input,
// then asks for the response obtained from Wordle
const Entry = ({ guesses, setGuesses, setBestWord, setNotification, wordlist, setWordlist }) => {
    const [ formData, setFormData ] = useState('slate');
    const [ resultData, setResultData ] = useState("00000");
    const [ guessed, setGuessed ] = useState(false);
    const [ gameOn, setGameOn ] = useState(true);
    const [fullWordList, setFullWordList ] = useState([]);

    // Load the wordlist and first recommendation from backend
    useEffect(() => {
        axios.get('https://kw0fp1o8w9.execute-api.us-east-2.amazonaws.com/prod/wordlist')
            .then(res => { 
                setFullWordList(res.data);
                setWordlist(res.data);
                return axios.post('https://kw0fp1o8w9.execute-api.us-east-2.amazonaws.com/prod/recommendation', { "wordlist": res.data });
            })
            .then(res => {
                    setBestWord(res["data"]["best_word"])
                }
            );
    },[ setBestWord, setWordlist ])

    // Given a user guess and the result (sequence of greys, greens, yellows), determines if a word is still possible
    // Used to filter possible word list later on
    function goodWord(word, guess, result) {
        for (let i=0; i<guess.length; i++) {
            let c = guess.charAt(i);
            
            if (result.charAt(i) === 'g' && c !== word.charAt(i)) {return false}
    
            else if (result.charAt(i) === 'y' && (word.charAt(i) === c || !word.includes(c))) {return false}
    
            else if (result.charAt(i) === '0' && word.includes(c)) {return false};
        }
        return true;
    }

    // Handler for submit button on the first phase of the entry form. Checks if the user input a valid 5-letter word
    // If they do, go on to the next phase of the form (inputting the response)
    function handleFirstSubmit(event) {
        event.preventDefault();
        if (fullWordList.includes(formData)) {
            setGuessed(true);
        } else{
            setNotification([true, "Please enter a valid 5 letter word, ya dingus"]);
            setTimeout(() => setNotification(""), 3000);
        }
    }

    // Handler for submit button on the second phase of form. Ends the process if the word was correct
    // Otherwise, filters the wordlist using goodWord and gets a new recommendation from the backend
    function handleSecondSubmit(event) {
        event.preventDefault();
        if (resultData === "ggggg") {
            setGameOn(false);
            setNotification([false, "Good job!"]);
        }
        const newList = wordlist.filter(w => goodWord(w, formData, resultData));

        axios.post('https://kw0fp1o8w9.execute-api.us-east-2.amazonaws.com/prod/recommendation', { "wordlist": newList })
            .then(res => {
                const newBestWord = res["data"]["best_word"];
                setBestWord(newBestWord);
                setFormData(newBestWord);
                setWordlist(newList);
                
            })
        setGuesses([...guesses, formData]);
        setGuessed(false);
    }

    // Handler for the buttons to input the result. Sequences color through grey, yellow, and green
    // and updates resultData
    function handleButtonClick(event) {
        const color = event.target.style.backgroundColor;
        const id = parseInt(event.target.id);

        switch (color) {
            case "grey":
                event.target.style.backgroundColor = "rgb(228, 208, 10)";
                setResultData(resultData.substr(0,id) + "y" + resultData.substr(id+1));
                break;
            case "rgb(228, 208, 10)":
                event.target.style.backgroundColor = "green";
                setResultData(resultData.substr(0,id) + "g" + resultData.substr(id+1));
                break;
            default:
                event.target.style.backgroundColor = "grey";
                setResultData(resultData.substr(0,id) + "0" + resultData.substr(id+1));
        }
    }

    // Handle back button. Takes user back to first phase of entry and resets resultData
    function handleBackClick() {
        setGuessed(false);
        setResultData("00000");
    }

    // After the game ends, stop showing the entry form
    if (!gameOn) {
        return <div></div>
    }


    return (
        <div>
            {/* Decide which phase of form to show */}
            {guessed ?

                // Second phase
                <div className="nobr">
                    <form className="entry" onSubmit={handleSecondSubmit}>
                    Input result: 
                    {formData
                        .split('')
                        .map((c,i) => 
                            <input type="button" key={i} id={i} value={c} onClick={handleButtonClick} style={{backgroundColor: 'grey'}}/>
                        )}

                    <input type="submit" value="Submit" />
                    <button value="Back" onClick={handleBackClick}>Back</button>
                    </form>
                </div>
                :

                // First phase
                <form className="entry" onSubmit={handleFirstSubmit}>
                    Input your guess: <input ref={input => input && input.focus()} type="text" value={formData} onChange={e => setFormData(e.target.value.toLowerCase())} />
                    <input type="submit" value="Enter" />
                </form>

            }
        </div>

    )

}

export default Entry;