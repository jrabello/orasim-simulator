import { Tooltip } from '../utils/tooltip'
import { Hash } from '../crypt/hash'

/**
 * SharedPool
 * Classe responsavel por modelar o objeto SharedPool do oracle instance
 * @attribute {lastHashInserted} ultimo hash inserido na hash collection  
 * @attribute {hashElement} objeto html que referencia o elemento hash
 * @attribute {element} objeto html que referencia o elemento shared-pool  
 */
export class SharedPool {    
    private hashCollection: Hash[]    
    //private hashElement: HTMLElement
    private element: HTMLElement

    constructor() {        
        this.hashCollection = []
        this.element = $(`#shared-pool`)[0]
        //this.hashElement = $(`<li class="sql-hash"></li>`)[0]        

        // criando tooltip para o SharedPool
        let tooltip = new Tooltip("#shared-pool", "Shared Pool", 
        `
        <p align="justify">
        Shared Pool xxxx

        xxxxxxxxxxxxxxxxxxxxxxx
        xxxxxxxxxxxxxxxxxxxxxxxx
        xxxxxxxxxxxxxxxxxxxxxxx
        `
         )
    }

    /**
     * animateAddHash
     * Metodo responsavel por animar a inserção hash no hashContainer, dentro da shared-pool  
     */
    animateAddHash(): void{        
        //neste caso estamos apenas dando append na DOM tree, nao existe animacao ainda
        let lastAddedHash: Hash = this.hashCollection.slice(-1)[0]
        let hashElement = $(`<li class="sql-hash"></li>`)[0]
        let idHashHtmlElement = lastAddedHash.getHash().toString(16)
        
        //hash ja foi adicionado na shared pool
        if($('#'+idHashHtmlElement).length)
            return

        //adicionando elemento na DOM tree
        //adicionando id no elemento
        //adicionando cor no elemento
        //adicionando representacao em string do hash
        $("#hash-ul-container").append(hashElement)
        $(hashElement).attr('id', idHashHtmlElement)
        lastAddedHash.setColor('#' + idHashHtmlElement)
        $('#'+idHashHtmlElement).css('color', lastAddedHash.getColor())
        $('#'+idHashHtmlElement).append(lastAddedHash.getHashStr())
        //$(hashElement).append(lastAddedHash.getHashStr())[0].outerHTML)                
    }

    /**
     * addHash
     * Adiciona hash na shared-pool
     * @param {hash} hash que sera adicionado na collection da shared-pool 
     */
    addHash(hash: Hash): void {        
        this.hashCollection.push(hash)    
    }
        
    /**
     * getLastHash
     * Metodo responsavel por retornar ultimo hash inserido na shared pool 
     */
    getLastHash(): Hash{
        return this.hashCollection[this.hashCollection.length-1]
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
     * Metodo responsavel por retornar local de memoria do ultimo hash inserido
     * @returns local de memoria do ultimo hash inserido 
     */
    getLastMemoryLocation(): number{
        return this.getMemoryLocation(this.hashCollection.slice(-1)[0])
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