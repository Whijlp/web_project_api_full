import X from "../../images/formn_image.svg";

const ImagePopup = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <div className={card ? "popup_dialog" : ""}>
      <div className="popup_image-container">
      <img className="popup__img" src={card.link} alt={card.name}  />
        <button
          className="forms__close-button close__button"
          id="place-close-button"
          title="cerrar"
          type="button"
          onClick={onClose}
        >
          <img className="forms__image-button" src={X} alt="imagen de una X" />
        </button>
        <h3 className="popup__description">{card.name}</h3>
      </div>
    </div>
  );
};

export default ImagePopup;
