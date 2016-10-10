export class UserProcess{
    private element: HTMLElement;

    constructor(){
        this.element = $("#user-process")[0]
    }
    
    getElement(){
        return this.element
    }
}