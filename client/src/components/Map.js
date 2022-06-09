import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Map = (props) => {
  const [nytArticle, setNYTArticle] = useState(null);

  const getArticles = async () => {
    try {
      const article = props.article;
      const response = await fetch(`/api/v1/articles?article=${article}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const articleData = await response.json();
      console.log(articleData)
      // debugger
      let dataObjectTiles = "";

      if (articleData) {
        dataObjectTiles = articleData.response.docs.map((doc) => {
          return (
            <div key={doc.snippet}> 
              <ul>
                <Link to={doc.web_url}><h3><li>{doc.headline.main}</li></h3></Link>
                <li>{doc.snippet}</li>
              </ul>
            </div>
          )
        })
        setNYTArticle(dataObjectTiles);
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div>
      <h1>New York Times articles:</h1>
      {nytArticle}
    </div>
  )
}

export default Map;