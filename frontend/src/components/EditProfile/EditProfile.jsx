import { useState, useContext } from "react";
import CurrentUserContexts from "../../contexts/CurrentUserContext";

const EditProfile = ({handleUpdateUser}) => {
  const { currentUser} = useContext(CurrentUserContexts);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };
  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateUser({ name, about: description });
  };


  return (
    <form className="form" id="form_edit-profile" onSubmit={handleSubmit}>
      <fieldset className="form__edit">
        <input
          required
          name="name"
          className="form__input"
          type="text"
          id="nombre"
          placeholder="Nombre"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
        />
        <span
          name="name-error"
          id="name-error"
          className="form__input-error-span"
        ></span>
        <input
          required
          className="form__input"
          type="text"
          id="job_info"
          name="job_info"
          placeholder="Descripcion"
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span
          name="job_info-error"
          id="job_info-error"
          className="form__input-error-span"
        ></span>
      </fieldset>
      <button
        className="forms__submit-button"
        id="perfil-button"
        title="Guardar cambios"
      >
        Guardar
      </button>
    </form>
  );
};
export default EditProfile;
