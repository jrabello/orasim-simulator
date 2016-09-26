export class Block{
    size: number
    used: number
    element: HTMLElement

    constructor() {
        this.element = $(`<div class="cache-box"></div>`)[0]
        //this.element = $(`<div class="block"></div>`)[0]
        this.size = 4096
    }
}