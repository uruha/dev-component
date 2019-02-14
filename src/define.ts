const { customElements } = window;

export default (name: string, element: any): void => {
    if (customElements && customElements.get(name) === undefined) {
        customElements.define(name, element);
    }
};
