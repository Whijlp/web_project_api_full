import { useState, useContext } from "react";
import lapiz from "../../images/Edit_profile.png";
import cruz from "../../images/boton_cruz.png";
import EditProfile from "../EditProfile/EditProfile";
import NewCard from "../Newcard/NewCard";
import EditAvatar from "../EditAvatar/EditAvatar";
import Popup from "../Popup/Popup";
import Card from "../Card/Card";
import ImagePopup from "../ImagePopup/ImagePopup";
import PopupWhitConfirmation from "../PopupWhitConfirmation/PopupWhitConfirmation.jsx";
import CurrentUserContexts from "../../contexts/CurrentUserContext";


const Main = ({
  cards,
  handleCreateCard,
  handleIsLikeCard,
  handleDeleteCard,
  handleUpdateUser,
  handleChangeAvatar,
}) => {
  const {currentUser} =useContext(CurrentUserContexts);
  const [popupImage, setPopupImage] = useState(null);
  const [popup, setPopup] = useState(null);
  const [popupDelete, setPopupDelete] = useState(null);
  const [currentCard, setCurrentCard] = useState({});
 
  //-----------------------------------------------------------------------------------

  const handleOpenPopUp = (newPopup) => {
    setPopup(newPopup);
  };
  const handleClosePopup = () => {
    setPopup(null);
  };

  const handleChangeAvatarClose = (avatar) => {
    console.log(avatar);
    handleChangeAvatar(avatar).then(() => {
      setPopup(null);
    });
  };

  const handleUpdateUserClose = (data) => {
    handleUpdateUser(data).then(() => {
      setPopup(null);
    });
  };

  const newCard = () => ({
    title: "Nuevo lugar",
    children: (
      <NewCard
        handleCreateCard={({ title, link }) => {
          handleCreateCard(title, link);
          setPopup(null);
        }}
      />
    ),
  });

  const editAvatar = () => ({
    title: "Cambiar Foto de Perfil",
    children: <EditAvatar handleChangeAvatar={handleChangeAvatarClose} />,
  });

  const editProfile = () => ({
    title: "Editar Perfil",
    children: <EditProfile handleUpdateUser={handleUpdateUserClose} />,
  });

  return (


    <main className="content">
      {popupDelete && (
        <PopupWhitConfirmation
          setPopup={setPopupDelete}
          handleDeleteCard={handleDeleteCard}
          card={currentCard}
        />
      )}
      <section className="profile">
        <button
          className="profile_avatar"
          onClick={() => handleOpenPopUp(editAvatar())}
        >
          <img
            className="profile__edit-avatar"
            src={lapiz}
            alt="Vector de lapiz"
          />
          <img
            className="profile_image"
            src={currentUser?.avatar || "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg"}
            alt="foto de perfil"
          />
        </button>

        <div className="profile__info">
          <div className="profile__info-container">
            <h2 className="profile__title">{currentUser?.name || "Jacques Cousteau"}</h2>
            <p className="profile__subtitle">{currentUser?.about || "Explorador"}</p>
          </div>
          <button
            className="profile__edit-button"
            title="Editar perfil"
            onClick={() => handleOpenPopUp(editProfile())}
          >
            <img
              className="profile__edit-image"
              src={lapiz}
              alt="Vector de lapiz"
            />
          </button>
        </div>
        <button
          className="profile__add-button"
          title="Crear tarjeta"
          onClick={() => handleOpenPopUp(newCard())}
        >
          <img
            className="profile__image-button"
            src={cruz}
            alt="cruz de boton"
          />
        </button>
      </section>
      <section className="elements">
 {cards.map((card) => {
  const isLiked = card.likes.some(
    (likeUser) => likeUser._id === currentUser._id
  );

  return (
    <Card
      key={card._id}
      card={{ ...card, isLiked }} // inyectamos la propiedad calculada
      handleOpenPopup={(selectCard) => {
        setPopupImage(selectCard);
      }}
      handleIsLikeCard={handleIsLikeCard}
      onCardDelete={() => {
        setPopupDelete(true);
        setCurrentCard(card);
      }}
    />
  );
})}
      </section>
      <ImagePopup
        card={popupImage}
        onClose={() => {
          setPopupImage(null);
        }}
      />
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
      
    </main>
    
  );
};

export default Main;
