import React from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";


function App() {


  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});


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


  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <PopupWithForm name='edit' title='Редактировать профиль' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} children={
        <>
          <input
            id="firstname-input"
            placeholder="Имя"
            type="text"
            className="popup__form-item popup__form-item_type_name"
            name="firstname"

            minLength="2"
            maxLength="40"
            required
          />
          <span className="firstname-input-error popup__form-item-error"></span>

          <input
            id="info-input"
            placeholder="Профессиональная деятельность"
            type="text"
            className="popup__form-item popup__form-item_type_job"
            name="info"

            minLength="2"
            maxLength="200"
            required
          />
          <span className="info-input-error popup__form-item-error"></span>

          <button type="submit" className="popup__form-button">Сохранить</button>
        </>} />
      <PopupWithForm name='add-image' title='Новое место' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} children={<>
        <input
          type="text"
          className="popup__form-item popup__form-item_type_title"
          aria-label="Введите заголовок для изображения"
          name="name"
          id="title-input"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="title-input-error popup__form-item-error"></span>

        <input
          type="url"
          className="popup__form-item popup__form-item_type_link"
          name="link"
          id="avatar-link-input"
          aria-label="Введите ссылку на изображение"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="avatar-link-input-error popup__form-item-error"></span>

        <button
          type="submit"
          className="popup__form-button popup__form-button_action_add"
        >
          Создать
        </button>
      </>} />

      <PopupWithForm name='confirm' title='Обновить автар' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} children={<>
        <input
          type="url"
          className="popup__form-item popup__form-item_type_link"
          name="link"
          id="link-input"
          aria-label="Введите ссылку на изображение"
          placeholder="Ссылка на автар"
          required
        />
        <span className="link-input-error popup__form-item-error"></span>

        <button
          type="submit"
          className="popup__form-button popup__form-button_action_add"
        >
          Сохранить
        </button>
      </>} />

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


  );
}

export default App;
