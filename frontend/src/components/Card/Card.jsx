import trash from "../../images/Trash.png";
import { useContext } from "react";
import CurrentUserContexts from "../../contexts/CurrentUserContext";
const Card = ({
  card,
  handleOpenPopup,
  handleIsLikeCard,
  onCardDelete = {},
}) => {
  const {currentUser} =useContext(CurrentUserContexts);
  console.log(currentUser);
  const { link = "", name = "", _id, isLiked } = card;
 const ownerid = card.owner._id || card.owner  ;
  const imageComponent = {
    name,
    link,
  };
  const handleClick = () => {
    handleOpenPopup(imageComponent);
  };

  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like-active" : ""
  }`;
console.log(card);
// card.owner._id
  return (
    <div className="element">
      <img
        className="element__image"
        src={link}
        alt={name}
        onClick={() => handleClick()}
      />
      <div className="element__text">
        <p className="element__title"> {name} </p>
        <button
          className={cardLikeButtonClassName}
          aria-label="Like card"
          type="button"
          onClick={() => handleIsLikeCard(_id, isLiked)}
        ></button>
         {ownerid == currentUser._id &&  <button
          className="element__trash"
          title="eliminar"
          id="delete_button"
          onClick={() => onCardDelete(_id)}
        >
          <img src={trash} alt="imagen de basurera" />
        </button>}
      </div>
    </div>
  );
};
export default Card;
