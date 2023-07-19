import { useContext } from "react";
import CurrentUserContext from "../contexs/CurrentUserContext.js";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_active"
  }`;

  return (
    <li className="card">
      <article className="card__item">
        <img
          className="card__image"
          alt={card.name}
          src={card.link}
          onClick={() => onCardClick({ link: card.link, name: card.name })}
        />
        <h2 className="card__text">{card.name}</h2>
        <button
          type="button"
          className={cardLikeButtonClassName}
          onClick={() => onCardLike(card)}
        >
          <p className="card__count">{card.likes.length}</p>
        </button>
        {isOwn && (
          <button
            className="card__delete"
            onClick={() => onCardDelete(card._id)}
          />
        )}
      </article>
    </li>
  );
}

export default Card;
