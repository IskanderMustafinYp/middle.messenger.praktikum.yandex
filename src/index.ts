import { Button } from './common/components/Button/Button';
import { ComponentBase } from './common/components/component.base';
import { renderDom } from './common/utils/render-dom';

document.addEventListener('DOMContentLoaded', () => {
    const pathname = window.location.pathname;

    /* let pageToRender: ComponentBase | null = null;
    switch(pathname) {
        case '/':
        case '/index':
            pageToRender = 

    } */

    const button = new Button({
        label: 'TE',
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
    }, 3000);

    renderDom('#app', button);
});
