import React, { useState } from "react";
import { connect } from "react-redux";
import * as contactAction from "./actions/contactAction";

import "./App.css";

function App({ contacts, createContact, deleteContact }) {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let contact = {
      name: name,
    };
    createContact(contact);
    console.log(contacts);
  };

  const deleteContactButton = (e, index) => {
    e.preventDefault();
    deleteContact(index);
  };

  const listView = (data, index) => {
    return (
      <div className='row'>
        <div className='col-md-10'>
          <li key={index} className='list-group-item clearfix'>
            {data.name}
          </li>
        </div>
        <div className='col-md-2'>
          <button
            onClick={(e) => deleteContactButton(e, index)}
            className='btn btn-danger'>
            Remove
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1>Clientside Contacts Application</h1>
      <hr />
      <ul>
        {contacts.length !== 0 &&
          contacts.map((contact, i) => listView(contact, i))}
      </ul>
      <div>
        <h3>Add Contact Form</h3>
        <form>
          <input type='text' onChange={handleChange} />
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    contacts: state.contacts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createContact: (contact) => dispatch(contactAction.createContact(contact)),
    deleteContact: (index) => dispatch(contactAction.deleteContact(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
