var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
System.register("sql-console/sql.console.message", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SqlConsoleMessage;
    return {
        setters: [],
        execute: function () {
            /**
             * SqlConsoleMessage
             * Classe Base, responsavel por modelar as mensagens que serão inseridas no console da aplicação
             */
            SqlConsoleMessage = (function () {
                function SqlConsoleMessage(type, msg) {
                    this.buildHtmlElement(type, msg);
                }
                /**
                 * buildHtmlElement
                 * Metodo responsavel por criar elemento html que sera inserido no console
                 * @param   type    tipo da mensagem(info ou error)
                 * @param   msg     mensagem que sera impressa no console
                 */
                SqlConsoleMessage.prototype.buildHtmlElement = function (type, msg) {
                    this.msgElement = $("<li class=\"console-li-" + type + "\">" + msg + "</li>")[0];
                };
                SqlConsoleMessage.prototype.getMsg = function () {
                    return this.msgElement;
                };
                return SqlConsoleMessage;
            }());
            exports_1("SqlConsoleMessage", SqlConsoleMessage);
        }
    };
});
System.register("sql-console/sql.console.msg.info", ["sql-console/sql.console.message"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var sql_console_message_1, SqlConsoleMsgInfo;
    return {
        setters: [
            function (sql_console_message_1_1) {
                sql_console_message_1 = sql_console_message_1_1;
            }
        ],
        execute: function () {
            /**
             * SqlConsoleMsgInfo
             * Classe responsavel por especializar mensagens de informacao da aplicacao
             */
            SqlConsoleMsgInfo = (function (_super) {
                __extends(SqlConsoleMsgInfo, _super);
                function SqlConsoleMsgInfo(msg) {
                    return _super.call(this, 'info', msg) || this;
                }
                return SqlConsoleMsgInfo;
            }(sql_console_message_1.SqlConsoleMessage));
            exports_2("SqlConsoleMsgInfo", SqlConsoleMsgInfo);
        }
    };
});
System.register("animation/animation.null", ["animation/animation"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var animation_1, AnimationNull;
    return {
        setters: [
            function (animation_1_1) {
                animation_1 = animation_1_1;
            }
        ],
        execute: function () {
            /**
             * AnimationNull
             * Classe filha, responsavel por implementar especializacao de uma animacao vazia(seguindo null object pattern)
             */
            AnimationNull = (function (_super) {
                __extends(AnimationNull, _super);
                function AnimationNull() {
                    return _super.call(this) || this;
                }
                return AnimationNull;
            }(animation_1.Animation));
            exports_3("AnimationNull", AnimationNull);
        }
    };
});
System.register("crypt/hash", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var Hash;
    return {
        setters: [],
        execute: function () {
            /**
             * Hash
             * Class Base, responsavel por armazenar e definir metodos relacionados a geracao de hashs
             * @attribute {hash} hash armazenado na forma de um numero
             */
            Hash = (function () {
                function Hash() {
                    this.color = "#ffffff";
                }
                /**
                 * getColor
                 * @returns retorna cor do hash
                 */
                Hash.prototype.getColor = function () {
                    return this.color;
                };
                Hash.prototype.setColor = function (color) {
                    this.color = color;
                };
                /**
                 * getHexStrHash
                 * @returns retorna representacao em hexadecimal do hash
                 */
                Hash.prototype.getHashStr = function () {
                    return this.hashStr;
                };
                Hash.prototype.setHashStr = function (hash) {
                    this.hashStr = hash;
                };
                // getHashStr(): string{
                //     return this.hashStr
                // }
                Hash.prototype.setHash = function (hash) {
                    this.hash = hash;
                    var formattedHash = hash;
                    //cortando alguns niveis de verde com bit shifting :p
                    formattedHash &= ~(0x01 << 15) >>> 0;
                    formattedHash &= ~(0x01 << 14) >>> 0;
                    formattedHash &= ~(0x01 << 13) >>> 0;
                    formattedHash &= ~(0x01 << 12) >>> 0;
                    var hashWithLessGreen = ("000000" + formattedHash.toString(16)).substr(-6);
                    console.log('hashWithLessGreen', hashWithLessGreen);
                    this.color = '#' + hashWithLessGreen;
                    console.log(this.color);
                };
                Hash.prototype.getHash = function () {
                    return this.hash;
                };
                return Hash;
            }());
            exports_4("Hash", Hash);
        }
    };
});
System.register("utils/tooltip", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Tooltip;
    return {
        setters: [],
        execute: function () {
            Tooltip = (function () {
                /**
                 * constructor
                 * Metodo responsavel por incluir a tooltip nos elementos
                 * @param {idElement} id seletor do elemento html que recebera a tooltip
                 * @param {title} titulo da janela
                 * @param {text} texto dentro da janela
                 */
                function Tooltip(idElement, title, text) {
                    this.genToolTip(idElement, title, text);
                }
                Tooltip.prototype.genToolTip = function (idElement, title, text) {
                    // criando tooltip para elemento
                    $(idElement).qtip({
                        suppress: false,
                        content: {
                            title: {
                                text: title,
                                button: true
                            },
                            text: text + '<br><br>'
                        },
                        show: { event: 'click' },
                        style: { classes: 'qtip-light' },
                        hide: { event: 'click' },
                        position: {
                            target: 'mouse',
                            adjust: { mouse: false }
                        }
                    });
                };
                return Tooltip;
            }());
            exports_5("Tooltip", Tooltip);
        }
    };
});
System.register("oracle-database/block", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var Block;
    return {
        setters: [],
        execute: function () {
            Block = (function () {
                function Block(element, size, isUsed, color) {
                    this.element = element;
                    this.size = size;
                    this.isUsed = isUsed;
                    this.color = color;
                }
                /**
                 * setUsed
                 * Metodo responsavel pela animacao de marcar o bloco como usado no db-buffer-cache
                 * @param {flag} setando isUsed como usada ou livre
                 */
                Block.prototype.setUsed = function (flag) {
                    this.isUsed = flag;
                    //$(this.element).css("background-color","#f00")
                    //this.setColor(color)
                };
                Block.prototype.used = function () {
                    return this.isUsed;
                };
                /**
                 * setColor
                 * Metodo responsavel ppor setar cor do block
                 * @param {color} cor no seguinte formato #ffffff
                 */
                Block.prototype.setColor = function (color) {
                    this.color = color;
                    $(this.element).css("background-color", this.color);
                };
                Block.prototype.getColor = function () {
                    return this.color;
                };
                Block.prototype.getElement = function () {
                    return this.element;
                };
                return Block;
            }());
            exports_6("Block", Block);
        }
    };
});
System.register("oracle-database/data.block", ["oracle-database/block"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var block_1, DataBlock;
    return {
        setters: [
            function (block_1_1) {
                block_1 = block_1_1;
            }
        ],
        execute: function () {
            /**
             * DataBlock
             * Classe Responsavel modelar um bloco (data block)
             */
            DataBlock = (function (_super) {
                __extends(DataBlock, _super);
                function DataBlock() {
                    return _super.call(this, $("<div class=\"cache-box\"></div>")[0], 4096, false, "#ffffff") || this;
                    // super.element =         
                    // this.size = 4096
                    // this.isUsed = false
                    // this.color = "#ffffff"
                }
                return DataBlock;
            }(block_1.Block));
            exports_7("DataBlock", DataBlock);
        }
    };
});
System.register("oracle-database/data.files", ["oracle-database/data.block"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var data_block_1, DataFiles;
    return {
        setters: [
            function (data_block_1_1) {
                data_block_1 = data_block_1_1;
            }
        ],
        execute: function () {
            /**
             * DataFiles
             * Classe responsavel por modelar o objeto Data-Files do oracle database
             * @attribute {blocks} array de objetos que guarda os blocos do data-files
             * @attribute {element} objeto html que referencia o elemento data-files
             */
            DataFiles = (function () {
                function DataFiles() {
                    this.blocks = new Array();
                    this.element = $("#data-files")[0];
                }
                DataFiles.prototype.createNewBlock = function () {
                    var newBlock = new data_block_1.DataBlock();
                    //criando block dentro do data-files        
                    $(this.element).prepend(newBlock.getElement());
                    $(newBlock.getElement()).offset($(this.element).offset());
                    $(newBlock.getElement()).css("position", "absolute");
                    return newBlock;
                };
                /**
                 * getNewBlockHtml
                 * Metodo responsavel por retornar novo objeto html que sera utilizado para animacao
                 * @returns retorna objeto html(Block) para ser animado
                 */
                DataFiles.prototype.getNewBlockHtml = function () {
                    return this.createNewBlock().getElement();
                };
                DataFiles.prototype.getNewBlockHtmlWithColor = function (color) {
                    var newBlock = this.createNewBlock();
                    newBlock.setColor(color);
                    return newBlock.getElement();
                };
                return DataFiles;
            }());
            exports_8("DataFiles", DataFiles);
        }
    };
});
System.register("oracle-instance/db.buffer.cache", ["utils/tooltip", "oracle-database/data.block"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var tooltip_1, data_block_2, DbBufferCache;
    return {
        setters: [
            function (tooltip_1_1) {
                tooltip_1 = tooltip_1_1;
            },
            function (data_block_2_1) {
                data_block_2 = data_block_2_1;
            }
        ],
        execute: function () {
            /**
             * DbBufferCache
             * Classe responsavel por modelar o objeto DbBufferCache do oracle instance
             * @attribute {numBlocks} numero de blocks default que irao preencher o DbBufferCache
             * @attribute {element} objeto html que referencia o elemento db-buffer-cache
             * @attribute {blocks} array de objetos que guarda os blocos do data-files
             */
            DbBufferCache = (function () {
                function DbBufferCache() {
                    this.numBlocks = 24;
                    this.element = $('#db-buffer-cache')[0];
                    this.blocks = new Array();
                    this.initBlocks();
                    // criando tooltip para o DbBufferCache
                    var tooltip = new tooltip_1.Tooltip("#db-buffer-cache", "DB Buffer Cache", "\n        <p align=\"justify\">\n        O DB Buffer Cache ou apenas Buffer Cache, \u00E9 a \u00E1rea de mem\u00F3ria que armazena as c\u00F3pias dos blocos de dados lidos a partir dos datafiles. \n        <br><br>\n        Um buffer \u00E9 um endere\u00E7o de mem\u00F3ria principal em que o gerenciador de buffer armazena temporariamente um bloco de dados usado no momento ou recentemente. \n        <br><br>\n        Todos os usu\u00E1rios conectados simultaneamente na inst\u00E2ncia do banco de dados compartilham os acessos ao Buffer Cache.\n        <br><br><br>\n        \n        O Oracle usa o buffer cache para atingir os seguintes objectivos:\n        <br><br>\n        <span style='font-weight: bold'>\n        # Otimiza\u00E7\u00E3o do I/O f\u00EDsico \n        </span><br><br>\n        \n        O banco de dados atualiza os blocos de dados no cache e armazena os metadados refer\u00EAnte a essas mudan\u00E7as no Redo Log Buffer.\n        Depois de um COMMIT, o Oracle grava os redo buffers no disco, mas n\u00E3o escreve imediatamente os blocos de dados no disco. \n        Quem faz essa escrita \u00E9 o Database Writer (DBWn) com algumas condi\u00E7\u00F5es.\n \n        <br><br>\n        <span style='font-weight: bold'>\n        # Manter blocos frequentemente acessados no buffer cache e escrever blocos pouco acessados no disco.\n        </span><br><br>\n\n        <span style='font-weight: bold'>\n        # Estados do buffer\n        </span><br><br>\n\n        O Oracle usa algoritmos internos para gerenciar buffers no cache. \n        Um buffer pode estar qualquer um dos seguintes estados que se excluem mutuamente:\n        <br><br>\n        \n        - Unused (N\u00E3o usado)\n        <br>\n        O buffer est\u00E1 dispon\u00EDvel para uso, porque ele nunca foi usado ou est\u00E1 atualmente sem uso. \n        <br>\n        Este tipo de buffer \u00E9 o mais f\u00E1cil para o banco de dados para usar.\n        <br><br>\n        \n        - Clean (Limpo)\n        <br>\n        Este buffer foi utilizado anteriormente e agora cont\u00E9m uma vers\u00E3o de leitura consistente de um bloco a partir de um ponto no tempo. \n        O bloco cont\u00E9m dados, mas est\u00E1 \"limpo\" e n\u00E3o precisa de checkpoint, ou seja, ser gravado em disco pelo Database Writer. \n        O Oracle pode selecionar este bloco e reutiliz\u00E1-lo.\n        <br><br>\n        \n        - Dirty (Sujo)\n        <br>\n        O buffer cont\u00EAm dados modificados que ainda n\u00E3o foram gravadas no disco. \n        O Oracle precisa fazer o checkpoint do bloco antes de reutiliz\u00E1-lo.\n         ");
                }
                /**
                 * initBlocks
                 * Metodo responsavel por adicionar dinamicamente os blocos dentro do db-buffer-cache
                 */
                DbBufferCache.prototype.initBlocks = function () {
                    for (var i = 0; i < this.numBlocks; i++) {
                        var block = new data_block_2.DataBlock();
                        this.blocks.push(block);
                        $('#db-buffer-cache-container').append(block.getElement());
                    }
                };
                /**
                 * setMemoryLocationUsed
                 * Metodo responsavel por marcar uma area de memoria como utilizada
                 * @param {memLocation} numero de id da localizacao da memoria
                 */
                DbBufferCache.prototype.setMemoryLocationUsed = function (memLocationArr) {
                    for (var _i = 0, memLocationArr_1 = memLocationArr; _i < memLocationArr_1.length; _i++) {
                        var memLocation = memLocationArr_1[_i];
                        this.blocks[memLocation].setUsed(true);
                    }
                };
                DbBufferCache.prototype.setMemoryLocationUsedWithHash = function (memLocationArr, hash) {
                    this.setMemoryLocationUsed(memLocationArr);
                    for (var _i = 0, memLocationArr_2 = memLocationArr; _i < memLocationArr_2.length; _i++) {
                        var memLocation = memLocationArr_2[_i];
                        this.blocks[memLocation].setColor(hash.getColor());
                    }
                };
                /**
                 * getNewBlockHtml
                 * Metodo responsavel por retornar novo objeto html que sera utilizado para animacao
                 * @returns retorna objeto html(Block) para ser animado
                 */
                DbBufferCache.prototype.getNewBlockHtml = function () {
                    var newBlock = new data_block_2.DataBlock();
                    //adicionando elemento no DOM dinamicamente        
                    $(this.element).prepend(newBlock.getElement());
                    $(newBlock.getElement()).offset($(this.element).offset());
                    $(newBlock.getElement()).css("position", "absolute");
                    //$(newBlock.getElement()).css("z-index", 100)
                    return newBlock.getElement();
                };
                /**
                 * getNewBlockHtmlAt
                 * Metodo responsavel por retornar novo objeto html que sera utilizado na animacao numa posicao de memoria especifica
                 * @param {memLocation} numero de id da localizacao da memoria
                 * @returns retorna objeto html(Block) para ser animado
                 */
                DbBufferCache.prototype.getNewBlockHtmlAt = function (memLocation) {
                    var newBlock = new data_block_2.DataBlock();
                    //adicionando elemento no DOM dinamicamente        
                    newBlock.setColor(this.getBlocks()[memLocation].getColor());
                    $(this.element).prepend(newBlock.getElement());
                    $(newBlock.getElement()).offset($(this.getBlocks()[memLocation].getElement()).offset());
                    $(newBlock.getElement()).css("position", "absolute");
                    //$(newBlock.getElement()).css("z-index", 100)
                    return newBlock.getElement();
                };
                DbBufferCache.prototype.getElement = function () {
                    return this.element;
                };
                DbBufferCache.prototype.getBlocks = function () {
                    return this.blocks;
                };
                /**
                 * getFreeBlocksMemLocation
                 * gets location array of free blocks
                 */
                DbBufferCache.prototype.getReleasedBlocksMemLocation = function () {
                    var blocks = new Array();
                    for (var i = 0; i < this.numBlocks; i++) {
                        if (!this.blocks[i].used())
                            blocks.push(i);
                    }
                    return blocks;
                };
                return DbBufferCache;
            }());
            exports_9("DbBufferCache", DbBufferCache);
        }
    };
});
System.register("oracle-database/data.block.redo", ["oracle-database/block"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var block_2, DataBlockRedo;
    return {
        setters: [
            function (block_2_1) {
                block_2 = block_2_1;
            }
        ],
        execute: function () {
            /**
             * DataBlockRedo
             * Classe Responsavel modelar um bloco (data block redo)
             */
            DataBlockRedo = (function (_super) {
                __extends(DataBlockRedo, _super);
                function DataBlockRedo() {
                    return _super.call(this, $("<div class=\"buffer-box\"></div>")[0], 4096, false, "#ffffff") || this;
                }
                return DataBlockRedo;
            }(block_2.Block));
            exports_10("DataBlockRedo", DataBlockRedo);
        }
    };
});
System.register("oracle-instance/redo.log.buffer", ["utils/tooltip", "oracle-database/data.block.redo", "oracle-database/data.block"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var tooltip_2, data_block_redo_1, data_block_3, RedoLogBuffer;
    return {
        setters: [
            function (tooltip_2_1) {
                tooltip_2 = tooltip_2_1;
            },
            function (data_block_redo_1_1) {
                data_block_redo_1 = data_block_redo_1_1;
            },
            function (data_block_3_1) {
                data_block_3 = data_block_3_1;
            }
        ],
        execute: function () {
            /**
             * Redo Log Buffer
             * Classe responsavel por modelar o objeto RedoLogBuffer do oracle instance
             * @attribute
             * @attribute
             */
            RedoLogBuffer = (function () {
                function RedoLogBuffer() {
                    this.size = 8;
                    this.dataBlockRedoList = new Array();
                    this.element = $("#redo-log-buffer")[0];
                    this.setToopTip();
                    this.initBlocks();
                }
                RedoLogBuffer.prototype.initBlocks = function () {
                    // let dataBlockRedoListInstance = this.dataBlockRedoList
                    // let size = 
                    for (var i = 0; i < this.size; i++) {
                        this.dataBlockRedoList.push(new data_block_redo_1.DataBlockRedo());
                        $("#redo-log-buffer").find('#cache-container').append(this.dataBlockRedoList[i].getElement());
                    }
                };
                RedoLogBuffer.prototype.getBlocks = function () {
                    return this.dataBlockRedoList;
                };
                RedoLogBuffer.prototype.createNewDataBlock = function () {
                    var newBlock = new data_block_3.DataBlock();
                    //criando block dentro do do elemento atual        
                    $(this.element).prepend(newBlock.getElement());
                    $(newBlock.getElement()).offset($(this.element).offset());
                    $(newBlock.getElement()).css("position", "absolute");
                    $(newBlock.getElement()).css("z-index", 100);
                    return newBlock;
                };
                RedoLogBuffer.prototype.setMemoryLocationUsed = function (hash) {
                    for (var _i = 0, _a = this.dataBlockRedoList; _i < _a.length; _i++) {
                        var block = _a[_i];
                        if (!block.used()) {
                            block.setUsed(true);
                            block.setColor(hash.getColor());
                            break;
                        }
                    }
                };
                RedoLogBuffer.prototype.setToopTip = function () {
                    // criando tooltip para o RedoLogBuffer
                    var tooltip = new tooltip_2.Tooltip("#redo-log-buffer", "Redo Log Buffer", "\n        <p align=\"justify\">\n\n        O Redo Log Buffer \u00E9 um buffer circular da SGA que cont\u00E9m informa\u00E7\u00F5es sobre as altera\u00E7\u00F5es feitas no banco de dados.\n        <br><br>\n        As informa\u00E7\u00F5es de Redo cont\u00EAm dados necess\u00E1rias para reconstruir ou refazer, as altera\u00E7\u00F5es feitas no banco de dados, como: INSERT, UPDATE, DELETE, CREATE, ALTER ou DROP.\n        Estas informa\u00E7\u00F5es s\u00E3o usadas para recupera\u00E7\u00E3o do banco de dados, se necess\u00E1rio.\n        <br><br>\n        As entradas de redo ocupam espa\u00E7o cont\u00EDnuo, sequencial no buffer. O processo background <span style='font-weight: bold'>Log Writer (LGWR)</span> grava as informa\u00E7\u00F5es do Redo Log Buffer para o Redo Log File em disco.\n         ");
                };
                return RedoLogBuffer;
            }());
            exports_11("RedoLogBuffer", RedoLogBuffer);
        }
    };
});
System.register("animation/arrow", [], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var Arrow;
    return {
        setters: [],
        execute: function () {
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
            Arrow = (function () {
                /**
                 * constructor
                 * Construindo objeto Arrow e inicializando os atributos do elemento
                 * @param {vertical} posicao analoga ao eixo y(posicao inicial)
                 * @param {horizontal} posicao analoga ao eixo x(posicao inicial)
                 * @param {horizontalSize} tamanho da arrow no eixo x
                 * @param {verticalSize} tamanho da arrow no eixo y
                 * @param {duration} duracao da animacao
                 */
                function Arrow(vertical, horizontal, horizontalSize, verticalSize, duration) {
                    this.animContainer = $("#animation-container")[0];
                    this.horizontalSize = horizontalSize;
                    this.verticalSize = verticalSize;
                    this.vertical = vertical;
                    this.horizontal = horizontal;
                    this.duration = duration;
                }
                /**
                 * moveToRight
                 * Metodo responsavel por mover a arrow para a direita, baseado nos atributos inicializados
                 * @param {callback} funcao chamada no termino da animacao
                 */
                Arrow.prototype.moveToRight = function (callback) {
                    // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
                    var $arrow = $("<div class='right-arrow'>").css({
                        "left": this.horizontal + "px",
                        "top": this.vertical + "px"
                    });
                    // Executar aniacao
                    this.moveToOneDirectionHorizontal($arrow, callback);
                };
                /**
                 * moveToLeft
                 * Metodo responsavel por mover a arrow para a esquerda, baseado nos atributos inicializados
                 * @param {callback} funcao chamada no termino da animacao
                 */
                Arrow.prototype.moveToLeft = function (callback) {
                    // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
                    var $arrow = $("<div class='left-arrow'>").css({
                        "right": this.horizontal + "px",
                        "top": this.vertical + "px"
                    });
                    // Executar aniacao
                    this.moveToOneDirectionHorizontal($arrow, callback);
                };
                /**
                 * moveToUp
                 * Metodo responsavel por mover a arrow para cima, baseado nos atributos inicializados
                 * @param {callback} funcao chamada no termino da animacao
                 */
                Arrow.prototype.moveToUp = function (callback) {
                    // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
                    var $arrow = $("<div class='up-arrow'>").css({
                        "left": this.horizontal + "px",
                        "bottom": this.vertical + "px"
                    });
                    // Executar aniacao
                    this.moveToOneDirectionVertical($arrow, callback);
                };
                /**
                 * moveToDown
                 * Metodo responsavel por mover a arrow para baixo, baseado nos atributos inicializados
                 * @param {callback} funcao chamada no termino da animacao
                 */
                Arrow.prototype.moveToDown = function (callback) {
                    // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
                    var $arrow = $("<div class='down-arrow'>").css({
                        "left": this.horizontal + "px",
                        "top": this.vertical + "px"
                    });
                    // Executar aniacao
                    this.moveToOneDirectionVertical($arrow, callback);
                };
                /**
                 * moveToUpLeft
                 * Metodo responsavel por mover a arrow para cima primeiro, seguido pela movimentacao a esquerda, baseado nos atributos inicializados
                 * @param {callback} funcao chamada no termino da animacao
                 */
                Arrow.prototype.moveToUpLeft = function (callback) {
                    // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
                    var $arrow = $("<div class='up-left-arrow'>").css({
                        "right": this.horizontal + "px",
                        "bottom": this.vertical + "px"
                    });
                    // Executar aniacao
                    this.moveToTwoDirectionsVerticalFirst($arrow, callback);
                };
                /**
                 * moveToUpRight
                 * Metodo responsavel por mover a arrow para cima primeiro, seguido pela movimentacao a direita, baseado nos atributos inicializados
                 * @param {callback} funcao chamada no termino da animacao
                 */
                Arrow.prototype.moveToUpRight = function (callback) {
                    // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
                    var $arrow = $("<div class='up-right-arrow'>").css({
                        "left": this.horizontal + "px",
                        "bottom": this.vertical + "px"
                    });
                    // Executar aniacao
                    this.moveToTwoDirectionsVerticalFirst($arrow, callback);
                };
                /**
                 * moveToDownLeft
                 * Metodo responsavel por mover a arrow para baixo primeiro, seguido pela movimentacao a esquerda, baseado nos atributos inicializados
                 * @param {callback} funcao chamada no termino da animacao
                 */
                Arrow.prototype.moveToDownLeft = function (callback) {
                    // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
                    var $arrow = $("<div class='down-left-arrow'>").css({
                        "right": this.horizontal + "px",
                        "top": this.vertical + "px"
                    });
                    // Executar aniacao
                    this.moveToTwoDirectionsVerticalFirst($arrow, callback);
                };
                /**
                 * moveToDownRight
                 * Metodo responsavel por mover a arrow para baixo primeiro, seguido pela movimentacao a direita, baseado nos atributos inicializados
                 * @param {callback} funcao chamada no termino da animacao
                 */
                Arrow.prototype.moveToDownRight = function (callback) {
                    // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
                    var $arrow = $("<div class='down-right-arrow'>").css({
                        "left": this.horizontal + "px",
                        "top": this.vertical + "px"
                    });
                    // Executar aniacao
                    this.moveToTwoDirectionsVerticalFirst($arrow, callback);
                };
                /**
                 * moveToLeftUp
                 * Metodo responsavel por mover a arrow a esquerda primeiro, seguido pela movimentacao para cima, baseado nos atributos inicializados
                 * @param {callback} funcao chamada no termino da animacao
                 */
                Arrow.prototype.moveToLeftUp = function (callback) {
                    // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
                    var $arrow = $("<div class='left-up-arrow'>").css({
                        "right": this.horizontal + "px",
                        "bottom": this.vertical + "px"
                    });
                    // Executar aniacao
                    this.moveToTwoDirectionsHorizontalFirst($arrow, callback);
                };
                /**
                 * moveToLeftDown
                 * Metodo responsavel por mover a arrow a esquerda primeiro, seguido pela movimentacao para baixo, baseado nos atributos inicializados
                 * @param {callback} funcao chamada no termino da animacao
                 */
                Arrow.prototype.moveToLeftDown = function (callback) {
                    // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
                    var $arrow = $("<div class='left-down-arrow'>").css({
                        "right": this.horizontal + "px",
                        "top": this.vertical + "px"
                    });
                    // Executar aniacao
                    this.moveToTwoDirectionsHorizontalFirst($arrow, callback);
                };
                /**
                 * moveToRightUp
                 * Metodo responsavel por mover a arrow a direita primeiro, seguido pela movimentacao para cima, baseado nos atributos inicializados
                 * @param {callback} funcao chamada no termino da animacao
                 */
                Arrow.prototype.moveToRightUp = function (callback) {
                    // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
                    var $arrow = $("<div class='right-up-arrow'>").css({
                        "left": this.horizontal + "px",
                        "bottom": this.vertical + "px"
                    });
                    // Executar aniacao
                    this.moveToTwoDirectionsHorizontalFirst($arrow, callback);
                };
                /**
                 * moveToRightDown
                 * Metodo responsavel por mover a arrow a direita primeiro, seguido pela movimentacao para baixo, baseado nos atributos inicializados
                 * @param {callback} funcao chamada no termino da animacao
                 */
                Arrow.prototype.moveToRightDown = function (callback) {
                    // Declarando a referencia de inicio da animacao da seta, posicao da seta no elemento pai. O elemento pai devera ter a propriedade 'position' declarada
                    var $arrow = $("<div class='right-down-arrow'>").css({
                        "left": this.horizontal + "px",
                        "top": this.vertical + "px"
                    });
                    // Executar aniacao
                    this.moveToTwoDirectionsHorizontalFirst($arrow, callback);
                };
                /**
                 * moveToOneDirectionHorizontal
                 * Metodo responsavel por mover a arrow no eixo x (horizontal), baseado nos atributos inicializados
                 * @param {callback} funcao chamada no termino da animacao
                 * @param {$arrow} objeto JQuery que representa uma seta no DOM
                 */
                Arrow.prototype.moveToOneDirectionHorizontal = function ($arrow, callback) {
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
                        complete: function () {
                            $arrow.addClass("end");
                            // Removendo seta do DOM
                            $arrow.animate({
                                opacity: 0
                            }, {
                                duration: eachTimePart
                            });
                            setTimeout(function () {
                                $arrow.remove();
                                callback();
                            }, eachTimePart);
                        }
                    });
                };
                /**
                 * moveToOneDirectionVertical
                 * Metodo responsavel por mover a arrow no eixo y (vertical), baseado nos atributos inicializados
                 * @param {callback} funcao chamada no termino da animacao
                 * @param {$arrow} objeto JQuery que representa uma seta no DOM
                 */
                Arrow.prototype.moveToOneDirectionVertical = function ($arrow, callback) {
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
                        complete: function () {
                            $arrow.addClass("end");
                            // Removendo seta do DOM
                            $arrow.animate({
                                opacity: 0
                            }, {
                                duration: eachTimePart
                            });
                            setTimeout(function () {
                                $arrow.remove();
                                callback();
                            }, eachTimePart);
                        }
                    });
                };
                /**
                 * moveToTwoDirectionsVerticalFirst
                 * Metodo responsavel por mover a arrow no eixo y (vertical) primeiro, seguido pela movimentacao no eixo x (horizontal), baseado nos atributos inicializados
                 * @param {callback} funcao chamada no termino da animacao
                 * @param {$arrow} objeto JQuery que representa uma seta no DOM
                 */
                Arrow.prototype.moveToTwoDirectionsVerticalFirst = function ($arrow, callback) {
                    var _this = this;
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
                        complete: function () {
                            $arrow.animate({
                                width: _this.horizontalSize + 'px'
                            }, {
                                duration: eachTimePart,
                                complete: function () {
                                    $arrow.addClass("end");
                                    // Removendo seta do DOM
                                    $arrow.animate({
                                        opacity: 0
                                    }, {
                                        duration: eachTimePart
                                    });
                                    setTimeout(function () {
                                        $arrow.remove();
                                        callback();
                                    }, eachTimePart);
                                }
                            });
                        }
                    });
                };
                /**
                 * moveToTwoDirectionsHorizontalFirst
                 * Metodo responsavel por mover a arrow no eixo x (horizontal) primeiro, seguido pela movimentacao no eixo y (vertical), baseado nos atributos inicializados
                 * @param {callback} funcao chamada no termino da animacao
                 * @param {$arrow} objeto JQuery que representa uma seta no DOM
                 */
                Arrow.prototype.moveToTwoDirectionsHorizontalFirst = function ($arrow, callback) {
                    var _this = this;
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
                        complete: function () {
                            $arrow.animate({
                                height: _this.verticalSize + 'px'
                            }, {
                                duration: eachTimePart,
                                complete: function () {
                                    $arrow.addClass("end");
                                    // Removendo seta do DOM
                                    $arrow.animate({
                                        opacity: 0
                                    }, {
                                        duration: eachTimePart
                                    });
                                    setTimeout(function () {
                                        $arrow.remove();
                                        callback();
                                    }, eachTimePart);
                                }
                            });
                        }
                    });
                };
                return Arrow;
            }());
            exports_12("Arrow", Arrow);
        }
    };
});
System.register("process/user.process", ["utils/tooltip", "animation/arrow", "sql-console/sql.console.msg.info"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var tooltip_3, arrow_1, sql_console_msg_info_1, UserProcess;
    return {
        setters: [
            function (tooltip_3_1) {
                tooltip_3 = tooltip_3_1;
            },
            function (arrow_1_1) {
                arrow_1 = arrow_1_1;
            },
            function (sql_console_msg_info_1_1) {
                sql_console_msg_info_1 = sql_console_msg_info_1_1;
            }
        ],
        execute: function () {
            /**
             * UserProcess
             * Classe responsavel por modelar o objeto UserProcess da animacao
             * @attribute {element} objeto html que referencia o elemento user-process
             */
            UserProcess = (function () {
                function UserProcess() {
                    this.element = $("#user-process")[0];
                    // criando tooltip para o UserProcess
                    var tooltip = new tooltip_3.Tooltip("#user-process", "User Process", "\n        <p align=\"justify\">\n\n        Quando um usu\u00E1rio executa uma aplica\u00E7\u00E3o, como por exemplo o SQL*Plus, o sistema operacional cria um processo cliente (User Process) para executar a aplica\u00E7\u00E3o do usu\u00E1rio.\n        <br><br>\n        <span style='font-weight: bold'>\n        User Process e Server Process\n        </span>\n        <br><br>\n        Os User Process diferem em aspectos importantes dos Server Process que interagem diretamente com a inst\u00E2ncia.\n        <br><br>\n        Os Server Process trabalham para o User Process realizando leitura e escrita na SGA, ao passo que o User Process n\u00E3o pode fazer isso.\n        <br><br>\n        Um User Process pode ser executado em um host diferente do host em que o banco est\u00E1, enquanto que o Server Process n\u00E3o pode.\n        ");
                }
                UserProcess.prototype.getElement = function () {
                    return this.element;
                };
                /**
                 * createUserProcess
                 * Metodo responsavel por animar a criacao do user process
                 * @param {delay} duracao da animacao
                 * @returns uma promise retornada logo apos o tempo de animacao
                 */
                UserProcess.prototype.createUserProcess = function (delay) {
                    return new Promise(function (resolve, reject) {
                        Orasim.getSqlConsole().addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo('< UP > Criando <span style="font-weight: bold">UserProcess</span>'));
                        $("#user").fadeTo(delay * 0.4, 0.1, function () {
                            $("#user").fadeTo(delay * 0.4, 1, function () {
                                $("#user-process").removeClass("displayNone");
                            });
                        });
                        setTimeout(function () {
                            resolve(0);
                        }, delay);
                    });
                };
                /**
                 * animateSendDataToServerProcess
                 * Metodo responsavel por animar o envio de dados ao server-process
                 * @param {delay} duracao da animacao
                 * @param {nameComando} nome do comando que sera enviado para server process
                 * @returns uma promise retornada logo apos o tempo de animacao
                 */
                UserProcess.prototype.animateSendDataToServerProcess = function (delay, nameComando) {
                    return new Promise(function (resolve, reject) {
                        $("#user-process").fadeTo(delay * 0.25, 0.1, function () {
                            $("#user-process").fadeTo(delay * 0.25, 1, function () {
                                Orasim.getSqlConsole().addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo("< UP > Enviando comando <span style='font-weight: bold'>" + nameComando + "</span> para o <span style='font-weight: bold'>ServerProcess</span>"));
                                $("#connection-arrow").fadeTo(delay * 0.25, 0.1, function () {
                                    $("#connection-arrow").fadeTo(delay * 0.25, 1);
                                });
                            });
                        });
                        setTimeout(function () {
                            resolve(0);
                        }, delay);
                    });
                };
                /**
                 * animateSendDataToListener
                 * Metodo responsavel por animar o envio de dados ao listener
                 * @param {delay} duracao da animacao
                 * @returns uma promise retornada logo apos o tempo de animacao
                 */
                UserProcess.prototype.animateSendDataToListener = function (delay) {
                    return new Promise(function (resolve, reject) {
                        Orasim.getSqlConsole().addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo("< UP > Solicitando conexão com o <span style='font-weight: bold'>DB</span> através do <span style='font-weight: bold'>Listener</span>"));
                        $("#user-process").fadeTo(delay * 0.25, 0.1, function () {
                            $("#user-process").fadeTo(delay * 0.25, 1, function () {
                                new arrow_1.Arrow(355, 45, 20, 170, delay * 0.50).moveToUpRight(function () {
                                });
                            });
                        });
                        setTimeout(function () {
                            resolve(0);
                        }, delay);
                    });
                };
                return UserProcess;
            }());
            exports_13("UserProcess", UserProcess);
        }
    };
});
System.register("crypt/rand", [], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var Random;
    return {
        setters: [],
        execute: function () {
            Random = (function () {
                //inclusive random number
                function Random() {
                }
                /**
                 * getIntBetweenRange
                 * Inclusive range
                 */
                Random.prototype.getIntBetweenRange = function (min, max) {
                    return Math.floor(Math.random() * (max - min + 1) + min);
                };
                return Random;
            }());
            exports_14("Random", Random);
        }
    };
});
System.register("oracle-instance/shared.pool", ["typescript-stl", "crypt/rand", "utils/tooltip"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var std, rand_1, tooltip_4, SharedPool;
    return {
        setters: [
            function (std_1) {
                std = std_1;
            },
            function (rand_1_1) {
                rand_1 = rand_1_1;
            },
            function (tooltip_4_1) {
                tooltip_4 = tooltip_4_1;
            }
        ],
        execute: function () {
            /**
             * SharedPool
             * Classe responsavel por modelar o objeto SharedPool do oracle instance
             * @attribute {lastHashInserted} ultimo hash inserido na hash collection
             * @attribute {hashElement} objeto html que referencia o elemento hash
             * @attribute {element} objeto html que referencia o elemento shared-pool
             */
            SharedPool = (function () {
                //private hashElement: HTMLElement
                function SharedPool() {
                    this.hashCollection = [];
                    this.element = $("#shared-pool")[0];
                    this.sqlIdMap = new std.HashMap();
                    //this.hashElement = $(`<li class="sql-hash"></li>`)[0]        
                    // criando tooltip para o SharedPool
                    var tooltip = new tooltip_4.Tooltip("#shared-pool", "Shared Pool", "\n        <p align=\"justify\">\n        Shared Pool xxxx\n\n        xxxxxxxxxxxxxxxxxxxxxxx\n        xxxxxxxxxxxxxxxxxxxxxxxx\n        xxxxxxxxxxxxxxxxxxxxxxx\n        ");
                }
                /**
                 * animateAddHash
                 * Metodo responsavel por animar a inserção hash no hashContainer, dentro da shared-pool
                 */
                SharedPool.prototype.animateAddHash = function (hash) {
                    //criando elemento dinamicamente
                    //let lastAddedHash: Hash = this.hashCollection.slice(-1)[0]
                    //this.sqlIdList.get(hash.getHash())
                    var hashElement = $("<li class=\"sql-hash\"></li>")[0];
                    var idHashHtmlElement = hash.getHash().toString(16);
                    //hash ja foi adicionado na shared pool
                    if ($('#' + idHashHtmlElement + '-sharedPool').length)
                        return;
                    //adicionando elemento na DOM tree
                    //adicionando id no elemento
                    //adicionando cor no elemento(usei bit clear trick pra impedir um branco :p)
                    //adicionando representacao em string do hash
                    $("#hash-ul-container").append(hashElement);
                    $(hashElement).attr('id', idHashHtmlElement + '-sharedPool');
                    //hash.setColor('#' + hash.getHash())
                    $('#' + idHashHtmlElement + '-sharedPool').css('color', hash.getColor());
                    $('#' + idHashHtmlElement + '-sharedPool').append(hash.getHashStr());
                    //$(hashElement).append(lastAddedHash.getHashStr())[0].outerHTML)                
                };
                /**
                 * addHash
                 * Adiciona hash na shared-pool
                 * @param {hash} hash que sera adicionado na collection da shared-pool
                 */
                SharedPool.prototype.addHash = function (hash) {
                    //retornando se hash ja foi inserido
                    if (this.findHash(hash))
                        return;
                    var dbBufferCache = Orasim.getOracleInstance().getSga().getDbBufferCache();
                    var releasedBlocksIndexes = dbBufferCache.getReleasedBlocksMemLocation();
                    console.log('released blocks indexes:', releasedBlocksIndexes.length);
                    //retornando se nao existir mais blocks released
                    if (releasedBlocksIndexes.length < 3) {
                        console.log('SharedPool::addHash no freedBlocksIndexes found!');
                        return;
                    }
                    //selecionando numero randomico de blocos 3 ou 6 blocks
                    var randomNumBlocks = new rand_1.Random().getIntBetweenRange(0, 1) == 0 ? 3 : 6; //2, (releasedBlocksIndexes.length <= 4 ) ?  releasedBlocksIndexes.length : 4)
                    // construindo array com indexes preenchidos com blocos
                    var dirtyBLocks = [];
                    for (var i = 0; i < randomNumBlocks; i++) {
                        var randomIndex = new rand_1.Random().getIntBetweenRange(0, releasedBlocksIndexes.length - 1);
                        dirtyBLocks.push(releasedBlocksIndexes[randomIndex]);
                        releasedBlocksIndexes.splice(randomIndex, 1);
                    }
                    //linkando hash para array de blocks
                    this.sqlIdMap.insert(std.make_pair(hash.getHash(), dirtyBLocks));
                    dbBufferCache.setMemoryLocationUsed(dirtyBLocks);
                    console.log('dirtyBLocks: ', dirtyBLocks, 'length: ', dirtyBLocks.length);
                    //dbBufferCache.getBlocks()
                    //this.sqlIdList.insert_or_assign(hash.getHash(),)    
                };
                /**
                 * getMemoryLocation
                 * @param {hs} hash que sera usado para busca de local da memoria
                 * @returns local de memoria onde os dados estao armazenados
                 */
                SharedPool.prototype.getMemoryLocation = function (hs) {
                    if (this.sqlIdMap.has(hs.getHash()))
                        return this.sqlIdMap.get(hs.getHash());
                    return [];
                };
                /**
                 * findHash
                 * @param {hs} hash que sera usado na busca
                 * @returns se o hash passado como parametro foi encontrado ou nao
                 */
                SharedPool.prototype.findHash = function (hs) {
                    //searching for hash in collection
                    return this.sqlIdMap.has(hs.getHash());
                };
                return SharedPool;
            }());
            exports_15("SharedPool", SharedPool);
        }
    };
});
System.register("process/pga", ["utils/tooltip"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var tooltip_5, Pga;
    return {
        setters: [
            function (tooltip_5_1) {
                tooltip_5 = tooltip_5_1;
            }
        ],
        execute: function () {
            Pga = (function () {
                function Pga() {
                    this.setToolTip();
                }
                Pga.prototype.setToolTip = function () {
                    // criando tooltip para a PGA
                    var tooltip = new tooltip_5.Tooltip("#pga", "Program Global Area (PGA)", "\n        <p align=\"justify\">\n\n        A PGA \u00E9 uma regi\u00E3o de mem\u00F3ria que cont\u00E9m os dados e informa\u00E7\u00F5es de controle para um Server Process.\n        <br><br>\n        \u00C9 uma \u00E1rea de  mem\u00F3ria n\u00E3o compartilhada criada pelo Oracle quando um Server Process \u00E9 iniciado.\n        <br><br>\n        O acesso a PGA \u00E9 exclusivo para do seu Server Process. Para cada Server Process existe uma PGA.\n\n         ");
                };
                return Pga;
            }());
            exports_16("Pga", Pga);
        }
    };
});
System.register("process/server.process", ["utils/tooltip", "sql-console/sql.console.msg.info", "oracle-database/data.block", "process/pga"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var tooltip_6, sql_console_msg_info_2, data_block_4, pga_1, ServerProcess;
    return {
        setters: [
            function (tooltip_6_1) {
                tooltip_6 = tooltip_6_1;
            },
            function (sql_console_msg_info_2_1) {
                sql_console_msg_info_2 = sql_console_msg_info_2_1;
            },
            function (data_block_4_1) {
                data_block_4 = data_block_4_1;
            },
            function (pga_1_1) {
                pga_1 = pga_1_1;
            }
        ],
        execute: function () {
            /**
             * ServerProcess
             * Classe responsavel por modelar o objeto ServerProcess da animacao
             * @attribute {element} objeto html que referencia o elemento server-process
             */
            ServerProcess = (function () {
                function ServerProcess() {
                    this.pga = new pga_1.Pga();
                    this.element = $("#server-process")[0];
                    // criando tooltip para o ServerProcess
                    var tooltip = new tooltip_6.Tooltip("#server-process", "Server Process", "\n        <p align=\"justify\">\n\n        Oracle Database cria o Server Process para lidar com as solicita\u00E7\u00F5es dos User Process conectados \u00E0 inst\u00E2ncia. \n        O User Process sempre se comunica com um banco de dados atrav\u00E9s de um Server Process separado.\n        <br><br>\n        Os Server Process criados pela solicia\u00E7\u00E3o de uma aplica\u00E7\u00E3o de banco de dados pode executar uma ou mais das seguintes tarefas:\n        \n        <br><br>\n        - Analisar e executar instru\u00E7\u00F5es SQL emitidas atrav\u00E9s da aplica\u00E7\u00E3o, incluindo a cria\u00E7\u00E3o e execu\u00E7\u00E3o do plano de consulta.\n        \n        <br><br>\n        - Executa c\u00F3digo PL/SQL.\n        \n        <br><br>\n        - Realizar a leitura dos blocos de dados que est\u00E3o armazenados nos datafiles e carregar no Db Buffer Cache \n        (O processo background DBWn \u00E9 o respons\u00E1vel por gravar os blocos modificados de volta para o disco)\n        \n        <br><br>\n        - Retorna os resultados solicitados de uma forma que a aplica\u00E7\u00E3o pode processar as informa\u00E7\u00F5es.\n        \n        <span style='font-weight: bold'>\n        </span>\n         ");
                }
                ServerProcess.prototype.getElement = function () {
                    return this.element;
                };
                /**
                 * getElementOffset
                 * Metodo responsavel por retornar posicao relativa do elemento ao documento
                 * @returns coordenada jquery do elemento
                 */
                ServerProcess.prototype.getElementOffset = function () {
                    return $(this.element).offset();
                };
                ServerProcess.prototype.createNewBlock = function () {
                    var newBlock = new data_block_4.DataBlock();
                    //criando block dentro do do elemento atual        
                    $(this.element).prepend(newBlock.getElement());
                    $(newBlock.getElement()).offset($(this.element).offset());
                    $(newBlock.getElement()).css("position", "absolute");
                    $(newBlock.getElement()).css("z-index", 100);
                    return newBlock;
                };
                /**
                 * animateSendBlockTo
                 * metodo um pouco mais generico que permite o envio dos dados para elementos usando id
                 */
                ServerProcess.prototype.animateSendBlockTo = function (elementId, hash, delay) {
                    //criando novo block dentro do server process
                    var block = this.createNewBlock();
                    block.setColor(hash.getColor());
                    //movendo block para elemento
                    Orasim.getAnimation().moveTo(block.getElement(), $(elementId)[0], delay, 0, function () {
                    }, function () {
                        //remova no fim da animacao
                        $(block.getElement()).remove();
                        var sharedPool = Orasim.getOracleInstance().getSga().getSharedPool();
                        var dbBufferCache = Orasim.getOracleInstance().getSga().getDbBufferCache();
                        var redoLogBuffer = Orasim.getOracleInstance().getSga().getRedoLogBuffer();
                        var memLocationArr = sharedPool.getMemoryLocation(hash);
                        //verificando qual elemento foi passado como argumento
                        //setando local de memoria como dirty buffer
                        switch (elementId) {
                            case '#redo-log-buffer':
                                redoLogBuffer.setMemoryLocationUsed(hash);
                                break;
                            case '#db-buffer-cache':
                                dbBufferCache.setMemoryLocationUsedWithHash(memLocationArr, hash);
                                break;
                        }
                    });
                };
                /**
                 * animateGetBlockFromDataFiles
                 * Metodo responsavel por animar os blocks que o server-process pega do data-files
                 * @param {dataFiles} objeto html que representa o DataFiles
                 * @param {delay} tempo de animacao
                 * @returns retorna o novo bloco criado(htmlElement) dentro do datafiles
                 */
                ServerProcess.prototype.animateGetBlockFromDataFiles = function (dataFiles, hash, memLocationArr, delay) {
                    var blockHtmlArr = [];
                    var animCounter = 0;
                    for (var _i = 0, memLocationArr_3 = memLocationArr; _i < memLocationArr_3.length; _i++) {
                        var memLocation = memLocationArr_3[_i];
                        var blockHtml = dataFiles.getNewBlockHtmlWithColor(hash.getColor());
                        blockHtmlArr.push(blockHtml);
                        Orasim.getAnimation().moveTo(blockHtml, this.getElement(), delay, 0, function () {
                            if (animCounter++ == 0) {
                                $('#server-process').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1);
                                Orasim.getSqlConsole().addMsg(new sql_console_msg_info_2.SqlConsoleMsgInfo("< SP > Lendo blocos em disco e carregando no <span style='font-weight: bold'>DB_BufferCache</span>"));
                            }
                        }, function () { });
                    }
                    return blockHtmlArr;
                };
                /**
                 * animateStoreBlockInDbBufferCache
                 * Metodo responsavel por animar o bloco sendo salvo no db-buffer-cache
                 * @param {blockHtml} objeto html que representa o bloco animado
                 * @param {dbBufferCache} objeto html que representa o db-buffer-cache
                 * @param {memLocation} local de memoria de destino(onde o bloco sera salvo)
                 * @param {delay} tempo de animacao
                 */
                ServerProcess.prototype.animateStoreBlockInDbBufferCache = function (blockHtmlArr, dbBufferCache, hash, memLocationArr, delay) {
                    var i = 0;
                    var animCounterAftr = 0;
                    var animCounterBef = 0;
                    for (var _i = 0, blockHtmlArr_1 = blockHtmlArr; _i < blockHtmlArr_1.length; _i++) {
                        var blockHtml = blockHtmlArr_1[_i];
                        Orasim.getAnimation().moveTo(blockHtml, dbBufferCache.getBlocks()[memLocationArr[i]].getElement(), delay, delay / 6, function () {
                            // no inicio da animacao piscar server-process e db-buffer-cache
                            if (animCounterBef++ == 0) {
                                $('#server-process').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1);
                                $('#db-buffer-cache').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1);
                            }
                            //Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess gravando dados no DbBufferCache'))            
                        }, function () {
                            // depois da animacao completa marcando o bloco como utilizado
                            if (++animCounterAftr == blockHtmlArr.length)
                                dbBufferCache.setMemoryLocationUsedWithHash(memLocationArr, hash);
                        });
                        i++;
                    }
                };
                /**
                 * animateGetNewBlockFromDbBufferCache
                 * Metodo responsavel por animar o server-process extraindo um NOVO bloco do db-buffer-cache,
                 * este novo bloco se faz necessario quando é preciso animar qualquer bloco que ja está dentro
                 * do db-buffer-cache
                 * @param {dbBufferCache} objeto html que representa o db-buffer-cache
                 * @param {memLocation} local de memoria de destino(onde o bloco sera salvo)
                 * @param {delay} tempo de animacao
                 * @returns retorna novo bloco na posicao de memoria passada como argumento
                 */
                ServerProcess.prototype.animateGetNewBlockFromDbBufferCache = function (dbBufferCache, memLocationArr, delay) {
                    var animCounter = 0;
                    var blockHtmlArr = [];
                    var _loop_1 = function (memLocation) {
                        var blockHtml = dbBufferCache.getNewBlockHtmlAt(memLocation);
                        blockHtmlArr.push(blockHtml);
                        Orasim.getAnimation().moveTo(blockHtml, this_1.getElement(), delay, 0, function () {
                            if (animCounter++ == 0) {
                                $('#server-process').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1);
                                $('#db-buffer-cache').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1);
                                //Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess requisitando dados do DbBufferCache'))
                                Orasim.getSqlConsole().addMsg(new sql_console_msg_info_2.SqlConsoleMsgInfo("< SP > Requisitando dados do  <span style='font-weight: bold'>DB_BufferCache</span>"));
                            }
                        }, function () {
                            blockHtml.remove();
                        });
                    };
                    var this_1 = this;
                    //iterating memory locations        
                    for (var _i = 0, memLocationArr_4 = memLocationArr; _i < memLocationArr_4.length; _i++) {
                        var memLocation = memLocationArr_4[_i];
                        _loop_1(memLocation);
                    }
                    return blockHtmlArr;
                };
                /**
                 * animateGetBlockFromDbBufferCache
                 * Metodo responsavel por animar o server-process extraindo um bloco JA EXISTENTE(criado em outro lugar) do db-buffer-cache
                 * @param {blockHtml} objeto html que representa o bloco animado
                 * @param {dbBufferCache} objeto html que representa o db-buffer-cache
                 * @param {memLocation} local de memoria de destino(onde o bloco sera salvo)
                 * @param {delay} duracao de animacao
                 */
                ServerProcess.prototype.animateGetBlockFromDbBufferCache = function (blockHtmlArr, dbBufferCache, delay) {
                    var animCounter = 0;
                    var _loop_2 = function (blockHtml) {
                        Orasim.getAnimation().moveTo(blockHtml, this_2.getElement(), delay, 0, function () {
                            if (animCounter++ == 0) {
                                $('#server-process').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1);
                                $('#db-buffer-cache').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1);
                                Orasim.getSqlConsole().addMsg(new sql_console_msg_info_2.SqlConsoleMsgInfo("< SP > Requisitando dados do  <span style='font-weight: bold'>DB_BufferCache</span>"));
                            }
                            //Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess ')) 
                        }, function () {
                            blockHtml.remove();
                        });
                    };
                    var this_2 = this;
                    for (var _i = 0, blockHtmlArr_2 = blockHtmlArr; _i < blockHtmlArr_2.length; _i++) {
                        var blockHtml = blockHtmlArr_2[_i];
                        _loop_2(blockHtml);
                    }
                };
                /**
                 * animateSendBlockToUserProcess
                 * Metodo responsavel por enviar bloco ao user-process
                 * @param {blockHtml} objeto html que representa o bloco animado
                 * @param {userProcess} objeto html que representa o user-process
                 * @param {delay} duracao da animacao
                 */
                ServerProcess.prototype.animateSendBlockToUserProcess = function (blockHtmlArr, userProcess, delay) {
                    var animCounterAftr = 0;
                    var animCounterBfr = 0;
                    for (var _i = 0, blockHtmlArr_3 = blockHtmlArr; _i < blockHtmlArr_3.length; _i++) {
                        var blockHtml = blockHtmlArr_3[_i];
                        Orasim.getAnimation().moveTo(blockHtml, userProcess.getElement(), delay, 0, function () {
                            if (animCounterBfr++ == 0) {
                                //no inicio da animacao, piscar user-process e server-process     
                                $('.arrow.from-serverp-2-userp').show();
                                $('.arrow.from-serverp-2-userp').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1).wait().hide();
                                $('#server-process').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1);
                                $('#user-process').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1);
                                $('#user img').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1);
                                Orasim.getSqlConsole().addMsg(new sql_console_msg_info_2.SqlConsoleMsgInfo("< SP > Retornando resultado para <span style='font-weight: bold'>UserProcess</span>"));
                            }
                            //Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess enviando dados para UserProcess'))
                        }, function () {
                            if (animCounterAftr++ == 0) {
                                //no final da animacao
                                Orasim.getSqlConsole().addMsg(new sql_console_msg_info_2.SqlConsoleMsgInfo('< UP > Comando executado com sucesso'));
                                Orasim.getSqlConsole().addMsg(new sql_console_msg_info_2.SqlConsoleMsgInfo('< UP > Aguardando nova solicitação...'));
                            }
                        });
                    }
                };
                /**
                 * animateByHash
                 * Metodo responsavel pela animacao do SOFT PARSE e do HARD PARSE
                 * Verificando se o hash na shared pool existe, selecionando animacao especifica
                 * @returns Promise<number> uma promise é retornada devido a necessidade sincrona da animacao
                 */
                ServerProcess.prototype.animateByHash = function (hash, hashFound, delay) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        Orasim.getSqlConsole().addMsg(new sql_console_msg_info_2.SqlConsoleMsgInfo('< SP > Realizando parse...'));
                        $("#server-process").addClass("time-clock");
                        // rodar animacao especifica se o hash foi encontrado na shared-pool ou não
                        if (hashFound) {
                            _this.animateHashFound(hash, delay);
                        }
                        else {
                            _this.animateHashNotFound(hash, delay);
                        }
                        setTimeout(function () { resolve(0); }, delay);
                    });
                };
                /**
                 * animateHashNotFound
                 * Animacao de hash not found
                 * @returns Promise<number> uma promise é retornada devido a necessidade sincrona da animacao
                 */
                ServerProcess.prototype.animateHashNotFound = function (hash, delay) {
                    var sharedPool = Orasim.getOracleInstance().getSga().getSharedPool();
                    var dataFiles = Orasim.getOracleDatabase().getDataFiles();
                    var dbBufferCache = Orasim.getOracleInstance().getSga().getDbBufferCache();
                    var sqlConsole = Orasim.getSqlConsole();
                    var serverProcess = Orasim.getServerProcess();
                    var userProcess = Orasim.getUserProcess();
                    var blockHtmlArr;
                    sqlConsole.addMsg(new sql_console_msg_info_2.SqlConsoleMsgInfo("< SP > Comando SQL não foi encontrado na <span style='font-weight: bold'>SharedPool</span>"));
                    setTimeout(function () {
                        sqlConsole.addMsg(new sql_console_msg_info_2.SqlConsoleMsgInfo("< SP > Criando o plano de execução da query..."));
                        setTimeout(function () {
                            sqlConsole.addMsg(new sql_console_msg_info_2.SqlConsoleMsgInfo("< SP > <span style='font-weight: bold; color: red;'>HARD Parse</span>\n                     conclu\u00EDdo, gerado \n                     <span style=\"font-weight: bold\">SQL_ID</span>: \n                     <span style=\"font-weight: bold; color: " + hash.getColor() + "\">" + hash.getHashStr() + "</span>"));
                            $("#server-process").removeClass("time-clock");
                            //let lastAddedHash = sharedPool.getLastHash() // pegando ultimo hash adicionado
                            //let memLocation = sharedPool.getLastMemoryLocation() 
                            // pegando a area de memoria do ultimo dado adicionado no db-buffer-cache
                            // animacao adicionando hash na shared pool
                            sharedPool.animateAddHash(hash);
                            var memLocationArr = sharedPool.getMemoryLocation(hash);
                            blockHtmlArr = serverProcess.animateGetBlockFromDataFiles(dataFiles, hash, memLocationArr, delay * 0.15); // animacao requisitando dados do dataFiles
                            serverProcess.animateStoreBlockInDbBufferCache(blockHtmlArr, dbBufferCache, hash, memLocationArr, delay * 0.15); // animacao gravando dados no dbBufferCache
                            serverProcess.animateGetBlockFromDbBufferCache(blockHtmlArr, dbBufferCache, delay * 0.15); // animacao pegando dados do dbBufferCache
                            //serverProcess.animateSendBlockToUserProcess(blockHtmlArr, userProcess, delay * 0.15) // animacao enviando dados para userProcess
                        }, delay * 0.25);
                    }, delay * 0.25);
                    //termino da animacao        
                    setTimeout(function () {
                        // for(let blockHtml of blockHtmlArr)
                        //     blockHtml.remove() //removendo block do DOM
                    }, delay);
                };
                /**
                 * animateHashFound
                 * Animacao de hash found
                 * @returns Promise<number> uma promise é retornada devido a necessidade sincrona da animacao
                 */
                ServerProcess.prototype.animateHashFound = function (hash, delay) {
                    var sharedPool = Orasim.getOracleInstance().getSga().getSharedPool();
                    var dataFiles = Orasim.getOracleDatabase().getDataFiles();
                    var dbBufferCache = Orasim.getOracleInstance().getSga().getDbBufferCache();
                    var sqlConsole = Orasim.getSqlConsole();
                    var serverProcess = Orasim.getServerProcess();
                    var userProcess = Orasim.getUserProcess();
                    var blockHtmlArr;
                    $("#server-process").removeClass("time-clock");
                    // pegando ultimo hash adicionado         
                    // animacao pegando dados do dbBufferCache
                    // animacao enviando dados para userProcess
                    var memLocationArr = sharedPool.getMemoryLocation(hash);
                    blockHtmlArr = serverProcess.animateGetNewBlockFromDbBufferCache(dbBufferCache, memLocationArr, delay * 0.15);
                    //serverProcess.animateSendBlockToUserProcess(blockHtmlArr, userProcess, delay * 0.15)
                    //termino da animacao
                    setTimeout(function () {
                        //removendo block do DOM
                        // for(let blockHtml of blockHtmlArr)
                        //     blockHtml.remove()
                    }, delay);
                };
                return ServerProcess;
            }());
            exports_17("ServerProcess", ServerProcess);
        }
    };
});
System.register("animation/animation.select", ["animation/animation"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var animation_2, AnimationSelect;
    return {
        setters: [
            function (animation_2_1) {
                animation_2 = animation_2_1;
            }
        ],
        execute: function () {
            /**
             * AnimationSelect
             * Classe responsavel por implementar animações relacionadas ao select
             * @attribute {isHashFound} Caso o hash seja encontrado na shared-pool este atributo é marcado como true, caso contrário, false
             * @attribute {animHashNotFoundDelay} Delay da animacao do hash nao encontrado na shared-pool
             * @attribute {animHashFoundDelay} Delay da animacao hash encontrado
             * @attribute {animUserProcessDelay} Delay da animacao do envio de dados para
             */
            AnimationSelect = (function (_super) {
                __extends(AnimationSelect, _super);
                function AnimationSelect(hash, hashFound) {
                    var _this = _super.call(this) || this;
                    _this.animationTime = _super.prototype.getDelay.call(_this) * 25;
                    _this.hash = hash;
                    _this.hashFound = hashFound;
                    return _this;
                }
                /**
                 * buildAnimSelect
                 * inicializando elementos da classe
                 * @param {isHashFound} argumento passado pelo parser sinalizando se o hash foi encontrado na shared pool ou não
                 */
                //buildAnimSelect(isHashFound: boolean): void{
                // this.isHashFound =  isHashFound
                // this.animUserProcessDelay = super.getDelay() * 2
                // this.animHashDelay = super.getDelay() * 10
                //}
                /**
                 * start
                 * Inicio da animacao do select
                 */
                AnimationSelect.prototype.start = function () {
                    var _this = this;
                    // setando estado de inicio da animacao
                    var userProcess = Orasim.getUserProcess();
                    var serverProcess = Orasim.getServerProcess();
                    Orasim.getAnimation().setAnimating(true);
                    // executando animacoes dentro de promises permitindo execucao sincrona entre animacoes        
                    // setando estado de termino da animacao        
                    userProcess.animateSendDataToServerProcess(this.animationTime * 0.20, "SELECT")
                        .then(function (result) {
                        return serverProcess.animateByHash(_this.hash, _this.hashFound, _this.animationTime * 0.80);
                    })
                        .then(function (result) {
                        return Orasim.getAnimation().setAnimating(false);
                    });
                };
                return AnimationSelect;
            }(animation_2.Animation));
            exports_18("AnimationSelect", AnimationSelect);
        }
    };
});
System.register("crypt/sql.id", ["crypt/hash", "crypt/crc32"], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var hash_1, crc32_1, SqlId;
    return {
        setters: [
            function (hash_1_1) {
                hash_1 = hash_1_1;
            },
            function (crc32_1_1) {
                crc32_1 = crc32_1_1;
            }
        ],
        execute: function () {
            SqlId = (function (_super) {
                __extends(SqlId, _super);
                function SqlId(data) {
                    var _this = _super.call(this) || this;
                    var sqlId = _this.genSqlId(data);
                    _super.prototype.setHashStr.call(_this, sqlId);
                    _super.prototype.setHash.call(_this, new crc32_1.Crc32(sqlId).getHash());
                    return _this;
                }
                /**
                 * genSqlId
                 * Metodo responsavel por gerar o sqlId
                 * @param {data} dados a serem hasheados
                 * @returns sqlId
                 */
                SqlId.prototype.genSqlId = function (data) {
                    var sqlid = '';
                    //this.md5("select")
                    var alphabet = '0123456789abcdfghjkmnpqrstuvwxyz';
                    var h = this.md5(data);
                    var d1 = parseInt(h.slice(0, 8), 16);
                    var d2 = parseInt(h.slice(8, 16), 16);
                    var msb = parseInt(h.slice(16, 24), 16);
                    var lsb = parseInt(h.slice(24, 32), 16);
                    var sqln = msb * Math.pow(2, 32) + lsb;
                    var stop = (Math.log(sqln) / Math.exp(1)) / (Math.log(32) / Math.exp(1)) + 1;
                    for (var i = 0; i < Math.round(stop); i++) {
                        var index = this.modulo(Math.round(sqln / Math.pow(32, i)) + "", 32);
                        sqlid += alphabet[index];
                    }
                    return sqlid;
                };
                SqlId.prototype.modulo = function (aNumStr, aDiv) {
                    var tmp = 0;
                    var i, r;
                    for (i = 0; i < aNumStr.length; i++) {
                        tmp += aNumStr.charAt(i);
                        r = tmp % aDiv;
                        tmp = r.toString(10);
                    }
                    return tmp / 1;
                };
                //     stmt_2_sqlid(stmt: string): string {
                //         //
                //         h = hashlib.md5(stmt + '\x00').digest()
                // stmt = 'insert'
                // h = hashlib.md5(stmt+ '\x00').digest()
                // (d1, d2, msb, lsb) = struct.unpack('IIII', h)
                // sqln = msb * (2 ** 32) + lsb
                // stop = math.log(sqln, math.e) / math.log(32, math.e) + 1
                // sqlid = ''
                // alphabet = '0123456789abcdfghjkmnpqrstuvwxyz'
                // for i in range(0, int(round(stop))):
                //     sqlid = alphabet[(sqln / (32 ** i)) % 32] + sqlid
                //         return sqlid
                //     }
                /*
                * Add integers, wrapping at 2^32. This uses 16-bit operations internally
                * to work around bugs in some JS interpreters.
                */
                SqlId.prototype.safeAdd = function (x, y) {
                    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
                    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
                    return (msw << 16) | (lsw & 0xFFFF);
                };
                /*
                * Bitwise rotate a 32-bit number to the left.
                */
                SqlId.prototype.bitRotateLeft = function (num, cnt) {
                    return (num << cnt) | (num >>> (32 - cnt));
                };
                /*
                * These functions implement the four basic operations the algorithm uses.
                */
                SqlId.prototype.md5cmn = function (q, a, b, x, s, t) {
                    return this.safeAdd(this.bitRotateLeft(this.safeAdd(this.safeAdd(a, q), this.safeAdd(x, t)), s), b);
                };
                SqlId.prototype.md5ff = function (a, b, c, d, x, s, t) {
                    return this.md5cmn((b & c) | ((~b) & d), a, b, x, s, t);
                };
                SqlId.prototype.md5gg = function (a, b, c, d, x, s, t) {
                    return this.md5cmn((b & d) | (c & (~d)), a, b, x, s, t);
                };
                SqlId.prototype.md5hh = function (a, b, c, d, x, s, t) {
                    return this.md5cmn(b ^ c ^ d, a, b, x, s, t);
                };
                SqlId.prototype.md5ii = function (a, b, c, d, x, s, t) {
                    return this.md5cmn(c ^ (b | (~d)), a, b, x, s, t);
                };
                /*
                * Calculate the MD5 of an array of little-endian words, and a bit length.
                */
                SqlId.prototype.binlMD5 = function (x, len) {
                    /* append padding */
                    x[len >> 5] |= 0x80 << (len % 32);
                    x[(((len + 64) >>> 9) << 4) + 14] = len;
                    var i;
                    var olda;
                    var oldb;
                    var oldc;
                    var oldd;
                    var a = 1732584193;
                    var b = -271733879;
                    var c = -1732584194;
                    var d = 271733878;
                    for (i = 0; i < x.length; i += 16) {
                        olda = a;
                        oldb = b;
                        oldc = c;
                        oldd = d;
                        a = this.md5ff(a, b, c, d, x[i], 7, -680876936);
                        d = this.md5ff(d, a, b, c, x[i + 1], 12, -389564586);
                        c = this.md5ff(c, d, a, b, x[i + 2], 17, 606105819);
                        b = this.md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
                        a = this.md5ff(a, b, c, d, x[i + 4], 7, -176418897);
                        d = this.md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
                        c = this.md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
                        b = this.md5ff(b, c, d, a, x[i + 7], 22, -45705983);
                        a = this.md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
                        d = this.md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
                        c = this.md5ff(c, d, a, b, x[i + 10], 17, -42063);
                        b = this.md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
                        a = this.md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
                        d = this.md5ff(d, a, b, c, x[i + 13], 12, -40341101);
                        c = this.md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
                        b = this.md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
                        a = this.md5gg(a, b, c, d, x[i + 1], 5, -165796510);
                        d = this.md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
                        c = this.md5gg(c, d, a, b, x[i + 11], 14, 643717713);
                        b = this.md5gg(b, c, d, a, x[i], 20, -373897302);
                        a = this.md5gg(a, b, c, d, x[i + 5], 5, -701558691);
                        d = this.md5gg(d, a, b, c, x[i + 10], 9, 38016083);
                        c = this.md5gg(c, d, a, b, x[i + 15], 14, -660478335);
                        b = this.md5gg(b, c, d, a, x[i + 4], 20, -405537848);
                        a = this.md5gg(a, b, c, d, x[i + 9], 5, 568446438);
                        d = this.md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
                        c = this.md5gg(c, d, a, b, x[i + 3], 14, -187363961);
                        b = this.md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
                        a = this.md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
                        d = this.md5gg(d, a, b, c, x[i + 2], 9, -51403784);
                        c = this.md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
                        b = this.md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
                        a = this.md5hh(a, b, c, d, x[i + 5], 4, -378558);
                        d = this.md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
                        c = this.md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
                        b = this.md5hh(b, c, d, a, x[i + 14], 23, -35309556);
                        a = this.md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
                        d = this.md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
                        c = this.md5hh(c, d, a, b, x[i + 7], 16, -155497632);
                        b = this.md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
                        a = this.md5hh(a, b, c, d, x[i + 13], 4, 681279174);
                        d = this.md5hh(d, a, b, c, x[i], 11, -358537222);
                        c = this.md5hh(c, d, a, b, x[i + 3], 16, -722521979);
                        b = this.md5hh(b, c, d, a, x[i + 6], 23, 76029189);
                        a = this.md5hh(a, b, c, d, x[i + 9], 4, -640364487);
                        d = this.md5hh(d, a, b, c, x[i + 12], 11, -421815835);
                        c = this.md5hh(c, d, a, b, x[i + 15], 16, 530742520);
                        b = this.md5hh(b, c, d, a, x[i + 2], 23, -995338651);
                        a = this.md5ii(a, b, c, d, x[i], 6, -198630844);
                        d = this.md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
                        c = this.md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
                        b = this.md5ii(b, c, d, a, x[i + 5], 21, -57434055);
                        a = this.md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
                        d = this.md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
                        c = this.md5ii(c, d, a, b, x[i + 10], 15, -1051523);
                        b = this.md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
                        a = this.md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
                        d = this.md5ii(d, a, b, c, x[i + 15], 10, -30611744);
                        c = this.md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
                        b = this.md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
                        a = this.md5ii(a, b, c, d, x[i + 4], 6, -145523070);
                        d = this.md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
                        c = this.md5ii(c, d, a, b, x[i + 2], 15, 718787259);
                        b = this.md5ii(b, c, d, a, x[i + 9], 21, -343485551);
                        a = this.safeAdd(a, olda);
                        b = this.safeAdd(b, oldb);
                        c = this.safeAdd(c, oldc);
                        d = this.safeAdd(d, oldd);
                    }
                    return [a, b, c, d];
                };
                /*
                * Convert an array of little-endian words to a string
                */
                SqlId.prototype.binl2rstr = function (input) {
                    var i;
                    var output = '';
                    var length32 = input.length * 32;
                    for (i = 0; i < length32; i += 8) {
                        output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
                    }
                    return output;
                };
                /*
                * Convert a raw string to an array of little-endian words
                * Characters >255 have their high-byte silently ignored.
                */
                SqlId.prototype.rstr2binl = function (input) {
                    var i;
                    var output = [];
                    output[(input.length >> 2) - 1] = undefined;
                    for (i = 0; i < output.length; i += 1) {
                        output[i] = 0;
                    }
                    var length8 = input.length * 8;
                    for (i = 0; i < length8; i += 8) {
                        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
                    }
                    return output;
                };
                /*
                * Calculate the MD5 of a raw string
                */
                SqlId.prototype.rstrMD5 = function (s) {
                    return this.binl2rstr(this.binlMD5(this.rstr2binl(s), s.length * 8));
                };
                /*
                * Calculate the HMAC-MD5, of a key and some data (raw strings)
                */
                SqlId.prototype.rstrHMACMD5 = function (key, data) {
                    var i;
                    var bkey = this.rstr2binl(key);
                    var ipad = [];
                    var opad = [];
                    var hash;
                    ipad[15] = opad[15] = undefined;
                    if (bkey.length > 16) {
                        bkey = this.binlMD5(bkey, key.length * 8);
                    }
                    for (i = 0; i < 16; i += 1) {
                        ipad[i] = bkey[i] ^ 0x36363636;
                        opad[i] = bkey[i] ^ 0x5C5C5C5C;
                    }
                    hash = this.binlMD5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);
                    return this.binl2rstr(this.binlMD5(opad.concat(hash), 512 + 128));
                };
                /*
                * Convert a raw string to a hex string
                */
                SqlId.prototype.rstr2hex = function (input) {
                    var hexTab = '0123456789abcdef';
                    var output = '';
                    var x;
                    var i;
                    for (i = 0; i < input.length; i += 1) {
                        x = input.charCodeAt(i);
                        output += hexTab.charAt((x >>> 4) & 0x0F) +
                            hexTab.charAt(x & 0x0F);
                    }
                    return output;
                };
                /*
                * Encode a string as utf-8
                */
                SqlId.prototype.str2rstrUTF8 = function (input) {
                    return decodeURI(encodeURIComponent(input));
                };
                /*
                * Take string arguments and return either raw or hex encoded strings
                */
                SqlId.prototype.rawMD5 = function (s) {
                    return this.rstrMD5(this.str2rstrUTF8(s));
                };
                SqlId.prototype.hexMD5 = function (s) {
                    return this.rstr2hex(this.rawMD5(s));
                };
                SqlId.prototype.rawHMACMD5 = function (k, d) {
                    return this.rstrHMACMD5(this.str2rstrUTF8(k), this.str2rstrUTF8(d));
                };
                SqlId.prototype.hexHMACMD5 = function (k, d) {
                    return this.rstr2hex(this.rawHMACMD5(k, d));
                };
                SqlId.prototype.md5 = function (str) {
                    return this.hexMD5(str);
                };
                return SqlId;
            }(hash_1.Hash));
            exports_19("SqlId", SqlId);
        }
    };
});
System.register("crypt/crc32", ["crypt/hash"], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var hash_2, Crc32;
    return {
        setters: [
            function (hash_2_1) {
                hash_2 = hash_2_1;
            }
        ],
        execute: function () {
            /**
             * Crc32
             * Classe responsavel por especializar um hash modelando o crc32
             */
            Crc32 = (function (_super) {
                __extends(Crc32, _super);
                function Crc32(data) {
                    var _this = _super.call(this) || this;
                    var uintCrc = _this.genCrc32(data);
                    _super.prototype.setHash.call(_this, uintCrc);
                    _super.prototype.setHashStr.call(_this, uintCrc.toString(16));
                    return _this;
                }
                Crc32.prototype.genCrc32 = function (data) {
                    return (new Uint32Array([this.crc32Str(data)]))[0];
                    // super.setHash(uintCrc)
                    // super.setHashStr(uintCrc.toString(16))
                };
                // /**
                //  * buildCrc
                //  * Metodo responsavel por construir o hash crc32 
                //  *   
                //  * @param  {data}     dados que serão utilizados pra gerar o hash
                //  */
                // buildCrc(data: string): void{
                //     let uintCrc = (new Uint32Array([this.crc32Str(data)]))[0]
                //     super.setHash(uintCrc)
                // }
                /**
                 * Utf8Encode
                 * Metodo utilizado pelo crc32Str para codificar a string em UTF8
                 * @param {data} dados que serão utilizados para gerar a string em utf8
                 * @returns string em utf8
                 */
                Crc32.prototype.Utf8Encode = function (data) {
                    // TAKEN FROM
                    // modified version from from http://www.webtoolkit.info/
                    data = data.replace(/\r\n/g, "\n");
                    var utftext = "";
                    for (var n = 0; n < data.length; n++) {
                        var c = data.charCodeAt(n);
                        if (c < 128) {
                            utftext += String.fromCharCode(c);
                        }
                        else if ((c > 127) && (c < 2048)) {
                            utftext += String.fromCharCode((c >> 6) | 192);
                            utftext += String.fromCharCode((c & 63) | 128);
                        }
                        else {
                            utftext += String.fromCharCode((c >> 12) | 224);
                            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                            utftext += String.fromCharCode((c & 63) | 128);
                        }
                    }
                    return utftext;
                };
                /**
                 * crc32Str
                 * Metodo utilizado para gerar um crc32 checksum
                 * @param {data} dados que serão utilizados pra gerar o hash
                 */
                Crc32.prototype.crc32Str = function (str) {
                    // TAKEN FROM
                    // modified version from from http://www.webtoolkit.info/  
                    str = this.Utf8Encode(str);
                    var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
                    var crc = 0;
                    var x = 0;
                    var y = 0;
                    crc = crc ^ (-1);
                    for (var i = 0, iTop = str.length; i < iTop; i++) {
                        y = (crc ^ str.charCodeAt(i)) & 0xFF;
                        x = parseInt("0x" + table.substr(y * 9, 8));
                        crc = (crc >>> 8) ^ x;
                    }
                    return crc ^ (-1);
                };
                return Crc32;
            }(hash_2.Hash));
            exports_20("Crc32", Crc32);
        }
    };
});
System.register("sql-parser/sql.parser", ["animation/animation.null", "animation/animation.select", "crypt/crc32"], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var animation_null_1, animation_select_1, crc32_2, SqlParser;
    return {
        setters: [
            function (animation_null_1_1) {
                animation_null_1 = animation_null_1_1;
            },
            function (animation_select_1_1) {
                animation_select_1 = animation_select_1_1;
            },
            function (crc32_2_1) {
                crc32_2 = crc32_2_1;
            }
        ],
        execute: function () {
            /**
             * SqlParser
             * Classe Responsavel por fazer analise lexica e sintatica de uma query sql
             * @attribute {queryTokenId} identificador da query(SELECT, INSERT...)
             * @attribute {isParsedSuccess} flag que indica se a query foi parseada com sucesso
             * @attribute {query} string que armazena a query completa(SELECT * FROM...)
             */
            SqlParser = (function () {
                function SqlParser() {
                    this.isParsedSuccess = false;
                    this.isParsedSuccess = false;
                    this.query = "";
                }
                /**
                 * parse
                 * Metodo responsavel por fazer parsing da sql query
                 * @param   query   string contendo sql query inserida no console
                 * @returns uma instancia da classe Animation(ou classes filhas)
                 */
                SqlParser.prototype.parse = function (query) {
                    var sqlConsole = Orasim.getSqlConsole();
                    //sqlConsole.addMsg(new SqlConsoleMsgInfo('Userprocess realizando parsing da query: (' + query +')'))        
                    // transformando a query em lower-case 
                    var lowerQuery = query.toLowerCase();
                    // verificando qual query foi digitada
                    switch (lowerQuery) {
                        case "connect":
                            return new animation_null_1.AnimationNull();
                        case "select":
                            //gerando hash
                            //procurando hash na shared pool      
                            var sharedPool = Orasim.getOracleInstance().getSga().getSharedPool();
                            var hash = new crc32_2.Crc32(lowerQuery);
                            var isHashFound = sharedPool.findHash(hash);
                            // caso o hash nao seja encontrado, adicione na shared-pool 
                            if (!isHashFound)
                                sharedPool.addHash(hash);
                            this.isParsedSuccess = true;
                            return new animation_select_1.AnimationSelect(hash, isHashFound);
                        case "insert":
                            console.log('insert');
                            this.isParsedSuccess = true;
                            return new animation_null_1.AnimationNull();
                        case "update":
                            return new animation_null_1.AnimationNull();
                        case "delete":
                            return new animation_null_1.AnimationNull();
                    }
                    // retorno default(nenhuma animacao sera executada)
                    this.isParsedSuccess = false;
                    return new animation_null_1.AnimationNull();
                    // codigo abaixo faz referencia a biblioteca utilizada para fazer parsing 
                    // da query, no momento nao estamos utilizando a mesma
                    // try{
                    //     SQLParser.parse(query)
                    //     this.query = query
                    //     this.queryTokenId = SQLParser.lexer.tokenize(query)[0][0]                        
                    //     this.isParsedSuccess = true            
                    // }catch(err){
                    //     console.log("Erro SqlParser.parse:",err)
                    //     this.isParsedSuccess = false
                    //     this.queryTokenId = ""
                    //     this.query = ""
                    // }
                };
                SqlParser.prototype.parsedSuccess = function () {
                    return this.isParsedSuccess;
                };
                SqlParser.prototype.getQuery = function () {
                    return this.query;
                };
                SqlParser.prototype.getQueryTokenId = function () {
                    return this.queryTokenId;
                };
                return SqlParser;
            }());
            exports_21("SqlParser", SqlParser);
        }
    };
});
System.register("sql-console/sql.console.msg.error", ["sql-console/sql.console.message"], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var sql_console_message_2, SqlConsoleMsgError;
    return {
        setters: [
            function (sql_console_message_2_1) {
                sql_console_message_2 = sql_console_message_2_1;
            }
        ],
        execute: function () {
            /**
             * SqlConsoleMsgError
             * Classe responsavel por especializar mensagens de erro
             * do console da aplicacao
             */
            SqlConsoleMsgError = (function (_super) {
                __extends(SqlConsoleMsgError, _super);
                function SqlConsoleMsgError(msg) {
                    return _super.call(this, 'error', msg) || this;
                }
                return SqlConsoleMsgError;
            }(sql_console_message_2.SqlConsoleMessage));
            exports_22("SqlConsoleMsgError", SqlConsoleMsgError);
        }
    };
});
System.register("animation/animation", [], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var Animation;
    return {
        setters: [],
        execute: function () {
            /**
             * Animation
             * Classe Base, responsavel por implementar animações
             * em comum com classes filhas
             * @property {delay} quantidade de milisegundos usado como base na animacao
             * @property {animating} atributo que salva o estado booleano da animacao
             */
            Animation = (function () {
                function Animation() {
                    this.delay = 1000;
                    this.animating = false;
                }
                /**
                 * start
                 * Este metodo desta classe base não executa nenhuma animação
                 */
                Animation.prototype.start = function () {
                };
                /**
                 * isAnimating
                 * @returns retorna estado atual da animacao
                 */
                Animation.prototype.isAnimating = function () {
                    return this.animating;
                };
                /**
                 *
                 * setAnimating
                 * Muda o estado atual da animacao
                 * @param {flag} identifica o estado atual da animacao
                 */
                Animation.prototype.setAnimating = function (flag) {
                    this.animating = flag;
                };
                /**
                 * getDelay
                 * @returns retorna o delay atual(milisegundos)
                 */
                Animation.prototype.getDelay = function () {
                    return this.delay;
                };
                /**
                 * moveTo
                 * Este metodo move um objeto html para a posicao de outro
                 * @param {sourceElem} objeto de origem (que será movido)
                 * @param {destElem} objeto de destino (para onde será movido)
                 * @param {duration} duracao da animacao(milisegundos)
                 * @param {delayAfter} pausar a animacao no final da mesma, por determinado tempo(milisegundos)
                 * @param {startCb} callback de inicializacao da animação
                 * @param {completeCb} callback de finalizacao da animação
                 */
                Animation.prototype.moveTo = function (sourceElem, destElem, duration, delayAfter, startCb, completeCb) {
                    var x;
                    var y;
                    x = $(destElem).offset().top - $(sourceElem).offset().top + $(sourceElem).position().top;
                    y = ($(destElem).offset().left - $(sourceElem).offset().left) + $(sourceElem).position().left;
                    $(sourceElem).animate({ top: x, left: y }, { duration: duration,
                        start: function () { return startCb(); },
                        complete: function () { return completeCb(); } }).delay(delayAfter);
                };
                return Animation;
            }());
            exports_23("Animation", Animation);
        }
    };
});
System.register("sql-console/sql.console", ["sql-parser/sql.parser", "sql-console/sql.console.msg.info"], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var sql_parser_1, sql_console_msg_info_3, SqlConsole;
    return {
        setters: [
            function (sql_parser_1_1) {
                sql_parser_1 = sql_parser_1_1;
            },
            function (sql_console_msg_info_3_1) {
                sql_console_msg_info_3 = sql_console_msg_info_3_1;
            }
        ],
        execute: function () {
            /**
             * SqlConsole
             * Classe responsavel por modelar o console que o usuário usa para interagir com a aplicação
             * @attribute {sqlParser} instancia da classe sql-parser que sera responsavel por fazer parsing da query
             */
            SqlConsole = (function () {
                function SqlConsole() {
                    this.sqlParser = new sql_parser_1.SqlParser();
                    this.addMsg(new sql_console_msg_info_3.SqlConsoleMsgInfo("<br> <span style='font-weight: bold'>&nbsp&nbsp* * * * * * * * * *&nbsp&nbsp&nbsp[&nbsp  Welcome to the ORASIM  &nbsp]&nbsp&nbsp&nbsp&nbsp* * * * * * * * * * </span><br><br>"));
                }
                /**
                 *  handleKeyPress
                 *  Metodo responsável por receber qualquer tecla pressionada no input do console
                 *  @param   event   evento passado pelo browser de tecla pressionada
                 */
                /*
                 * Método não está mais sendo utilizado. Verificar remoção.
                 *
                 *
                handleKeyPress(event: KeyboardEvent): void {
            
                    // verificando se tecla enter foi pressionada
                    if (event.keyCode === 13) {
            
                        // verificando se existe alguma animacao em andamento
                        if(Orasim.getAnimation().isAnimating()){
                            this.addMsg(new SqlConsoleMsgError('Animação em andamento!'))
                            return
                        }
                        
                        // pegando valor digitado no input do console
                        // fazendo parsing da query
                        let userSqlCmd = $("#console-input").val()
                        let animation: Animation = this.sqlParser.parse(userSqlCmd)
            
                        // caso a query seja parseada com sucesso execute a animacao especifica
                        // caso contrario imprima uma mensagem de erro no console
                        if (this.sqlParser.parsedSuccess())
                            animation.start()
                        else
                            this.addMsg(new SqlConsoleMsgError('Query Inválida!'))
            
                        // limpando input do console
                        $("#console-input").val('')
                    }
                }*/
                /**
                 *  addMsg
                 *  Responsável por adicionar mensagens no console
                 *  @param   {msg}     Mensagem a ser adicionada no console
                 */
                SqlConsole.prototype.addMsg = function (msg) {
                    $("#console-msg-list-container").append(msg.getMsg());
                };
                return SqlConsole;
            }());
            exports_24("SqlConsole", SqlConsole);
        }
    };
});
System.register("sql-buttons/sql.button.select", ["animation/animation.select", "crypt/sql.id"], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var animation_select_2, sql_id_1, SqlButtonSelect;
    return {
        setters: [
            function (animation_select_2_1) {
                animation_select_2 = animation_select_2_1;
            },
            function (sql_id_1_1) {
                sql_id_1 = sql_id_1_1;
            }
        ],
        execute: function () {
            SqlButtonSelect = (function () {
                function SqlButtonSelect() {
                    var _this = this;
                    //adicionando select event handler        
                    $("#btnSelect").on('click', function () {
                        _this.handleSelect();
                    });
                }
                SqlButtonSelect.prototype.handleSelect = function () {
                    //se animacao em andamento retorne
                    if (Orasim.getAnimation().isAnimating())
                        return;
                    //gerando o mesmo hash(crc do 'select') para todos os clicks
                    var hashFound = false;
                    var sharedPool = Orasim.getOracleInstance().getSga().getSharedPool();
                    var query = 'select';
                    var hash = new sql_id_1.SqlId(query);
                    //tentando encontrar hash na shared pool
                    if (sharedPool.findHash(hash))
                        hashFound = true;
                    //adicionando na shared pool, caso nao encontrado
                    sharedPool.addHash(hash);
                    new animation_select_2.AnimationSelect(hash, hashFound).start();
                };
                return SqlButtonSelect;
            }());
            exports_25("SqlButtonSelect", SqlButtonSelect);
        }
    };
});
System.register("sql-console/sql.console.msg.warning", ["sql-console/sql.console.message"], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var sql_console_message_3, SqlConsoleMsgWarning;
    return {
        setters: [
            function (sql_console_message_3_1) {
                sql_console_message_3 = sql_console_message_3_1;
            }
        ],
        execute: function () {
            /**
             * SqlConsoleMsgWarning
             * Classe responsavel por especializar mensagens de aviso do console da aplicacao
             */
            SqlConsoleMsgWarning = (function (_super) {
                __extends(SqlConsoleMsgWarning, _super);
                function SqlConsoleMsgWarning(msg) {
                    return _super.call(this, 'warning', msg) || this;
                }
                return SqlConsoleMsgWarning;
            }(sql_console_message_3.SqlConsoleMessage));
            exports_26("SqlConsoleMsgWarning", SqlConsoleMsgWarning);
        }
    };
});
System.register("process/listener.process", ["utils/tooltip", "sql-console/sql.console.msg.info", "sql-console/sql.console.msg.warning", "animation/arrow"], function (exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var tooltip_7, sql_console_msg_info_4, sql_console_msg_warning_1, arrow_2, ListenerProcess;
    return {
        setters: [
            function (tooltip_7_1) {
                tooltip_7 = tooltip_7_1;
            },
            function (sql_console_msg_info_4_1) {
                sql_console_msg_info_4 = sql_console_msg_info_4_1;
            },
            function (sql_console_msg_warning_1_1) {
                sql_console_msg_warning_1 = sql_console_msg_warning_1_1;
            },
            function (arrow_2_1) {
                arrow_2 = arrow_2_1;
            }
        ],
        execute: function () {
            /**
             * ListenerProcess
             * Classe responsavel por modelar o objeto ListenerProcess da animacao
             * @attribute {element} objeto html que referencia o elemento listener-process
             */
            ListenerProcess = (function () {
                function ListenerProcess() {
                    this.element = $("#listener-process")[0];
                    // criando tooltip para o Listener
                    var tooltip = new tooltip_7.Tooltip("#listener-process", "Listener", "\n        <p align=\"justify\">\n\n        Os passos b\u00E1sicos pelo qual um processo cliente (UserProcess) estabelece uma conex\u00E3o atrav\u00E9s com um Listener s\u00E3o:\n        <br><br>\n        1. Um processo cliente ou outro banco de dados solicita uma conex\u00E3o.\n        <br><br>\n        2. O Listener seleciona um \"service handler\" (manipulador de servi\u00E7o) adequado para atender \u00E0 solicita\u00E7\u00E3o do client e encaminha a solicita\u00E7\u00E3o para o manipulador.\n        <br><br>    \n        3. O processo cliente conecta-se diretamente no \"service handler\" (manipulador de servi\u00E7o). O Listener n\u00E3o est\u00E1 envolvida na comunica\u00E7\u00E3o.\n        \n        <span style='font-weight: bold'>\n        </span>\n         ");
                }
                ListenerProcess.prototype.getElement = function () {
                    return this.element;
                };
                /**
                 * getElementOffset
                 * Metodo responsavel por retornar posicao relativa do elemento ao documento
                 * @returns coordenada jquery do elemento
                 */
                ListenerProcess.prototype.getElementOffset = function () {
                    return $(this.element).offset();
                };
                /**
                 * animateSendDataToServer
                 * Metodo responsavel por animar o envio de dados ao server process
                 * @param {delay} duracao da animacao
                 * @returns uma promise retornada logo apos o tempo de animacao
                 */
                ListenerProcess.prototype.animateSendDataToServer = function (delay) {
                    return new Promise(function (resolve, reject) {
                        Orasim.getSqlConsole().addMsg(new sql_console_msg_info_4.SqlConsoleMsgInfo("< LN > Validando informações da conexão"));
                        $("#listener-process").fadeTo(delay * 0.25, 0.1, function () {
                            $("#listener-process").fadeTo(delay * 0.25, 1, function () {
                                Orasim.getSqlConsole().addMsg(new sql_console_msg_info_4.SqlConsoleMsgInfo("< LN > Iniciando o <span style='font-weight: bold'>ServerProcess</span> dedicado"));
                                new arrow_2.Arrow(20, 190, 25, 210, delay * 0.50).moveToRightDown(function () {
                                    $("#server-process").removeClass("displayNone");
                                    $("#pga").removeClass("displayNone");
                                });
                            });
                        });
                        setTimeout(function () {
                            resolve(0);
                        }, delay);
                    });
                };
                /**
                 * animateConnectToServer
                 * Metodo responsavel por animar a conexão com o server process
                 * @param {delay} duracao da animacao
                 * @returns uma promise retornada logo apos o tempo de animacao
                 */
                ListenerProcess.prototype.animateConnectToServer = function (delay) {
                    return new Promise(function (resolve, reject) {
                        Orasim.getSqlConsole().addMsg(new sql_console_msg_info_4.SqlConsoleMsgInfo("< UP > Conectando diretamente com o <span style='font-weight: bold'>ServerProcess</span>"));
                        $("<div id='connection-arrow' class='right-arrow end'>").css({
                            "left": "95px",
                            "top": "265px",
                            "width": "40px"
                        }).hide().appendTo("#animation-container").fadeTo(delay, 1);
                        setTimeout(function () {
                            Orasim.getSqlConsole().addMsg(new sql_console_msg_info_4.SqlConsoleMsgInfo("< UP > Conexão estabelecida com o <span style='font-weight: bold'>Database</span>"));
                            Orasim.getSqlConsole().addMsg(new sql_console_msg_warning_1.SqlConsoleMsgWarning("< UP > Aguardando solicitação..."));
                            resolve(0);
                        }, delay * 0.8);
                    });
                };
                return ListenerProcess;
            }());
            exports_27("ListenerProcess", ListenerProcess);
        }
    };
});
System.register("animation/animation.connect", ["animation/animation"], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var animation_3, AnimationConnect;
    return {
        setters: [
            function (animation_3_1) {
                animation_3 = animation_3_1;
            }
        ],
        execute: function () {
            /**
             * AnimationConnect
             * Classe responsavel por implementar animações relacionadas ao comando connect
             * @attribute {animUserProcessDelay} Delay da animacao do envio de dados para
             */
            AnimationConnect = (function (_super) {
                __extends(AnimationConnect, _super);
                function AnimationConnect() {
                    var _this = _super.call(this) || this;
                    _this.animUserProcessDelay = _super.prototype.getDelay.call(_this) * 3;
                    _this.animListenerProcessDelay = _super.prototype.getDelay.call(_this) * 3;
                    return _this;
                }
                /**
                 * start
                 * Inicio da animacao connect
                 */
                AnimationConnect.prototype.start = function () {
                    var _this = this;
                    var userProcess = Orasim.getUserProcess();
                    var listenerProcess = Orasim.getListenerProcess();
                    //let sqlButtons: SqlButtons = Orasim.getSqlButtons()
                    var sqlButtons = Orasim.getSqlButtons();
                    // setando estado de inicio da animacao
                    Orasim.getAnimation().setAnimating(true);
                    // executando animacoes dentro de promises permitindo execucao sincrona entre animacoes        
                    // setando estado de termino da animacao
                    userProcess.createUserProcess(this.animListenerProcessDelay)
                        .then(function (res) {
                        return userProcess.animateSendDataToListener(_this.animUserProcessDelay);
                    })
                        .then(function (res) {
                        return listenerProcess.animateSendDataToServer(_this.animListenerProcessDelay);
                    })
                        .then(function (res) {
                        return listenerProcess.animateConnectToServer(_this.animUserProcessDelay);
                    })
                        .then(function (res) {
                        return sqlButtons.getButtonConnect().undisplayConnectDisplayCommandButtons();
                    })
                        .then(function (res) {
                        return Orasim.getAnimation().setAnimating(false);
                    });
                };
                return AnimationConnect;
            }(animation_3.Animation));
            exports_28("AnimationConnect", AnimationConnect);
        }
    };
});
System.register("sql-buttons/sql.button.connect", ["animation/animation.connect"], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var animation_connect_1, SqlButtonConnect;
    return {
        setters: [
            function (animation_connect_1_1) {
                animation_connect_1 = animation_connect_1_1;
            }
        ],
        execute: function () {
            SqlButtonConnect = (function () {
                function SqlButtonConnect() {
                    var _this = this;
                    //adicionando connect event handler        
                    $("#btnConnect").on('click', function () {
                        _this.handleConnect();
                    });
                }
                SqlButtonConnect.prototype.handleConnect = function () {
                    //se animacao em andamento retorne
                    if (Orasim.getAnimation().isAnimating())
                        return;
                    new animation_connect_1.AnimationConnect().start();
                };
                /**
                 * undisplayConnectDisplayCommandButtons
                 * Metodo responsavel por trocar botao de connect pelos botoes de commandos no banco
                 * @returns uma promise retornada logo apos o tempo de animacao
                 */
                SqlButtonConnect.prototype.undisplayConnectDisplayCommandButtons = function () {
                    return new Promise(function (resolve, reject) {
                        $("#btnConnect").addClass("displayNone");
                        $(".btnCommands").removeClass("displayNone");
                        resolve(0);
                    });
                };
                return SqlButtonConnect;
            }());
            exports_29("SqlButtonConnect", SqlButtonConnect);
        }
    };
});
System.register("animation/animation.insert", ["animation/animation"], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var animation_4, AnimationInsert;
    return {
        setters: [
            function (animation_4_1) {
                animation_4 = animation_4_1;
            }
        ],
        execute: function () {
            /**
             * AnimationInsert
             * Classe responsavel por implementar animações relacionadas ao insert
             */
            AnimationInsert = (function (_super) {
                __extends(AnimationInsert, _super);
                function AnimationInsert(hash) {
                    var _this = _super.call(this) || this;
                    _this.animationTime = _super.prototype.getDelay.call(_this) * 5;
                    _this.hash = hash;
                    return _this;
                }
                /**
                 * start
                 * Inicio da animacao do insert
                 */
                AnimationInsert.prototype.start = function () {
                    var _this = this;
                    // setando estado de inicio da animacao
                    Orasim.getAnimation().setAnimating(true);
                    var userProcess = Orasim.getUserProcess();
                    var serverProcess = Orasim.getServerProcess();
                    var sharedPool = Orasim.getOracleInstance().getSga().getSharedPool();
                    var dbBufferCache = Orasim.getOracleInstance().getSga().getDbBufferCache();
                    userProcess.animateSendDataToServerProcess(this.animationTime * 0.25, "INSERT")
                        .then(function (result) {
                        return new Promise(function (resolve, reject) {
                            //pegando dados da shared pool
                            var localAnimTime = _this.animationTime * 0.75;
                            // animacao adicionando hash na shared pool
                            sharedPool.animateAddHash(_this.hash);
                            //let lastAddedHash = sharedPool.getLastHash() // pegando ultimo hash adicionado                
                            var memLocationArr = sharedPool.getMemoryLocation(_this.hash); // pegando a area de memoria do ultimo dado adicionado no db-buffer-cache
                            //ambos tem a mesma porcentagem de tempo para animar porque a animacao eh feita ao mesmo tempo
                            serverProcess.animateSendBlockTo('#redo-log-buffer', _this.hash, localAnimTime);
                            serverProcess.animateSendBlockTo('#db-buffer-cache', _this.hash, localAnimTime);
                            setTimeout(function () { resolve(0); }, localAnimTime);
                            //serverProcess.animateSendBlockTo()
                        });
                    })
                        .then(function (result) {
                        return Orasim.getAnimation().setAnimating(false);
                    });
                    // .then((result: number) => {
                    // })
                };
                return AnimationInsert;
            }(animation_4.Animation));
            exports_30("AnimationInsert", AnimationInsert);
        }
    };
});
System.register("sql-buttons/sql.button.insert", ["animation/animation.insert", "crypt/sql.id"], function (exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var animation_insert_1, sql_id_2, SqlButtonInsert;
    return {
        setters: [
            function (animation_insert_1_1) {
                animation_insert_1 = animation_insert_1_1;
            },
            function (sql_id_2_1) {
                sql_id_2 = sql_id_2_1;
            }
        ],
        execute: function () {
            SqlButtonInsert = (function () {
                function SqlButtonInsert() {
                    var _this = this;
                    //adicionando connect event handler        
                    $("#btnInsert").on('click', function () {
                        _this.handleInsert();
                    });
                }
                SqlButtonInsert.prototype.handleInsert = function () {
                    if (Orasim.getAnimation().isAnimating())
                        return;
                    //gerando hashes diferentes a cada click do botao
                    var hashFound = false;
                    var query = 'insert';
                    query += Math.random().toString(36).substr(2, 5);
                    var hash = new sql_id_2.SqlId(query);
                    var sharedPool = Orasim.getOracleInstance().getSga().getSharedPool();
                    //adicionando hash na shared pool, caso nao encontrado
                    sharedPool.addHash(hash);
                    new animation_insert_1.AnimationInsert(hash).start();
                };
                return SqlButtonInsert;
            }());
            exports_31("SqlButtonInsert", SqlButtonInsert);
        }
    };
});
System.register("oracle-instance/lgwr", ["utils/tooltip"], function (exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var tooltip_8, Lgwr;
    return {
        setters: [
            function (tooltip_8_1) {
                tooltip_8 = tooltip_8_1;
            }
        ],
        execute: function () {
            Lgwr = (function () {
                function Lgwr() {
                    this.element = $('#lgwr')[0];
                    //tooltip do pmon
                    new tooltip_8.Tooltip("#lgwr", "Log Writer (LGWR)", "Olá, eu sou o LGWR!");
                }
                Lgwr.prototype.animSendBlocksToRedoLogFiles = function (blocks, delay) {
                    var _loop_3 = function (block) {
                        Orasim.getAnimation().moveTo(block.getElement(), $("#redo-log-file-1")[0], delay, 0, function () {
                        }, function () {
                            //remova no fim da animacao
                            $(block.getElement()).remove();
                        });
                        delay = delay / 1.5;
                    };
                    for (var _i = 0, blocks_1 = blocks; _i < blocks_1.length; _i++) {
                        var block = blocks_1[_i];
                        _loop_3(block);
                    }
                };
                Lgwr.prototype.animGetBlocksFromRedoLogBuffer = function (blocks, delay) {
                    //movendo blocks para log writer
                    for (var _i = 0, blocks_2 = blocks; _i < blocks_2.length; _i++) {
                        var block = blocks_2[_i];
                        Orasim.getAnimation().moveTo(block.getElement(), this.element, delay, 0, function () {
                        }, function () {
                            //remova no fim da animacao
                            //$(block.getElement()).remove()            
                        });
                        delay = delay / 1.5;
                    }
                };
                return Lgwr;
            }());
            exports_32("Lgwr", Lgwr);
        }
    };
});
System.register("animation/animation.commit", ["animation/animation"], function (exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var animation_5, AnimationCommit;
    return {
        setters: [
            function (animation_5_1) {
                animation_5 = animation_5_1;
            }
        ],
        execute: function () {
            AnimationCommit = (function (_super) {
                __extends(AnimationCommit, _super);
                function AnimationCommit() {
                    var _this = _super.call(this) || this;
                    _this.animationTime = _super.prototype.getDelay.call(_this) * 5;
                    return _this;
                }
                AnimationCommit.prototype.start = function () {
                    var _this = this;
                    var redoLogBuffer = Orasim.getOracleInstance().getSga().getRedoLogBuffer();
                    var lgwr = Orasim.getOracleInstance().getLgwr();
                    var blocks = new Array();
                    //counting number of blocks used
                    //apagando status dos blocks do redo-log-buffer
                    //criando numero de blocks do numRedoBlocksUsed dentro de redo-log-buffer
                    for (var index in redoLogBuffer.getBlocks()) {
                        var block = redoLogBuffer.getBlocks()[index];
                        if (block.used()) {
                            //criando novo bloco que sera usado na animacao de envio para o log writer         
                            var newBlock = redoLogBuffer.createNewDataBlock();
                            newBlock.setColor(block.getColor());
                            blocks.push(newBlock);
                            //resetando o estado dos blocos do redo log buffer
                            block.setUsed(false);
                            block.setColor("#ffffff");
                        }
                    }
                    //implementando animacao
                    var userProcess = Orasim.getUserProcess();
                    userProcess.animateSendDataToServerProcess(this.animationTime * 0.25, "COMMIT")
                        .then(function (result) {
                        return new Promise(function (resolve, reject) {
                            var localAnimTime = _this.animationTime * 0.75;
                            //anima-los para log-writer
                            lgwr.animGetBlocksFromRedoLogBuffer(blocks, localAnimTime * 0.50);
                            //uma vez no log-writer precisamos envia-los ao redo-log-files
                            lgwr.animSendBlocksToRedoLogFiles(blocks, localAnimTime * 0.50);
                            setTimeout(function () { resolve(0); }, localAnimTime);
                        });
                    })
                        .then(function (result) {
                        return Orasim.getAnimation().setAnimating(false);
                    });
                };
                return AnimationCommit;
            }(animation_5.Animation));
            exports_33("AnimationCommit", AnimationCommit);
        }
    };
});
System.register("sql-buttons/sql.button.commit", ["animation/animation.commit"], function (exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var animation_commit_1, SqlButtonCommit;
    return {
        setters: [
            function (animation_commit_1_1) {
                animation_commit_1 = animation_commit_1_1;
            }
        ],
        execute: function () {
            SqlButtonCommit = (function () {
                function SqlButtonCommit() {
                    var _this = this;
                    //adicionando connect event handler        
                    $("#btnCommit").on('click', function () {
                        _this.handleCommit();
                    });
                }
                SqlButtonCommit.prototype.handleCommit = function () {
                    if (Orasim.getAnimation().isAnimating())
                        return;
                    new animation_commit_1.AnimationCommit().start();
                };
                return SqlButtonCommit;
            }());
            exports_34("SqlButtonCommit", SqlButtonCommit);
        }
    };
});
System.register("sql-buttons/sql.buttons", ["sql-buttons/sql.button.select", "sql-buttons/sql.button.connect", "sql-buttons/sql.button.insert", "sql-buttons/sql.button.commit"], function (exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var sql_button_select_1, sql_button_connect_1, sql_button_insert_1, sql_button_commit_1, SqlButtons;
    return {
        setters: [
            function (sql_button_select_1_1) {
                sql_button_select_1 = sql_button_select_1_1;
            },
            function (sql_button_connect_1_1) {
                sql_button_connect_1 = sql_button_connect_1_1;
            },
            function (sql_button_insert_1_1) {
                sql_button_insert_1 = sql_button_insert_1_1;
            },
            function (sql_button_commit_1_1) {
                sql_button_commit_1 = sql_button_commit_1_1;
            }
        ],
        execute: function () {
            SqlButtons = (function () {
                function SqlButtons() {
                    //criando instancia de button select, insert, connect        
                    this.sqlButtonSelect = new sql_button_select_1.SqlButtonSelect();
                    this.sqlButtonConnect = new sql_button_connect_1.SqlButtonConnect();
                    this.sqlButtonInsert = new sql_button_insert_1.SqlButtonInsert();
                    this.sqlButtonCommit = new sql_button_commit_1.SqlButtonCommit();
                }
                SqlButtons.prototype.getButtonCommit = function () {
                    return this.sqlButtonCommit;
                };
                SqlButtons.prototype.getButtonInsert = function () {
                    return this.sqlButtonInsert;
                };
                SqlButtons.prototype.getButtonConnect = function () {
                    return this.sqlButtonConnect;
                };
                SqlButtons.prototype.getButtonSelect = function () {
                    return this.sqlButtonSelect;
                };
                return SqlButtons;
            }());
            exports_35("SqlButtons", SqlButtons);
        }
    };
});
System.register("oracle-database/oracle.database", ["oracle-database/data.files"], function (exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
    var data_files_1, OracleDatabase;
    return {
        setters: [
            function (data_files_1_1) {
                data_files_1 = data_files_1_1;
            }
        ],
        execute: function () {
            OracleDatabase = (function () {
                function OracleDatabase() {
                    this.dataFiles = new data_files_1.DataFiles();
                }
                OracleDatabase.prototype.getDataFiles = function () {
                    return this.dataFiles;
                };
                return OracleDatabase;
            }());
            exports_36("OracleDatabase", OracleDatabase);
        }
    };
});
System.register("oracle-instance/sga", ["oracle-instance/db.buffer.cache", "oracle-instance/shared.pool", "oracle-instance/redo.log.buffer"], function (exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    var db_buffer_cache_1, shared_pool_1, redo_log_buffer_1, Sga;
    return {
        setters: [
            function (db_buffer_cache_1_1) {
                db_buffer_cache_1 = db_buffer_cache_1_1;
            },
            function (shared_pool_1_1) {
                shared_pool_1 = shared_pool_1_1;
            },
            function (redo_log_buffer_1_1) {
                redo_log_buffer_1 = redo_log_buffer_1_1;
            }
        ],
        execute: function () {
            Sga = (function () {
                function Sga() {
                    this.dbBufferCache = new db_buffer_cache_1.DbBufferCache();
                    this.sharedPool = new shared_pool_1.SharedPool();
                    this.redoLogBuffer = new redo_log_buffer_1.RedoLogBuffer();
                    /*
                     * Arrumar sobreposição do click da SGA e seus componentes.
                     *
                     *
                            // criando tooltip para a SGA
                            let tooltip = new Tooltip("#sga", "System Global Area (SGA)",
                            `
                            <p align="justify">
                    
                            A SGA é um grupo de estruturas de memória compartilhada, que contêm dados e informações de controle para uma única instância do banco de dados Oracle.
                            <br>
                            A SGA é compartilhada por todos os User Process e Background Process.
                    
                             `
                            )
                    */
                }
                Sga.prototype.getSharedPool = function () {
                    return this.sharedPool;
                };
                Sga.prototype.getDbBufferCache = function () {
                    return this.dbBufferCache;
                };
                Sga.prototype.getRedoLogBuffer = function () {
                    return this.redoLogBuffer;
                };
                return Sga;
            }());
            exports_37("Sga", Sga);
        }
    };
});
System.register("oracle-instance/pmon", ["utils/tooltip"], function (exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
    var tooltip_9, Pmon;
    return {
        setters: [
            function (tooltip_9_1) {
                tooltip_9 = tooltip_9_1;
            }
        ],
        execute: function () {
            Pmon = (function () {
                function Pmon() {
                    this.element = $('#pmon')[0];
                    //tooltip do pmon
                    new tooltip_9.Tooltip("#pmon", "Process Monitor (PMON)", "Olá, eu sou o PMON!");
                }
                return Pmon;
            }());
            exports_38("Pmon", Pmon);
        }
    };
});
System.register("oracle-instance/smon", ["utils/tooltip"], function (exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    var tooltip_10, Smon;
    return {
        setters: [
            function (tooltip_10_1) {
                tooltip_10 = tooltip_10_1;
            }
        ],
        execute: function () {
            Smon = (function () {
                function Smon() {
                    this.element = $('#smon')[0];
                    //tooltip do pmon
                    new tooltip_10.Tooltip("#smon", "System Monitor (SMON)", "Olá, eu sou o SMON!");
                }
                return Smon;
            }());
            exports_39("Smon", Smon);
        }
    };
});
System.register("oracle-instance/dbwr", ["utils/tooltip"], function (exports_40, context_40) {
    "use strict";
    var __moduleName = context_40 && context_40.id;
    var tooltip_11, Dbwr;
    return {
        setters: [
            function (tooltip_11_1) {
                tooltip_11 = tooltip_11_1;
            }
        ],
        execute: function () {
            Dbwr = (function () {
                function Dbwr() {
                    this.element = $('#dbwr')[0];
                    //tooltip do pmon
                    new tooltip_11.Tooltip("#dbwr", "Database Writer (DBWn)", "Olá, eu sou o DBWn!");
                }
                return Dbwr;
            }());
            exports_40("Dbwr", Dbwr);
        }
    };
});
System.register("oracle-instance/ckpt", ["utils/tooltip"], function (exports_41, context_41) {
    "use strict";
    var __moduleName = context_41 && context_41.id;
    var tooltip_12, Ckpt;
    return {
        setters: [
            function (tooltip_12_1) {
                tooltip_12 = tooltip_12_1;
            }
        ],
        execute: function () {
            Ckpt = (function () {
                function Ckpt() {
                    this.element = $('#ckpt')[0];
                    //tooltip do pmon
                    new tooltip_12.Tooltip("#ckpt", "Checkpoint Process (CKPT)", "Olá, eu sou o CKPT!");
                }
                return Ckpt;
            }());
            exports_41("Ckpt", Ckpt);
        }
    };
});
System.register("oracle-instance/arcn", ["utils/tooltip"], function (exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
    var tooltip_13, Arcn;
    return {
        setters: [
            function (tooltip_13_1) {
                tooltip_13 = tooltip_13_1;
            }
        ],
        execute: function () {
            Arcn = (function () {
                function Arcn() {
                    this.element = $('#arcn')[0];
                    //tooltip do pmon
                    new tooltip_13.Tooltip("#arcn", "Archive log (ARCn)", "Olá, eu sou o LGWR!");
                }
                return Arcn;
            }());
            exports_42("Arcn", Arcn);
        }
    };
});
System.register("oracle-instance/oracle.instance", ["oracle-instance/sga", "oracle-instance/pmon", "oracle-instance/smon", "oracle-instance/dbwr", "oracle-instance/ckpt", "oracle-instance/lgwr", "oracle-instance/arcn"], function (exports_43, context_43) {
    "use strict";
    var __moduleName = context_43 && context_43.id;
    var sga_1, pmon_1, smon_1, dbwr_1, ckpt_1, lgwr_1, arcn_1, OracleInstance;
    return {
        setters: [
            function (sga_1_1) {
                sga_1 = sga_1_1;
            },
            function (pmon_1_1) {
                pmon_1 = pmon_1_1;
            },
            function (smon_1_1) {
                smon_1 = smon_1_1;
            },
            function (dbwr_1_1) {
                dbwr_1 = dbwr_1_1;
            },
            function (ckpt_1_1) {
                ckpt_1 = ckpt_1_1;
            },
            function (lgwr_1_1) {
                lgwr_1 = lgwr_1_1;
            },
            function (arcn_1_1) {
                arcn_1 = arcn_1_1;
            }
        ],
        execute: function () {
            OracleInstance = (function () {
                function OracleInstance() {
                    this.sga = new sga_1.Sga();
                    this.pmon = new pmon_1.Pmon();
                    this.smon = new smon_1.Smon();
                    this.dbwr = new dbwr_1.Dbwr();
                    this.ckpt = new ckpt_1.Ckpt();
                    this.lgwr = new lgwr_1.Lgwr();
                    this.arcn = new arcn_1.Arcn();
                }
                OracleInstance.prototype.getSga = function () {
                    return this.sga;
                };
                OracleInstance.prototype.getLgwr = function () {
                    return this.lgwr;
                };
                return OracleInstance;
            }());
            exports_43("OracleInstance", OracleInstance);
        }
    };
});
System.register("time/delay", [], function (exports_44, context_44) {
    "use strict";
    var __moduleName = context_44 && context_44.id;
    var Delay;
    return {
        setters: [],
        execute: function () {
            Delay = (function () {
                function Delay() {
                }
                Delay.prototype.sleep = function (milliseconds) {
                    return new Promise(function (resolve) {
                        setTimeout(resolve, milliseconds);
                    });
                };
                return Delay;
            }());
            exports_44("Delay", Delay);
        }
    };
});
System.register("main", ["sql-console/sql.console", "sql-buttons/sql.buttons", "process/server.process", "process/user.process", "process/listener.process", "animation/animation", "oracle-database/oracle.database", "oracle-instance/oracle.instance", "time/delay"], function (exports_45, context_45) {
    "use strict";
    var __moduleName = context_45 && context_45.id;
    var sql_console_1, sql_buttons_1, server_process_1, user_process_1, listener_process_1, animation_6, oracle_database_1, oracle_instance_1, delay_1, Main;
    return {
        setters: [
            function (sql_console_1_1) {
                sql_console_1 = sql_console_1_1;
            },
            function (sql_buttons_1_1) {
                sql_buttons_1 = sql_buttons_1_1;
            },
            function (server_process_1_1) {
                server_process_1 = server_process_1_1;
            },
            function (user_process_1_1) {
                user_process_1 = user_process_1_1;
            },
            function (listener_process_1_1) {
                listener_process_1 = listener_process_1_1;
            },
            function (animation_6_1) {
                animation_6 = animation_6_1;
            },
            function (oracle_database_1_1) {
                oracle_database_1 = oracle_database_1_1;
            },
            function (oracle_instance_1_1) {
                oracle_instance_1 = oracle_instance_1_1;
            },
            function (delay_1_1) {
                delay_1 = delay_1_1;
            }
        ],
        execute: function () {
            /**
             * Main
             * Classe Responsável por guardar instâncias de todos os metodos
             * que possuem caracteristica de SingleTon(uma unica e apenas uma instancia)
             */
            Main = (function () {
                // criando instancias de classes SingleTon 
                function Main() {
                    this.sqlConsole = new sql_console_1.SqlConsole();
                    this.sqlButtons = new sql_buttons_1.SqlButtons();
                    this.serverProcess = new server_process_1.ServerProcess();
                    this.userProcess = new user_process_1.UserProcess();
                    this.listenerProcess = new listener_process_1.ListenerProcess();
                    this.animation = new animation_6.Animation();
                    this.oracleInstance = new oracle_instance_1.OracleInstance();
                    this.oracleDatabase = new oracle_database_1.OracleDatabase();
                    console.log('lol');
                    var delay = new delay_1.Delay();
                    yield delay.sleep(10000);
                    console.log('lal');
                }
                Main.prototype.getSqlButtons = function () {
                    return this.sqlButtons;
                };
                Main.prototype.getUserProcess = function () {
                    return this.userProcess;
                };
                Main.prototype.getServerProcess = function () {
                    return this.serverProcess;
                };
                Main.prototype.getListenerProcess = function () {
                    return this.listenerProcess;
                };
                Main.prototype.getSqlConsole = function () {
                    return this.sqlConsole;
                };
                Main.prototype.getAnimation = function () {
                    return this.animation;
                };
                Main.prototype.getOracleInstance = function () {
                    return this.oracleInstance;
                };
                Main.prototype.getOracleDatabase = function () {
                    return this.oracleDatabase;
                };
                return Main;
            }());
            // adicionando instancia da classe Main dentro de objeto global 
            // chamado Orasim(global namespace)
            window.Orasim = new Main();
        }
    };
});
