import { Tooltip } from '../utils/tooltip'


/**
 * Redo Log Buffer
 * Classe responsavel por modelar o objeto RedoLogBuffer do oracle instance
 * @attribute
 * @attribute
 */
export class RedoLogBuffer{
    private element: HTMLElement

    constructor(){

        // criando tooltip para o RedoLogBuffer
         let tooltip = new Tooltip("#redo-log-buffer", "Redo Log Buffer", 
        `
        <p align="justify">

        O Redo Log Buffer é um buffer circular da SGA que contém informações sobre as alterações feitas no banco de dados.
        <br><br>
        As informações de Redo contêm dados necessárias para reconstruir ou refazer, as alterações feitas no banco de dados, como: INSERT, UPDATE, DELETE, CREATE, ALTER ou DROP.
        Estas informações são usadas para recuperação do banco de dados, se necessário.
        <br><br>
        As entradas de redo ocupam espaço contínuo, sequencial no buffer. O processo background <span style='font-weight: bold'>Log Writer (LGWR)</span> grava as informações do Redo Log Buffer para o Redo Log File em disco.
         `
         )
    }
}