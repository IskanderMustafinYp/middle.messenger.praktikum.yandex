import { ICommonComponentProps } from '../common-component-props.interface';
import { ComponentBase } from '../component.base';
import './link.css';
import template from './link.pug';

interface ILinkProps extends ICommonComponentProps {
    text?: string;
    target?: HTMLAnchorElement['target'];
    href?: HTMLAnchorElement['href'];
    events?: {
        click?: (event: Event) => void;
    };
}

export class Link extends ComponentBase<ILinkProps> {
    constructor(props: ILinkProps) {
        super(props);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
