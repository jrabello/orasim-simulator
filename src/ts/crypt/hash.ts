/**
 * Hash
 * Class Base, responsavel por armazenar e definir metodos relacionados a geracao de hashs
 * @attribute {hash} hash armazenado na forma de um numero
 */
export class Hash implements IHashable{
    private hash : number
    private hashStr : string

    constructor(){        
    }

    /**
     * getHexStrHash
     * @returns retorna representacao em hexadecimal do hash
     */
    getHashStr(): string{
        return this.hashStr
    }

    setHashStr(hash: string){
        this.hashStr = hash
    }

    // getHashStr(): string{
    //     return this.hashStr
    // }

    setHash(hash: number){
        this.hash = hash
    }

    getHash(): number{
        return this.hash
    }
}