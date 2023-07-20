import useFormValidation from "../utils/useFormValidation.js";

function Login({ name, handleLogin }) {
  const { values, handleChange } =
    useFormValidation();

  function onLogin(e) {
    e.preventDefault();
    handleLogin({ email: values.email, password: values.password });
  }

  return (
    <section className="register" name={name}>
      <h2 className="register__title">Вход</h2>
      <form className="register__form" onSubmit={onLogin}>
        <input
          name="email"
          type="email"
          className="register__input"
          placeholder="email@mail.com"
          value={values.email|| ''}
          onChange={handleChange}
          autoComplete="off"
          required
        ></input>

        <input
          name="password"
          type="password"
          className="register__input"
          placeholder="••••••••••"
          minLength={3}
          value={values.password|| ''}
          onChange={handleChange}
          autoComplete="off"
          required
        ></input>

        <button className="register__button" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
