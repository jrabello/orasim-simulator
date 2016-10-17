/**
 * Arrow
 * Classe responsavel por implementar animações relacionadas às setas
 * @attribute {animContainer} animation container(elemento ja existente usado como offset para animacao) 
 * @attribute {horizontalSize} tamanho da arrow no eixo x
 * @attribute {verticalSize} tamanho da arrow no eixo y
 * @attribute {vertical} posicao analoga ao eixo y(posicao inicial)
 * @attribute {horizontal} posicao analoga ao eixo x(posicao inicial)
 * @attribute {duration} duracao da animacao  
 */
export class Arrow {
    private animContainer: HTMLElement
    private horizontalSize: number
    private verticalSize: number
    private vertical: number
    private horizontal: number
    private duration: number

    /**
     * constructor
     * Construindo objeto Arrow e inicializando os atributos do elemento 
     * @param {vertical} posicao analoga ao eixo y(posicao inicial)
     * @param {horizontal} posicao analoga ao eixo x(posicao inicial)
     * @param {horizontalSize} tamanho da arrow no eixo x
     * @param {verticalSize} tamanho da arrow no eixo y
     * @param {duration} duracao da animacao  
     */
    constructor(vertical: number, horizontal: number, horizontalSize: number, verticalSize: number, duration: number) {
        this.animContainer = $("#animation-container")[0]
        this.horizontalSize = horizontalSize
        this.verticalSize = verticalSize
        this.vertical = vertical
        this.horizontal = horizontal
        this.duration = duration
    }

    /**
     * moveToRight
     * Metodo responsavel por mover a arrow para a direita, baseado nos atributos inicializados
     * @param {callback} funcao chamada no termino da animacao
     */
    moveToRight(callback: Function): void {
        // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
        let $arrow = $("<div class='right-arrow'>").css({
            "left": this.horizontal + "px",
            "top": this.vertical + "px"
        });

        // Executar aniacao
        this.moveToOneDirectionHorizontal($arrow, callback);
    }

    /**
     * moveToLeft
     * Metodo responsavel por mover a arrow para a esquerda, baseado nos atributos inicializados
     * @param {callback} funcao chamada no termino da animacao
     */
    moveToLeft(callback: Function): void {
        // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
        let $arrow = $("<div class='left-arrow'>").css({
            "right": this.horizontal + "px",
            "top": this.vertical + "px"
        });

        // Executar aniacao
        this.moveToOneDirectionHorizontal($arrow, callback);
    }

    /**
     * moveToUp
     * Metodo responsavel por mover a arrow para cima, baseado nos atributos inicializados
     * @param {callback} funcao chamada no termino da animacao
     */
    moveToUp(callback: Function): void {
        // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
        let $arrow = $("<div class='up-arrow'>").css({
            "left": this.horizontal + "px",
            "bottom": this.vertical + "px"
        });

        // Executar aniacao
        this.moveToOneDirectionVertical($arrow, callback);
    }

    /**
     * moveToDown
     * Metodo responsavel por mover a arrow para baixo, baseado nos atributos inicializados
     * @param {callback} funcao chamada no termino da animacao
     */
    moveToDown(callback: Function): void {
        // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
        let $arrow = $("<div class='down-arrow'>").css({
            "left": this.horizontal + "px",
            "top": this.vertical + "px"
        });

        // Executar aniacao
        this.moveToOneDirectionVertical($arrow, callback);
    }

    /**
     * moveToUpLeft
     * Metodo responsavel por mover a arrow para cima primeiro, seguido pela movimentacao a esquerda, baseado nos atributos inicializados
     * @param {callback} funcao chamada no termino da animacao
     */
    moveToUpLeft(callback: Function): void {
        // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
        let $arrow = $("<div class='up-left-arrow'>").css({
            "right": this.horizontal + "px",
            "bottom": this.vertical + "px"
        });

        // Executar aniacao
        this.moveToTwoDirectionsVerticalFirst($arrow, callback);
    }

