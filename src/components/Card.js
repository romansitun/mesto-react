import React from "react";


function Card({ card, onCardClick }) {

    const handleClick = () => {
        onCardClick(card);
    };


    return (
        <article className="element">
            <img src={card.link} className="element__image" onClick={handleClick} />
            <button
                className="element__trash-button"
                type="button"
                aria-label="Удалить"
            ></button>
            <div className="element__bottom">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button
                        className="element__like-button"
                        type="button"
                        aria-label="Поставить лайк"
                    ></button>
                    <span className="element__like-count">{card.likes.length}</span>
                </div>
            </div>
        </article>
    );
}

export default Card;