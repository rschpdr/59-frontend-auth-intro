import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import FormField from "../components/form/FormField";
import ErrorAlert from "../components/ErrorAlert";

import { AuthContext } from "../contexts/authContext.js";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  // Loading
  const [loading, setLoading] = useState(false);
  // Tratamento do erro
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { setLoggedInUser } = useContext(AuthContext);

  function handleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        "http://localhost:4000/api/v1/login",
        userData
      );

      console.log(response);

      setLoggedInUser({ token: response.data });

      // Gravando o token de usuário logado no computador do usuário
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ token: response.data })
      );

      setLoading(false);

      navigate("/home");
    } catch (err) {
      setLoading(false);
      console.error(err);
      if (err.response) {
        console.error(err.response);
        setError(err.response.data);
      }
    }
  }

  return (
    <div>
      <h1>Entrar na sua conta</h1>

      <form onSubmit={handleSubmit}>
        <FormField
          type="email"
          label="E-mail"
          id="signupFormEmail"
          required
          name="email"
          onChange={handleChange}
          value={userData.email}
          readOnly={loading}
        />

        <FormField
          type="password"
          label="Senha"
          id="signupFormPassword"
          required
          name="password"
          onChange={handleChange}
          value={userData.password}
          pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
          readOnly={loading}
        />

        <div className="mb-3">
          <button disabled={loading} type="submit" className="btn btn-primary">
            {loading ? (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
            ) : null}
            Entrar
          </button>
        </div>

        {error ? <ErrorAlert>{error}</ErrorAlert> : null}
      </form>
    </div>
  );
}

export default Login;
