import { createDeck, readDeck, readCard,updateCard } from "../utils/api";
import { useParams, Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import CardForm from "./CardForm"
export default function EditCard() {

    const initializedCardState = {
        id: "",
        front: "",
        back: "",
        deckId: "",
      };

    const initializedDeckState = {
        id: "",
        name: "",
        description: "",
        cards: [],
      };

  const history = useHistory();
  const params = useParams();
  const [card, setCard] = useState(initializedCardState);
  const [deck, setDeck] = useState(initializedDeckState);

  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(params.deckId);
      setDeck(deckFromAPI);
    }
    loadDeck();
  }, [params.deckId]);

  useEffect(() => {
    async function loadCard() {
      const cardFromAPI = await readCard(params.cardId);
      setCard(cardFromAPI);
    }
    loadCard();
  }, [params.cardId]);

  function handleChange({target}){
    setCard({
      ...card,
      [target.name]: target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault()
    await updateCard(card);
    history.push(`/decks/${deck.id}`)
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
        {CardForm}
      </div>
    </div>
  );
}