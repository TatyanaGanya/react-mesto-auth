import { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm.jsx";
import CurrentUserContext from "../contexs/CurrentUserContext.js";
import useFormValidation from "../utils/useFormValidation.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, ...props }) {
  const { handleChange, values, error, isInputValid, isValid,reset, setValue,
  } = useFormValidation();

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setValue("profileName", currentUser.name);
    setValue("profileJob", currentUser.about);
  }, [currentUser, setValue]);

  ///очистка формы
  function resetForClose() {
    onClose();
    reset({ profileName: currentUser.name, profileJob: currentUser.about })
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(
      { profileName: values.profileName, profileJob: values.profileJob },
      reset
    )
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={resetForClose}
      titleButton="Сохранить"
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        className={`popup__input popup__input_type_name ${
          isInputValid.profileName === undefined || isInputValid.profileName
            ? ""
            : "popup__input_error"
        }`}
        name="profileName"
        type="text"
        id="name"
        placeholder="Имя Фамилия"
        minLength="2"
        maxLength="40"
        required
        onChange={handleChange}
        value={values.profileName ? values.profileName : ""}
      />
      <span id="name-error" className="popup__error">
        {error.profileName}
      </span>

      <input
        className={`popup__input popup__input_type_job ${
          isInputValid.profileJob === undefined || isInputValid.profileJob
            ? ""
            : "popup__input_error"
        }`}
        name="profileJob"
        type="text"
        id="job"
        placeholder="Профессия"
        minLength="2"
        maxLength="200"
        required
        onChange={handleChange}
        value={values.profileJob ? values.profileJob : ""}
      />
      <span id="job-error" className="popup__error">
        {error.profileJob}
      </span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
