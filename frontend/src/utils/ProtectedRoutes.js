import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Outlet, Navigate } from "react-router-dom"

const ProtectedRoutes = () => {
  const { account } = useContext(AuthContext)

  return account ? <Outlet /> : <Navigate to={"/accounts/signin"} />
}

export default ProtectedRoutes
