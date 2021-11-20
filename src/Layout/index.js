import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch, useParams } from "react-router-dom";
import Home from "./Home";
import CreateDeck from "../Content/CreateDeck";
import Study from "../Studying/Study";
import Deck from "../Content/Deck";
import EditDeck from "../Content/EditDeck";
import AddCard from "../Content/AddCard";
import EditCard from "../Content/EditCard";
import {  listDecks, API_BASE_URL } from "../utils/api/index";


export default function Layout() {
const [decks, setDecks] = useState([])

useEffect(() => {
  const abortController = new AbortController();
  async function loadDecks() {
    try {
      const decksData = await listDecks(abortController.signal)
      setDecks(decksData);
    } catch (error) {
      if (error.name === "AbortError") {
        // Ignore `AbortError`
        console.log("Aborted");
      } else {
        throw error;
      }
    }
  }
  loadDecks();
  return () => abortController.abort();
}, []);




  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact={true} path="/">
            <Home decks={decks} setDecks={setDecks} />
          </Route>
          <Route exact={true} path="/decks/new">
            <CreateDeck decks={decks}  setDecks={setDecks}/>
          </Route>
          <Route exact={true} path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact={true} path="/decks/:deckId">
            <Deck decks={decks} setDecks={setDecks}/>
          </Route>
          <Route exact={true} path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact={true} path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact={true} path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          

          {/*WORKS: NotFound Should only display if address bar doesnt match an address*/}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

