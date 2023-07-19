import useFormValidation from "../utils/useFormValidation.js";
import { Link } from "react-router-dom";

function Register({ name, handleRegister, onSubmit }) {
  const { values, isValid, error, isInputValid, handleChange } =
    useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    handleRegister({ email: values.email, password: values.password });
  }

  // function onRegister(e) {
  //   e.preventDefaul();
  //   (values.password, values.email);
  // }

  return (
    <section className="register-form" name={name}>
      <h2 className="register__title">Регистрация</h2>
      <form
        className="register__form"
        name="name"
        onSubmit={handleSubmit}
        isValid={isValid}
      >
        <input
          name="email"
          type="email"
          className="register__input"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          //onChange={({target}) => setEmail(target.value)}
          isInputValid={isInputValid.email}
          error={error.email}
        ></input>

        <input
          className="register__input"
          placeholder="Пароль"
          name="password"
          type="password"
          minLength={3}
          value={values.password}
          onChange={handleChange}
          isInputValid={isInputValid.password}
        ></input>

        <button className="register__button" type="submit">
          Зарегистрироваться
        </button>
        <p className="register__href">
          Уже зарегистрированы? <Link to={"/sign-in"}> Войти </Link>{" "}
        </p>
      </form>
    </section>
  );
}

export default Register;
