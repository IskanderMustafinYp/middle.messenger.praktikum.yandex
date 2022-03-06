import { Button } from '../../common/components/Button';
import { ComponentBase } from '../../common/components/component.base';
import { FormField } from '../../common/components/FormField';
import { Link } from '../../common/components/Link';
import './login.css';
import template from './login.pug';

export class LoginPage extends ComponentBase {
    constructor() {
        super();
    }

    protected initChildren() {
        this.children.inputLogin = new FormField({
            type: 'text',
            id: 'login',
            name: 'login',
            minlength: 3,
            maxlength: 20,
            placeholder: 'Логин',
            className: 'login-form__control',
        });

        this.children.inputPassword = new FormField({
            type: 'text',
            id: 'password',
            name: 'password',
            minlength: 8,
            maxlength: 40,
            placeholder: 'Пароль',
            required: true,
            className: 'login-form__control',
        });

        this.children.submit = new Button({
            label: 'Войти',
            type: 'submit',
            className: 'login-form__submit',
            events: {
                click: (e) => {
                    e.preventDefault();
                },
            },
        });

        this.children.signupLink = new Link({
            text: 'Нет аккаунта?',
            className: 'login-form__signup-link',
            href: '/login.html',
        });
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
