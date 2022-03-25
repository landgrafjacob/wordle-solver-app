import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Entry = ({ guesses, setGuesses, setBestWord }) => {
    const [ formData, setFormData ] = useState('slate')
    const [ resultData, setResultData ] = useState("00000")
    const [ guessed, setGuessed ] = useState(false)
    const [ wordlist, setWordlist ] = useState([])

    useEffect(() => {
        axios.get('https://kw0fp1o8w9.execute-api.us-east-2.amazonaws.com/prod/wordlist')
            .then(res => { 
                setWordlist(res.data) 
                return axios.post('https://kw0fp1o8w9.execute-api.us-east-2.amazonaws.com/prod/recommendation', { "wordlist": res.data })
            })
            .then(res => setBestWord(res["data"]["best_word"]))

    },[ setBestWord, setWordlist])

    function goodWord(word, guess, result) {
        for (let i=0; i<guess.length; i++) {
            let c = guess.charAt(i);
            
            if (result.charAt(i) === 'g' && c !== word.charAt(i)) {return false}
    
            else if (result.charAt(i) === 'y' && (word.charAt(i) === c || !word.includes(c))) {return false}
    
            else if (result.charAt(i) === '0' && word.includes(c)) {return false}
        }
        return true;
    }



    function handleFirstSubmit(event) {
        event.preventDefault();
        setGuessed(true);
    }

    function handleSecondSubmit(event) {
        event.preventDefault();
        const newList = wordlist.filter(w => goodWord(w, formData, resultData));
        setWordlist(newList);

        axios.post('https://kw0fp1o8w9.execute-api.us-east-2.amazonaws.com/prod/recommendation', { "wordlist": newList })
            .then(res => {
                const newBestWord = res["data"]["best_word"];
                setBestWord(newBestWord);
                setFormData(newBestWord);
            })
        setGuesses([...guesses, formData]);
        setGuessed(false);
    }

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

    function handleBackClick() {
        setGuessed(false);
        setResultData("00000");
    }


    return (
        <div>
            {guessed ?
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
                <form className="entry" onSubmit={handleFirstSubmit}>
                    Words left: {wordlist.length}. Input your guess: <input type="text" value={formData} onChange={e => setFormData(e.target.value)} />
                    <input type="submit" value="Enter" />
                </form>

            }
        </div>
    )
}

export default Entry;