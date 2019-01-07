export const SET_USER_DATA = "user/SET_USER_DATA";
export const SET_USER_PASSWORD = "user/SET_USER_PASSWORD";

export const setUserData = user => ({
  type: SET_USER_DATA,
  user
});

export const setUserPassword = password => ({
  type: SET_USER_PASSWORD,
  password
});
