export const LoginStart = () => ({
  type: "LOGIN_START",
})

export const LoginSuccess = (account) => ({
  type: "LOGIN_SUCCESS",
  payload: account,
})

export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
})

export const Logout = () => ({
  type: "LOGOUT",
})
