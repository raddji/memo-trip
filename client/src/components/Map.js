import React, { useState, useEffect } from 'react'
import axios from "axios";


const Map = (props) => {
  const [userData, setUserData] = useState({});
  
  const nytimesUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=birthday&api-key=b9QlcMrqvGwdp6fnIbhpkFi5fRtwdmrO";
  
  const getArticleWithFetch = async () => {
    const response = await axios.get(nytimesUrl);
    setUserData(response.data);
  };
  console.log(userData)

  
  const dataObjTiles = userData.response.docs.map((doc) => {
    return (
      <div>
        <h2>NYT</h2>
        <ul>
          <li key={doc.id}>{doc.snippet}</li>
          <li key={doc.id}>{doc.abstract}</li>
        </ul>
      </div>
    )
  })
  useEffect(() => {
    getArticleWithFetch();
  }, []);
  // debugger

  return (
    <div>
      <header>
        <h2>NYTimes Articles</h2>
      </header>
      <div>
        <ul>
          <li>{userData.status}</li>
          <li>{userData.copyright}</li>
          <li>{dataObjTiles}</li>
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