import { ComponentBase } from '../component.base';
import template from '../wm-button/wm-button.mixin.pug';

interface IFormFieldProps {
    label?: string;
    type?: HTMLInputElement['type'];
    className?: HTMLInputElement['className'];
    name?: HTMLInputElement['name'];
    placeholder?: HTMLInputElement['placeholder'];
    events?: Record<string, (...args: any[]) => void>;
}

export class FormField extends ComponentBase<IFormFieldProps> {
    constructor(props: IFormFieldProps) {
        super(props);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
