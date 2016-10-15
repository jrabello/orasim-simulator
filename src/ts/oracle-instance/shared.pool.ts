import { Hash } from '../crypt/hash'

/**
 * SharedPool
 * Classe responsavel por modelar o objeto SharedPool do oracle instance
 * @attribute {lastHashInserted} ultimo hash inserido na hash collection 
 * @attribute {hashCollection} array de hashes 
 * @attribute {hashElement} objeto html que referencia o elemento hash
 * @attribute {element} objeto html que referencia o elemento shared-pool  
 */
export class SharedPool {    
    private hashCollection: Hash[]
    private lastHashInserted: Hash
    private hashElement: HTMLElement
    private element: HTMLElement

    constructor() {
        this.lastHashInserted = null
        this.hashCollection = []
        this.element = $(`#shared-pool`)[0]
        this.hashElement = $(`<li class="sql-hash"></li>`)[0]        
    }

    /**
     * animateAddHash
     * Metodo responsavel por animar a inserção hash no hashContainer, dentro da shared-pool  
     */
    animateAddHash(): void{        
        $("#hash-ul-container").append(
            $(this.hashElement).append(this.lastHashInserted.getHexStrHash())[0].outerHTML)
    }

    /**
     * addHash
     * Adiciona hash na shared-pool
     * @param {hash} hash que sera adicionado na collection da shared-pool 
     */
    addHash(hash: Hash): void {
        this.lastHashInserted = hash
        this.hashCollection.push(hash)    
    }
        
    /**
     * getMemoryLocation
     * @param {hs} hash que sera usado para busca de local da memoria
     * @returns local de memoria onde os dados estao armazenados
     */
    getMemoryLocation(hs: Hash): number {
        let i = 0

        for (let hash of this.hashCollection) {
            if (hs.getHash() == hash.getHash())
                return i
            i++
        }

        return -1
    }

    /**
     * getLastMemoryLocation
     * @returns local de memoria do ultimo hash inserido 
     */
    getLastMemoryLocation(): number{
        return this.getMemoryLocation(this.lastHashInserted)
    }

    /**
     * findLastHash
     * @returns se o ultimo hash inserido ainda se encontra na collection 
     */
    findLastHash(): boolean{
        return this.findHash(this.lastHashInserted)
    }

    /**
     * findHash
     * @param {hs} hash que sera usado na busca
     * @returns se o hash passado como parametro foi encontrado ou nao 
     */
    findHash(hs: Hash): boolean {
        //searching for hash in collection
        for (let hash of this.hashCollection)
            if (hs.getHash() == hash.getHash())
                return true

        return false
    }
}