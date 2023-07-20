import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./../images/logo.svg";

function Header({ name, dataUser }) {
  const [activeState, setActiveState] = useState(false);

  function openHeader(e) {
    e.preventDefault();
    setActiveState((prev) => !prev);
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
  }

  return (
    <header className={`header ${activeState ? "header_burger-menu" : ""}`}>
      <img src={logo} alt="Место" className="header__logo" />

      {name === "signup" || name === "signin" ? (
        <Link
          to={name === "signup" ? "/sign-in" : "/sign-up"}
          className="header__link"
        >
          {name !== "signup" ? "Регистрация" : "Войти"}
        </Link>
      ) : (
        <>
          <div
            className={`header__conteiner ${
              activeState ? "header__conteiner_burger-menu" : " "
            }`}
          >
            <p className="header__email">{dataUser}</p>
            <Link
              to={"/sing-in"}
              className="header__button"
              onClick={onSignOut}
            >
              Выйти
            </Link>
          </div>

          <label onClick={openHeader} for="toggle-1" class="toggle-menu">
            <i
              className={`burger-icon ${
                activeState ? "burger-icon_active" : "burger-icon"
              }`}
            ></i>
          </label>
        </>
      )}
    </header>
  );
}

export default Header;
