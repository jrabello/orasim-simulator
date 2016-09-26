export class SqlConsoleMessage{    
    private msgElement: HTMLElement;

    constructor(type: string, msg: string){
        this.msgElement = $(`<li class="console-li-`+type+`">`+msg+`</li>`)[0]
    }

    getMsg(): HTMLElement{
        return this.msgElement;
    }
}