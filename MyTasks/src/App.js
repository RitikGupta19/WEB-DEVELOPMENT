import React from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';


const App = () => {
  return (
      <div className="container">
      <Header />
      <Content />
      <Footer />
      </div>
    );
};

export default App;