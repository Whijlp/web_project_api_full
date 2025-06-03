 class Api {
    constructor(options) {
      this.baseURL = options.baseURL;
      this.headers = options.headers || {};
      this.likeCard = this.likeCard.bind(this);
      this.deleteLikeCard = this.deleteLikeCard.bind(this);
    }
  
    getInitialCards() {
      return fetch(`${this.baseURL}/cards`, {
        method: "GET",
        headers: {
          ...this.headers,
          authorization: `Bearer ${localStorage.getItem("token")}`
          
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject(`Error: ${res.status}`);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    }
    getUserInfo() {
      return fetch(`${this.baseURL}/users/me`, {
        method: "GET",
        headers: {
          ...this.headers,
          authorization: `Bearer ${localStorage.getItem("token")}`
        },
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
      });
    }
  
    editUserInfo(body) {
      return fetch(`${this.baseURL}/users/me`, {
        method: "PATCH",
        headers: {
          ...this.headers,
          authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(body),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
      });
    }
  
    editAvatarUser(avatar) {
      return fetch(`${this.baseURL}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          ...this.headers,
          authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(avatar),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
      });
    }
  
    createCard(body) {
      return fetch(`${this.baseURL}/cards/`, {
        method: "POST",
        headers: {
          ...this.headers,
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
      });
    }
  
    deleteCard(cardId) {
      return fetch(`${this.baseURL}/cards/${cardId}`, {
        method: "DELETE",
        headers: {
          ...this.headers,
          authorization: `Bearer ${localStorage.getItem("token")}`
        },
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
      });
    }
    likeCard(cardId) {
      return fetch(`${this.baseURL}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: {
          ...this.headers,
          authorization: `Bearer ${localStorage.getItem("token")}`
        },
      
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
      });
    }
  
    deleteLikeCard(cardId) {
      return fetch(`${this.baseURL}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: {
          ...this.headers,
        authorization: `Bearer ${localStorage.getItem("token")}`
        },
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
      });
    }
  }
  
  


  const api = new Api({
    baseURL: "api.alrededor.mooo.com",
    headers: {
      authorization: "6f8a9c3e7b2d4f1a9e0c5b7d3f8e2a1c",
      "Content-Type": "application/json",
    },
  });

  export default api;