import Card from "./Card.jsx";
import { useContext } from "react";
import CurrentUserContext from "../contexs/CurrentUserContext.js";
import Login from "./Login.jsx"
import Register from "./Register.jsx"

function Main({
  name,
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardDelete,
  onCardLike,
  handleRegister,
  handleLogin
  
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      {name === 'main' ? 
      <>
      <section className="profile">
        <button
          type="button"
          className="profile__change"
          onClick={onEditAvatar}
        >
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="аватар"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          className="profile__add"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="foto" aria-label="фотогалерея">
        <ul className="cards">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
      </>
      :
      name === 'signin' ? 
      <Login name={name} handleLogin={handleLogin}/>
      :
      <Register name={name} handleRegister={handleRegister}/>}
    </main>
  );
}

export default Main;
