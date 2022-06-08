import { useState } from "react";
import { getRandomQuoteApi } from "./api";
import { useAsync } from "./hook";
import "./styles.css";

export default function App() {
  const [maxLength, setMaxLength] = useState(30);

  const getRandomQuote = useAsync(
    getRandomQuoteApi,
    [maxLength],
    [maxLength],
    true
  );

  return (
    <div className="App">
      {getRandomQuote.error ? (
        <>
          <div>{getRandomQuote.error.message}</div>
          <button onClick={getRandomQuote.execute}>Try again</button>
        </>
      ) : (
        <>
          {getRandomQuote.loading ? (
            <div className="quote-container" style={{ color: "grey" }}>
              Loading random quote....
            </div>
          ) : (
            <div className="quote-container">
              {getRandomQuote.response?.content}
            </div>
          )}
          <button
            onClick={getRandomQuote.execute}
            disabled={getRandomQuote.loading}
          >
            Click to generate new quote
          </button>
          <div style={{ marginTop: "30px" }}>
            Select max length of characters:{" "}
            <select
              disabled={getRandomQuote.loading}
              onChange={(e) => setMaxLength(e.target.value)}
              value={maxLength}
            >
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="80">80</option>
              <option value="120">120</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
}
