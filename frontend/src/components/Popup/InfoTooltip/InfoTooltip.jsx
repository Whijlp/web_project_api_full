import succesCheck from "../../../images/checksucces.svg";
import errorCheck from "../../../images/errorlogin.svg";

const InfoTooltip = (props) => {
  console.log(props.errorMessage);
  const { isSucess, errorMessage="Uy, algo salió mal. Por favor, inténtalo de nuevo." } = props;

  return (
    <div className="popup__info">
      <img className="popup__info-image" 
      src={isSucess ? succesCheck : errorCheck} />
      <p>{isSucess ? "¡Correcto! Ya estás registrado." : errorMessage}</p>
    </div>
  );
};

export default InfoTooltip;
