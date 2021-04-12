import * as actionTypes from "./actionType";

export const createContact = (contact) => {
  return {
    type: actionTypes.CREATE_NEW_CONTACT,
    contact: contact,
  };
};

export const getAllContacts = () => {
  return {
    type: actionTypes.GET_ALL_CONTACTS,
  };
};

export const deleteContact = (id) => {
  return {
    type: actionTypes.REMOVE_CONTACT,
    id: id,
  };
};
