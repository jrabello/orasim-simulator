import std = require("typescript-stl");
import { Random } from '../crypt/rand' 
import { Tooltip } from '../utils/tooltip'
import { Hash } from '../crypt/hash'
import { DataBlock } from '../oracle-database/data.block'
import { DbBufferCache } from '../oracle-instance/db.buffer.cache'

/**
 * SharedPool
 * Classe responsavel por modelar o objeto SharedPool do oracle instance
 * @attribute {lastHashInserted} ultimo hash inserido na hash collection  
 * @attribute {hashElement} objeto html que referencia o elemento hash
 * @attribute {element} objeto html que referencia o elemento shared-pool  
 */
export class SharedPool {    
    private element: HTMLElement
    private hashCollection: Hash[]
    private sqlIdMap: std.HashMap<number, number[]> 
    //private hashElement: HTMLElement
    

    constructor() {        
        this.hashCollection = []
        this.element = $(`#shared-pool`)[0]
        this.sqlIdMap = new std.HashMap<number, number[]>()
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
    animateAddHash(hash: Hash): void{        
        //criando elemento dinamicamente
        //let lastAddedHash: Hash = this.hashCollection.slice(-1)[0]
        //this.sqlIdList.get(hash.getHash())
        let hashElement = $(`<li class="sql-hash"></li>`)[0]
        let idHashHtmlElement = hash.getHash().toString(16)
        
        //hash ja foi adicionado na shared pool
        if($('#'+idHashHtmlElement+'-sharedPool').length)
            return

        //adicionando elemento na DOM tree
        //adicionando id no elemento
        //adicionando cor no elemento(usei bit clear trick pra impedir um branco :p)
        //adicionando representacao em string do hash
        $("#hash-ul-container").append(hashElement)
        $(hashElement).attr('id', idHashHtmlElement+'-sharedPool')        
        //hash.setColor('#' + hash.getHash())
        $('#'+idHashHtmlElement+'-sharedPool').css('color', hash.getColor())
        $('#'+idHashHtmlElement+'-sharedPool').css('font-family', 'courier')
        $('#'+idHashHtmlElement+'-sharedPool').append(hash.getHashStr())
        //$(hashElement).append(lastAddedHash.getHashStr())[0].outerHTML)                
    }

    /**
     * addHash
     * Adiciona hash na shared-pool
     * @param {hash} hash que sera adicionado na collection da shared-pool 
     */
    addHash(hash: Hash): void {

        //retornando se hash ja foi inserido
        if(this.findHash(hash))
            return
        
        let dbBufferCache: DbBufferCache = Orasim.getOracleInstance().getSga().getDbBufferCache()
        let releasedBlocksIndexes: number[] = dbBufferCache.getReleasedBlocksMemLocation()
        console.log('released blocks indexes:', releasedBlocksIndexes.length)

        //retornando se nao existir mais blocks released
        if(releasedBlocksIndexes.length < 3){
            console.log('SharedPool::addHash no freedBlocksIndexes found!')
            return 
        }

        //selecionando numero randomico de blocos 3 ou 6 blocks
        let randomNumBlocks = new Random().getIntBetweenRange(0,1) == 0 ? 3 : 6 //2, (releasedBlocksIndexes.length <= 4 ) ?  releasedBlocksIndexes.length : 4)

        // construindo array com indexes preenchidos com blocos
        let dirtyBLocks = []
        for(let i = 0; i < randomNumBlocks; i++){
            let randomIndex = new Random().getIntBetweenRange(0, releasedBlocksIndexes.length-1)
            dirtyBLocks.push(releasedBlocksIndexes[randomIndex])
            releasedBlocksIndexes.splice(randomIndex,1)
        }

        //linkando hash para array de blocks
        this.sqlIdMap.insert(std.make_pair(hash.getHash(), dirtyBLocks))
        dbBufferCache.setMemoryLocationUsed(dirtyBLocks)
        console.log('dirtyBLocks: ', dirtyBLocks, 'length: ', dirtyBLocks.length)
        //dbBufferCache.getBlocks()
        //this.sqlIdList.insert_or_assign(hash.getHash(),)    
    }
    
    /**
     * getMemoryLocation
     * @param {hs} hash que sera usado para busca de local da memoria
     * @returns local de memoria onde os dados estao armazenados
     */
    getMemoryLocation(hs: Hash): number[] {
        if(this.sqlIdMap.has(hs.getHash()))
            return this.sqlIdMap.get(hs.getHash())
        return []
    }

    /**
     * findHash
     * @param {hs} hash que sera usado na busca
     * @returns se o hash passado como parametro foi encontrado ou nao 
     */
    findHash(hs: Hash): boolean {
        //searching for hash in collection
        return this.sqlIdMap.has(hs.getHash())        
    }
}