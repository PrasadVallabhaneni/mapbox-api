import React, { useState, useEffect, useRef } from "react";

const Form = ({ onADD,marks }) => {
  const formRef = useRef();
  const [button, setButton] = useState(true);
  const [inp, setInp] = useState({
    location: "",
    latitude: "",
    longitude: "",
  });
  const onChange = (val) => {
    setInp({ ...inp, [val.target.id]: val.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    onADD(inp);
    setInp({
      location: "",
      latitude: "",
      longitude: "",
    });
    formRef.current.reset();
  };
  useEffect(() => {
    if (
      inp.location.length === 0 &&
      inp.latitude.length === 0 &&
      inp.longitude.length === 0
    ) {
      setButton(true);
    } else {
      setButton(false);
    }
  }, [inp]);
  return (
    <div className="form">
      <form onSubmit={submit} ref={formRef}>
        <div>
          <label for="location">Location Name</label> <br />
          <input
            type="text"
            id="location"
            placeholder="Location"
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label for="location">Enter Latitude</label> <br />
          <input
            type="text"
            id="latitude"
            placeholder="Lat"
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label for="location">Enter Longitude</label> <br />
          <input
            type="text"
            id="longitude"
            placeholder="Lon"
            onChange={onChange}
            required
          />
        </div>
        <div>
          <br />
          {button ? (
            <button type="button" className="formButton" onClick={marks}>
              SUBMIT
            </button>
          ) : (
            <button type="submit" className="addButton">
              ADD
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
