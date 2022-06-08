import React from "react"
import { Link } from "react-router-dom"

const MemoTripTile = (props) => {

  const { name, where, when, what, pic, id, article } = props.memoTrip
  
  return (
    <div className="flex-tiles">
      <div className="card index-card">
          <ul>
            <Link to={`/memotrips/${id}`}>
            <li className="memory-name-color">{name}</li>
            </Link>
            <li>{where}</li>
            <li>{when.substring(0, 10)}</li>
            <li>{what}</li>
          </ul>  
        </div>
      </div>
  )
}

export default MemoTripTile;

