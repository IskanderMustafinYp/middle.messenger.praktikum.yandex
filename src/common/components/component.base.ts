import { nanoid } from 'nanoid';
import { EventBus } from '../utils/event-bus';

export abstract class ComponentBase<
    TProps extends Record<string | symbol, any>,
> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    public id = nanoid(6);

    private eventBus: EventBus;

    private _element: HTMLElement | null;

    protected props: TProps;
    protected children: Record<string, ComponentBase<any>>;

    constructor(propsAndChildren: any = {}) {
        this.eventBus = new EventBus();

        const { props, children } = this.getChildren(propsAndChildren);

        this.children = children;

        this.props = this._makePropsProxy(props);

        this.initChildren();

        this.eventBus.on(ComponentBase.EVENTS.INIT, this.init.bind(this));
        this.eventBus.on(
            ComponentBase.EVENTS.FLOW_CDM,
            this._componentDidMount.bind(this),
        );
        this.eventBus.on(
            ComponentBase.EVENTS.FLOW_CDU,
            this._componentDidUpdate.bind(this),
        );
        this.eventBus.on(
            ComponentBase.EVENTS.FLOW_RENDER,
            this._render.bind(this),
        );

        this.eventBus.emit(ComponentBase.EVENTS.INIT);
    }

    getChildren(propsAndChildren: any) {
        const children: any = {};
        const props: any = {};

        Object.entries(propsAndChildren).map(([key, value]) => {
            if (value instanceof ComponentBase) {
                children[key] = value;
            } else if (
                Array.isArray(value) &&
                value.every((v) => v instanceof ComponentBase)
            ) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { props, children };
    }

    protected initChildren() {}

    init() {
        this.eventBus.emit(ComponentBase.EVENTS.FLOW_RENDER);
    }

    private _componentDidMount() {
        this.componentDidMount();
    }

    componentDidMount() {}

    dispatchComponentDidMount() {
        this.eventBus.emit(ComponentBase.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: TProps, newProps: TProps) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus.emit(ComponentBase.EVENTS.FLOW_RENDER);
        }
    }

    componentDidUpdate(_oldProps: TProps, _newProps: TProps) {
        return true;
    }

    setProps = (nextProps: TProps) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement | null {
        return this._element;
    }

    _render() {
        const fragment = this.render();

        const newElem = fragment.firstElementChild as HTMLElement;

        if (this._element) {
            this._element.replaceWith(newElem);
        }

        this._element = newElem;

        this._addEvents();
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    getContent(): HTMLElement {
        return this.element!;
    }

    _makePropsProxy(props: TProps) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;

        return new Proxy<TProps>(props, {
            get(target: TProps, prop) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: any, prop, value) {
                target[prop] = value;
                self.eventBus.emit(
                    ComponentBase.EVENTS.FLOW_CDU,
                    { ...target },
                    target,
                );
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            },
        });
    }

    _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создает сразу несколько блоков
        return document.createElement(tagName);
    }

    private _addEvents() {
        const events: Record<string, () => void> = (this.props as any).events;

        if (!events) {
            return;
        }

        Object.entries(events).forEach(([event, listener]) => {
            this._element!.addEventListener(event, listener);
        });
    }

    protected compile(template: (context: any) => string, context: any) {
        const fragment = this._createDocumentElement(
            'template',
        ) as HTMLTemplateElement;

        Object.entries(this.children).forEach(([key, child]) => {
            if (Array.isArray(child)) {
                context[key] = child.map(
                    (ch) => `<div data-id="id-${ch.id}"></div>`,
                );

                return;
            }
            context[key] = `<div data-id="id-${child.id}"></div>`;
        });

        const htmlString = template(context);

        fragment.innerHTML = htmlString;

        Object.entries(this.children).forEach(([key, child]) => {
            if (Array.isArray(child)) {
                context[key] = child.map(
                    (ch) => `<div data-id="id-${ch.id}"></div>`,
                );

                return;
            }
            const stub = fragment.content.querySelector(
                `[data-id="id-${child.id}"]`,
            );

            if (!stub) {
                return;
            }

            stub.replaceWith(child.getContent()!);
        });

        return fragment.content;
    }
}
