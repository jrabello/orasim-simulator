/**
 * Hash
 * Class Base, responsavel por armazenar e definir metodos relacionados a geracao de hashs
 * @attribute {hash} hash armazenado na forma de um numero
 */
export class Hash implements IHashable{
    private hash : number
    private hashStr : string
    private color: string

    constructor(){       
        this.color = "#ffffff" 
    }

    /**
     * getColor
     * @returns retorna cor do hash
     */
    getColor(): string{
        return this.color
    }
    setColor(color: string){
        this.color = color
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
        this.color = '#' + hash.toString(16).slice(2,8)
        console.log(this.color)
    }

    getHash(): number{
        return this.hash
    }
}