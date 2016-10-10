
export class Hash implements IHashable{
    private hash : number

    constructor(data: string){
        
    }

    setHash(hash: number){
        this.hash = hash
    }

    getHexStrHash(): string{
        return '0x'+ this.hash.toString(16)
    }

    getHash(): number{
        return this.hash
    }
}