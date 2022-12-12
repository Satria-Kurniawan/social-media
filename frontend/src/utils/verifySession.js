export const verifySession = (token, dispatch) => {
  const decoded = JSON.parse(atob(token.split(".")[1]))
  const expiryTimer = decoded.exp * 1000 - Date.now()

  setTimeout(() => {
    dispatch({ type: "LOGOUT" })
    localStorage.clear()
  }, expiryTimer)
}
