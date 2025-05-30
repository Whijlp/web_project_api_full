import { Link } from "react-router";
import{useState} from "react";

const Login = ({handleLogin}) => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(data);
        
    }

  return (
    <div className="login">
      <h1 className="login-title">Iniciar sesión</h1>
      <form className="login-forms" name="login"  onSubmit={handleSubmit} noValidate>
        <input
          className="login__input"
          type="email"
          name="email"
          placeholder="Correo electrónico"
          required
            value={data.email}
            onChange={handleChange}
        />
        <input
          className="login__input"
          type="password"
          name="password"
          placeholder="constaseña"
          required
          value={data.password}
          onChange={handleChange}
        />
        <button className="login__submit-button" type="submit">
          Iniciar sesión
        </button>
        <div>
          <p className="login-to-register">¿Aún no eres miembro? <Link to="/signinup" className="signup__link">
            Regístrate aquí
          </Link></p>
          
        </div>
      </form>
    </div>
  );
};
export default Login;
