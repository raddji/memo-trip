import React from "react"
import { Link } from "react-router-dom"

const TripTile = (props) => {
  return (
    <div>
        <ul>
          <li>{props.trip.name}</li>
          <li>{props.trip.location}</li>
          <li>{props.trip.when}</li>
        </ul>  
      </div>
  )
}

export default TripTile;

