import React, { useState } from 'react';
import { useRandomQuotes } from '../hooks/useRandomQuotes';
import { requestGenerateRandomQuoteToPlugin } from '../lib/figma';

const RandomQuote: React.FC = () => {

  const [isLoading, setIsLoading] = useState(false);
  const getRandomQuote = useRandomQuotes();
  
  const generateRandomQuote = async () => {
      setIsLoading(true);
      const randomQuote = await getRandomQuote();
      //requestGenerateRandomQuoteToPlugin("randomQuote");
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
};
  
export default RandomQuote;