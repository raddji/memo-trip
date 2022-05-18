import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom";
import translateServerErrors from "../services/translateServerErrors.js"
import ErrorList from "./layout/ErrorList.js";

const NewTripForm = ({ trips, setTrips }) => {
  const [newTrip, setNewTrip] = useState({
    name: "",
    location: "",
    when: ""
  });

  const [errors, setErrors] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  if (shouldRedirect) {
    return <Redirect to="/" />
  }

  const postNewTrip = async (newTripData) => {
    try {
      const response = await fetch("/api/v1/trips", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(newTripData)
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          setErrors(newErrors);
        } else {
          throw new Error(`${response.status} (${response.statusText})`);
        } 
      } else {
        const body = await response.json();
        setErrors([]);
        setShouldRedirect(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setNewTrip({
      ...newTrip,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      postNewTrip(newTrip)
      clearForm();
  }

  const clearForm = () => {
    setNewTrip({
    name: "",
    location: "",
    when: ""
    })
  }
  
  return (
    <div>
      <h1>Add a new trip:</h1>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <input 
          type="text" 
          name="name" 
          placeholder="Name My Trip"
          onChange={handleInputChange}
          value={newTrip.name}
          />
        </label>
        <label htmlFor="location">
          <input 
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleInputChange}
          value={newTrip.location}

          />
        </label>
        <label htmlFor="when">
          <input 
          type="text"
          name="when"
          placeholder="When"
          onChange={handleInputChange}
          value={newTrip.when}
          />
        </label>
        
        <input type="submit" className="button" value="Enter"/>
      </form>
    </div>
  )

}

export default NewTripForm;