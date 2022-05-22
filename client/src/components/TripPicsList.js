import React, { useState, useEffect } from "react"

const TripPicsList = (props) => {
  const [pics, setPics] = useState([]);

  const getPics = async () => {
    try {
      const response = await fetch("/api/v1/pics")
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setPics(body.pics)
      setPics([
        ...pics,
        body.pic
      ])
    } catch (error) {
      console.log(error)
      console.error(`Error in getPics getch: ${error.message}`);
    } 
  };  
  useEffect(() => {
    getPics()
  }, []);
}

export default TripPicsList; 
