import React, { useState, useEffect } from "react"
import ErrorList from "./layout/ErrorList";
import NewHighlightForm from "./NewHighlightForm.js";
import NewPicForm from "./NewPicForm";

const TripShowPage = (props) => {
  const [trip, setTrip] = useState({ highlights: [], pics: [] });
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

  const postHighlight = async (highlightFormData) => {
    try {
      const response = await fetch(`/api/v1/trips/${id}/highlights`, {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(highlightFormData)
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        const highlight = await response.json();
        const updatedHighlights = trip.highlights.concat(highlight);
        console.log(trip)
        setErrors([]);
        setTrip({...trip, highlights: updatedHighlights });
      }
    } catch (err) {
      console.error(`error in fetch: ${err.message}`);
    }
  };
  console.log(trip)

  const highlightTiles = trip.highlights.map((highlight) => {
    return (
      <div>
        <ul>
          <li>{highlight.dining}</li>
          <li>{highlight.activity}</li>
          <li>{highlight.note}</li>
        </ul>
      </div>
    )
  })

  const picTiles = trip.pics.map((pic) => {
    return (
      <div>
        <h3>{pic.title}</h3>
        <img src={pic.image} />
      </div>
    )
  })

  const postPic = async (newPic) => {
    try {
      const response = await fetch(`/api/v1/trips/${id}/pics`, {
        method: "POST",
        headers: {
          "Accept": "image/jpeg"
        },
        body: newPic
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          setErrors(body.errors)
        } else {
          throw new Error(`${response.status} (${response.statusText})`);
        }
      }
      const body = await response.json()
      // setPics([
      //   ...pics,
      //   body.pic
      // ])
    } catch (error) {
      console.log(error)
      console.error(`Error in addPic fetch getch: ${error.message}`);
    }
  }

  return (
    <div>
      <h1>{trip.name}</h1>
      <p>{trip.location}</p>
      <p>{trip.trip_start}</p>
      <p>{trip.trip_end}</p>
      {highlightTiles}
      {picTiles}
      <ErrorList errors={errors} />
      <NewHighlightForm 
      postHighlight={postHighlight}
      />
      <NewPicForm 
      postPic={postPic}
      />
    </div>   
  )
}

export default TripShowPage;