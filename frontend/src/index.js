import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { AuthContextProvider } from "./context/AuthContext"
import { SocketProvider } from "./context/SocketContext"
import { store } from "./app/store"
import { Provider } from "react-redux"
import TimeAgo from "javascript-time-ago"

import en from "javascript-time-ago/locale/en.json"
import ru from "javascript-time-ago/locale/ru.json"

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SocketProvider url={"ws://localhost:8900"} options={{}}>
        <Provider store={store}>
          <App />
        </Provider>
      </SocketProvider>
    </AuthContextProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
