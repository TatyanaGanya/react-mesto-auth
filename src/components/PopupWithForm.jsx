function PopupWithForm({
  name,
  title,
  titleButton,
  isOpen,
  onClose,
  children,
  onSubmit,
  isValid = true,
}) {
  return (
    <div
      className={`popup popup_${name} ${isOpen && "popup_open"}`}
      onClick={onClose}
    >
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <h2
          className={`popup__title ${
            name === "delete" ? "popup__title_delete" : ""
          }`}
        >
          {title}
        </h2>
        <form
          className="popup__content"
          name={`${name}_form`}
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={`popup__save ${isValid ? "" : "popup__save_invalid"}`}
            type="submit"
          >
            {titleButton}
          </button>
        </form>
        <button type="button" className="popup__close" onClick={onClose} />
      </div>
    </div>
  );
}

export default PopupWithForm;
