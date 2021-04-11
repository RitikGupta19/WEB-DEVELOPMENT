import React, { useState } from "react";
import { connect } from "react-redux";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <h1>Add your Contacts here!</h1>
      <button type='button'>Add Contact +</button>
      {/** Show list of contacts here */}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {};

const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
