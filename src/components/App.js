import React from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from "./AddPlacePopup ";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import api from '../utils/Api';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {


  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);


  const [cards, setCards] = React.useState([]);



  React.useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);



  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter(newCard => newCard._id !== card._id)
      setCards(newCards)
    })
      .catch((err) => {
        console.log(err);
      });
  }



  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);


  const handleCardClick = (card) => {
    setSelectedCard(card);
  };


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }


  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }



  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }




  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(data) {
    setIsLoading(true)
    api.editProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }


  function handleUpdateAvatar(data) {
    setIsLoading(true)
    api.editAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true)
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} onLoading={isLoading} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} onLoading={isLoading} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} onLoading={isLoading} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        < Footer />


        {/* <div className="popup popup_type_confirm">
        <div className="popup__content">
          <button
            className="popup__close-button popup__close-button_place_confirm"
            type="button"
            aria-label="Закрыть"
          ></button>
          <h2 className="popup__title popup__title_place_confirm">Вы уверены?</h2>
          <form
            id="confirm-delete-popup"
            name="popup"
            action="/apply/"
            method="POST"
            className="popup__form popup__form_type_confirm"
            noValidate
          >
            <button
              type="submit"
              className="popup__form-button popup__form-button_action_confirm"
            >
              Да
            </button>
          </form>
        </div>
      </div> */}

      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
