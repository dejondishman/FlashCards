import {Link, useParams, useHistory} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import {readDeck, readCard, updateCard} from '../utils/api/index'


export default function AddCard() {
    
  
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
    


    const params = useParams();
    const [deck, setDeck] = useState(initializedDeckState);
    const [card, setCard] = useState(initializedCardState)
    let history = useHistory();

    useEffect(() => {
      async function loadDeck() {
        const deckFromAPI = await readDeck(params.deckId);
        setDeck(deckFromAPI);
      }
      loadDeck();
    }, [params.deckId]);

    useEffect(() => {
      async function loadDeck() {
        const deckFromAPI = await readDeck(params.deckId);
        setDeck(deckFromAPI);
      }
      loadDeck();
    }, [params.deckId]);

    useEffect(() => {
      async function loadCard() {
        const cardFromAPI = await readDeck(params.deckId);
        setDeck(cardFromAPI);
      }
      loadCard();
    }, [params.deckId]);


    function handleChange({target}){
        setCard({
          ...card,
          [target.name]: target.value
        })
      }
    
    async function handleSubmit(event) {
        event.preventDefault();
        await AddCard(params.deckId, card);
        setCard(initializedCardState)
      }

  return (
      <>
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">{deck.name}</li>
            <li className="breadcrumb-item">Add Card</li>
          </ol>
        </nav>
      </div>
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
      placeholder={card.front}
      onChange={handleChange}
      value={card.front}
    ></textarea>
  </div>
  <div className="form-group">
    <label htmlFor="back">Back</label>
    <textarea
      className="form-control"
      id="back"
      placeholder={card.back}
      rows="3"
      name="back"
      onChange={handleChange}
      value={card.back}
    ></textarea>
  </div>
  <button
    type="cancel"
    className="btn btn-secondary"
    onClick={() => history.push(`/decks/${params.deckId}`)}
  >
    Cancel
  </button>
 <button type="submit" className="btn btn-primary">
    Submit
  </button>

</form>

</div>
</>
  );
  
}