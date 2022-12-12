const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        account: null,
        isFetching: true,
        error: null,
      }
    case "LOGIN_SUCCESS":
      return {
        account: action.payload,
        isFetching: false,
        error: null,
      }
    case "LOGIN_FAILURE":
      return {
        account: null,
        isFetching: false,
        error: action.payload,
      }
    case "LOGOUT":
      return {
        account: null,
        isFetching: false,
        error: false,
      }
    default:
      return state
  }
}

export default AuthReducer
