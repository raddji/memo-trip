import React, { useState, useEffect } from "react"
import MemoTripTile from "./MemoTripTile.js"

const MemoTripIndex = (props) => {
  const [memoTrips, setMemoTrips] = useState([]);

  const getMemoTrips = async () => {
    try {
      const response = await fetch("/api/v1/memotrips");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw (error);
      }
      const body = await response.json();
      setMemoTrips(body.memoTrips);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  };

  useEffect(() => {
    getMemoTrips();
  }, []);

  const memoTripTiles = memoTrips.map((memoTrip) => {
    return <MemoTripTile key={memoTrip.id} memoTrip={memoTrip} />
  });

  return (
    <div className="show-page-card">
      <h3 className="decorative-font">Where To Next: </h3>
      {memoTripTiles}
    </div>
  );
};

export default MemoTripIndex;