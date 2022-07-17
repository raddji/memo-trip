import React, { useState } from 'react';

const CommentTile = (props) => {
  const { commentAuthor, commentText } = props
  return (
    <div>
      <h5>{commentAuthor}</h5>
      <p>{commentText}</p>
    </div>
  )
}

export default CommentTile;