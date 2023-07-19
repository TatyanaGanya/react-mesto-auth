class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  _check(res) {
    if (res.ok) {
      return res.json();
    } // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  _request(url, options) {
    return fetch(url, options).then(this._check);
  }

  //загрузка профиля с сервера
  getInitialInfo() {
    return this._request(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization,
      },
    });
  }

  //загрузка карточки с сервера
  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
      },
    });
  }

  ///card
  addCard(data) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.image,
      }),
    });
  }

  // профиль
  setUserInfo(data) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.profileName,
        about: data.profileJob,
      }),
    });
  }

  //avatar
  setUserAvatar(data) {
    return this._request(`${this._url}/users//me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  ///like
  addLike(data) {
    return this._request(`${this._url}/cards/${data}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
      },
    });
  }

  deleteLike(data) {
    return this._request(`${this._url}/cards/${data}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    });
  }

  deleteCard(data) {
    return this._request(`${this._url}/cards/${data}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    });
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "69b59d5b-f26f-4db1-9d60-b5f1c83af874",
    "Content-Type": "application/json",
  },
});

export default api;
