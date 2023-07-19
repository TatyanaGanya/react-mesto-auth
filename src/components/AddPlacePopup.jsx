import PopupWithForm from "./PopupWithForm.jsx";

import useFormValidation from "../utils/useFormValidation.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { handleChange, values, error, isInputValid, isValid, reset } =
    useFormValidation();

  ///очистка формы
  function resetForClose() {
    onClose();
    reset();
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({ image: values.image, title: values.title }, reset);
  }

  return (
    <PopupWithForm
      name="galery"
      title="Новое место"
      titleButton="Создать"
      isOpen={isOpen}
      onClose={resetForClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        className={`popup__input popup__input_type_title ${
          isInputValid.title === undefined || isInputValid.title
            ? ""
            : "popup__input_error"
        }`}
        name="title"
        type="text"
        id="title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        onChange={handleChange}
        value={values.title ? values.title : ""}
      />
      <span id="title-error" className="popup__error">
        {error.title}
      </span>
      <input
        className={`popup__input popup__input_type_image ${
          isInputValid.image === undefined || isInputValid.image
            ? ""
            : "popup__input_error"
        }`}
        name="image"
        type="url"
        id="image"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChange}
        value={values.image ? values.image : ""}
      />
      <span id="image-error" className="popup__error">
        {" "}
        {error.image}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
