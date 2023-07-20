
import useFormValidation from "../utils/useFormValidation.js";

function Login({ name, handleLogin }) {
  const { values, isValid, error, isInputValid, handleChange } =
    useFormValidation();

    function onSubmitLogin(e) {
      e.preventDefault();
      // Передаём значения управляемых компонентов во внешний обработчик
      handleLogin({ email: values.email, password: values.password });
    }

  return (
    <section className="register-form" name={name}>
      <h2 className="register__title">Вход</h2>
      <form
        className="register__form"
        onSubmit={onSubmitLogin}
        isValid={isValid}
      >
        <input
          name="email"
          type="email"
          className="register__input"
          placeholder="email@mail.com"
          value={values.email}
          onChange={handleChange}
          isInputValid={isInputValid.email}
          error={error.email}
        ></input>

        <input
          className="register__input"
          placeholder="••••••••••"
          name="password"
          type="password"
          minLength={3}
          value={values.password}
          onChange={handleChange}
          isInputValid={isInputValid.password}
        ></input>

        <button className="register__button" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
