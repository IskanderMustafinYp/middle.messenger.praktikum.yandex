import { ComponentBase } from '../component.base';
import './button-back.css';
import template from './button-back.pug';

export class ButtonBack extends ComponentBase {
    constructor() {
        super({
            events: {
                click: () => window.history.back(),
            },
        });
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
