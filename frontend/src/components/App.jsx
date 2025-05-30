import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { useState, useEffect } from "react";
import api from "../utils/Api/api";
import CurrentUserContexts from "../contexts/CurrentUserContext";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectorRoute from "./ProtectedRoute/ProtectedRoute";
import { authorize, userInfo, register } from "../auth/auth";
import InfoTooltip from "../components/Popup/InfoTooltip/InfoTooltip";
import Popup from "../components/Popup/Popup";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isInfoSuccess, setIsInfoSuccess] = useState(false);
  const [infoErrorMessage, setInfoErrorMessage] = useState(false);
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegistration = (email, password) => {
    register(email, password).then((response) => {
      setInfoIsOpen(true);
      if (response.error) {
        setIsInfoSuccess(false);
        setInfoErrorMessage(response.error);
      } else {
        setIsInfoSuccess(true);
        setInfoErrorMessage("");
      }
    });
  };

  const handleLogin = ({ email, password }) => {
    authorize(email, password).then((response) => {
      if (response.error) {
        setInfoIsOpen(true);
        setIsInfoSuccess(false);
        setInfoErrorMessage(response.error);
      } else {
        const token = response.token;
        setToken(token);
        localStorage.setItem("token", token);
        setIsAuthenticated(true);

        userInfo().then((userData) => {
          if (!userData.error) {
            setCurrentUser(userData);
          } else {
            console.error(
              "Error al obtener datos del usuario:",
              userData.error
            );
          }
        });
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsAuthenticated(false);
  };
  const handleCloseInfo = () => {
    setInfoIsOpen(false);
    if (isInfoSuccess) {
      navigate("/signin");
    }
  };

  const handleIsLikeCard = (cardId, isLiked) => {
    if (isLiked) {
      api.deleteLikeCard(cardId).then((response) => {
        setCards((state) => {
          return state.map((card) =>
            card._id === response._id ? response : card
          );
        });
      });
    } else {
      api.likeCard(cardId).then((response) => {
        setCards((state) => {
          return state.map((card) =>
            card._id === response._id ? response : card
          );
        });
      });
    }
  };

  const handleDeleteCard = (cardId) => {
    api.deleteCard(cardId).then(() => {
      setCards((state) => state.filter((card) => card._id !== cardId));
    });
  };

  const handleCreateCard = (title, link) => {
    api
      .createCard({ name: title, link })
      .then((response) => {
        console.log(response);
        if (response) {
          setCards((state) => [response, ...state]);
        }
      })
      .catch((error) => {
        console.error("Error creando card:", error);
      });
  };

  const handleChangeAvatar = (avatar) => {
    return api.editAvatarUser({ avatar: avatar }).then((response) => {
      return setCurrentUser(response);
    });
  };
  const handleUpdateUser = (data) => {
    return api.editUserInfo(data).then((response) => {
      return setCurrentUser(response);
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      api.getUserInfo().then((response) => {
        userInfo().then((res) => {
          setCurrentUser((state) => ({ ...state, ...res.data, ...response }));
        });
      });

      api.getInitialCards().then((response) => {
        setCards(response || []);
      });
      navigate("/")
    }
  }, [isAuthenticated]);

  ///// refactorisar
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      if (location.pathname === "/") {
        //navigate("/signin");
      }
      return;
    }

    setIsAuthenticated(true);

    userInfo().then((response) => {
      if (response.error) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setCurrentUser(null);
        navigate("/signin");
      } else {
        setCurrentUser(response);
      }
    });
    if (token && location.pathname === "/signin") {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   setIsAuthenticated(!!token);
  //   userInfo().then((response) => {
  //     if (response.error) {
  //       if (!token && location.pathname === "/") {
  //         localStorage.removeItem("token");
  //         return navigate("/signin");
  //       }
  //     } else {
  //       setCurrentUser((state) => ({ ...state, ...response.data }));
  //     }
  //   });
  //   if (token && location.pathname === "/signin") {
  //     navigate("/");
  //   }
  // }, [isAuthenticated, navigate]);

  return (
    <CurrentUserContexts.Provider value={{ currentUser, setCurrentUser }}>
      <div className="page">
        <Header handlelogout={handleLogout} isAuthenticated={isAuthenticated} />
        <Routes>
          <Route
            path="/signin"
            element={
              <Login
                handleLogin={handleLogin}
                onLogin={() => setIsAuthenticated(true)}
              />
            }
          />
          <Route
            path="/signinup"
            element={<Register handleRegistration={handleRegistration} />}
          />
          <Route
            path="/"
            element={
              <ProtectorRoute isLoggedIn={isAuthenticated}>
                <Main
                  setCards={setCards}
                  cards={cards}
                  handleCreateCard={handleCreateCard}
                  handleIsLikeCard={handleIsLikeCard}
                  handleDeleteCard={handleDeleteCard}
                  setCurrentUser={setCurrentUser}
                  handleChangeAvatar={handleChangeAvatar}
                  handleUpdateUser={handleUpdateUser}
                />
              </ProtectorRoute>
            }
          />
        </Routes>
        {infoIsOpen && (
          <Popup onClose={handleCloseInfo}>
            <InfoTooltip
              isSucess={isInfoSuccess}
              errorMessage={infoErrorMessage}
            />
          </Popup>
        )}
        <Footer />
      </div>
    </CurrentUserContexts.Provider>
  );
}

export default App;
