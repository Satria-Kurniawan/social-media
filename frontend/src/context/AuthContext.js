import { createContext, useReducer, useEffect } from "react"
import AuthReducer from "./AuthReducer"

const INITIAL_STATE = {
  account: JSON.parse(localStorage.getItem("account")) || null,
  isFetching: false,
  error: null,
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  useEffect(() => {
    localStorage.setItem("account", JSON.stringify(state.account))
  }, [state.account])

  // Auto logout on token expired
  useEffect(() => {
    if (!state.account) return
    const decoded = JSON.parse(atob(state.account.accessToken.split(".")[1]))
    if (decoded.exp * 1000 < Date.now()) dispatch({ type: "LOGOUT" })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        account: state.account,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
