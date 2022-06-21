import React from "react";
import api from '../utils/Api';
import Card from '../components/Card'


function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([])

    React.useEffect(() => {
        api.getUserInfo()
            .then((res) => {
                setUserName(res.name);
                setUserDescription(res.about);
                setUserAvatar(res.avatar);
            })
            .catch((err) => {
                console.log(err);
            })
        api.getInitialCards()
            .then((res) => {
                setCards(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])



    return (
        <main className="content">
            <section className="profile">
                <div className="profile__image-edit">
                    <img
                        src={userAvatar}
                        alt="Картинка профиля"
                        className="profile__image"
                    />
                    <button
                        title="Загрузить новый аватар"
                        className="profile__image-edit-button"
                        onClick={onEditAvatar}
                    ></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button
                        className="profile__button"
                        type="button"
                        aria-label="Редактировать профиль"
                        onClick={onEditProfile}
                    ></button>
                    <p className="profile__occupation">{userDescription}</p>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    aria-label="Добавить пост"
                    onClick={onAddPlace}
                ></button>
            </section>

            <section className="elements">
                {cards.map((card) => <Card card={card} key={card._id} onCardClick={onCardClick} />)}
            </section>
        </main>

    );
}

export default Main;