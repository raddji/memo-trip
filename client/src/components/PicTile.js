import React from 'react'

const PicTile = (props) => {
  const { title, image } = props.pic
  return (
  <div className="images-center">
    <div className="images">
      <div className="image-style">
        <figure>
          <img src={image} className="image-size card pic-landing-card" />
          <figcaption>{title}</figcaption>
        </figure>
      </div>
    </div>
  </div>
  )
}

export default PicTile;