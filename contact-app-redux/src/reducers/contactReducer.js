import * as actionTypes from "../actions/actionType";

const contactReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.CREATE_NEW_CONTACT:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default contactReducer;
