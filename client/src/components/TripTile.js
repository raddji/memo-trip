import React from "react"
import { Link } from "react-router-dom"

const TripTile = (props) => {
  const { name, location, trip_start, trip_end, pic, id } = props.trip
  return (
    <div>
        <ul>
          <Link to={`/trips/${id}`}>
          <li>{name}</li>
          </Link>
          <li>{location}</li>
          <li>{trip_start}</li>
          <li>{trip_end}</li>
        </ul>  
      </div>
  )
}

export default TripTile;

