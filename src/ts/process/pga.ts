import { Tooltip } from '../utils/tooltip'

export class Pga{

    constructor(){
       this.setToolTip()        
    }

    setToolTip(): void{
         // criando tooltip para a PGA
        let tooltip = new Tooltip("#pga", "Program Global Area (PGA)", 
        `
        <p align="justify">

        A PGA é uma região de memória que contém os dados e informações de controle para um Server Process.
        <br><br>
        É uma área de  memória não compartilhada criada pelo Oracle quando um Server Process é iniciado.
        <br><br>
        O acesso a PGA é exclusivo para do seu Server Process. Para cada Server Process existe uma PGA.

         `
        )
    }
}
