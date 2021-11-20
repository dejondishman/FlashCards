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
            <li className="breadcrumb-item">{deck.name}</li>
          </ol>
        </nav>
      </div>

      <div>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <Link to={`/decks/${deck.id}/edit`} class="btn btn-secondary">
          Edit
        </Link>
        <Link to={`/decks/${deck.id}/study`} class="btn btn-primary">
          Study
        </Link>
        <Link to={`/decks/${deck.id}/cards/new`} class="btn btn-primary">
          Add Cards
        </Link>
        <button type="delete" class="btn btn-danger" onClick={()=>deleteDeckHandler(deck.id)}>
          Delete
        </button>
        <h2>Cards</h2>
        {console.log(deck.cards)}
        {deck.cards.map((card, index) => (
          <div class="card">
            <div class="card-body">
              <p class="card-text">{card.front}</p>
              <p class="card-text">{card.back}</p>
              <Link
               to={`/decks/${deck.id}/cards/${card.id}/edit`}
                class="btn btn-secondary"
              >
                Edit
              </Link>
              <button onClick={()=> deleteCardHandler(card.id)} type="delete" class="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
        }