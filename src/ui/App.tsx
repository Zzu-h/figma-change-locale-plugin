import React, { useState } from 'react';
import RandomQuote from './study/RandomQuotes';
import Running from './running/Running';
import LoadExcel from './loadexcel/LoadExcel';

function App() {

  const [completFlag, setCompleteFlag] = useState(false);
  const [keyId, setKeyId] = useState("");

  const completeCallback = (keyId) => {
    setCompleteFlag(true)
    setKeyId(keyId)
  }

  return (
    <div>
      <RandomQuote />
    </div>
  );
}

export default App;

//{completFlag ? <text>{keyId}</text> : <text>please set Key ID</text>}
//{!completFlag ? <LoadExcel callback={completeCallback}/> : <Running keyId={keyId}/>}