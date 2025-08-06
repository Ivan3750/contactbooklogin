import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { registerUser } from "../services/api"

const RegisterPage = ({ setUser }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()


const handleSubmit = async (e) => {
  e.preventDefault()
  setError("")

  try {
    const data = await registerUser({ name, email, password })
    localStorage.setItem("token", data.token)
    setUser(data.user)
    navigate("/contacts")
  } catch (err) {
    console.log(err)
    if (err.code === 11000) {
      setError("Ця електронна пошта вже використовується.")
    } else {
      setError("Помилка реєстрації. Спробуйте ще раз.")
    }
  }
}


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center text-green-600 mb-6">
          Реєстрація
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <input
          type="text"
          placeholder="Ім'я"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
        />

        <input
          type="email"
          placeholder="Пошта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg"
        />
        <p className="text-grey-500 text-sm mb-6 ">Пароль повинен містити мінімум 8 символів включаючи 1 малу букву і 1 велику букву і 1 спеціальний символ</p>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Зареєструватися
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
