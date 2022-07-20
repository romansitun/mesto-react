// import React from "react";
// import { Link } from 'react-router-dom';


// function Register() {
//     const initialData = {
//         email: '',
//         password: '',
//     }

//     const [profileData, setProfileData] = React.useState(initialData);



//     return (
//         <form className="register">
//             <h1 className="register__title">Регистрация</h1>
//             <input className="register__email-input" placeholder="Email"></input>
//             <input className="register__password-input" placeholder="Пароль"></input>
//             <button className="register__button">Зарегистрироваться</button>
//             <Link to="sign-in" className="register__link">Уже зарегистрированы? Войти</Link>
//         </form>
//     );
// }

// export default Register;









import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as auth from '../utils/auth';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });

    }
    handleSubmit(e) {
        e.preventDefault()
        const { email, password } = this.state;
        auth.register(email, password).then((res) => {
            if (res) {
                this.setState({
                    message: ''
                }, () => {
                    this.props.history.push('/sign-in');
                    console.log(res)
                })
            } else {
                this.setState({
                    message: 'Что-то пошло не так!'
                })
            }
        });
    }
    render() {
        return (
            <form className="register" onSubmit={this.handleSubmit}>
                <h1 className="register__title">Регистрация</h1>
                <input required className="register__email-input" placeholder="Email" id="email" name="email" type="email" value={this.state.email} onChange={this.handleChange}></input>
                <input required className="register__password-input" placeholder="Пароль" id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange}></input>
                <button type="submit" onSubmit={this.handleSubmit} className="register__button">Зарегистрироваться</button>
                <Link to="sign-in" className="register__link">Уже зарегистрированы? Войти</Link>
            </form>
        )
    }
}

export default withRouter(Register); 