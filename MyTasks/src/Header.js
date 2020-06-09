import React from 'react'

const Header = () => {

    return (
        <div>
        <div className="jumbotron jumbotron-fluid bg-info text-white">
        <div className="container">
          <h1 className="display-4">MY TASKS</h1>
          <p className="lead">Manage your <strong>Daily Activities</strong>, 
          become more <strong>Productive</strong> by keeping record of all your tasks.</p>
          <p>{window.Date().slice(0,15)}</p>
        </div>
        </div>
        </div>
    );
};

export default Header;
