import React, { useEffect, useState } from "react";
import LinkForm from "./LinkForm";

import { toast } from "react-toastify";
import { db } from "../Config";

const Link = () => {
  const [links, setLinks] = useState([]);
  const [Currentid, setCurrentid] = useState("");

  const addOreditLink = async (linkObject) => {
    try {
      if (Currentid === "") {
        await db.collection("links").doc().set(linkObject);
        toast("se ha añadido un nuevo elemento correctamente", {
          type: "success"
        });
      } else {
        await db.collection("links").doc(Currentid).update(linkObject);
        toast("se ha actualizado un elemento correctamente", {
          type: "info"
        });
        setCurrentid("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteLink = async (id) => {
    try {
      if (window.confirm("realmente deseas eliminarlo")) {
        await db.collection("links").doc(id).delete();
        toast("El elemento ha sido eliminado", {
          type: "error"
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getLinks = async () => {
    try {
      await db.collection("links").onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setLinks(docs);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      <div className="col-md-6 p-2">
        <LinkForm {...{ addOreditLink, Currentid, links }} />
      </div>
      <div className="col-md-6 ">
        {links.map((link) => {
          return (
            <div className="card mb-1" key={link.id}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h4>{link.name}</h4>
                  <div>
                    <i
                      className="material-icons text-success "
                      onClick={() => setCurrentid(link.id)}>
                      create
                    </i>

                    <i
                      className="material-icons text-danger "
                      onClick={() => deleteLink(link.id)}>
                      close
                    </i>
                  </div>
                </div>
                <p>{link.description}</p>
                <a href={link.url} target="_blank" rel="noopener  noreferrer" >
                  visitar el link
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Link;
