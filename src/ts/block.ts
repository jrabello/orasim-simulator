export class Block{
    size: number
    element: HTMLElement;

    constructor() {
        this.element = $(`<div class="cache-box"></div>`)[0]
        this.size = 4096
    }
}