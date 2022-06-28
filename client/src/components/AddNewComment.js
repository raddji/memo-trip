import React, { useState } from 'react';

const AddNewComment = ({ postComment }) => {
  const [newComment, setNewComment] = useState ({
    commentAuthor: "",
    commentText: ""
  });

  const handleChange = (event) => {
    setNewComment({
      ...newComment,
      [event.currentTarget.name]: event.currentTarget.value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    postComment(newComment);
    clearForm();
  }

  const clearForm = () => {
    setNewComment({
      commentAuthor: "",
      commentText: ""
    });
  }

  return (
    <div>
      <h4>Leave a Comment: </h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="commentAuthor">
          Author:
          <input 
            type="text" 
            name="commentAuthor"
            placeholder="What's your name?"
            value={newComment.commentAuthor}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="commentText">
          Comment:
          <input 
            type="text" 
            name="commentText"
            placeholder="Say Hi!"
            value={newComment.commentText}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit Comment" />
      </form>
    </div>
  );
}

export default AddNewComment;