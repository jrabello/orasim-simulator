export class Block{
    private size: number    
    private element: HTMLElement
    private used: boolean

    constructor() {
        this.element = $(`<div class="cache-box"></div>`)[0]
        //this.element = $(`<div class="block"></div>`)[0]
        this.size = 4096
        this.used = false
    }

    setUsed(flag: boolean){
        this.used = flag
        $(this.element).css("background-color","#f00")
    }

    getElement(): HTMLElement{
        return this.element
    }
    
}