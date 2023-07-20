import useFormValidation from "../utils/useFormValidation.js";
import { Link } from "react-router-dom";

function Register({ name, handleRegister }) {
  const { values, handleChange } =
    useFormValidation();

  function onRegister(e) {
    e.preventDefault();
    handleRegister({ email: values.email, password: values.password });
  }

  return (
    <section className="register" name={name}>
      <h2 className="register__title">Регистрация</h2>
      <form
        className="register__form"
        name="name"
        onSubmit={onRegister}
      >
        <input
          name="email"
          type="email"
          className="register__input"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          autoComplete="off"
        ></input>

        <input
          className="register__input"
          placeholder="Пароль"
          name="password"
          type="password"
          minLength={3}
          value={values.password}
          onChange={handleChange}
          autoComplete="off"
        ></input>

        <button className="register__button" type="submit">
          Зарегистрироваться
        </button>
        <p className="register__href">
          Уже зарегистрированы?{" "}
          <Link to={"/sign-in"} className="register__entrance">
            {" "}
            Войти{" "}
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
