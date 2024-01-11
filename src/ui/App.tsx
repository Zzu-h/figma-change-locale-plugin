import React, { useState } from 'react';
import { useRandomQuotes } from './hooks/useRandomQuotes';
import { requestGenerateRandomQuoteToPlugin } from './lib/figma';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const getRandomQuote = useRandomQuotes();

  const generateRandomQuote = async () => {
    setIsLoading(true);
    const randomQuote = await getRandomQuote();
    console.log(randomQuote); // 수정 예정
    requestGenerateRandomQuoteToPlugin(randomQuote);
    setIsLoading(false);
  };

  return (
    <div>
      <text>Select Text Node and Click</text>
      <button onClick={generateRandomQuote}>
        {isLoading ? "Loading..." : "Random Quote"}
      </button>
    </div>
  );
}

export default App;