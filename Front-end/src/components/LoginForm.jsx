import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import gif from "../assets/login.gif";

export default function LoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-yellow-200 p-4">
      <div className="flex bg-white shadow-2xl rounded-2xl overflow-hidden max-w-4xl w-full">

        {/* Left side: Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="bg-white p-4 rounded-full shadow-md">
              <img src={logo} alt="logo" className="w-14 h-14 object-contain" />
            </div>
          </div>

          {/* Title + slogan */}
          <h1 className="text-3xl font-bold text-center text-gray-900">
            Bienvenue dans <span className="text-yellow-600">caféTrack</span>
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Content de te revoir!
          </p>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Votre email"
                className="w-full p-3 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Mot de passe</label>
              <input
                type="password"
                placeholder="********"
                className="w-full p-3 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2.5 rounded-lg transition"
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>

        {/* Right side: GIF */}
        <div className="hidden md:flex md:w-1/2 bg-yellow-50 items-center justify-center p-4">
          <img src={gif} alt="coffee animation" className="w-80 h-auto" />
        </div>

      </div>
    </div>
  );
}
