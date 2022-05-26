import React, { useState, useEffect } from 'react'
import ErrorList from './layout/ErrorList';

const Map = (props) => {
  const [map, setMap] = useState({})
  const getMap = async () => {
    try {
      const response = await fetch(`/api/v1/address`);
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json();
      setMap(body.map);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMap();
  }, []);


  return (
    <div className="map">
      <h2>My Map</h2>
      <ul>
        <li>
          {map.something}
        </li>
      </ul>
    </div>
  )
}

export default Map;