    /**
     * moveToUpRight
     * Metodo responsavel por mover a arrow para cima primeiro, seguido pela movimentacao a direita, baseado nos atributos inicializados
     * @param {callback} funcao chamada no termino da animacao
     */
    moveToUpRight(callback: Function): void {
        // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
        let $arrow = $("<div class='up-right-arrow'>").css({
            "left": this.horizontal + "px",
            "bottom": this.vertical + "px"
        });

        // Executar aniacao
        this.moveToTwoDirectionsVerticalFirst($arrow, callback);
    }

    /**
     * moveToDownLeft
     * Metodo responsavel por mover a arrow para baixo primeiro, seguido pela movimentacao a esquerda, baseado nos atributos inicializados
     * @param {callback} funcao chamada no termino da animacao
     */
    moveToDownLeft(callback: Function): void {
        // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
        let $arrow = $("<div class='down-left-arrow'>").css({
            "right": this.horizontal + "px",
            "top": this.vertical + "px"
        });

        // Executar aniacao
        this.moveToTwoDirectionsVerticalFirst($arrow, callback);
    }

    /**
     * moveToDownRight
     * Metodo responsavel por mover a arrow para baixo primeiro, seguido pela movimentacao a direita, baseado nos atributos inicializados
     * @param {callback} funcao chamada no termino da animacao
     */
    moveToDownRight(callback: Function): void {
        // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
        let $arrow = $("<div class='down-right-arrow'>").css({
            "left": this.horizontal + "px",
            "top": this.vertical + "px"
        });

        // Executar aniacao
        this.moveToTwoDirectionsVerticalFirst($arrow, callback);
    }

    /**
     * moveToLeftUp
     * Metodo responsavel por mover a arrow a esquerda primeiro, seguido pela movimentacao para cima, baseado nos atributos inicializados
     * @param {callback} funcao chamada no termino da animacao
     */
    moveToLeftUp(callback: Function): void {
        // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
        let $arrow = $("<div class='left-up-arrow'>").css({
            "right": this.horizontal + "px",
            "bottom": this.vertical + "px"
        });

        // Executar aniacao
        this.moveToTwoDirectionsHorizontalFirst($arrow, callback);
    }

    /**
     * moveToLeftDown
     * Metodo responsavel por mover a arrow a esquerda primeiro, seguido pela movimentacao para baixo, baseado nos atributos inicializados
     * @param {callback} funcao chamada no termino da animacao
     */
    moveToLeftDown(callback: Function): void {
        // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
        let $arrow = $("<div class='left-down-arrow'>").css({
            "right": this.horizontal + "px",
            "top": this.vertical + "px"
        });

        // Executar aniacao
        this.moveToTwoDirectionsHorizontalFirst($arrow, callback);
    }

    /**
     * moveToRightUp
     * Metodo responsavel por mover a arrow a direita primeiro, seguido pela movimentacao para cima, baseado nos atributos inicializados
     * @param {callback} funcao chamada no termino da animacao
     */
    moveToRightUp(callback: Function): void {
        // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
        let $arrow = $("<div class='right-up-arrow'>").css({
            "left": this.horizontal + "px",
            "bottom": this.vertical + "px"
        });

        // Executar aniacao
        this.moveToTwoDirectionsHorizontalFirst($arrow, callback);
    }

    /**
     * moveToRightDown
     * Metodo responsavel por mover a arrow a direita primeiro, seguido pela movimentacao para baixo, baseado nos atributos inicializados
     * @param {callback} funcao chamada no termino da animacao
     */
    moveToRightDown(callback: Function): void {
        // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
        let $arrow = $("<div class='right-down-arrow'>").css({
            "left": this.horizontal + "px",
            "top": this.vertical + "px"
        });

        // Executar aniacao
        this.moveToTwoDirectionsHorizontalFirst($arrow, callback);
    }

    /**
     * moveToOneDirectionHorizontal
     * Metodo responsavel por mover a arrow no eixo x (horizontal), baseado nos atributos inicializados
     * @param {callback} funcao chamada no termino da animacao
     * @param {$arrow} objeto JQuery que representa uma seta no DOM
     */
    private moveToOneDirectionHorizontal($arrow: JQuery, callback: Function) {
        // Adicionando seta em seu elemento pai
        $(this.animContainer).append($arrow);

        // Divide o tempo total da animação para cada parte
        var eachTimePart = this.duration / 2;

        // Iniciando animação da seta
        $arrow.animate({
            width: this.horizontalSize + 'px'
        }, {
            duration: eachTimePart,

            // Iniciando segunda parte da animação da seta
            complete: () => {
                $arrow.addClass("end")

                // Removendo seta do DOM
                $arrow.animate({
                    opacity: 0
                }, {
                    duration: eachTimePart
                });
                setTimeout(() => {
                    $arrow.remove()
                    callback()
                }, eachTimePart);
            }
        });
    }

