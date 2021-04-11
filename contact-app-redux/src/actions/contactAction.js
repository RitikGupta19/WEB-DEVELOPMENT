import * as actionTypes from "./actionType";

export const createContact = (name, number) => {
  var contact = {
    name: name,
    number: number,
  };
  return {
    type: actionTypes.CREATE_NEW_CONTACT,
    payload: contact,
  };
};

export const getAllContacts = () => {
  return {
    type: actionTypes.GET_ALL_CONTACTS,
  };
};
