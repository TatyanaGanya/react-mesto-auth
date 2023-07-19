import "./../pages/index.css";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import { useCallback, useEffect, useState,  } from "react";
import { Route, Routes, useNavigate, Navigate} from "react-router-dom";
import CurrentUserContext from "../contexs/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import { registation, authorization, getUserData } from "../utils/auth.js";

// 12ПР
import InfoTooltip from "./InfoTooltip.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import ProtectedPage from "./ProtectedPage";


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [imagePopup, setImagePopup] = useState(false);
  const [cardDelete, setCardDelete] = useState(false);
  const [deleteCardId, setDeleteCardId] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  //12пр
  const [userEmail, setUserEmail] = useState(""); // почта
  //regist
  const [isSuccessful, setIsSuccessful] = useState(false); //

  const [isCheckToken, setIsCheckToken] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false); // зарегистрирован пользователь?
  const [userData, setUserData] = useState({}); //  данные юзера
  const [isResultPopupOpen, setIsResultPopupOpen] = useState(false);

  const navigate = useNavigate();

  const setIsEditCloseAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopup(false); //zoom
    setCardDelete(false);

    //12ПЗ
    setIsResultPopupOpen(false);
  }, []);

  // esc 
  const handleCloseEsc = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        setIsEditCloseAllPopups();
      }
    },
    [setIsEditCloseAllPopups]
  );

  const closeAllPopups = useCallback(() => {
    setIsEditCloseAllPopups();
    document.removeEventListener("keydown", handleCloseEsc);
  }, [setIsEditCloseAllPopups, handleCloseEsc]);

  //esc
  function setEvenListnersForDocument() {
    document.addEventListener("keydown", handleCloseEsc);
  }
  ///////////////////////////////////////
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEvenListnersForDocument();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEvenListnersForDocument();
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEvenListnersForDocument();
  }

  function handleDeleteClick(cardId) {
    setDeleteCardId(cardId);
    setCardDelete(true); //delete
    setEvenListnersForDocument();
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopup(true);
    setEvenListnersForDocument();
  }

  const auth = (jwt) => {
    return auth.getUserData(jwt).then((res) => {
      if (res) {
        const { email, password } = res;
        setLoggedIn(true); // обновление
        setUserData({
          email,
          password,
        });
      }
    });
  };

  useEffect(() => {
    if (loggedIn) {
      navigate.push("/signin");
    }
  }, [loggedIn, navigate]);

  //регитсрация пользователя
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth(jwt);
    }

    //     getUserData(localStorage.jwt)
    //       .then(res => {
    //         setUserEmail(res.data.email);
    //         setLoggedIn(true);
    //         setIsCheckToken(false);
    //         navigate("/");
    //       })
    //       .catch((err) => {
    //         console.error(err);
    //       });
    //   } else {
    //     setLoggedIn(false);
    //     setIsCheckToken(false);
    //   }
  }, [navigate]);

  useEffect(() => {
    if (loggedIn) {
      //получить масив и получить данные
      Promise.all([api.getInitialInfo(), api.getInitialCards()])
        .then(([dataUser, dataCard]) => {
          setCurrentUser(dataUser);
          setCards(dataCard);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [loggedIn]);


  function handleCardDelete(evt) {
    evt.preventDefault();
    api
      .deleteCard(deleteCardId)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return card._id !== deleteCardId;
          })
        );
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //adddddd!!!!
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (isLiked) {
      api
        .deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => alert(error.message));
    } else {
      api
        .addLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => alert(error.message));
    }
  }

  function handleUpdateUser(dataUser, reset) {
    api
      .setUserInfo(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateAvatar(dataUser, reset) {
    api
      .setUserAvatar(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateAdd(dataCard, reset) {
    api
      .addCard(dataCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        reset();
      })
      .catch((err) => {
        console.error(err);
      });
  }



  function handleLogin(email, password) {
    authorization(password, email)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setIsResultPopupOpen(false);
        setIsSuccessful(false);
        console.error(err);
      });
  }

  function handleRegister(password, email) {
    registation(password, email)
      .then((res) => {
        console.log("dddd");
        setLoggedIn(true);
        navigate("/signin");
      })
      .catch((err) => {
        setIsResultPopupOpen(true);
        setIsSuccessful(false);
        console.error(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={ProtectedPage}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardDelete={handleDeleteClick}
              onClose={closeAllPopups}
              cards={cards}
              onCardLike={handleCardLike}
              userEmail={userEmail}
              loggedIn={loggedIn}
              isCheckToken={isCheckToken}
            />
          }
        />

        <Route
          path="/sign-up"
          element={
            <>
              <Header name="signup" />
              <Main
                name="signup"
                isCheckToken={isCheckToken}
                handleRegister={handleRegister}
              />
            </>
          }
        />
        <Route
          path="/sign-in"
          element={
            <>
              <Header name="signin" />
              <Main
                name="signin"
                isCheckToken={isCheckToken}
                handleLogin={handleLogin}
              />
            </>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleUpdateAdd}
      />

      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        titleButton="Да"
        isOpen={cardDelete}
        onClose={closeAllPopups}
        onSubmit={handleCardDelete}
      ></PopupWithForm>

      <InfoTooltip
        name="result"
        isSuccessful={isSuccessful}
        isOpen={isResultPopupOpen}
        onClose={closeAllPopups}
      ></InfoTooltip>

      <ImagePopup
        isOpen={imagePopup}
        onClose={closeAllPopups}
        card={selectedCard}
      ></ImagePopup>
    </CurrentUserContext.Provider>
  );
}

export default App;
