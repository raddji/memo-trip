import React, { useState, useEffect } from 'react'

const HighlightsList = (props) => {
  const [highlights, setHighlights] = useState([])

  const getHighlights = async () => {
    try {    
      const response = await fetch("/api/v1/highlights");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      console.log(body)
      setHighlights(body.highlights)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  }

  useEffect(() => {
    getHighlights();
  }, []);

  const highlightsTiles = highlights.map((highlight) => {
    return (
      <>
        <ul>
          <li>{highlight.dining}</li>
          <li>{highlight.activity}</li>
          <li>{highlight.note}</li>
        </ul>  
      </>
    )
  })

  return (
    <div>
      {highlightsTiles}
    </div>
  )
}

export default HighlightsList;