import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import ProtectedRoutes from "./utils/ProtectedRoutes"
import axios from "axios"

import Home from "./pages/Home"
import ChatsPage from "./pages/Chats"
import SignInPage from "./pages/accounts/SignIn"
import SignUpPage from "./pages/accounts/SignUp"

function App() {
  const { account } = useContext(AuthContext)

  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL

  if (account) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + account.accessToken
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/chats" element={<ChatsPage />} />
          </Route>
          <Route
            path="/accounts/signin"
            element={account ? <Navigate to="/" replace /> : <SignInPage />}
          />
          <Route path="/accounts/signup" element={<SignUpPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
