import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom";
import translateServerErrors from "../services/translateServerErrors.js"
import ErrorList from "./layout/ErrorList.js";

const NewMemoTripForm = ({ memoTrips, setMemoTrips }) => {
  const [newMemoTrip, setNewMemoTrip] = useState({
    name: "",
    location: "",
    date: ""
  });

  const [errors, setErrors] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  if (shouldRedirect) {
    return <Redirect to="/trips" />
  }

  const postNewMemoTrip = async (newMemoTripData) => {
    try {
      const response = await fetch("/api/v1/memotrips", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(newMemoTripData)
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
    setNewMemoTrip({
      ...newMemoTrip,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      postNewMemoTrip(newMemoTrip)
      clearForm();
  }

  const clearForm = () => {
    setNewMemoTrip({
    name: "",
    location: "",
    date: ""
    })
  }
  
  return (
    <div>
      <div className="show-page-card">
        <h1 className="decorative-font">Add a new memory:</h1>
        <ErrorList errors={errors} />
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            <input 
            type="text" 
            name="name" 
            className="add-radius"
            placeholder="Name My Trip"
            onChange={handleInputChange}
            value={newMemoTrip.name}
            />
          </label>
          <label htmlFor="location">
            <input 
            type="text"
            name="location"
            className="add-radius"
            placeholder="Location"
            onChange={handleInputChange}
            value={newMemoTrip.location}

            />
          </label>
          <label htmlFor="date">
            <input 
            type="date"
            name="date"
            className="add-radius"
            placeholder="From:"
            onChange={handleInputChange}
            value={newMemoTrip.date}
            />
          </label>
          
          <input type="submit" className="button" value="Enter"/>
        </form>
      </div>
    </div>
  )
}

export default NewMemoTripForm;