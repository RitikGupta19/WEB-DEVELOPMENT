import { createStore } from "redux";
import rootReducers from "../reducers";

const configureStore = (initialState) => {
  return createStore(rootReducers, initialState);
};

export default configureStore;
