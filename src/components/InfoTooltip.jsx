import fatal_reg from "./../images/fatal_reg.png";
import reg_ok from "./../images/reg_ok.png";

function InfoTooltip({name, isSuccessful, isOpen, onClose}) //infoTooltip
  {
    return (
      <div className={`popup popup_${name} ${isOpen ? 'popup_open' : ''} `} onClose={onClose}>

        <div className="popup__container" onClose={(e) => e.stopPropagation()}>
          
        <img  src={isSuccessful ? reg_ok  : fatal_reg} alt="Регистрация" className="infoTooltip__img" />
         <h2 className="infoTooltip__title">{isSuccessful ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."}</h2>
        <button type="button" className="popup__close" onClick={onClose}/>
        </div>
      </div>
    );
  }
  
  export default InfoTooltip;
  