import React, { useState } from 'react';
import './App.css';
import HomePage from './HomePage';
import { SHA256 } from 'crypto-js';

function Block({ index, timestamp, data, previousHash, hash }) {
    return (
      <div>
        <h2>Block {index}</h2>
        <p>Timestamp: {timestamp}</p>
        <p>Data: {JSON.stringify(data)}</p>
        <p>Previous Hash: {previousHash}</p>
        <p>Hash: {hash}</p>
      </div>
    );
  }
  
  function Blockchain() {
    const [chain, setChain] = useState([
      {
        index: 0,
        timestamp: "01/01/2022",
        data: { amount: 0 },
        previousHash: "0",
        hash: "8dd46d1b89a00e74f2e8f83d822a346b909a40c3f1e482a1d48c208bc311ebcb",
      },
    ]);
    const [data, setData] = useState({ amount: 0 });
    const [difficulty, setDifficulty] = useState(4);
  
    function calculateHash(index, previousHash, timestamp, data, nonce) {
        return SHA256(
          index +
            previousHash +
            timestamp +
            JSON.stringify(data) +
            nonce
        ).toString();
      }
      
  
    function mineBlock() {
      const latestBlock = chain[chain.length - 1];
      const newBlock = {
        index: latestBlock.index + 1,
        timestamp: new Date().toLocaleString(),
        data: data,
        previousHash: latestBlock.hash,
      };
      let nonce = 0;
      let hash = calculateHash(
        newBlock.index,
        newBlock.previousHash,
        newBlock.timestamp,
        newBlock.data,
        nonce
      );
      while (hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
        nonce++;
        hash = calculateHash(
          newBlock.index,
          newBlock.previousHash,
          newBlock.timestamp,
          newBlock.data,
          nonce
        );
      }
      newBlock.hash = hash;
      setChain([...chain, newBlock]);
    }
  
    return (
      <div>
        <h1>Blockchain Explorer</h1>
        <div>
          <h2>Add Block</h2>
          <label>
            Amount:
            <input
              type="number"
              value={data.amount}
              onChange={(e) => setData({ amount: parseInt(e.target.value) })}
            />
          </label>
          <br />
          <label>
            Difficulty:
            <input
              type="number"
              value={difficulty}
              onChange={(e) => setDifficulty(parseInt(e.target.value))}
            />
          </label>
          <br />
          <button onClick={mineBlock}>Mine Block</button>
        </div>
        <div>
          <h2>Blockchain</h2>
          {chain.map((block) => (
            <Block
              key={block.index}
              index={block.index}
              timestamp={block.timestamp}
              data={block.data}
              previousHash={block.previousHash}
              hash={block.hash}
            />
          ))}
        </div>
      </div>
    );
  }

  function App() {
    return (
      <div>
        <HomePage />
      </div>
    );
  }
  
  export default App;
 
 // export default Blockchain;