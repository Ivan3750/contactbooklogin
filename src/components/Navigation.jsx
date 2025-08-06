import { Link } from "react-router-dom"

const Navigation = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null)
    localStorage.token = ""
  }

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-semibold text-green-600">
          UAКонтакти
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link
              to="/contacts"
              className="text-gray-700 hover:text-green-500 transition"
            >
              контакти
            </Link>
            <span className="text-sm text-gray-600">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
            >
              Вийти
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-green-500 transition"
            >
              Вхід
            </Link>
            <Link
              to="/register"
              className="text-gray-700 hover:text-green-500 transition"
            >
              Реєстрація
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}



export default Navigation
