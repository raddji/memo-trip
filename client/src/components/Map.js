import React, { useState, useEffect } from 'react'
import axios from "axios";


const Map = (props) => {
  const [articles, setArticles] = useState(null);
  
  const userInput = "hawaii";
  const nytimesUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${userInput}&api-key=b9QlcMrqvGwdp6fnIbhpkFi5fRtwdmrO`;
  
  const getArticleWithFetch = async () => {
    const response = await axios.get(nytimesUrl);
    setArticles(response.data);
  };
  console.log(articles)

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
      <div>
        <ul key={doc.snippet}>
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
  // debugger

  return (
    <div key="articles">
      <header>
        <h2>NYTimes Articles</h2>
      </header>
      <form>
        <label htmlFor="article">
            <input 
            type="text" 
            name="article" 
            placeholder="Find article related to memory" 
            onChange={handleInputChange}
            />
        </label>
      </form>
      <div>
        <ul>
          {/* <li>{userData.status}</li> */}
          {/* <li>{userData.copyright}</li> */}
          <li className="nyt-article">{dataObjTiles}</li>
          {/* <li>{userData.response.docs[0].snippet}</li> */}
          {/* <li>{dataObjTiles}</li> */}
        </ul>
        {/* <h5>{userData.response.docs[0].abstract}</h5>
        <h5>{userData.response.docs[1].abstract}</h5>
        <h5>{userData.response.docs[2].abstract}</h5> */}

        {/* <h3>{dataObjTiles}</h3> */}
      </div>
    </div>
  )
}

export default Map;