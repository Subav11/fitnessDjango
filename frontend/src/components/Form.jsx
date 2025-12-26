import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";

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
    <form onSubmit={handleSubmit} className="form-container">
      {errors.detail && <p className="error-text">{errors.detail}</p>}
      <h1>{name}</h1>
      {method === "register" && (
        <>
          <input
            type="text"
            className="form-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <input
            type="text"
            className="form-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </>
      )}
      <input
        type="email"
        className="form-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      {errors.email && <p className="error-text">{errors.email}</p>}
      <input
        type="password"
        className="form-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {errors.password && <p className="error-text">{errors.password}</p>}
      <button className="form-button" type="submit">
        {name}
      </button>
    </form>
  );
}

export default Form;
