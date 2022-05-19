import React, { useState, useEffect } from 'react';

const NewHighlightForm = ({ postHighlight }) => {
  const [newHighlight, setNewHighlight] = useState({
    dining: "",
    activity: "",
    note: ""
  });

  const handleInputChange = (event) => {
    setNewHighlight({ 
      ...newHighlight,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postHighlight(newHighlight);
    clearForm();
  };

  const clearForm = () => {
    setNewHighlight({
      dining: "",
      activity: "",
      note: ""
    });
  };

  return (
    <div>
      <h3>Things to do on this trip: </h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dining">
          <input 
          type="text" 
          name="dining" 
          placeholder="A place to get delicious food"
          onChange={handleInputChange}
          value={newHighlight.dining}
          />
        </label>
        <label htmlFor="activity">
          <input 
          type="text" 
          name="activity" 
          placeholder="Recommended fun activity or attraction"
          onChange={handleInputChange}
          value={newHighlight.activity}
          />
        </label>
        <label htmlFor="note">
          <input 
          type="text" 
          name="note" 
          placeholder="Anything I don't want to forget" 
          onChange={handleInputChange}
          value={newHighlight.note}
          />
        </label>

        <input type="submit" value="Add Ideas" className="button" />
      </form>
    </div>
  )
}

export default NewHighlightForm;