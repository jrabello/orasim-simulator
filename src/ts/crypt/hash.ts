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
        let formattedHash = hash
        //cortando alguns niveis de verde com bit shifting :p
        formattedHash &= ~(0x01 << 15)>>>0
        formattedHash &= ~(0x01 << 14)>>>0
        formattedHash &= ~(0x01 << 13)>>>0
        formattedHash &= ~(0x01 << 12)>>>0
        let hashWithLessGreen = ("000000" + formattedHash.toString(16)).substr(-6);
        console.log('hashWithLessGreen',hashWithLessGreen)
        this.color = '#' + hashWithLessGreen 
        console.log(this.color)
    }

    getHash(): number{
        return this.hash
    }
}