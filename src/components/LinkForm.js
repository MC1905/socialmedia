import React, { useState, useEffect } from "react";
import { db } from "../Config";
const LinkForm = (props) => {
  const intialStateValues = {
    url: "",
    name: "",
    description: ""
  };

  const [values, setValues] = useState(intialStateValues);

  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    props.addOreditLink(values);
    setValues({ ...intialStateValues });
  };

  const getLinkById = async (id) => {
    try {
      if (id) {
        const doc = await db.collection("links").doc(id).get();
        setValues({ ...doc.data() });
      } else {
        console.log("error el id no existe");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.Currentid === "") {
      setValues({ ...intialStateValues });
    } else {
      getLinkById(props.Currentid);
    }
  }, [props.Currentid]);

  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons text-primary">insert_link </i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="https://someurl.com"
          name="url"
          onChange={handleInputchange}
          value={values.url}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons text-primary">create </i>
        </div>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="website name"
          onChange={handleInputchange}
          value={values.name}
        />
      </div>
      <div className="form-group">
        <textarea
          name="description"
          rows="3"
          className="form-control"
          placeholder="escribe una descripcion"
          onChange={handleInputchange}
          value={values.description}
        />
      </div>
      <button className="btn btn-primary btn-block">
        {props.Currentid === "" ? "Guardar" : "Actualizar"}
      </button>
    </form>
  );
};

export default LinkForm;
