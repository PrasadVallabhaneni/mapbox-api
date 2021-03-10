import React, { useState, useRef, useEffect } from "react";
// import ReactMapGL, {
//   Marker,
//   GeolocateControl,
//   Source,
//   Layer,
// } from "react-map-gl";
import mapboxgl from "mapbox-gl";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
// import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ({ datas, showMarks, dis }) => {
  const [lat, setLat] = useState(20.5937);
  const [long, setLong] = useState(78.9629);

  const container = useRef();
  // const [viewport, setViewport] = useState({
  //   latitude: +lat,
  //   longitude: +long,
  //   zoom: 6,
  //   width: "50%",
  //   height: "100%",
  // });
  // const routes = {
  //   type: "Feature",
  //   geometry: {
  //     type: "LineString",
  //     coordinates: dis,
  //   },
  // };

  useEffect(() => {
    const map = new mapboxgl.Map({
      accessToken:
        "pk.eyJ1IjoicHJhc2FkdmFsbGFiaGFuZW5pIiwiYSI6ImNrbHJreWNmMDAxN3kyd28zdmh2bHQxbjkifQ.2WFulK07Qaj0p9KXtWB-hA",
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [long, lat],
      zoom: 4,
    });
    var directions = new MapboxDirections({
      accessToken:
        "pk.eyJ1IjoicHJhc2FkdmFsbGFiaGFuZW5pIiwiYSI6ImNrbHJreWNmMDAxN3kyd28zdmh2bHQxbjkifQ.2WFulK07Qaj0p9KXtWB-hA",
      unit: "metric",
      profile: "mapbox/cycling",
    });
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(directions, "bottom-left");

    if (showMarks) {
      datas.forEach((x) => {
        var marker = new mapboxgl.Marker()
          .setLngLat([x.longitude, x.latitude])
          .addTo(map);
      });
    }
    if (dis) {
      dis.forEach((x, i) => {
        if (i == 0) {
          directions.setOrigin([x[0], x[1]]);
        } else if (i == dis.length - 1) {
          directions.setDestination([x[0], x[1]]);
        } else {
          directions.addWaypoint(i - 1, [x[0], x[1]]);
        }
      });

      // directions.setDestination([77,12])
    }

    // if(!datas.length && !dis.length){
    //   console.log('remo')
    //       // map.remove();

    // }
    if (datas.length) {
      setLat(datas[datas.length - 1].latitude);
      setLong(datas[datas.length - 1].longitude);
    }

    console.log("datas", datas, "marks", showMarks, "routes", dis);
  }, [datas, showMarks, dis, lat, long]);
  return (
    <div
      style={{
        position: "relative",
        top: "-100%",
        width: "50%",
        height: "78%",
        borderBottomRightRadius: "36px",
        left: "50%",
      }}
      id="map"
      ref={container}
    ></div>
  );
};
export default Map;
