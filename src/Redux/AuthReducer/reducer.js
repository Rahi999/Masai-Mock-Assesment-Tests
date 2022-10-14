import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionsType";

const initState = {
  loginLoading: false,
  loginError: false,
  token: ""
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginLoading: true,
        loginError: false
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        loginLoading: false,
        loginError: true
      };
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginLoading: false,
        loginError: false,
        token: payload
      };
    }
    default:
      return state;
  }
};
