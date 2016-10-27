/**
 * Hash
 * Class Base, responsavel por armazenar e definir metodos relacionados a geracao de hashs
 * @attribute {hash} hash armazenado na forma de um numero
 */
export class Hash implements IHashable{
    private hash : number

    constructor(){        
    }

    /**
     * getHexStrHash
     * @returns retorna representacao em hexadecimal do hash
     */
    getHexStrHash(): string{
        return this.hash.toString(16)
    }

    setHash(hash: number){
        this.hash = hash
    }

    getHash(): number{
        return this.hash
    }
}