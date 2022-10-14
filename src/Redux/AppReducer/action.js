import { GET_FAILURE, GET_LOADING, GET_SUCCESS } from "./actionsType";

export const getLaoding = () => {
  return {
    type: GET_LOADING
  };
};

export const getFailure = () => {
  return {
    type: GET_FAILURE
  };
};

export const getSuccess = (payload) => {
  return {
    type: GET_SUCCESS,
    payload
  };
};
