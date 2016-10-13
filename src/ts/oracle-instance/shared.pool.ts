import { Hash } from '../crypt/hash'

export class SharedPool {
    private lastHashInserted: Hash
    private hashCollection: Hash[]
    private element: string

    constructor() {
        this.lastHashInserted = null
        this.hashCollection = []
        this.element = `<li class="hash"></li>`
    }

    animateAddHash(){        
        $("#hash-ul-container").append(
            $(this.element).append(this.lastHashInserted.getHexStrHash())[0].outerHTML)
    }

    addHash(hash: Hash): void {
        this.lastHashInserted = hash
        this.hashCollection.push(hash)    
    }
        
    //getting index of some hash in collection
    getMemoryLocation(hs: Hash): number {
        let i = 0

        for (let hash of this.hashCollection) {
            if (hs.getHash() == hash.getHash())
                return i
            i++
        }

        return -1
    }

    getLastMemoryLocation(): number{
        return this.getMemoryLocation(this.lastHashInserted)
    }

    findLastHash(): boolean{
        return this.findHash(this.lastHashInserted)
    }

    //finding hash in collection
    findHash(hs: Hash): boolean {
        //searching for hash in collection
        for (let hash of this.hashCollection)
            if (hs.getHash() == hash.getHash())
                return true

        return false
    }
}