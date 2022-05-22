import React, { useState, useEffect } from "react"
import ErrorList from "./layout/ErrorList";
import NewHighlightForm from "./NewHighlightForm.js";
import NewPicForm from "./NewPicForm";

const MemoTripShowPage = (props) => {
  const [memoTrip, setMemoTrip] = useState({ highlights: [], pics: [] });
  const [errors, setErrors] = useState({});
  const { id } = props.match.params;

  const getMemoTrip = async () => {
    try {
      const response = await fetch(`/api/v1/memotrips/${id}`);
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const body = await response.json();
      setMemoTrip(body.memoTrip)

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMemoTrip();
  }, []);

  const postHighlight = async (highlightFormData) => {
    try {
      const response = await fetch(`/api/v1/memotrips/${id}/highlights`, {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(highlightFormData)
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        const highlight = await response.json();
        const updatedHighlights = memoTrip.highlights.concat(highlight);
        console.log(memoTrip)
        setErrors([]);
        setMemoTrip({...memoTrip, highlights: updatedHighlights });
      }
    } catch (err) {
      console.log(err)
      console.error(`error in fetch: ${err.message}`);
    }
  };
  console.log(memoTrip)

  const highlightTiles = memoTrip.highlights.map((highlight) => {
    return (
      <div>
        <ul>
          <li>{highlight.dining}</li>
          <li>{highlight.activity}</li>
          <li>{highlight.note}</li>
        </ul>
      </div>
    )
  })

  const picTiles = memoTrip.pics.map((pic) => {
    return (
      <div>
        <h3>{pic.title}</h3>
        <img src={pic.image} />
      </div>
    )
  })

  const postPic = async (newPic) => {
    try {
      const response = await fetch(`/api/v1/memotrips/${id}/pics`, {
        method: "POST",
        headers: {
          "Accept": "image/jpeg"
        },
        body: newPic
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          setErrors(body.errors)
        } else {
          throw new Error(`${response.status} (${response.statusText})`);
        }
      }
      const body = await response.json()
      // setPics([
      //   ...pics,
      //   body.pic
      // ])
    } catch (error) {
      console.error(`Error in addPic fetch: ${error.message}`);
    }
  }

  return (
    <div className="show-page-card">
      <h1 className="decorative-font">{memoTrip.name}</h1>
      <p>{memoTrip.location}</p>
      <p>{memoTrip.date}</p>
      {highlightTiles}
      {picTiles}
      <ErrorList errors={errors} />
      <NewHighlightForm 
      postHighlight={postHighlight}
      />
      <NewPicForm 
      postPic={postPic}
      />
    </div>   
  )
}

export default MemoTripShowPage;