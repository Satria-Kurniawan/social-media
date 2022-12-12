import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

import { FaSignInAlt } from "react-icons/fa"

import TextInput from "../../components/Form/TextInput"
import Button from "../../components/Button"

function SignUpPage() {
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  const inputs = [
    {
      type: "text",
      name: "name",
      placeholder: "Name",
      required: true,
    },
    {
      type: "email",
      name: "email",
      placeholder: "Email",
      required: true,
    },
    {
      type: "password",
      name: "password",
      placeholder: "Password",
      required: true,
    },
    {
      type: "password",
      name: "password2",
      placeholder: "Password Confirmation",
      required: true,
    },
  ]

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

  const { name, email, password, password2 } = values

  const [passwordMismatch, setPasswordMismatch] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()

    if (password !== password2) return setPasswordMismatch(true)

    try {
      await axios.post("/api/accounts/signup", {
        name,
        email,
        password,
      })
      navigate("/accounts/signin")
    } catch (error) {
      setErrorMessage(error.response.data.message)
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
            text={"Daftar"}
            backgroundColor={
              !values.email || !values.password ? "#c99be2" : "#9E14E8"
            }
            hoverColor={"#9E14E8"}
            icon={<FaSignInAlt size={20} />}
            disabled={!values.email || !values.password ? true : false}
          />
          {passwordMismatch && (
            <h6 className="text-center text-red-400 mt-5">
              Password confirmation dont't match!
            </h6>
          )}
          {errorMessage && (
            <h6 className="text-center text-red-400 mt-5">{errorMessage}</h6>
          )}
        </form>
        <div className="border bg-white p-5 mt-3">
          <Link to="/accounts/signin">
            <div className="text-center text-gray-600">
              <span>Sudah memiliki akun? </span>
              <span className="text-primary font-semibold">Masuk</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
