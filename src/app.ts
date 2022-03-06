import './common/common.css';
import { renderDom } from './common/utils/render-dom';
import { LoginPage } from './pages/login/LoginPage';

const pathname = window.location.pathname;

const loginPage = new LoginPage();
/* let pageToRender: ComponentBase | null = null;
switch(pathname) {
    case '/':
    case '/index':
        pageToRender = 

} */
/* 
const button = new Button({
    label: 'TE',
    //className: `modal test`,
    events: {
        click: (e: Event) => console.log('e is ' + e.target),
    },
});

const formField = new FormField({
    label: 'Form field label',
    //className: `modal test`,
    events: {
        click: (e: Event) => console.log('e is ' + e.target),
    },
});

setTimeout(() => {
    button.setProps({
        label: 'MY NEW TEXT 2222',
        events: {
            click: (e: Event) => console.log('HREN'),
        },
        className: `modal test`,
    });
}, 3000); */

renderDom('#app', loginPage);
