import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Form({ route, method }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const payload =
        method === "login"
          ? { email, password }
          : {
              email,
              password,
              first_name: firstName,
              last_name: lastName,
            };

      const res = await api.post(route, payload);

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (err) {
      const data = err.response?.data;

      if (!data) {
        setErrors({ detail: "Server error. Try again." });
        return;
      }

      if (data.detail) {
        setErrors({ detail: data.detail });
        return;
      }

      const fieldErrors = {};
      for (const key in data) {
        fieldErrors[key] = data[key][0];
      }
      setErrors(fieldErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.15),transparent_50%)]"></div>

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/40 hover:shadow-blue-200/50 transition-shadow duration-300"
      >
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 rounded-full flex items-center justify-center shadow-xl ring-4 ring-white">
          <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>

        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-8 mt-8">
          {name}
        </h1>

        {errors.detail && (
          <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 rounded-xl shadow-sm">
            <p className="text-sm text-red-700 font-medium flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {errors.detail}
            </p>
          </div>
        )}

        {method === "register" && (
          <div className="space-y-4 mb-4">
            <div className="relative group">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full rounded-xl border-2 border-gray-200 px-5 py-3.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none transition-all duration-200 hover:border-blue-300 group-hover:shadow-md"
              />
            </div>

            <div className="relative group">
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full rounded-xl border-2 border-gray-200 px-5 py-3.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none transition-all duration-200 hover:border-blue-300 group-hover:shadow-md"
              />
            </div>
          </div>
        )}

        <div className="mb-4">
          <div className="relative group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-xl border-2 border-gray-200 px-5 py-3.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none transition-all duration-200 hover:border-blue-300 group-hover:shadow-md"
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-2 duration-300">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {errors.email}
            </p>
          )}
        </div>

        <div className="mb-6">
          <div className="relative group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-xl border-2 border-gray-200 px-5 py-3.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none transition-all duration-200 hover:border-blue-300 group-hover:shadow-md"
            />
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-2 duration-300">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {errors.password}
            </p>
          )}
        </div>

        {loading && (
          <div className="mb-6 flex justify-center">
            <div className="relative h-12 w-12">
              <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-pulse"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-blue-600 to-cyan-600 py-4 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {name}
        </button>
      </form>
    </div>
  );
}

export default Form;
