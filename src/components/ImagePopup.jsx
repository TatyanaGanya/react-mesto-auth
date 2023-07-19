function ImagePopup({ isOpen, onClose, card }) {
  return (
    <div className={`popup popup_zoom-image ${isOpen && "popup_open"}`} onClick={onClose}>
      <div className="popup__view-image" onClick={(e => e.stopPropagation())}>
        <img className="popup__image" alt={card.name} src={card.link} />
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <h2 className="popup__description">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
