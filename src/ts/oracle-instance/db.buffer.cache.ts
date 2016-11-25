import { Tooltip } from '../utils/tooltip'
import { DataBlock } from '../oracle-database/data.block'

/**
 * DbBufferCache
 * Classe responsavel por modelar o objeto DbBufferCache do oracle instance
 * @attribute {numBlocks} numero de blocks default que irao preencher o DbBufferCache 
 * @attribute {element} objeto html que referencia o elemento db-buffer-cache 
 * @attribute {blocks} array de objetos que guarda os blocos do data-files
 */
export class DbBufferCache {    
    private numBlocks: number
    private element: HTMLElement
    private blocks: DataBlock[]

    constructor() {
        this.numBlocks = 18
        this.element = $('#db-buffer-cache')[0]
        this.blocks = new Array<DataBlock>()
        this.initBlocks()

        // criando tooltip para o DbBufferCache
        let tooltip = new Tooltip("#db-buffer-cache", "DB Buffer Cache", 
        `
        <p align="justify">
        O DB Buffer Cache ou apenas Buffer Cache, é a área de memória que armazena as cópias dos blocos de dados lidos a partir dos datafiles. 
        <br><br>
        Um buffer é um endereço de memória principal em que o gerenciador de buffer armazena temporariamente um bloco de dados usado no momento ou recentemente. 
        <br><br>
        Todos os usuários conectados simultaneamente na instância do banco de dados compartilham os acessos ao Buffer Cache.
        <br><br><br>
        
        O Oracle usa o buffer cache para atingir os seguintes objectivos:
        <br><br>
        <span style='font-weight: bold'>
        # Otimização do I/O físico 
        </span><br><br>
        
        O banco de dados atualiza os blocos de dados no cache e armazena os metadados referênte a essas mudanças no Redo Log Buffer.
        Depois de um COMMIT, o Oracle grava os redo buffers no disco, mas não escreve imediatamente os blocos de dados no disco. 
        Quem faz essa escrita é o Database Writer (DBWn) com algumas condições.
 
        <br><br>
        <span style='font-weight: bold'>
        # Manter blocos frequentemente acessados no buffer cache e escrever blocos pouco acessados no disco.
        </span><br><br>

        <span style='font-weight: bold'>
        # Estados do buffer
        </span><br><br>

        O Oracle usa algoritmos internos para gerenciar buffers no cache. 
        Um buffer pode estar qualquer um dos seguintes estados que se excluem mutuamente:
        <br><br>
        
        - Unused (Não usado)
        <br>
        O buffer está disponível para uso, porque ele nunca foi usado ou está atualmente sem uso. 
        <br>
        Este tipo de buffer é o mais fácil para o banco de dados para usar.
        <br><br>
        
        - Clean (Limpo)
        <br>
        Este buffer foi utilizado anteriormente e agora contém uma versão de leitura consistente de um bloco a partir de um ponto no tempo. 
        O bloco contém dados, mas está "limpo" e não precisa de checkpoint, ou seja, ser gravado em disco pelo Database Writer. 
        O Oracle pode selecionar este bloco e reutilizá-lo.
        <br><br>
        
        - Dirty (Sujo)
        <br>
        O buffer contêm dados modificados que ainda não foram gravadas no disco. 
        O Oracle precisa fazer o checkpoint do bloco antes de reutilizá-lo.
         `
        )
    }

    /**
     * initBlocks
     * Metodo responsavel por adicionar dinamicamente os blocos dentro do db-buffer-cache     
     */
    initBlocks(): void{
        for (let i = 0; i < this.numBlocks; i++) {
            let block = new DataBlock()
            this.blocks.push(block)
            $('#db-buffer-cache-container').append(block.getElement())
        }
    }

    /**
     * setMemoryLocationUsed
     * Metodo responsavel por marcar uma area de memoria como utilizada
     * @param {memLocation} numero de id da localizacao da memoria
     */
    setMemoryLocationUsed(memLocation: number, color: string){
        this.blocks[memLocation].setUsed(true, color)
    }

    /**
     * getNewBlockHtml
     * Metodo responsavel por retornar novo objeto html que sera utilizado para animacao 
     * @returns retorna objeto html(Block) para ser animado  
     */
    getNewBlockHtml(): HTMLElement{
        let newBlock = new DataBlock()
        
        //adicionando elemento no DOM dinamicamente        
        $(this.element).prepend(newBlock.getElement())
        $(newBlock.getElement()).offset($(this.element).offset())
        $(newBlock.getElement()).css("position", "absolute")
        //$(newBlock.getElement()).css("z-index", 100)

        return newBlock.getElement()
    } 

    /**
     * getNewBlockHtmlAt
     * Metodo responsavel por retornar novo objeto html que sera utilizado na animacao numa posicao de memoria especifica
     * @param {memLocation} numero de id da localizacao da memoria
     * @returns retorna objeto html(Block) para ser animado  
     */
    getNewBlockHtmlAt(memLocation: number): HTMLElement{
        let newBlock = new DataBlock()
        
        //adicionando elemento no DOM dinamicamente        
        newBlock.setColor(this.getBlocks()[memLocation].getColor())
        $(this.element).prepend(newBlock.getElement())        
        $(newBlock.getElement()).offset($(this.getBlocks()[memLocation].getElement()).offset())        
        $(newBlock.getElement()).css("position", "absolute")
        
        //$(newBlock.getElement()).css("z-index", 100)
        
        return newBlock.getElement()
    }

    getElement(): HTMLElement{
        return this.element
    }

    getBlocks(): DataBlock[]{
        return this.blocks
    }
}