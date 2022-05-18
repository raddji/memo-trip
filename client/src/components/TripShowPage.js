import React, { useState, useEffect } from "react"
import ErrorList from "./layout/ErrorList";

const TripShowPage = (props) => {
  const [trip, setTrip] = useState({
    name: "",
    location: "",
    date: ""
  });
  const [errors, setErrors] = useState({});
  const { id } = props.match.params;

  const getTrip = async () => {
    try {
      const response = await fetch(`/api/v1/trips/${id}`);
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const body = await response.json();
      setTrip(body.trip)

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTrip();
  }, []);

  return (
    <div>
      <h1>{trip.name}</h1>
      <p>{trip.location}</p>
      <p>{trip.date}</p>
    </div>
  )

}

export default TripShowPage;