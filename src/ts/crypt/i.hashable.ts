/**
 * Interface que define os metodos que precisam ser implementados 
 * pelas classes que geram hashs
 */
interface IHashable{
    getHash(): number,
    getHexStrHash(): string
}