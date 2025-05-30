import Popup from "../Popup/Popup";

const PopupWhitConfirmation = (props) => {
  const { card, setPopup, handleDeleteCard } = props;

  const handleConfirmation = (evt) => {
    evt.preventDefault();
    handleDeleteCard(card._id);
    setPopup(null);
  };

  return (
    <Popup title="¿Estás seguro/a?" onClose={() => setPopup(null)}>
      <button
        className="forms__submit-button"
        id="confirmation-button"
        title="confirma eliminacion"
        onClick={handleConfirmation}
      >
        Sin miedo al Exito !!!
      </button>
    </Popup>
  );
};
export default PopupWhitConfirmation;
