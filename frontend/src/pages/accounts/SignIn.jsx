import { useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { verifySession } from "../../utils/verifySession"

import { FaSignInAlt } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

import TextInput from "../../components/Form/TextInput"
import Button from "../../components/Button"

function SignInPage() {
  const { isFetching, error, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const inputs = [
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Email",
      required: true,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Password",
      required: true,
    },
  ]

  const [values, setValues] = useState({
    email: "",
    password: "",
  })

  const { email, password } = values

  const onSubmit = async (e) => {
    e.preventDefault()

    dispatch({ type: "LOGIN_START" })
    try {
      const response = await axios.post("/api/accounts/signin", {
        email,
        password,
      })

      dispatch({ type: "LOGIN_SUCCESS", payload: response.data })
      verifySession(response.data.accessToken, dispatch)
      navigate("/")
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.message })
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-sm">
        <form onSubmit={onSubmit} className="border bg-white p-5">
          <div className="flex justify-center items-center gap-x-3 mt-5 mb-10">
            <img
              src="/icons/Logo_Social_Elite.png"
              className="rounded-full w-10 h-10"
              alt="Facebook"
            />
            <div style={{ fontFamily: "Lobster" }} className="text-2xl">
              <span>Social</span>
              <span className="text-primary"> Elite</span>
            </div>
          </div>
          {inputs.map((input, i) => (
            <TextInput
              key={i}
              {...input}
              value={values[input.name]}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          ))}
          <Button
            text={"Masuk"}
            backgroundColor={
              !values.email || !values.password ? "#c99be2" : "#9E14E8"
            }
            hoverColor={"#9E14E8"}
            icon={<FaSignInAlt size={20} />}
            disabled={!values.email || !values.password ? true : false}
          />
          {error && <h6 className="text-center text-red-400 mt-5">{error}</h6>}
          <div className="flex justify-between items-center gap-x-5 mt-5">
            <div className="w-full bg-gray-300 h-[1.5px]" />
            <span className="text-gray-400 font-semibold">OR</span>
            <div className="w-full bg-gray-300 h-[1.5px]" />
          </div>
          <div className="flex justify-center items-center gap-x-3 mt-5">
            <FcGoogle size={20} />
            <span className="text-gray-600 font-semibold">
              Sign in with Goolge
            </span>
          </div>
          <h6 className="text-center text-primary mt-5">Lupa password?</h6>
        </form>
        <div className="border bg-white p-5 mt-3">
          <Link to={"/accounts/signup"}>
            <div className="text-center text-gray-600">
              <span>Belum memiliki akun? </span>
              <span className="text-primary font-semibold">Daftar</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
