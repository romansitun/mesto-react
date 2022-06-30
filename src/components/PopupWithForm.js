import React from "react";


function PopupWithForm({ isOpen, onClose, name, title, children, onSubmit }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__content">
                <button
                    type="button"
                    className="popup__close-button"
                    aria-label="Закрыть"
                    onClick={onClose}
                ></button>
                <h2 className="popup__title">{title}</h2>


                <form
                    name={`${name}`}
                    action="#"
                    className="popup__form"
                    onSubmit={onSubmit}
                >
                    {children}
                </form>


            </div>
        </div>
    );
}

export default PopupWithForm;