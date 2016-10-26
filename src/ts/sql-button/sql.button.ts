export class SqlButton{
    constructor(){
        $("btnConnect-div").on('click', this.handleConnect)
    }

    handleConnect(): void{
        console.log('clicked!')
    }
}