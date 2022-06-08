import React, { useState, useEffect } from 'react'
import axios from "axios";
// import "dotenv/config" 

const Mapping = (props) => {
  const [articles, setArticles] = useState(null);
  const [article, setArticle] = useState("");
  
  const userInput = "hawaii";
  const nytimesUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${userInput}&api-key=b9QlcMrqvGwdp6fnIbhpkFi5fRtwdmrO`;
  
  const getArticleWithFetch = async () => {
    const response = await axios.get(nytimesUrl);
    setArticles(response.data);
  };

  const handleInputChange = event => {
    setArticles({
      ...articles,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  let dataObjTiles = "";
  if (articles) {
  dataObjTiles = articles.response.docs.map((doc) => {
    return (
      <div key={doc.snippet}>
        <ul>
          <h3><li>{doc.headline.main}</li></h3>
          <li>{doc.snippet}</li>
        </ul>
      </div>
    )
  })
}
  useEffect(() => {
    getArticleWithFetch();
  }, []);

  return (
    <div key="articles">
      <header>
        <h2 className="top-bar-text">NYTimes Articles</h2>
      </header>
      {/* <form>
        <label htmlFor="article">
            <input 
            type="text" 
            name="article" 
            placeholder="Find article related to memory" 
            onChange={handleInputChange}
            />
        </label>
      </form> */}
      <div>
        <ul>
          <li className="nyt-article">{dataObjTiles}</li>
        </ul>
      </div>
    </div>
  )
}

export default Mapping;