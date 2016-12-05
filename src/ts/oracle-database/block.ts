export class Block {
    
    private element: HTMLElement
    private size: number
    private isUsed: boolean
    private color: string

    constructor(element: HTMLElement, size: number, isUsed: boolean, color: string) {
        this.element = element
        this.size = size
        this.isUsed = isUsed
        this.color = color
    }

    /**
     * setUsed
     * Metodo responsavel pela animacao de marcar o bloco como usado no db-buffer-cache
     * @param {flag} setando isUsed como usada ou livre
     */
    setUsed(flag: boolean): void{
        this.isUsed = flag
        //$(this.element).css("background-color","#f00")
        //this.setColor(color)
    }

    used(): boolean{
        return this.isUsed
    }

    /**
     * setColor
     * Metodo responsavel ppor setar cor do block
     * @param {color} cor no seguinte formato #ffffff
     */
    setColor(color: string): void{
        this.color = color
        $(this.element).css("background-color", this.color)
    }

    getColor(): string{
        return this.color
    }

    getElement(): HTMLElement{
        return this.element
    }    
}
