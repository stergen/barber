import * as actions from "../actions/user";

const initialStore = {
  firstName: "",
  lastName: "",
  phone: "",
  password: ""
};

export default (state = initialStore, action) => {
  switch (action.type) {
    case actions.SET_USER_DATA: {
      return {
        ...state,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        phone: action.user.phone,
        password: action.user.password
      };
    }

    case action.SET_USER_PASSWORD: {
      return {
        ...state,
        password: action.password
      };
    }

    default:
      return state;
  }
};
