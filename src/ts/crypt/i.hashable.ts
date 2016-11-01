/**
 * Interface que define os metodos que precisam ser implementados 
 * pelas classes que geram hashes
 */
interface IHashable{
    getHash(): number,
    getHashStr(): string
}