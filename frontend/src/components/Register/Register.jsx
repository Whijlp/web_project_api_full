import { Link } from "react-router";
import { useState } from "react";

const register = ({ handleRegistration }) => {
  const [data, setData] = useState({});

  const handleChange = (e) => {
  
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data.email, data.password);
  };

  return (
    <div className="login">
      <h1 className="login-title">Regístrate</h1>
      <form className="login-forms" onSubmit={handleSubmit}>
        <input
          className="login__input"
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={data.email}
          onChange={handleChange}
          required
        />
        <input
          className="login__input"
          type="password"
          name="password"
          placeholder="Constaseña"
          value={data.password}
          onChange={handleChange}
          required
        />

        <button className="login__submit-button" type="submit">
          Regístrate
        </button>
        <div>
          <p className="login-to-register">¿Ya eres miembro?  <Link to="/signin" className="signup__link">
            Inicia sesión aquí
          </Link></p>
          
        </div>
      </form>
    </div>
  );
};
export default register;
