/**
 * Class Base, responsavel por armazenar e definir metodos relacionados 
 * a geracao de hashs
 */
export class Hash implements IHashable{
    private hash : number

    constructor(){        
    }

    getHexStrHash(): string{
        return '0x'+ this.hash.toString(16)
    }

    setHash(hash: number){
        this.hash = hash
    }

    getHash(): number{
        return this.hash
    }
}