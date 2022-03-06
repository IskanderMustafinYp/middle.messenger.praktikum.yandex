import { ICommonComponentProps } from '../common-component-props.interface';
import { ComponentBase } from '../component.base';
import './button.css';
import template from './button.pug';

interface IButtonProps extends ICommonComponentProps {
    label?: string;
    type?: HTMLButtonElement['type'];
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
