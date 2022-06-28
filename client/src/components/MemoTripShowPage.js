import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorList from "./layout/ErrorList";
import NewHighlightForm from "./NewHighlightForm.js";
import HighlightTile from "./HighlightTile.js"
import NewPicForm from "./NewPicForm";
import PicTile from "./PicTile";
import Map from "./Map";
import translateServerErrors from "../../../client/src/services/translateServerErrors.js"

const MemoTripShowPage = (props) => {

  const [memoTrip, setMemoTrip] = useState({ 
    name: "",
    what: "",
    where: "",
    when: "", 
    article: "",
    comments: [],
    highlights: [], 
    pics: [], 
  });
  const [errors, setErrors] = useState({});
  const { id } = useParams();

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
        setErrors([]);
        setMemoTrip({...memoTrip, highlights: updatedHighlights });
      }
    } catch (err) {
      console.log(err)
      console.error(`error in fetch: ${err.message}`);
    }
  };

  const highlightTiles = memoTrip.highlights.map((highlight) => {
    return <HighlightTile key={highlight.id} highlight={highlight} />
  })

  const picTiles = memoTrip.pics.map((pic) => {
    return <PicTile key={pic.id} pic={pic} />
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
          console.log(body.errors)
          const newErrors = translateServerErrors(body.errors);
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage);
          throw error;
        }
      }
      const body = await response.json()
      setMemoTrip({...memoTrip, pics:[...memoTrip.pics, body.pic] })

    } catch (error) {
      console.error(`Error in addPic fetch: ${error.message}`);
    }
  }

  const articleMapTile = memoTrip.article ? <Map article={memoTrip.article} /> : null;

  return (
    <div>
      <div className="card show-memory-card">
        <h1 className="decorative-font">{memoTrip.name}</h1>
        <p>{memoTrip.where}</p>
        <p>{memoTrip.what}</p>
      </div>
      <h3 className="decorative-font best-pics-color">Best pics</h3>
      <div className="images-center">
        {picTiles}
      </div>
      <div>
        {highlightTiles}
      </div>
      <div> 
        {articleMapTile}
      </div>
      <div className="highlight-form">
      <ErrorList errors={errors} />
      <NewHighlightForm 
      postHighlight={postHighlight}
      />
      </div>
      <div>
      <NewPicForm 
      postPic={postPic}
      />
      </div>
    </div>   
  )
}

export default MemoTripShowPage;