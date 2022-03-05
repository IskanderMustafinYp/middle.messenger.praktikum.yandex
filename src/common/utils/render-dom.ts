import { ComponentBase } from '../components/component.base';

export function renderDom(rootSelector: string, component: ComponentBase<any>) {
    const root = document.querySelector(rootSelector);

    if (!root) {
        throw new Error('root not found');
    }

    component.dispatchComponentDidMount();

    root.innerHTML = '';

    root.append(component.getContent()!);
}
