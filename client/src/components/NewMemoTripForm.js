import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom";
import translateServerErrors from "../services/translateServerErrors.js"
import ErrorList from "./layout/ErrorList.js";

const NewMemoTripForm = ({ memoTrips, setMemoTrips }) => {
  const [newMemoTrip, setNewMemoTrip] = useState({
    name: "",
    where: "",
    when: "",
    what: ""
  });

  const [errors, setErrors] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  if (shouldRedirect) {
    return <Redirect to="/memotrips" />
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
          console.log(newErrors)
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
    where: "",
    when: "",
    what: ""
    })
  }
  
  return (
    <div>
      <div className="show-page-card">
        <h1 className="decorative-font top-bar-text">Add a new memory:</h1>
        <ErrorList errors={errors} />
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            <input 
            type="text" 
            name="name" 
            className="add-radius"
            placeholder="Give it a name:"
            onChange={handleInputChange}
            value={newMemoTrip.name}
            />
          </label>
          <label htmlFor="where">
            <input 
            type="text"
            name="where"
            className="add-radius"
            placeholder="Where was it:"
            onChange={handleInputChange}
            value={newMemoTrip.where}
            />
          </label>
          <label htmlFor="when">
            <input 
            type="date"
            name="when"
            className="add-radius"
            placeholder="When:"
            onChange={handleInputChange}
            value={newMemoTrip.when}
            />
          </label>
          <label htmlFor="what">
            <input 
            type="text"
            name="what"
            className="add-radius"
            placeholder="What do you want to remember:"
            onChange={handleInputChange}
            value={newMemoTrip.what}
            />
          </label>
          
          <input type="submit" className="button pic-buttons" value="Enter"/>
        </form>
      </div>
    </div>
  )
}

export default NewMemoTripForm;