import React, { useState } from "react";
import Dropzone from 'react-dropzone';

const NewPicForm = (props,) => {
  const [pic, setPic] = useState({
    title: "",
    image: {},
  })

  const [uploadedImage, setUploadedImage] = useState({
    preview: ""
  })

  const handleChange = (event) => {
    event.preventDefault()
    setPic({
      ...pic,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleImageUpload = (acceptedImage) => {
    setPic({
      ...pic,
      image: acceptedImage[0]
    })
    setUploadedImage({
      preview: URL.createObjectURL(acceptedImage[0])
    })
  }

  const clearForm = () => {
    setPic({
      title: "",
      image: {},
    })
    setUploadedImage({
      preview: ""
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const body = new FormData()
    body.append("title", pic.title)
    body.append("image", pic.image)
    props.postPic(body)
    clearForm()
  }

  return (
    <div className="pic-form-card card">
        <form className="" onSubmit={handleSubmit}>
          <h3 className="decorative-font">Add Photos:</h3>
          <div>
            <label htmlFor="title">
            <input
            id="title"
            name="title"
            value={pic.title}
            onChange={handleChange}
            placeholder="Title"
            className="add-radius"
            />
            </label>
          </div>
        
        <Dropzone onDrop={handleImageUpload}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Upload Some Favorite Moments - drag 'n' drop or click to upload</p>
              </div>
            </section>
          )}
        </Dropzone>

        <img src={uploadedImage.preview} />

        <div>
          <input 
          className="button pic-buttons"
          type="submit"
          value="Add"
          />
          <input
            className="button pic-buttons"
            type="submit"
            value="Clear"
            onClick={clearForm}
            />
        </div>
      </form>
    </div>
  )
}

export default NewPicForm;