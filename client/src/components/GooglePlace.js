import { useEffect } from "react";
import React from { useState, useEffect } from "react";

const GooglePlaceTile = (props) => {
  const [place, setPlace] = useState("");

  const getPlace = async () => {
    try {
      const userInput = props.userInput

      const response = await fetch(
        `/api/v1/maps?userInput=${userInput}`
      );
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const placeData = await response.json();
      const formattedPlace = placeData.results[0].formatted_place;
      setPlace(formattedPlace);

    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getPlace();
  }, []);

  const src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyC8L2BH9R7JWikKj2lx2d5U1iuQRGL3zj8\n&q=${place}`

  return (
    <div>
      <iframe
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={src}>
      </iframe>
      <p>{userInput}</p>
    </div>
  );
};

export default GooglePlaceTile;