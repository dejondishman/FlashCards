import { Link, useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { deleteCard, readDeck, deleteDeck  } from "../utils/api/index";

// started working on deck, but need to add delete button functionality

export default function Deck({setDecks, decks }) {
  const initializedState = {
    id: "",
    name: "",
    description: "",
    cards: [],
  };

  const initializedStateCard = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  };

  const [currentIndexDeck, setCurrentIndexDeck] = useState(0);
  const params = useParams();
  const [deck, setDeck] = useState(initializedState);
  const [card, setCard] = useState(initializedStateCard);
  const history=useHistory()
  
  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(params.deckId);
      setDeck(deckFromAPI);
      setCard(deckFromAPI.cards);
      setCurrentIndexDeck(Object.values(params) - 1);
    }
    loadDeck();
  }, [params.deckId]);

  async function deleteCardHandler(cardId){
    if(window.confirm("Delete this card? You will not be able to recover it.")) { 
 await deleteCard(cardId)
 const newCards =  deck.cards.filter((card) => card.id !== cardId)
  setDeck({...deck, cards: newCards})
    }else{
        return null;
    }
}

async function deleteDeckHandler(deckId){
 await deleteDeck(deckId)
  setDecks((currentDecks) => 
  currentDecks.filter((deck) => deck.id !== deckId)
  )
  history.push("/")
}

  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">Deck {deck.name}</li>
            <li className="breadcrumb-item">Edit Card {card.id}</li>
          </ol>
        </nav>
      </div>

      <div>
        <h1>{deck.name}: Add Card</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="front">Front</label>
            <textarea
              type="text"
              className="form-control"
              id="front"
              rows="3"
              name="front"
              placeholder="Front side of card"
              onChange={handleChange}
              value={card.front}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="back">Back</label>
            <textarea
              className="form-control"
              id="back"
              placeholder="Back side of card"
              rows="3"
              name="back"
              onChange={handleChange}
              value={card.back}
            ></textarea>
          </div>
          <button
            type="done"
            className="btn btn-secondary"
            onClick={() => history.push(`/decks/${params.deckId}`)}
          >
            Done
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}