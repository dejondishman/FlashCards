//to compile main study page
import React, {useEffect, useState} from "react";
import Navigation from "./Navigation";
import NotEnough from "./NotEnough";
import {useParams, useHistory} from "react-router-dom"
import { readDeck} from "../utils/api/index"
//access deck id parameter
//get deck info using parameter >> useEffect

export default function Study ({decks} ) {  
    let history= useHistory()
    const initalizeState = {
        id:"",
        name:"",
        description: "",
        cards: []
    }
    const initializeStateCard={
        id:"",
        back:"",
        id:"",
    }
    const params = useParams();
    const [deck, setDeck] = useState(initalizeState); 
    const[currentIndex, setCurrentIndex]= useState(0)
    const[front, setFront] = useState("front")

    useEffect(() => {
      async function loadDeck() {
        const deckFromAPI = await readDeck(params.deckId)
        setDeck(deckFromAPI);
      }
      loadDeck();
    }, [params.deckId]);
    
    function flipHandler(){
        if(front =="front"){
         setFront("back") 
        } else if(front == "back"){
            setFront("front");
        }
    }
 
      function  nextHandler(){
          setCurrentIndex(currentIndex+1)
          setFront("front")
          if(currentIndex ===  deck.cards.length -1 ){
             window.confirm("Restart cards") ? setCurrentIndex(0) : history.push("/")
          }
      }

    if (deck.cards.length < 3){
        return(
            <>
            <Navigation deck={deck} />
            <h1> Study: {deck.name}</h1>
            <NotEnough deck={deck} />
            </>
        )
    }
    return (
        <>
        <Navigation deck={ deck } />
        <h1> Study: {deck.name}</h1>
        <div className="card w-75">
          <div className="card-body">
            <h5 className="card-title">Card {currentIndex + 1} of {deck.cards.length}</h5>
            <p className="card-text">{deck.cards[currentIndex]?.[front]}</p>
            <button class="btn btn-secondary" onClick={flipHandler}>Flip</button>
            {front == "back" && <button className="btn btn-primary" onClick={nextHandler}>Next</button> }
          </div>
        </div>

        </>
    )
};
