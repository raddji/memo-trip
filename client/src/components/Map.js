import React, { useState, useEffect } from "react";

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
      // console.log(articleData)
      // debugger
      if (articleData) {
        setNYTArticle(articleData.response.docs[0].abstract);
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
      <p>{nytArticle}</p>
    </div>
  )
}

export default Map;