import vector from "../../images/Vector.png";
import { useContext } from "react";
import CurrentUserContexts from "../../contexts/CurrentUserContext";
import { Link, useLocation } from "react-router";

const Header = ({ handlelogout, isAuthenticated }) => {
  const {currentUser }= useContext(CurrentUserContexts);


  const location = useLocation();
  const isLogin =
    location.pathname === "/signin" || location.pathname === "/signinup";
  return (
    <header className="header">
      <img className="header__image" src={vector} alt="Logo" />
<div className="header__container">
      {isAuthenticated ?(<p className="header__email">{currentUser?.email || "correo no disponible "}</p>):(
        isLogin && (
         <p></p>
        )
      )}

      {isAuthenticated ? (
          <button className="header__button" onClick={handlelogout}>
          Cerrar sesion
        </button>  
        
      ):(
        isLogin && (
          <Link
            to={location.pathname === "/signin" ? "/signinup" : "/signin"}
            className="header__link"
          >
            {location.pathname === "/signin" ? "Registrarse" : "Iniciar sesion"}
          </Link>
        )
      )}
      </div>
      <div className="header__line"></div>
    </header>
  );
};
export default Header;
