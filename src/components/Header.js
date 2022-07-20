import React from "react";
import { Route, Link } from 'react-router-dom';
import Logo from '../images/logo.svg'

function Header({ loggedIn }) {
    return (
        <header className="header">
            <img
                src={Logo}
                alt="Логотип"
                className="header__logo"
            />
            <Route path='/sign-in'>
                <Link to='sign-up' className='header__link'>Регистрация</Link>
            </Route>
            <Route path='/sign-up'>
                <Link to='sign-in' className='header__link'>Войти</Link>
            </Route>
        </header>

    );
}

export default Header;