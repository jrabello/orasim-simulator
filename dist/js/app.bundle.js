/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var sql_console_1 = __webpack_require__(1);
	var sql_buttons_1 = __webpack_require__(11);
	var server_process_1 = __webpack_require__(14);
	var user_process_1 = __webpack_require__(15);
	var listener_process_1 = __webpack_require__(18);
	var animation_1 = __webpack_require__(4);
	var oracle_database_1 = __webpack_require__(19);
	var oracle_instance_1 = __webpack_require__(22);
	/**
	 * Main
	 * Classe Responsável por guardar instâncias de todos os metodos
	 * que possuem caracteristica de SingleTon(uma unica e apenas uma instancia)
	 */
	var Main = (function () {
	    // criando instancias de classes SingleTon 
	    function Main() {
	        this.sqlConsole = new sql_console_1.SqlConsole();
	        this.sqlButtons = new sql_buttons_1.SqlButtons();
	        this.serverProcess = new server_process_1.ServerProcess();
	        this.userProcess = new user_process_1.UserProcess();
	        this.listenerProcess = new listener_process_1.ListenerProcess();
	        this.animation = new animation_1.Animation();
	        this.oracleInstance = new oracle_instance_1.OracleInstance();
	        this.oracleDatabase = new oracle_database_1.OracleDatabase();
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var sql_parser_1 = __webpack_require__(2);
	var sql_console_msg_error_1 = __webpack_require__(10);
	/**
	 * SqlConsole
	 * Classe responsavel por modelar o console que o usuário usa para interagir com a aplicação
	 * @attribute {sqlParser} instancia da classe sql-parser que sera responsavel por fazer parsing da query
	 */
	var SqlConsole = (function () {
	    function SqlConsole() {
	        this.sqlParser = new sql_parser_1.SqlParser();
	    }
	    /**
	     *  handleKeyPress
	     *  Metodo responsável por receber qualquer tecla pressionada no input do console
	     *  @param   event   evento passado pelo browser de tecla pressionada
	     */
	    SqlConsole.prototype.handleKeyPress = function (event) {
	        // verificando se tecla enter foi pressionada
	        if (event.keyCode === 13) {
	            // verificando se existe alguma animacao em andamento 
	            if (Orasim.getAnimation().isAnimating()) {
	                this.addMsg(new sql_console_msg_error_1.SqlConsoleMsgError('Animação em andamento!'));
	                return;
	            }
	            // pegando valor digitado no input do console
	            // fazendo parsing da query
	            var userSqlCmd = $("#console-input").val();
	            var animation = this.sqlParser.parse(userSqlCmd);
	            // caso a query seja parseada com sucesso execute a animacao especifica
	            // caso contrario imprima uma mensagem de erro no console
	            if (this.sqlParser.parsedSuccess())
	                animation.start();
	            else
	                this.addMsg(new sql_console_msg_error_1.SqlConsoleMsgError('Query Inválida!'));
	            // limpando input do console
	            $("#console-input").val('');
	        }
	    };
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
	exports.SqlConsole = SqlConsole;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var animation_null_1 = __webpack_require__(3);
	var animation_select_1 = __webpack_require__(5);
	var crc32_1 = __webpack_require__(8);
	/**
	 * SqlParser
	 * Classe Responsavel por fazer analise lexica e sintatica de uma query sql
	 * @attribute {queryTokenId} identificador da query(SELECT, INSERT...)
	 * @attribute {isParsedSuccess} flag que indica se a query foi parseada com sucesso
	 * @attribute {query} string que armazena a query completa(SELECT * FROM...)
	 */
	var SqlParser = (function () {
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
	                var hash = new crc32_1.Crc32(lowerQuery);
	                var isHashFound = sharedPool.findHash(hash);
	                // caso o hash nao seja encontrado, adicione na shared-pool 
	                if (!isHashFound)
	                    sharedPool.addHash(hash);
	                this.isParsedSuccess = true;
	                return new animation_select_1.AnimationSelect(isHashFound);
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
	exports.SqlParser = SqlParser;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var animation_1 = __webpack_require__(4);
	/**
	 * AnimationNull
	 * Classe filha, responsavel por implementar especializacao de uma animacao vazia(seguindo null object pattern)
	 */
	var AnimationNull = (function (_super) {
	    __extends(AnimationNull, _super);
	    function AnimationNull() {
	        _super.call(this);
	    }
	    return AnimationNull;
	}(animation_1.Animation));
	exports.AnimationNull = AnimationNull;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Animation
	 * Classe Base, responsavel por implementar animações
	 * em comum com classes filhas
	 * @property {delay} quantidade de milisegundos usado como base na animacao
	 * @property {animating} atributo que salva o estado booleano da animacao
	 */
	var Animation = (function () {
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
	exports.Animation = Animation;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var animation_1 = __webpack_require__(4);
	var sql_console_msg_info_1 = __webpack_require__(6);
	/**
	 * AnimationSelect
	 * Classe responsavel por implementar animações relacionadas ao select
	 * @attribute {isHashFound} Caso o hash seja encontrado na shared-pool este atributo é marcado como true, caso contrário, false
	 * @attribute {animHashNotFoundDelay} Delay da animacao do hash nao encontrado na shared-pool
	 * @attribute {animHashFoundDelay} Delay da animacao hash encontrado
	 * @attribute {animUserProcessDelay} Delay da animacao do envio de dados para
	 */
	var AnimationSelect = (function (_super) {
	    __extends(AnimationSelect, _super);
	    function AnimationSelect(isHashFound) {
	        _super.call(this);
	        this.buildAnimSelect(isHashFound);
	    }
	    /**
	     * buildAnimSelect
	     * inicializando elementos da classe
	     * @param {isHashFound} argumento passado pelo parser sinalizando se o hash foi encontrado na shared pool ou não
	     */
	    AnimationSelect.prototype.buildAnimSelect = function (isHashFound) {
	        this.isHashFound = isHashFound;
	        this.animUserProcessDelay = _super.prototype.getDelay.call(this) * 10;
	        this.animHashNotFoundDelay = _super.prototype.getDelay.call(this) * 12;
	        this.animHashFoundDelay = _super.prototype.getDelay.call(this) * 8;
	    };
	    /**
	     * start
	     * Inicio da animacao do select
	     */
	    AnimationSelect.prototype.start = function () {
	        var _this = this;
	        // setando estado de inicio da animacao
	        var userProcess = Orasim.getUserProcess();
	        Orasim.getAnimation().setAnimating(true);
	        // executando animacoes dentro de promises permitindo execucao sincrona entre animacoes        
	        // setando estado de termino da animacao        
	        userProcess.animateSendDataToServerProcess(this.animUserProcessDelay, "<span style='font-weight: bold'>SELECT</span>")
	            .then(function (result) {
	            return _this.animateSelect();
	        })
	            .then(function (result) {
	            return Orasim.getAnimation().setAnimating(false);
	        });
	    };
	    /**
	     * animateSelect
	     * Verificando se o hash na shared pool existe, selecionando animacao especifica
	     * @returns Promise<number> uma promise é retornada devido a necessidade sincrona da animacao
	     */
	    AnimationSelect.prototype.animateSelect = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            var animationTime = 0;
	            // rodar animacao especifica se o hash foi encontrado na shared-pool ou não             
	            if (_this.isHashFound) {
	                _this.animateHashFound();
	                animationTime = _this.animHashFoundDelay;
	            }
	            else {
	                _this.animateHashNotFound();
	                animationTime = _this.animHashNotFoundDelay;
	            }
	            setTimeout(function () { resolve(0); }, animationTime);
	        });
	    };
	    /**
	     * animateHashNotFound
	     * Animacao de hash not found
	     * @returns Promise<number> uma promise é retornada devido a necessidade sincrona da animacao
	     */
	    AnimationSelect.prototype.animateHashNotFound = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            var sharedPool = Orasim.getOracleInstance().getSga().getSharedPool();
	            var dataFiles = Orasim.getOracleDatabase().getDataFiles();
	            var dbBufferCache = Orasim.getOracleInstance().getSga().getDbBufferCache();
	            var sqlConsole = Orasim.getSqlConsole();
	            var serverProcess = Orasim.getServerProcess();
	            var userProcess = Orasim.getUserProcess();
	            // hash nao encontrado
	            //sqlConsole.addMsg(new SqlConsoleMsgInfo("ServerProcess nao encontrou o hash na SharedPool"))
	            //sqlConsole.addMsg(new SqlConsoleMsgInfo("ServerProcess criando hash da user query"))
	            sqlConsole.addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo("< SP > <span style='font-weight: bold'>HARD</span> parse concluído, gerado <span style='font-weight: bold'>SQL_ID</span>: " + sharedPool.getLastHash().getHexStrHash()));
	            // animacao adicionando hash na shared pool
	            // pegando a area de memoria do ultimo dado adicionado no db-buffer-cache            
	            sharedPool.animateAddHash();
	            var memLocation = sharedPool.getLastMemoryLocation();
	            // animacao requisitando dados do dataFiles
	            // animacao gravando dados no dbBufferCache
	            // animacao pegando dados do dbBufferCache
	            // animacao enviando dados para userProcess
	            var blockHtml = serverProcess.animateGetBlockFromDataFiles(dataFiles, _this.animHashNotFoundDelay * 0.25);
	            serverProcess.animateStoreBlockInDbBufferCache(blockHtml, dbBufferCache, memLocation, _this.animHashNotFoundDelay * 0.25);
	            serverProcess.animateGetBlockFromDbBufferCache(blockHtml, dbBufferCache, _this.animHashNotFoundDelay * 0.25);
	            serverProcess.animateSendBlockToUserProcess(blockHtml, userProcess, _this.animHashNotFoundDelay * 0.25);
	            //termino da animacao        
	            setTimeout(function () {
	                //removendo block do DOM                     
	                $(blockHtml).remove();
	                resolve(0);
	            }, _this.animHashNotFoundDelay);
	        }); //end promise
	    };
	    /**
	     * animateHashFound
	     * Animacao de hash found
	     * @returns Promise<number> uma promise é retornada devido a necessidade sincrona da animacao
	     */
	    AnimationSelect.prototype.animateHashFound = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            var sharedPool = Orasim.getOracleInstance().getSga().getSharedPool();
	            var dataFiles = Orasim.getOracleDatabase().getDataFiles();
	            var dbBufferCache = Orasim.getOracleInstance().getSga().getDbBufferCache();
	            var sqlConsole = Orasim.getSqlConsole();
	            var serverProcess = Orasim.getServerProcess();
	            var userProcess = Orasim.getUserProcess();
	            // pegando localizacao do bloco 
	            var memLocation = sharedPool.getLastMemoryLocation();
	            // animacao pegando dados do dbBufferCache
	            // animacao enviando dados para userProcess
	            var blockHtml = serverProcess.animateGetNewBlockFromDbBufferCache(dbBufferCache, memLocation, _this.animHashFoundDelay * 0.5);
	            serverProcess.animateSendBlockToUserProcess(blockHtml, userProcess, _this.animHashFoundDelay * 0.5);
	            //termino da animacao
	            setTimeout(function () {
	                //removendo block do DOM
	                blockHtml.remove();
	                resolve(0);
	            }, _this.animHashFoundDelay);
	        }); //end promise
	    };
	    return AnimationSelect;
	}(animation_1.Animation));
	exports.AnimationSelect = AnimationSelect;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var sql_console_message_1 = __webpack_require__(7);
	/**
	 * SqlConsoleMsgInfo
	 * Classe responsavel por especializar mensagens de informacao da aplicacao
	 */
	var SqlConsoleMsgInfo = (function (_super) {
	    __extends(SqlConsoleMsgInfo, _super);
	    function SqlConsoleMsgInfo(msg) {
	        _super.call(this, 'info', msg);
	    }
	    return SqlConsoleMsgInfo;
	}(sql_console_message_1.SqlConsoleMessage));
	exports.SqlConsoleMsgInfo = SqlConsoleMsgInfo;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * SqlConsoleMessage
	 * Classe Base, responsavel por modelar as mensagens que serão inseridas no console da aplicação
	 */
	var SqlConsoleMessage = (function () {
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
	exports.SqlConsoleMessage = SqlConsoleMessage;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var hash_1 = __webpack_require__(9);
	/**
	 * Crc32
	 * Classe responsavel por especializar um hash modelando o crc32
	 */
	var Crc32 = (function (_super) {
	    __extends(Crc32, _super);
	    function Crc32(data) {
	        _super.call(this);
	        this.buildCrc(data);
	    }
	    /**
	     * buildCrc
	     * Metodo responsavel por construir o hash crc32
	     *
	     * @param  {data}     dados que serão utilizados pra gerar o hash
	     */
	    Crc32.prototype.buildCrc = function (data) {
	        var uintCrc = (new Uint32Array([this.crc32Str(data)]))[0];
	        _super.prototype.setHash.call(this, uintCrc);
	    };
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
	}(hash_1.Hash));
	exports.Crc32 = Crc32;


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Hash
	 * Class Base, responsavel por armazenar e definir metodos relacionados a geracao de hashs
	 * @attribute {hash} hash armazenado na forma de um numero
	 */
	var Hash = (function () {
	    function Hash() {
	    }
	    /**
	     * getHexStrHash
	     * @returns retorna representacao em hexadecimal do hash
	     */
	    Hash.prototype.getHexStrHash = function () {
	        return this.hash.toString(16);
	    };
	    Hash.prototype.setHash = function (hash) {
	        this.hash = hash;
	    };
	    Hash.prototype.getHash = function () {
	        return this.hash;
	    };
	    return Hash;
	}());
	exports.Hash = Hash;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var sql_console_message_1 = __webpack_require__(7);
	/**
	 * SqlConsoleMsgError
	 * Classe responsavel por especializar mensagens de erro
	 * do console da aplicacao
	 */
	var SqlConsoleMsgError = (function (_super) {
	    __extends(SqlConsoleMsgError, _super);
	    function SqlConsoleMsgError(msg) {
	        _super.call(this, 'error', msg);
	    }
	    return SqlConsoleMsgError;
	}(sql_console_message_1.SqlConsoleMessage));
	exports.SqlConsoleMsgError = SqlConsoleMsgError;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var sql_button_select_1 = __webpack_require__(12);
	var animation_connect_1 = __webpack_require__(13);
	var SqlButtons = (function () {
	    function SqlButtons() {
	        var _this = this;
	        //adicionando connect event handler        
	        $("#btnConnect").on('click', function () {
	            _this.handleConnect();
	        });
	        //criando instancia de button select
	        this.sqlButtonSelect = new sql_button_select_1.SqlButtonSelect();
	    }
	    SqlButtons.prototype.handleConnect = function () {
	        new animation_connect_1.AnimationConnect().start();
	    };
	    /**
	     * animateSendDataToListener
	     * Metodo responsavel por animar o envio de dados ao listener
	     * @param {delay} duracao da animacao
	     * @returns uma promise retornada logo apos o tempo de animacao
	     */
	    SqlButtons.prototype.undisplayConnectDisplayCommandButtons = function () {
	        return new Promise(function (resolve, reject) {
	            $("#btnConnect").addClass("displayNone");
	            $(".btnCommands").removeClass("displayNone");
	        });
	    };
	    return SqlButtons;
	}());
	exports.SqlButtons = SqlButtons;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var animation_select_1 = __webpack_require__(5);
	var crc32_1 = __webpack_require__(8);
	var SqlButtonSelect = (function () {
	    function SqlButtonSelect() {
	        var _this = this;
	        //adicionando select event handler        
	        $("#btnSelect").on('click', function () {
	            _this.handleSelect();
	        });
	    }
	    SqlButtonSelect.prototype.handleSelect = function () {
	        //gerando o mesmo hash(crc do 'select') para todos os clicks
	        var sharedPool = Orasim.getOracleInstance().getSga().getSharedPool();
	        var query = 'select';
	        var hash = new crc32_1.Crc32(query);
	        var isHashFound = sharedPool.findHash(hash);
	        // caso o hash nao seja encontrado, adicione na shared-pool 
	        if (!isHashFound)
	            sharedPool.addHash(hash);
	        new animation_select_1.AnimationSelect(isHashFound).start();
	    };
	    return SqlButtonSelect;
	}());
	exports.SqlButtonSelect = SqlButtonSelect;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var animation_1 = __webpack_require__(4);
	/**
	 * AnimationConnect
	 * Classe responsavel por implementar animações relacionadas ao comando connect
	 * @attribute {animUserProcessDelay} Delay da animacao do envio de dados para
	 */
	var AnimationConnect = (function (_super) {
	    __extends(AnimationConnect, _super);
	    function AnimationConnect() {
	        _super.call(this);
	        this.animUserProcessDelay = _super.prototype.getDelay.call(this) * 10;
	        this.animListenerProcessDelay = _super.prototype.getDelay.call(this) * 10;
	    }
	    /**
	     * start
	     * Inicio da animacao connect
	     */
	    AnimationConnect.prototype.start = function () {
	        var _this = this;
	        var userProcess = Orasim.getUserProcess();
	        var listenerProcess = Orasim.getListenerProcess();
	        var sqlButtons = Orasim.getSqlButtons();
	        // setando estado de inicio da animacao
	        Orasim.getAnimation().setAnimating(true);
	        // executando animacoes dentro de promises permitindo execucao sincrona entre animacoes        
	        // setando estado de termino da animacao        
	        userProcess.animateSendDataToListener(this.animUserProcessDelay)
	            .then(function (res) {
	            return listenerProcess.animateSendDataToServer(_this.animListenerProcessDelay);
	        })
	            .then(function (res) {
	            return listenerProcess.animateConnectToServer(_this.animUserProcessDelay);
	        })
	            .then(function (res) {
	            return sqlButtons.undisplayConnectDisplayCommandButtons();
	        })
	            .then(function (res) {
	            return Orasim.getAnimation().setAnimating(false);
	        });
	    };
	    return AnimationConnect;
	}(animation_1.Animation));
	exports.AnimationConnect = AnimationConnect;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var sql_console_msg_info_1 = __webpack_require__(6);
	/**
	 * ServerProcess
	 * Classe responsavel por modelar o objeto ServerProcess da animacao
	 * @attribute {element} objeto html que referencia o elemento server-process
	 */
	var ServerProcess = (function () {
	    function ServerProcess() {
	        this.element = $("#server-process")[0];
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
	    /**
	     * animateGetBlockFromDataFiles
	     * Metodo responsavel por animar os blocks que o server-process pega do data-files
	     * @param {dataFiles} objeto html que representa o DataFiles
	     * @param {delay} tempo de animacao
	     * @returns retorna o novo bloco criado(htmlElement) dentro do datafiles
	     */
	    ServerProcess.prototype.animateGetBlockFromDataFiles = function (dataFiles, delay) {
	        var blockHtml = dataFiles.getNewBlockHtml();
	        Orasim.getAnimation().moveTo(blockHtml, this.getElement(), delay, 0, function () {
	            $('#server-process').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1);
	            //Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess requisitando dados do DataFiles'))   
	            Orasim.getSqlConsole().addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo("< SP > Lendo blocos em disco e carregando no <span style='font-weight: bold'>DbBufferCache</span>"));
	            //$('#data-files').repeat().fadeTo(delay/2, 0.1).fadeTo(delay/2, 1).until(1)
	            //$(blockHtml).repeat().fadeTo(delay/2, 1).fadeTo(delay/2, 1).until(1)
	        }, function () { });
	        return blockHtml;
	    };
	    /**
	     * animateStoreBlockInDbBufferCache
	     * Metodo responsavel por animar o bloco sendo salvo no db-buffer-cache
	     * @param {blockHtml} objeto html que representa o bloco animado
	     * @param {dbBufferCache} objeto html que representa o db-buffer-cache
	     * @param {memLocation} local de memoria de destino(onde o bloco sera salvo)
	     * @param {delay} tempo de animacao
	     */
	    ServerProcess.prototype.animateStoreBlockInDbBufferCache = function (blockHtml, dbBufferCache, memLocation, delay) {
	        Orasim.getAnimation().moveTo(blockHtml, dbBufferCache.getBlocks()[memLocation].getElement(), delay, delay / 6, function () {
	            // no inicio da animacao piscar server-process e db-buffer-cache 
	            $('#server-process').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1);
	            $('#db-buffer-cache').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1);
	            //Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess gravando dados no DbBufferCache'))            
	        }, function () {
	            // depois da animacao completa marcando o bloco como utilizado            
	            dbBufferCache.setMemoryLocationUsed(memLocation);
	        });
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
	    ServerProcess.prototype.animateGetNewBlockFromDbBufferCache = function (dbBufferCache, memLocation, delay) {
	        var blockHtml = dbBufferCache.getNewBlockHtmlAt(memLocation);
	        Orasim.getAnimation().moveTo(blockHtml, this.getElement(), delay, 0, function () {
	            $('#server-process').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1);
	            $('#db-buffer-cache').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1);
	            //Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess requisitando dados do DbBufferCache'))
	            Orasim.getSqlConsole().addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo("< SP > Requisitando dados do  <span style='font-weight: bold'>DbBufferCache</span>"));
	        }, function () { });
	        return blockHtml;
	    };
	    /**
	     * animateGetBlockFromDbBufferCache
	     * Metodo responsavel por animar o server-process extraindo um bloco JA EXISTENTE(criado em outro lugar) do db-buffer-cache
	     * @param {blockHtml} objeto html que representa o bloco animado
	     * @param {dbBufferCache} objeto html que representa o db-buffer-cache
	     * @param {memLocation} local de memoria de destino(onde o bloco sera salvo)
	     * @param {delay} duracao de animacao
	     */
	    ServerProcess.prototype.animateGetBlockFromDbBufferCache = function (blockHtml, dbBufferCache, delay) {
	        Orasim.getAnimation().moveTo(blockHtml, this.getElement(), delay, 0, function () {
	            $('#server-process').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1);
	            $('#db-buffer-cache').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1);
	            Orasim.getSqlConsole().addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo("< SP > Requisitando dados do  <span style='font-weight: bold'>DbBufferCache</span>"));
	            //Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess ')) 
	        }, function () { });
	    };
	    /**
	     * animateSendBlockToUserProcess
	     * Metodo responsavel por enviar bloco ao user-process
	     * @param {blockHtml} objeto html que representa o bloco animado
	     * @param {userProcess} objeto html que representa o user-process
	     * @param {delay} duracao da animacao
	     */
	    ServerProcess.prototype.animateSendBlockToUserProcess = function (blockHtml, userProcess, delay) {
	        Orasim.getAnimation().moveTo(blockHtml, userProcess.getElement(), delay, 0, function () {
	            //no inicio da animacao, piscar user-process e server-process     
	            $('.arrow.from-serverp-2-userp').show();
	            $('.arrow.from-serverp-2-userp').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1).wait().hide();
	            $('#server-process').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1);
	            $('#user-process').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1);
	            $('#user img').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1);
	            Orasim.getSqlConsole().addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo("< SP > Retornando resultado para <span style='font-weight: bold'>UserProcess</span>"));
	            //Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess enviando dados para UserProcess'))
	        }, function () {
	            //no final da animacao
	            Orasim.getSqlConsole().addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo('< UP > Comando executado com sucesso'));
	            Orasim.getSqlConsole().addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo('< UP > Aguardando nova solicitação...'));
	        });
	    };
	    return ServerProcess;
	}());
	exports.ServerProcess = ServerProcess;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tooltip_1 = __webpack_require__(16);
	var arrow_1 = __webpack_require__(17);
	var sql_console_msg_info_1 = __webpack_require__(6);
	/**
	 * UserProcess
	 * Classe responsavel por modelar o objeto UserProcess da animacao
	 * @attribute {element} objeto html que referencia o elemento user-process
	 */
	var UserProcess = (function () {
	    function UserProcess() {
	        this.element = $("#user-process")[0];
	        // criando tooltip para user-process
	        new tooltip_1.Tooltip("#user-process", "User Process", "Eu sou o user-process!");
	    }
	    UserProcess.prototype.getElement = function () {
	        return this.element;
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
	            $("#user-process").fadeTo(delay * 0.15, 0.1, function () {
	                $("#user-process").fadeTo(delay * 0.15, 1, function () {
	                    Orasim.getSqlConsole().addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo('< UP > Enviando comando ' + nameComando + ' para <span style="font-weight: bold">ServerProcess</span>'));
	                    new arrow_1.Arrow(240, 80, 80, 80, delay * 0.40).moveToRight(function () {
	                        Orasim.getSqlConsole().addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo('< SP > Realizando parse e criando plano de execução da query'));
	                        $("#server-process").fadeTo(delay * 0.15, 0.1, function () {
	                            $("#server-process").fadeTo(delay * 0.15, 1);
	                        });
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
	exports.UserProcess = UserProcess;


/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	var Tooltip = (function () {
	    /**
	     * constructor
	     * Metodo responsavel por incluir a tooltip nos elementos
	     * @param {idElement} id seletor do elemento html que recebera a tooltip
	     * @param {title} titulo da janela
	     * @param {text} texto dentro da janela
	     */
	    function Tooltip(idElement, title, text) {
	        // criando tooltip para elemento
	        $(idElement).qtip({
	            suppress: false,
	            content: {
	                title: {
	                    text: title,
	                    button: true
	                },
	                text: text
	            },
	            show: { event: 'click' },
	            style: { classes: 'qtip-light' },
	            hide: { event: 'click' }
	        });
	    }
	    return Tooltip;
	}());
	exports.Tooltip = Tooltip;


/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
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
	var Arrow = (function () {
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
	exports.Arrow = Arrow;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var sql_console_msg_info_1 = __webpack_require__(6);
	var arrow_1 = __webpack_require__(17);
	/**
	 * ListenerProcess
	 * Classe responsavel por modelar o objeto ListenerProcess da animacao
	 * @attribute {element} objeto html que referencia o elemento listener-process
	 */
	var ListenerProcess = (function () {
	    function ListenerProcess() {
	        this.element = $("#listener-process")[0];
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
	            Orasim.getSqlConsole().addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo("< LN > Validando informações da conexão"));
	            $("#listener-process").fadeTo(delay * 0.25, 0.1, function () {
	                $("#listener-process").fadeTo(delay * 0.25, 1, function () {
	                    Orasim.getSqlConsole().addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo("< LN > Iniciando o <span style='font-weight: bold'>ServerProcess</span> dedicado"));
	                    new arrow_1.Arrow(20, 190, 25, 210, delay * 0.50).moveToRightDown(function () {
	                        $("#server-process").removeClass("displayNone");
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
	            Orasim.getSqlConsole().addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo("< UP > Conectando diretamente com o <span style='font-weight: bold'>ServerProcess</span>"));
	            $("<div class='right-arrow end'>").css({
	                "left": "95px",
	                "top": "265px",
	                "width": "40px"
	            }).hide().appendTo("#animation-container").fadeTo(delay * 1, 1);
	            setTimeout(function () {
	                resolve(0);
	            }, delay);
	            Orasim.getSqlConsole().addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo("< UP > Conexão estabelecida com o <span style='font-weight: bold'>Database</span>"));
	            Orasim.getSqlConsole().addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo("< UP > Aguardando solicitação..."));
	        });
	    };
	    return ListenerProcess;
	}());
	exports.ListenerProcess = ListenerProcess;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var data_files_1 = __webpack_require__(20);
	var OracleDatabase = (function () {
	    function OracleDatabase() {
	        this.dataFiles = new data_files_1.DataFiles();
	    }
	    OracleDatabase.prototype.getDataFiles = function () {
	        return this.dataFiles;
	    };
	    return OracleDatabase;
	}());
	exports.OracleDatabase = OracleDatabase;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var block_1 = __webpack_require__(21);
	/**
	 * DataFiles
	 * Classe responsavel por modelar o objeto Data-Files do oracle database
	 * @attribute {blocks} array de objetos que guarda os blocos do data-files
	 * @attribute {element} objeto html que referencia o elemento data-files
	 */
	var DataFiles = (function () {
	    function DataFiles() {
	        this.blocks = new Array();
	        this.element = $("#data-files")[0];
	    }
	    /**
	     * getNewBlockHtml
	     * Metodo responsavel por retornar novo objeto html que sera utilizado para animacao
	     * @returns retorna objeto html(Block) para ser animado
	     */
	    DataFiles.prototype.getNewBlockHtml = function () {
	        var newBlock = new block_1.Block();
	        //criando block dentro do data-files        
	        $(this.element).prepend(newBlock.getElement());
	        $(newBlock.getElement()).offset($(this.element).offset());
	        $(newBlock.getElement()).css("position", "absolute");
	        return newBlock.getElement();
	    };
	    return DataFiles;
	}());
	exports.DataFiles = DataFiles;


/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Block
	 * Classe Responsavel modelar um bloco
	 * @attribute {size} define o tamanho de um bloco
	 * @attribute {element} objeto html que referencia o elemento user-process
	 * @attribute {isUsed} flag que determina se o bloco esta em uso
	 */
	var Block = (function () {
	    function Block() {
	        this.element = $("<div class=\"cache-box\"></div>")[0];
	        this.size = 4096;
	        this.isUsed = false;
	    }
	    /**
	     * setUsed
	     * Metodo responsavel pela animacao de marcar o bloco como usado no db-buffer-cache
	     * @param {flag} setando isUsed como usada ou livre
	     */
	    Block.prototype.setUsed = function (flag) {
	        this.isUsed = flag;
	        $(this.element).css("background-color", "#f00");
	    };
	    Block.prototype.getElement = function () {
	        return this.element;
	    };
	    return Block;
	}());
	exports.Block = Block;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var sga_1 = __webpack_require__(23);
	var pmon_1 = __webpack_require__(26);
	var OracleInstance = (function () {
	    function OracleInstance() {
	        this.sga = new sga_1.Sga();
	        this.pmon = new pmon_1.Pmon();
	    }
	    OracleInstance.prototype.getSga = function () {
	        return this.sga;
	    };
	    return OracleInstance;
	}());
	exports.OracleInstance = OracleInstance;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var db_buffer_cache_1 = __webpack_require__(24);
	var shared_pool_1 = __webpack_require__(25);
	var Sga = (function () {
	    function Sga() {
	        this.dbBufferCache = new db_buffer_cache_1.DbBufferCache();
	        this.sharedPool = new shared_pool_1.SharedPool();
	    }
	    Sga.prototype.getSharedPool = function () {
	        return this.sharedPool;
	    };
	    Sga.prototype.getDbBufferCache = function () {
	        return this.dbBufferCache;
	    };
	    return Sga;
	}());
	exports.Sga = Sga;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var block_1 = __webpack_require__(21);
	/**
	 * DbBufferCache
	 * Classe responsavel por modelar o objeto DbBufferCache do oracle instance
	 * @attribute {numBlocks} numero de blocks default que irao preencher o DbBufferCache
	 * @attribute {element} objeto html que referencia o elemento db-buffer-cache
	 * @attribute {blocks} array de objetos que guarda os blocos do data-files
	 */
	var DbBufferCache = (function () {
	    function DbBufferCache() {
	        this.numBlocks = 18;
	        this.element = $('#db-buffer-cache')[0];
	        this.blocks = new Array();
	        this.initBlocks();
	    }
	    /**
	     * initBlocks
	     * Metodo responsavel por adicionar dinamicamente os blocos dentro do db-buffer-cache
	     */
	    DbBufferCache.prototype.initBlocks = function () {
	        for (var i = 0; i < this.numBlocks; i++) {
	            var block = new block_1.Block();
	            this.blocks.push(block);
	            $('#db-buffer-cache-container').append(block.getElement());
	        }
	    };
	    /**
	     * setMemoryLocationUsed
	     * Metodo responsavel por marcar uma area de memoria como utilizada
	     * @param {memLocation} numero de id da localizacao da memoria
	     */
	    DbBufferCache.prototype.setMemoryLocationUsed = function (memLocation) {
	        this.blocks[memLocation].setUsed(true);
	    };
	    /**
	     * getNewBlockHtml
	     * Metodo responsavel por retornar novo objeto html que sera utilizado para animacao
	     * @returns retorna objeto html(Block) para ser animado
	     */
	    DbBufferCache.prototype.getNewBlockHtml = function () {
	        var newBlock = new block_1.Block();
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
	        var newBlock = new block_1.Block();
	        //adicionando elemento no DOM dinamicamente        
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
	    return DbBufferCache;
	}());
	exports.DbBufferCache = DbBufferCache;


/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * SharedPool
	 * Classe responsavel por modelar o objeto SharedPool do oracle instance
	 * @attribute {lastHashInserted} ultimo hash inserido na hash collection
	 * @attribute {hashElement} objeto html que referencia o elemento hash
	 * @attribute {element} objeto html que referencia o elemento shared-pool
	 */
	var SharedPool = (function () {
	    function SharedPool() {
	        this.hashCollection = [];
	        this.element = $("#shared-pool")[0];
	        this.hashElement = $("<li class=\"sql-hash\"></li>")[0];
	    }
	    /**
	     * animateAddHash
	     * Metodo responsavel por animar a inserção hash no hashContainer, dentro da shared-pool
	     */
	    SharedPool.prototype.animateAddHash = function () {
	        //neste caso estamos apenas dando append, nao existe animacao ainda
	        $("#hash-ul-container").append($(this.hashElement).append(this.hashCollection.slice(-1)[0].getHexStrHash())[0].outerHTML);
	    };
	    /**
	     * addHash
	     * Adiciona hash na shared-pool
	     * @param {hash} hash que sera adicionado na collection da shared-pool
	     */
	    SharedPool.prototype.addHash = function (hash) {
	        this.hashCollection.push(hash);
	    };
	    /**
	     * getLastHash
	     * Metodo responsavel por retornar ultimo hash inserido na shared pool
	     */
	    SharedPool.prototype.getLastHash = function () {
	        return this.hashCollection[this.hashCollection.length - 1];
	    };
	    /**
	     * getMemoryLocation
	     * @param {hs} hash que sera usado para busca de local da memoria
	     * @returns local de memoria onde os dados estao armazenados
	     */
	    SharedPool.prototype.getMemoryLocation = function (hs) {
	        var i = 0;
	        for (var _i = 0, _a = this.hashCollection; _i < _a.length; _i++) {
	            var hash = _a[_i];
	            if (hs.getHash() == hash.getHash())
	                return i;
	            i++;
	        }
	        return -1;
	    };
	    /**
	     * getLastMemoryLocation
	     * Metodo responsavel por retornar local de memoria do ultimo hash inserido
	     * @returns local de memoria do ultimo hash inserido
	     */
	    SharedPool.prototype.getLastMemoryLocation = function () {
	        return this.getMemoryLocation(this.hashCollection.slice(-1)[0]);
	    };
	    /**
	     * findHash
	     * @param {hs} hash que sera usado na busca
	     * @returns se o hash passado como parametro foi encontrado ou nao
	     */
	    SharedPool.prototype.findHash = function (hs) {
	        //searching for hash in collection
	        for (var _i = 0, _a = this.hashCollection; _i < _a.length; _i++) {
	            var hash = _a[_i];
	            if (hs.getHash() == hash.getHash())
	                return true;
	        }
	        return false;
	    };
	    return SharedPool;
	}());
	exports.SharedPool = SharedPool;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tooltip_1 = __webpack_require__(16);
	var Pmon = (function () {
	    function Pmon() {
	        this.element = $('#pmon')[0];
	        //tooltip do pmon
	        new tooltip_1.Tooltip("#pmon", "Process Monitor", "Olá, eu sou o pmon!");
	    }
	    return Pmon;
	}());
	exports.Pmon = Pmon;


/***/ }
/******/ ]);