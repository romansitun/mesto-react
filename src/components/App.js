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
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import PopupWithForm from "./PopupWithForm";


function App() {


  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [removedCardId, setRemovedCardId] = React.useState('');


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
    setIsLoading(true)
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter(newCard => newCard._id !== card._id)
      setCards(newCards);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
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


  function handleConfirmDeleteClick(cardId) {
    setIsConfirmDeletePopup(!isConfirmDeletePopupOpen);
    setRemovedCardId(cardId);
  }




  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsConfirmDeletePopup(false)
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
          onCardDelete={handleConfirmDeleteClick}
        />
        <PopupWithForm onLoading={isLoading} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} onLoading={isLoading} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} onLoading={isLoading} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} onLoading={isLoading} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <ConfirmDeletePopup isOpen={isConfirmDeletePopupOpen} onClose={closeAllPopups} onSubmit={handleCardDelete} card={removedCardId} onLoading={isLoading} />
        < Footer />



      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
