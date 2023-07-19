import PopupWithForm from "./PopupWithForm.jsx";
import useFormValidation from "../utils/useFormValidation.js";
import { useRef } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, ...props }) {
  const { handleChange, values, error, isInputValid, isValid, reset } =
    useFormValidation();
  const input = useRef();

  ///очистка формы
  function resetForClose() {
    onClose();
    reset();
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: input.current.value }, reset);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      titleButton="Сохранить"
      isOpen={isOpen}
      onClose={resetForClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        className={`popup__input popup__input_type_avatar ${
          isInputValid.avatar === undefined || isInputValid.avatar
            ? ""
            : "popup__input_error"
        }`}
        name="avatar"
        type="url"
        id="avatar"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChange}
        ref={input}
        value={values.avatar ? values.avatar : ""}
      />
      <span id="avatar-error" className="popup__error">
        {" "}
        {error.avatar}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
