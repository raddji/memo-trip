import React, { useState, useEffect } from "react"
import TripTile from "./TripTile.js"

const TripIndex = (props) => {
  const [trips, setTrips] = useState([]);

  const getTrips = async () => {
    try {
      const response = await fetch("/api/v1/trips");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw (error);
      }
      const body = await response.json();
      setTrips(body.trips);
    } catch {
      console.error(`Error in fetch: ${err.message}`)
    }
  };

  useEffect(() => {
    getTrips();
  }, []);

  const tripTiles = trips.map((trip) => {
    return <TripTile key={trip.id} trip={trip} />
  });

  return (
    <div>
      <h3>Where To Next: </h3>
      {tripTiles}
    </div>
  );
};

export default TripIndex;