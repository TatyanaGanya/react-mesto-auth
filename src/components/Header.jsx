import { Link } from "react-router-dom";
import logo from "./../images/logo.svg";

function Header({ name, dataUser }) {
  return (
    <header className="header">
      <img src={logo} alt="Место" className="header__logo" />

      {name === "signup" || name === "signin" ? (
        <Link
          to={name === "signin" ? "/sign-up" : "/sign-in"}
          className="header__link"
        >
          {name === "signin" ? "Регистрация" : "Войти"}
        </Link>

        
      ) : (
        <div className="header__email-conteiner">
          <p className="header__email">{dataUser}</p>
          <button className="header__button">Выйти</button>
        </div>
      )}
    </header>
  );
}

export default Header;
