import X from "../../images/formn_image.svg";

const Popup = (props) => {
  const { title, children, onClose } = props;
  return (
    <div className="popup" id="popupProfile">
      <div className="popup__overlay"></div>
      <div className="forms">
        <h3 className="forms__title"> {title} </h3>
        {children}

        <button
          className="forms__close-button close__button forms-profile-button"
          title="cerrar"
          type="button"
          onClick={onClose}
        >
          <img className="forms__image-button" src={X} alt="imagen de una X" />
        </button>
      </div>
    </div>
  );
};
export default Popup;
