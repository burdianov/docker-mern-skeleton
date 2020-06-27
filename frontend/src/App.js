import React from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const makeApiRequest = () => {
    axios.get('/api/test-with-current-user').then((response) => {
      console.log('response', response);
    });
  };

  return (
    <div className="App">
      <button onClick={makeApiRequest}>Make API Request</button>
      <h1>Now it should work</h1>
    </div>
  );
};

export default App;
