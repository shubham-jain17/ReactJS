// src/App.js

import React from 'react';
import CandlestickChart from './CandlestickChart';

const sampleData = [
  { date: '2023-07-01', open: 100, high: 110, low: 90, close: 105 },
  { date: '2023-07-02', open: 106, high: 115, low: 95, close: 110 },
  // Add more data points here
];

const App = () => {
  return (
    <div className="App">
      <h1>Candlestick Chart Example</h1>
      <CandlestickChart data={sampleData} />
    </div>
  );
};

export default App;
