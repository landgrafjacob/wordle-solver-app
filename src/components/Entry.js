import React, {useState} from 'react';

const Entry = ({ formData, setFormData, feedbackData, setFeedbackData }) => {
    const [ guessed, setGuessed ] = useState(false)
    function handleFirstSubmit(event) {
        event.preventDefault();
        setGuessed(true);
    }

    function handleSecondSubmit(event) {
        event.preventDefault();
        console.log(feedbackData)
    }

    function handleButtonClick(event) {
        const color = event.target.style.backgroundColor;
        const id = parseInt(event.target.id);

        switch (color) {
            case "grey":
                event.target.style.backgroundColor = "rgb(228, 208, 10)";
                setFeedbackData(feedbackData.substr(0,id) + "y" + feedbackData.substr(id+1));
                break;
            case "rgb(228, 208, 10)":
                event.target.style.backgroundColor = "green";
                setFeedbackData(feedbackData.substr(0,id) + "g" + feedbackData.substr(id+1));
                break;
            default:
                event.target.style.backgroundColor = "grey";
                setFeedbackData(feedbackData.substr(0,id) + "0" + feedbackData.substr(id+1));
        }
    }

    function handleBackClick() {
        setGuessed(false);
        setFeedbackData("00000");
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
                    Input your guess: <input type="text" value={formData} onChange={e => setFormData(e.target.value)} />
                    <input type="submit" value="Enter" />
                </form>

            }
        </div>
    )
}

export default Entry;