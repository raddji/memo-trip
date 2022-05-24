import React from 'react'

const HighlightTile = (props) => {
  const { dining, activity, note, id } = props.highlight
  return (
    <div>
      <ul>
        <li>{dining}</li>
        <li>{activity}</li>
        <li>{note}</li>
      </ul>
    </div>
  )
}

export default HighlightTile;