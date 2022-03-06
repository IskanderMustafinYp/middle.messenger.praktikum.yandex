import { ICommonComponentProps } from '../common-component-props.interface';
import { ComponentBase } from '../component.base';
import './form-field.css';
import template from './form-field.pug';

interface IFormFieldProps extends ICommonComponentProps {
    label?: string;
    type?: HTMLInputElement['type'];
    name?: HTMLInputElement['name'];
    placeholder?: HTMLInputElement['placeholder'];
    minlength?: HTMLInputElement['minLength'];
    maxlength?: HTMLInputElement['maxLength'];
    required?: HTMLInputElement['required'];
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
