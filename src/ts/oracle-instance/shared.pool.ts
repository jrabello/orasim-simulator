import { Hash } from '../crypt/hash'

export class SharedPool{
    private hashCollection: Hash[]
    private hashHtmlTemplate: string 

    constructor(){
        this.hashCollection = []
        this.hashHtmlTemplate = `<li class="hash"></li>`
    }

    addHash(hash: Hash): void{
        this.hashCollection.push(hash)

        //adding to view
        $("#hash-ul-container").append(
            $(this.hashHtmlTemplate).append(hash.getHexStrHash())[0].outerHTML)
        
    }

    getHashIndex(hs: Hash): number{
        let i = 0
        
        for(let hash of this.hashCollection){
            if(hs.getHash() == hash.getHash())
                return i
            i++
        } 

        return -1
    }

    findHash(hs: Hash): boolean{
        //searching for hash in collection
        for(let hash of this.hashCollection)
            if(hs.getHash() == hash.getHash()) 
                return true
        
        return false
    }
}