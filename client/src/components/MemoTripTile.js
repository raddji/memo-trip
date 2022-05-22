import React from "react"
import { Link } from "react-router-dom"

const MemoTripTile = (props) => {
  const { name, location, date, pic, id } = props.memoTrip
  return (
    <div>
        <ul>
          <Link to={`/memotrips/${id}`}>
          <li className="memory-name-color">{name}</li>
          </Link>
          <li>{location}</li>
          <li>{date}</li>
        </ul>  
      </div>
  )
}

export default MemoTripTile;

