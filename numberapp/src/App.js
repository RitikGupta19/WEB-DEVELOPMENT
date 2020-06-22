import React from 'react';
import './App.css';
import Input from './Input';

const App = () => {
  return (
    <div className="container text-white">
    <h1 className="text-center text-warning">Number Guessing App</h1>
    <h4 className="text-center text-white">Enter Number in the specified range</h4>
      <div className="row">
        <div className="col-8 offset-md-2">
          <Input />
        </div>
      </div>
    </div>
  );
}

export default App;
