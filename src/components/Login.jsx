import useFormValidation from "../utils/useFormValidation.js";


function Login({ name, handleLogin }) {
  const { values, error, isValid, isInputValid, handleChange } =
    useFormValidation();

    function onLogin(e) {
      e.preventDefaul();
      handleLogin(values.password, values.email);
    }


  return (
    <section
      className="register-form"
      name={name}

    >
      <h2 className="register__title">Вход</h2>
      <form 
      className="register__form"
      onSubmit={onLogin}
      isValid={isValid}
      >
        <input
          className="register__input"
          placeholder="email@mail.com"
          value={values.email}
          onChange={handleChange}
         isInputValid={isInputValid.email}
          error={error.email}
          name="email"
          type="email"
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

        <button className="register__button" type="submit">Войти</button>

      </form>
    </section>
  );
}

export default Login;
