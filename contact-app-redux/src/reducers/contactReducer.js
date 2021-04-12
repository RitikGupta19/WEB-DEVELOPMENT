import * as actionTypes from "../actions/actionType";

const contactReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.CREATE_NEW_CONTACT:
      return [...state, action.contact];
    case actionTypes.REMOVE_CONTACT:
      return state.filter((data, i) => i !== action.id);
    default:
      return state;
  }
};

export default contactReducer;
