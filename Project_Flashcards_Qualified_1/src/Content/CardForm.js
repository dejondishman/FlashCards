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