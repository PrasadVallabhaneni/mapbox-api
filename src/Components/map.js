import React,{useState,useEffect} from 'react';
import ReactMapGL, {
  Marker,
  GeolocateControl,
  Source,
  Layer,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";


const Map=({datas,showMarks,dis})=>{
   
    
  const [viewport, setViewport] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 4,
    width: "50%",
    height: "100%",
  });
const routes = {
  type: "Feature",
  geometry: {
    type: "LineString",
    coordinates:dis,
  },
};
 
useEffect(()=>{
    
   console.log(datas,showMarks,'routes',routes)
},[datas,showMarks,dis])
  return (
    <ReactMapGL
      style={{ position: "relative", top: "-100%", width: "50%", left: "50%" }}
      mapboxApiAccessToken={
        "pk.eyJ1IjoicHJhc2FkdmFsbGFiaGFuZW5pIiwiYSI6ImNrbHJreWNmMDAxN3kyd28zdmh2bHQxbjkifQ.2WFulK07Qaj0p9KXtWB-hA"
      }
      {...viewport}
      width="50%"
      height="75%"
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      <GeolocateControl
        style={{right:10,top:10}}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        auto 
      />

      {showMarks &&
        datas.map((x, i) => (
          <Marker
            key={i}
            latitude={+x.latitude}
            longitude={+x.longitude}
            offsetTop={(-viewport.zoom * 5) / 2}
          >
            <img
              src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"
              width={20}
              height={20}
            />
          </Marker>
        ))}
      {dis && <Source id="route" type="geojson" data={routes} />}
      <Layer
        id="route"
        type="line"
        source="route"
        layout={{
          "line-join": "round",
          "line-cap": "round",
        }}
        paint={{
          "line-color": "black",
          "line-width": 4,
        }}
      />
    </ReactMapGL>
  );
}
export default Map;