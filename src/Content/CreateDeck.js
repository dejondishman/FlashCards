import React, { useState } from "react";

import { Link, useHistory} from "react-router-dom";
import {createDeck} from '../utils/api/index' 

export default function CreateDeck({ decks, setDecks }) {
const history = useHistory()
  const initialState= {
    id:decks.length + 1,
    name:"",
    description:""
  }

  
  

  const [deck, setDeck] = useState(initialState);
  function handleChange({ target: { name, value } }) {
    setDeck((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  function submitHandler(deck) {
    createDeck(deck).then((savedDeck) =>
      history.push(`/decks/${savedDeck.id}`)
    );
  }

  
//added on click to submit button changed it to link, dont know if it works
  return (
    <>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">Create Deck</li>{" "}
          </ol>
        </nav>
      </div>
      <div>
        <h1>Create Deck</h1>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="exampleFormControlInput1"
              placeholder="Deck Name"
              onChange={handleChange}
              value={deck.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Description</label>
            <textarea
              className="form-control"
              name="description"
              id="exampleFormControlTextarea1"
              placeholder="Brief Description of the Deck"
              rows="3"
              onChange={handleChange}
              value={deck.description}
            ></textarea>
          </div>
          <button
            type="cancel"
            className="btn btn-secondary"
            onClick={() => history.push("/")}
          >
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">
              Sumbit
            </button>
        </form>
      </div>
    </>
  );
}