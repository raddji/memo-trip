import React from "react"
import { Link } from "react-router-dom"

const TripTile = (props) => {
  const { name, location, date, id } = props.trip
  return (
    <div>
        <ul>
          <Link to={`/trips/${id}`}>
          <li>{name}</li>
          </Link>
          <li>{location}</li>
          <li>{date}</li>
        </ul>  
      </div>
  )
}

export default TripTile;

