import "./index.css";
import { Card } from "../scripts/companents/Card.js";
import { FormValidator } from "../scripts/companents/FormValidator.js";
import PopupWithImage from "../scripts/companents/PopupWithImage.js";
import Section from "../scripts/companents/Section.js";
import { UserInfo } from "../scripts/companents/UserInfo.js";
import PopupWithForm from "../scripts/companents/PopupWithForm.js";
import {
  popupOpenButtomAvatar,
  popupOpenButtomProfile,
  popupOpenButtomGalery,
  formAvatarElement,
  formProfileElement,
  formAddElement,
  popupSelectorAvatar,
  popupSelectorProfile,
  popupSelectorDelete,
  popupSelectorGalery,
  popupSelectorImage,
  templateSelector,
  listSelector,
  infoConfig,
  validationConfig,
} from "../scripts/utils/constants.js";
import PopupCardDelete from "../scripts/companents/PopupCardDelete.js";
import Api from "../scripts/companents/Api.js";

// api
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "69b59d5b-f26f-4db1-9d60-b5f1c83af874",
    "Content-Type": "application/json",
  },
});

//экземпляры форм для валидности
const formProfileElementValidator = new FormValidator(
  validationConfig,
  formProfileElement
);
formProfileElementValidator.enableValidation();

const formAddElementValidator = new FormValidator(
  validationConfig,
  formAddElement
);
formAddElementValidator.enableValidation();

const formAvataElementValidator = new FormValidator(
  validationConfig,
  formAvatarElement
);
formAvataElementValidator.enableValidation();

//popup +
const userInfo = new UserInfo(infoConfig);

//image +
const popupImage = new PopupWithImage(popupSelectorImage);

//delete
const deletePopupCard = new PopupCardDelete(
  popupSelectorDelete,
  ({ card, cardId }) => {
    api
      .deleteCard(cardId)
      .then(() => {
        card.removeCard();
        deletePopupCard.close();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
);

// SECTION (шаблон карточки создание карточки по класс)
function creatNewCard(element) {
  const card = new Card(
    element,
    templateSelector,
    popupImage.open,
    deletePopupCard.open,
    (cardId) => {
      const isLiked = card.checkMyLikes();
      if (isLiked) {
        api
          .deleteLike(cardId)
          .then((res) => {
            card.toggleLike(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addLike(cardId)
          .then((res) => {
            card.toggleLike(res.likes);
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });
      }
    }
  );
  return card.createCard();
}

const section = new Section((element) => {
  section.addItemAppend(creatNewCard(element));
}, listSelector);

//profile обработка формы +
const profilePopup = new PopupWithForm(popupSelectorProfile, (data) => {
  api
    .setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        about: res.about,
        avatar: res.avatar,
        userId: res._id,
      });
      profilePopup.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => profilePopup.setupDefaultText());
});

///avatar
const popupAvatar = new PopupWithForm(popupSelectorAvatar, (data) => {
  api
    .setUserAvatar(data)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        about: res.about,
        avatar: res.avatar,
        userId: res._id,
      });
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => popupAvatar.setupDefaultText());
});

//newcard обработка формы
const popupAddCard = new PopupWithForm(popupSelectorGalery, (data) => {
  api
    .addCard(data)
    .then((dataCard) => {
      dataCard.myid = userInfo.getUserInfoId();
      section.addItemPrepend(creatNewCard(dataCard));
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => popupAddCard.setupDefaultText());
});

//открытие аватара
popupOpenButtomAvatar.addEventListener("click", () => {
  formAvataElementValidator.resetErrorOpenForm();
  popupAvatar.open();
});

popupOpenButtomProfile.addEventListener("click", () => {
  profilePopup.setIputValue(userInfo.getUserInfo());
  formProfileElementValidator.resetErrorOpenForm();
  profilePopup.open();
});

popupOpenButtomGalery.addEventListener("click", () => {
  formAddElementValidator.resetErrorOpenForm();
  popupAddCard.open();
});

//setEvenListners
popupAddCard.setEvenListners();
profilePopup.setEvenListners();
deletePopupCard.setEvenListners();
popupImage.setEvenListners();
popupAvatar.setEvenListners();

//получить масив и получить данные
Promise.all([api.getInitialInfo(), api.getInitialCards()])
  .then(([dataUser, dataCard]) => {
    dataCard.forEach((element) => (element.myid = dataUser._id));
    userInfo.setUserInfo({
      name: dataUser.name,
      about: dataUser.about,
      avatar: dataUser.avatar,
      userId: dataUser._id, // id profileJob, profileJob, profileAvatar,userId
    });
    section.addCardFromArray(dataCard); //массив card
  })
  .catch((err) => {
    console.error(err);
  });