    /**
     * moveToOneDirectionVertical
     * Metodo responsavel por mover a arrow no eixo y (vertical), baseado nos atributos inicializados
     * @param {callback} funcao chamada no termino da animacao
     * @param {$arrow} objeto JQuery que representa uma seta no DOM
     */
    private moveToOneDirectionVertical($arrow: JQuery, callback: Function) {
        // Adicionando seta em seu elemento pai
        $(this.animContainer).append($arrow);

        // Divide o tempo total da animação para cada parte
        var eachTimePart = this.duration / 2;

        // Iniciando animação da seta
        $arrow.animate({
            height: this.verticalSize + 'px'
        }, {
            duration: eachTimePart,

            // Iniciando segunda parte da animação da seta
            complete: () => {
                $arrow.addClass("end")

                // Removendo seta do DOM
                $arrow.animate({
                    opacity: 0
                }, {
                    duration: eachTimePart
                });
                setTimeout(() => {
                    $arrow.remove()
                    callback()
                }, eachTimePart);
            }
        });
    }

    /**
     * moveToTwoDirectionsVerticalFirst
     * Metodo responsavel por mover a arrow no eixo y (vertical) primeiro, seguido pela movimentacao no eixo x (horizontal), baseado nos atributos inicializados
     * @param {callback} funcao chamada no termino da animacao
     * @param {$arrow} objeto JQuery que representa uma seta no DOM
     */
    private moveToTwoDirectionsVerticalFirst($arrow: JQuery, callback: Function) {
        // Adicionando seta em seu elemento pai
        $(this.animContainer).append($arrow);

        // Divide o tempo total da animação para cada parte
        var eachTimePart = this.duration / 3;

        // Iniciando animação da seta
        $arrow.animate({
            height: this.verticalSize + 'px'
        }, {
            duration: eachTimePart,
            // Iniciando segunda parte da animação da seta
            complete: () => {
                $arrow.animate({
                    width: this.horizontalSize + 'px'
                }, {
                    duration: eachTimePart,
                    complete: () => {
                        $arrow.addClass("end");

                        // Removendo seta do DOM
                        $arrow.animate({
                            opacity: 0
                        }, {
                            duration: eachTimePart
                        });
                        setTimeout(() => {
                                $arrow.remove()
                                callback()
                            },
                            eachTimePart);
                    }
                });
            }
        });
    }

    /**
     * moveToTwoDirectionsHorizontalFirst
     * Metodo responsavel por mover a arrow no eixo x (horizontal) primeiro, seguido pela movimentacao no eixo y (vertical), baseado nos atributos inicializados
     * @param {callback} funcao chamada no termino da animacao
     * @param {$arrow} objeto JQuery que representa uma seta no DOM
     */
    private moveToTwoDirectionsHorizontalFirst($arrow: JQuery, callback: Function) {
        // Adicionando seta em seu elemento pai
        $(this.animContainer).append($arrow);

        // Divide o tempo total da animação para cada parte
        var eachTimePart = this.duration / 3;

        // Iniciando animação da seta
        $arrow.animate({
            width: this.horizontalSize + 'px'
        }, {
            duration: eachTimePart,
            // Iniciando segunda parte da animação da seta
            complete: () => {
                $arrow.animate({
                    height: this.verticalSize + 'px'
                }, {
                    duration: eachTimePart,
                    complete: () => {
                        $arrow.addClass("end");

                        // Removendo seta do DOM
                        $arrow.animate({
                            opacity: 0
                        }, {
                            duration: eachTimePart
                        });
                        setTimeout(() => {
                                $arrow.remove()
                                callback()
                            },
                            eachTimePart);
                    }
                });
            }
        });
    }
}