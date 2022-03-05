import { ComponentBase } from '../component.base';
import template from '../wm-button/wm-button.mixin.pug';

interface IButtonProps {
    label?: string;
    type?: HTMLButtonElement['type'];
    className?: HTMLButtonElement['className'];
    events?: {
        click?: (event: Event) => void;
    };
}

export class Button extends ComponentBase<IButtonProps> {
    constructor(props: IButtonProps) {
        super(props);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
