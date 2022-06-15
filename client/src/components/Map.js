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
        dataObjectTiles = articleData.response.docs.map((doc, index) => {
          return (
            <div key={index} className="article-hover article"> 
              <ul>
                <a href={doc.web_url} target="_blank"><h3><li className="article-color">{doc.headline.main}</li></h3></a>
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
    <div className="article-card">
      <h1 className="article-head decorative-font">New York Times articles:</h1>
      {nytArticle}
    </div>
  )
}

export default Map;