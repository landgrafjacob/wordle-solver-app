import React, {useState} from 'react';

const Entry = ({ formData, setFormData }) => {
    const [ guessed, setGuessed ] = useState(false)
    function handleSubmit(event) {
        event.preventDefault();
        setGuessed(true)
    }
    return (
        guessed ?
            <div>Guess: {formData}</div>:
            
            <form className="entry" onSubmit={handleSubmit}>
                Input your guess: <input type="text" value={formData} onChange={e => setFormData(e.target.value)} />
                <input type="submit" value="Enter" />
            </form>
            
    )
}

export default Entry;