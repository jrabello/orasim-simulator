export class Delay{
    private milliseconds: number

    constructor(milliseconds: number){
        this.milliseconds = milliseconds
    }

    sleep(): Promise<void>{
        return new Promise<void>(resolve => {
            setTimeout(resolve, this.milliseconds);
        })
    }
}
