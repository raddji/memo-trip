import React from 'react'

const PicTile = (props) => {
  const { title, image } = props.pic
  return (
  <div className="images">
    <div>
      <h3>{title}</h3>
      <img src={image} />
    </div>
  </div>
  )
}

export default PicTile;