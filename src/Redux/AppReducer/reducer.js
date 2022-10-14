import { GET_FAILURE, GET_LOADING, GET_SUCCESS } from "./actionsType";

const initState = {
  students: [],
  loading: false,
  error: false
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_LOADING: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case GET_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true
      };
    }
    case GET_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        students: [...payload]
      };
    }
    default:
      return state;
  }
};
