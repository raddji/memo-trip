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
    <div className="show-page-card">
      <h3 className="decorative-font add-highlight-color">Memory Highlights: </h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dining">
          <input 
          type="text" 
          name="dining" 
          placeholder="Yummy facts about this memory"
          onChange={handleInputChange}
          value={newHighlight.dining}
          className="add-radius"
          id="1234"
          />
        </label>
        <label htmlFor="activity">
          <input 
          type="text" 
          name="activity" 
          placeholder="Activities I want to remember"
          onChange={handleInputChange}
          value={newHighlight.activity}
          className="add-radius"
          />
        </label>
        <label htmlFor="note">
          <input 
          type="text" 
          name="note" 
          placeholder="Anything else to share" 
          onChange={handleInputChange}
          value={newHighlight.note}
          className="add-radius"
          />
        </label>

        <input type="submit" value="Enter" className="button add-radius pic-buttons" />
      </form>
    </div>
  )
}

export default NewHighlightForm;