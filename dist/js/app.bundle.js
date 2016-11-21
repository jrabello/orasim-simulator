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
	var sql_buttons_1 = __webpack_require__(10);
	var server_process_1 = __webpack_require__(15);
	var user_process_1 = __webpack_require__(18);
	var listener_process_1 = __webpack_require__(20);
	var animation_1 = __webpack_require__(4);
	var oracle_database_1 = __webpack_require__(22);
	var oracle_instance_1 = __webpack_require__(25);
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
	var sql_console_msg_info_1 = __webpack_require__(8);
	/**
	 * SqlConsole
	 * Classe responsavel por modelar o console que o usuário usa para interagir com a aplicação
	 * @attribute {sqlParser} instancia da classe sql-parser que sera responsavel por fazer parsing da query
	 */
	var SqlConsole = (function () {
	    function SqlConsole() {
	        this.sqlParser = new sql_parser_1.SqlParser();
	        this.addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo("<br> <span style='font-weight: bold'>&nbsp&nbsp* * * * * * * * * *&nbsp&nbsp&nbsp[&nbsp  Welcome to the ORASIM  &nbsp]&nbsp&nbsp&nbsp&nbsp* * * * * * * * * * </span><br><br>"));
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
	exports.SqlConsole = SqlConsole;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var animation_null_1 = __webpack_require__(3);
	var animation_select_1 = __webpack_require__(5);
	var crc32_1 = __webpack_require__(6);
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
	        this.animUserProcessDelay = _super.prototype.getDelay.call(this) * 2;
	        this.animHashDelay = _super.prototype.getDelay.call(this) * 10;
	    };
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
	        userProcess.animateSendDataToServerProcess(this.animUserProcessDelay, "SELECT")
	            .then(function (result) {
	            return serverProcess.animateByHash(_this.isHashFound, _this.animHashDelay);
	        })
	            .then(function (result) {
	            return Orasim.getAnimation().setAnimating(false);
	        });
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
	var hash_1 = __webpack_require__(7);
	/**
	 * Crc32
	 * Classe responsavel por especializar um hash modelando o crc32
	 */
	var Crc32 = (function (_super) {
	    __extends(Crc32, _super);
	    function Crc32(data) {
	        _super.call(this);
	        var uintCrc = this.genCrc32(data);
	        _super.prototype.setHash.call(this, uintCrc);
	        _super.prototype.setHashStr.call(this, uintCrc.toString(16));
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
	}(hash_1.Hash));
	exports.Crc32 = Crc32;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Hash
	 * Class Base, responsavel por armazenar e definir metodos relacionados a geracao de hashs
	 * @attribute {hash} hash armazenado na forma de um numero
	 */
	var Hash = (function () {
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
	    };
	    Hash.prototype.getHash = function () {
	        return this.hash;
	    };
	    return Hash;
	}());
	exports.Hash = Hash;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var sql_console_message_1 = __webpack_require__(9);
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
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var sql_button_select_1 = __webpack_require__(11);
	var sql_button_connect_1 = __webpack_require__(13);
	var SqlButtons = (function () {
	    function SqlButtons() {
	        //criando instancia de button select
	        //criando instancia de button connect
	        this.sqlButtonSelect = new sql_button_select_1.SqlButtonSelect();
	        this.sqlButtonConnect = new sql_button_connect_1.SqlButtonConnect();
	    }
	    SqlButtons.prototype.getButtonConnect = function () {
	        return this.sqlButtonConnect;
	    };
	    return SqlButtons;
	}());
	exports.SqlButtons = SqlButtons;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var animation_select_1 = __webpack_require__(5);
	var sql_id_1 = __webpack_require__(12);
	var SqlButtonSelect = (function () {
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
	        var sharedPool = Orasim.getOracleInstance().getSga().getSharedPool();
	        var query = 'select';
	        //let hash: Hash = new Crc32(query)
	        var hash = new sql_id_1.SqlId(query);
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var hash_1 = __webpack_require__(7);
	var crc32_1 = __webpack_require__(6);
	var SqlId = (function (_super) {
	    __extends(SqlId, _super);
	    function SqlId(data) {
	        _super.call(this);
	        var sqlId = this.genSqlId(data);
	        _super.prototype.setHashStr.call(this, sqlId);
	        _super.prototype.setHash.call(this, new crc32_1.Crc32(sqlId).getHash());
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
	exports.SqlId = SqlId;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var animation_connect_1 = __webpack_require__(14);
	var SqlButtonConnect = (function () {
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
	exports.SqlButtonConnect = SqlButtonConnect;


/***/ },
/* 14 */
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
	        this.animUserProcessDelay = _super.prototype.getDelay.call(this) * 3;
	        this.animListenerProcessDelay = _super.prototype.getDelay.call(this) * 3;
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
	}(animation_1.Animation));
	exports.AnimationConnect = AnimationConnect;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tooltip_1 = __webpack_require__(16);
	var sql_console_msg_info_1 = __webpack_require__(8);
	var pga_1 = __webpack_require__(17);
	/**
	 * ServerProcess
	 * Classe responsavel por modelar o objeto ServerProcess da animacao
	 * @attribute {element} objeto html que referencia o elemento server-process
	 */
	var ServerProcess = (function () {
	    function ServerProcess() {
	        this.pga = new pga_1.Pga();
	        this.element = $("#server-process")[0];
	        // criando tooltip para o ServerProcess
	        var tooltip = new tooltip_1.Tooltip("#server-process", "Server Process", "\n        <p align=\"justify\">\n\n        Oracle Database cria o Server Process para lidar com as solicita\u00E7\u00F5es dos User Process conectados \u00E0 inst\u00E2ncia. \n        O User Process sempre se comunica com um banco de dados atrav\u00E9s de um Server Process separado.\n        <br><br>\n        Os Server Process criados pela solicia\u00E7\u00E3o de uma aplica\u00E7\u00E3o de banco de dados pode executar uma ou mais das seguintes tarefas:\n        \n        <br><br>\n        - Analisar e executar instru\u00E7\u00F5es SQL emitidas atrav\u00E9s da aplica\u00E7\u00E3o, incluindo a cria\u00E7\u00E3o e execu\u00E7\u00E3o do plano de consulta.\n        \n        <br><br>\n        - Executa c\u00F3digo PL/SQL.\n        \n        <br><br>\n        - Realizar a leitura dos blocos de dados que est\u00E3o armazenados nos datafiles e carregar no Db Buffer Cache \n        (O processo background DBWn \u00E9 o respons\u00E1vel por gravar os blocos modificados de volta para o disco)\n        \n        <br><br>\n        - Retorna os resultados solicitados de uma forma que a aplica\u00E7\u00E3o pode processar as informa\u00E7\u00F5es.\n        \n        <span style='font-weight: bold'>\n        </span>\n         ");
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
	    ServerProcess.prototype.animateGetBlockFromDataFiles = function (dataFiles, hash, delay) {
	        var blockHtml = dataFiles.getNewBlockHtmlWithColor(hash.getColor());
	        Orasim.getAnimation().moveTo(blockHtml, this.getElement(), delay, 0, function () {
	            $('#server-process').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1);
	            //Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess requisitando dados do DataFiles'))   
	            Orasim.getSqlConsole().addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo("< SP > Lendo blocos em disco e carregando no <span style='font-weight: bold'>DB_BufferCache</span>"));
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
	    ServerProcess.prototype.animateStoreBlockInDbBufferCache = function (blockHtml, dbBufferCache, hash, memLocation, delay) {
	        Orasim.getAnimation().moveTo(blockHtml, dbBufferCache.getBlocks()[memLocation].getElement(), delay, delay / 6, function () {
	            // no inicio da animacao piscar server-process e db-buffer-cache 
	            $('#server-process').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1);
	            $('#db-buffer-cache').repeat().fadeTo(delay / 2, 0.1).fadeTo(delay / 2, 1).until(1);
	            //Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('ServerProcess gravando dados no DbBufferCache'))            
	        }, function () {
	            // depois da animacao completa marcando o bloco como utilizado            
	            dbBufferCache.setMemoryLocationUsed(memLocation, hash.getColor());
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
	            Orasim.getSqlConsole().addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo("< SP > Requisitando dados do  <span style='font-weight: bold'>DB_BufferCache</span>"));
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
	            Orasim.getSqlConsole().addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo("< SP > Requisitando dados do  <span style='font-weight: bold'>DB_BufferCache</span>"));
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
	    /**
	     * animateByHash
	     * Metodo responsavel pela animacao do SOFT PARSE e do HARD PARSE
	     * Verificando se o hash na shared pool existe, selecionando animacao especifica
	     * @returns Promise<number> uma promise é retornada devido a necessidade sincrona da animacao
	     */
	    ServerProcess.prototype.animateByHash = function (isHashFound, delay) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            Orasim.getSqlConsole().addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo('< SP > Realizando parse...'));
	            $("#server-process").addClass("time-clock");
	            // rodar animacao especifica se o hash foi encontrado na shared-pool ou não
	            if (isHashFound) {
	                _this.animateHashFound(delay);
	            }
	            else {
	                _this.animateHashNotFound(delay);
	            }
	            setTimeout(function () {
	                resolve(0);
	            }, delay);
	        });
	    };
	    /**
	     * animateHashNotFound
	     * Animacao de hash not found
	     * @returns Promise<number> uma promise é retornada devido a necessidade sincrona da animacao
	     */
	    ServerProcess.prototype.animateHashNotFound = function (delay) {
	        var sharedPool = Orasim.getOracleInstance().getSga().getSharedPool();
	        var dataFiles = Orasim.getOracleDatabase().getDataFiles();
	        var dbBufferCache = Orasim.getOracleInstance().getSga().getDbBufferCache();
	        var sqlConsole = Orasim.getSqlConsole();
	        var serverProcess = Orasim.getServerProcess();
	        var userProcess = Orasim.getUserProcess();
	        var blockHtml;
	        sqlConsole.addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo("< SP > Comando SQL não foi encontrado na <span style='font-weight: bold'>SharedPool</span>"));
	        setTimeout(function () {
	            sqlConsole.addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo("< SP > Criando o plano de execução da query..."));
	            setTimeout(function () {
	                sqlConsole.addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo("< SP > <span style='font-weight: bold'>HARD Parse</span> concluído, gerado <span style='font-weight: bold'>SQL_ID</span>: " + sharedPool.getLastHash().getHashStr()));
	                $("#server-process").removeClass("time-clock");
	                sharedPool.animateAddHash(); // animacao adicionando hash na shared pool
	                var lastAddedHash = sharedPool.getLastHash(); // pegando ultimo hash adicionado
	                var memLocation = sharedPool.getLastMemoryLocation(); // pegando a area de memoria do ultimo dado adicionado no db-buffer-cache
	                blockHtml = serverProcess.animateGetBlockFromDataFiles(dataFiles, lastAddedHash, delay * 0.15); // animacao requisitando dados do dataFiles
	                serverProcess.animateStoreBlockInDbBufferCache(blockHtml, dbBufferCache, lastAddedHash, memLocation, delay * 0.15); // animacao gravando dados no dbBufferCache
	                serverProcess.animateGetBlockFromDbBufferCache(blockHtml, dbBufferCache, delay * 0.15); // animacao pegando dados do dbBufferCache
	                serverProcess.animateSendBlockToUserProcess(blockHtml, userProcess, delay * 0.15); // animacao enviando dados para userProcess
	            }, delay * 0.20);
	        }, delay * 0.20);
	        //termino da animacao        
	        setTimeout(function () {
	            $(blockHtml).remove(); //removendo block do DOM
	        }, delay);
	    };
	    /**
	     * animateHashFound
	     * Animacao de hash found
	     * @returns Promise<number> uma promise é retornada devido a necessidade sincrona da animacao
	     */
	    ServerProcess.prototype.animateHashFound = function (delay) {
	        var sharedPool = Orasim.getOracleInstance().getSga().getSharedPool();
	        var dataFiles = Orasim.getOracleDatabase().getDataFiles();
	        var dbBufferCache = Orasim.getOracleInstance().getSga().getDbBufferCache();
	        var sqlConsole = Orasim.getSqlConsole();
	        var serverProcess = Orasim.getServerProcess();
	        var userProcess = Orasim.getUserProcess();
	        // pegando localizacao do bloco 
	        // pegando ultimo hash adicionado         
	        var lastAddedHash = sharedPool.getLastHash();
	        var memLocation = sharedPool.getLastMemoryLocation();
	        $("#server-process").removeClass("time-clock");
	        // animacao pegando dados do dbBufferCache
	        // animacao enviando dados para userProcess
	        var blockHtml = serverProcess.animateGetNewBlockFromDbBufferCache(dbBufferCache, memLocation, delay * 0.15);
	        serverProcess.animateSendBlockToUserProcess(blockHtml, userProcess, delay * 0.15);
	        //termino da animacao
	        setTimeout(function () {
	            //removendo block do DOM
	            blockHtml.remove();
	        }, delay * 0.3);
	    };
	    return ServerProcess;
	}());
	exports.ServerProcess = ServerProcess;


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
	    }
	    return Tooltip;
	}());
	exports.Tooltip = Tooltip;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tooltip_1 = __webpack_require__(16);
	var Pga = (function () {
	    function Pga() {
	        // criando tooltip para a PGA
	        var tooltip = new tooltip_1.Tooltip("#pga", "Program Global Area (PGA)", "\n        <p align=\"justify\">\n\n        A PGA \u00E9 uma regi\u00E3o de mem\u00F3ria que cont\u00E9m os dados e informa\u00E7\u00F5es de controle para um Server Process.\n        <br><br>\n        \u00C9 uma \u00E1rea de  mem\u00F3ria n\u00E3o compartilhada criada pelo Oracle quando um Server Process \u00E9 iniciado.\n        <br><br>\n        O acesso a PGA \u00E9 exclusivo para do seu Server Process. Para cada Server Process existe uma PGA.\n\n         ");
	    }
	    return Pga;
	}());
	exports.Pga = Pga;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tooltip_1 = __webpack_require__(16);
	var arrow_1 = __webpack_require__(19);
	var sql_console_msg_info_1 = __webpack_require__(8);
	/**
	 * UserProcess
	 * Classe responsavel por modelar o objeto UserProcess da animacao
	 * @attribute {element} objeto html que referencia o elemento user-process
	 */
	var UserProcess = (function () {
	    function UserProcess() {
	        this.element = $("#user-process")[0];
	        // criando tooltip para o UserProcess
	        var tooltip = new tooltip_1.Tooltip("#user-process", "User Process", "\n        <p align=\"justify\">\n\n        Quando um usu\u00E1rio executa uma aplica\u00E7\u00E3o, como por exemplo o SQL*Plus, o sistema operacional cria um processo cliente (User Process) para executar a aplica\u00E7\u00E3o do usu\u00E1rio.\n        <br><br>\n        <span style='font-weight: bold'>\n        User Process e Server Process\n        </span>\n        <br><br>\n        Os User Process diferem em aspectos importantes dos Server Process que interagem diretamente com a inst\u00E2ncia.\n        <br><br>\n        Os Server Process trabalham para o User Process realizando leitura e escrita na SGA, ao passo que o User Process n\u00E3o pode fazer isso.\n        <br><br>\n        Um User Process pode ser executado em um host diferente do host em que o banco est\u00E1, enquanto que o Server Process n\u00E3o pode.\n        ");
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
	exports.UserProcess = UserProcess;


/***/ },
/* 19 */
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tooltip_1 = __webpack_require__(16);
	var sql_console_msg_info_1 = __webpack_require__(8);
	var sql_console_msg_warning_1 = __webpack_require__(21);
	var arrow_1 = __webpack_require__(19);
	/**
	 * ListenerProcess
	 * Classe responsavel por modelar o objeto ListenerProcess da animacao
	 * @attribute {element} objeto html que referencia o elemento listener-process
	 */
	var ListenerProcess = (function () {
	    function ListenerProcess() {
	        this.element = $("#listener-process")[0];
	        // criando tooltip para o Listener
	        var tooltip = new tooltip_1.Tooltip("#listener-process", "Listener", "\n        <p align=\"justify\">\n\n        Os passos b\u00E1sicos pelo qual um processo cliente (UserProcess) estabelece uma conex\u00E3o atrav\u00E9s com um Listener s\u00E3o:\n        <br><br>\n        1. Um processo cliente ou outro banco de dados solicita uma conex\u00E3o.\n        <br><br>\n        2. O Listener seleciona um \"service handler\" (manipulador de servi\u00E7o) adequado para atender \u00E0 solicita\u00E7\u00E3o do client e encaminha a solicita\u00E7\u00E3o para o manipulador.\n        <br><br>    \n        3. O processo cliente conecta-se diretamente no \"service handler\" (manipulador de servi\u00E7o). O Listener n\u00E3o est\u00E1 envolvida na comunica\u00E7\u00E3o.\n        \n        <span style='font-weight: bold'>\n        </span>\n         ");
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
	            Orasim.getSqlConsole().addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo("< UP > Conectando diretamente com o <span style='font-weight: bold'>ServerProcess</span>"));
	            $("<div id='connection-arrow' class='right-arrow end'>").css({
	                "left": "95px",
	                "top": "265px",
	                "width": "40px"
	            }).hide().appendTo("#animation-container").fadeTo(delay, 1);
	            setTimeout(function () {
	                Orasim.getSqlConsole().addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo("< UP > Conexão estabelecida com o <span style='font-weight: bold'>Database</span>"));
	                Orasim.getSqlConsole().addMsg(new sql_console_msg_warning_1.SqlConsoleMsgWarning("< UP > Aguardando solicitação..."));
	                resolve(0);
	            }, delay * 0.8);
	        });
	    };
	    return ListenerProcess;
	}());
	exports.ListenerProcess = ListenerProcess;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var sql_console_message_1 = __webpack_require__(9);
	/**
	 * SqlConsoleMsgWarning
	 * Classe responsavel por especializar mensagens de aviso do console da aplicacao
	 */
	var SqlConsoleMsgWarning = (function (_super) {
	    __extends(SqlConsoleMsgWarning, _super);
	    function SqlConsoleMsgWarning(msg) {
	        _super.call(this, 'warning', msg);
	    }
	    return SqlConsoleMsgWarning;
	}(sql_console_message_1.SqlConsoleMessage));
	exports.SqlConsoleMsgWarning = SqlConsoleMsgWarning;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var data_files_1 = __webpack_require__(23);
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var data_block_1 = __webpack_require__(24);
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
	exports.DataFiles = DataFiles;


/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Block
	 * Classe Responsavel modelar um bloco (data block)
	 * @attribute {size} define o tamanho de um bloco
	 * @attribute {element} objeto html que referencia o elemento user-process
	 * @attribute {isUsed} flag que determina se o bloco esta em uso
	 */
	var DataBlock = (function () {
	    function DataBlock() {
	        this.element = $("<div class=\"cache-box\"></div>")[0];
	        this.size = 4096;
	        this.isUsed = false;
	        this.color = "#ffffff";
	    }
	    /**
	     * setUsed
	     * Metodo responsavel pela animacao de marcar o bloco como usado no db-buffer-cache
	     * @param {flag} setando isUsed como usada ou livre
	     */
	    DataBlock.prototype.setUsed = function (flag, color) {
	        this.isUsed = flag;
	        //$(this.element).css("background-color","#f00")
	        this.setColor(color);
	    };
	    /**
	     * setColor
	     * Metodo responsavel ppor setar cor do block
	     * @param {color} cor no seguinte formato #ffffff
	     */
	    DataBlock.prototype.setColor = function (color) {
	        this.color = color;
	        $(this.element).css("background-color", this.color);
	    };
	    DataBlock.prototype.getColor = function () {
	        return this.color;
	    };
	    DataBlock.prototype.getElement = function () {
	        return this.element;
	    };
	    return DataBlock;
	}());
	exports.DataBlock = DataBlock;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var sga_1 = __webpack_require__(26);
	var pmon_1 = __webpack_require__(30);
	var smon_1 = __webpack_require__(31);
	var dbwr_1 = __webpack_require__(32);
	var ckpt_1 = __webpack_require__(33);
	var lgwr_1 = __webpack_require__(34);
	var arcn_1 = __webpack_require__(35);
	var OracleInstance = (function () {
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
	    return OracleInstance;
	}());
	exports.OracleInstance = OracleInstance;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var db_buffer_cache_1 = __webpack_require__(27);
	var shared_pool_1 = __webpack_require__(28);
	var redo_log_buffer_1 = __webpack_require__(29);
	var Sga = (function () {
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
	exports.Sga = Sga;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tooltip_1 = __webpack_require__(16);
	var data_block_1 = __webpack_require__(24);
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
	        // criando tooltip para o DbBufferCache
	        var tooltip = new tooltip_1.Tooltip("#db-buffer-cache", "DB Buffer Cache", "\n        <p align=\"justify\">\n        O DB Buffer Cache ou apenas Buffer Cache, \u00E9 a \u00E1rea de mem\u00F3ria que armazena as c\u00F3pias dos blocos de dados lidos a partir dos datafiles. \n        <br><br>\n        Um buffer \u00E9 um endere\u00E7o de mem\u00F3ria principal em que o gerenciador de buffer armazena temporariamente um bloco de dados usado no momento ou recentemente. \n        <br><br>\n        Todos os usu\u00E1rios conectados simultaneamente na inst\u00E2ncia do banco de dados compartilham os acessos ao Buffer Cache.\n        <br><br><br>\n        \n        O Oracle usa o buffer cache para atingir os seguintes objectivos:\n        <br><br>\n        <span style='font-weight: bold'>\n        # Otimiza\u00E7\u00E3o do I/O f\u00EDsico \n        </span><br><br>\n        \n        O banco de dados atualiza os blocos de dados no cache e armazena os metadados refer\u00EAnte a essas mudan\u00E7as no Redo Log Buffer.\n        Depois de um COMMIT, o Oracle grava os redo buffers no disco, mas n\u00E3o escreve imediatamente os blocos de dados no disco. \n        Quem faz essa escrita \u00E9 o Database Writer (DBWn) com algumas condi\u00E7\u00F5es.\n \n        <br><br>\n        <span style='font-weight: bold'>\n        # Manter blocos frequentemente acessados no buffer cache e escrever blocos pouco acessados no disco.\n        </span><br><br>\n\n        <span style='font-weight: bold'>\n        # Estados do buffer\n        </span><br><br>\n\n        O Oracle usa algoritmos internos para gerenciar buffers no cache. \n        Um buffer pode estar qualquer um dos seguintes estados que se excluem mutuamente:\n        <br><br>\n        \n        - Unused (N\u00E3o usado)\n        <br>\n        O buffer est\u00E1 dispon\u00EDvel para uso, porque ele nunca foi usado ou est\u00E1 atualmente sem uso. \n        <br>\n        Este tipo de buffer \u00E9 o mais f\u00E1cil para o banco de dados para usar.\n        <br><br>\n        \n        - Clean (Limpo)\n        <br>\n        Este buffer foi utilizado anteriormente e agora cont\u00E9m uma vers\u00E3o de leitura consistente de um bloco a partir de um ponto no tempo. \n        O bloco cont\u00E9m dados, mas est\u00E1 \"limpo\" e n\u00E3o precisa de checkpoint, ou seja, ser gravado em disco pelo Database Writer. \n        O Oracle pode selecionar este bloco e reutiliz\u00E1-lo.\n        <br><br>\n        \n        - Dirty (Sujo)\n        <br>\n        O buffer cont\u00EAm dados modificados que ainda n\u00E3o foram gravadas no disco. \n        O Oracle precisa fazer o checkpoint do bloco antes de reutiliz\u00E1-lo.\n         ");
	    }
	    /**
	     * initBlocks
	     * Metodo responsavel por adicionar dinamicamente os blocos dentro do db-buffer-cache
	     */
	    DbBufferCache.prototype.initBlocks = function () {
	        for (var i = 0; i < this.numBlocks; i++) {
	            var block = new data_block_1.DataBlock();
	            this.blocks.push(block);
	            $('#db-buffer-cache-container').append(block.getElement());
	        }
	    };
	    /**
	     * setMemoryLocationUsed
	     * Metodo responsavel por marcar uma area de memoria como utilizada
	     * @param {memLocation} numero de id da localizacao da memoria
	     */
	    DbBufferCache.prototype.setMemoryLocationUsed = function (memLocation, color) {
	        this.blocks[memLocation].setUsed(true, color);
	    };
	    /**
	     * getNewBlockHtml
	     * Metodo responsavel por retornar novo objeto html que sera utilizado para animacao
	     * @returns retorna objeto html(Block) para ser animado
	     */
	    DbBufferCache.prototype.getNewBlockHtml = function () {
	        var newBlock = new data_block_1.DataBlock();
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
	        var newBlock = new data_block_1.DataBlock();
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
	    return DbBufferCache;
	}());
	exports.DbBufferCache = DbBufferCache;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tooltip_1 = __webpack_require__(16);
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
	        //this.hashElement = $(`<li class="sql-hash"></li>`)[0]        
	        // criando tooltip para o SharedPool
	        var tooltip = new tooltip_1.Tooltip("#shared-pool", "Shared Pool", "\n        <p align=\"justify\">\n        Shared Pool xxxx\n\n        xxxxxxxxxxxxxxxxxxxxxxx\n        xxxxxxxxxxxxxxxxxxxxxxxx\n        xxxxxxxxxxxxxxxxxxxxxxx\n        ");
	    }
	    /**
	     * animateAddHash
	     * Metodo responsavel por animar a inserção hash no hashContainer, dentro da shared-pool
	     */
	    SharedPool.prototype.animateAddHash = function () {
	        //neste caso estamos apenas dando append na DOM tree, nao existe animacao ainda
	        var lastAddedHash = this.hashCollection.slice(-1)[0];
	        var hashElement = $("<li class=\"sql-hash\"></li>")[0];
	        var idHashHtmlElement = lastAddedHash.getHash().toString(16);
	        //adicionando elemento na DOM tree
	        //adicionando id no elemento
	        //adicionando cor no elemento
	        //adicionando representacao em string do hash
	        $("#hash-ul-container").append(hashElement);
	        $(hashElement).attr('id', idHashHtmlElement);
	        lastAddedHash.setColor('#' + idHashHtmlElement);
	        $('#' + idHashHtmlElement).css('color', lastAddedHash.getColor());
	        $('#' + idHashHtmlElement).append(lastAddedHash.getHashStr());
	        //$(hashElement).append(lastAddedHash.getHashStr())[0].outerHTML)                
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tooltip_1 = __webpack_require__(16);
	/**
	 * Redo Log Buffer
	 * Classe responsavel por modelar o objeto RedoLogBuffer do oracle instance
	 * @attribute
	 * @attribute
	 */
	var RedoLogBuffer = (function () {
	    function RedoLogBuffer() {
	        // criando tooltip para o RedoLogBuffer
	        var tooltip = new tooltip_1.Tooltip("#redo-log-buffer", "Redo Log Buffer", "\n        <p align=\"justify\">\n\n        O Redo Log Buffer \u00E9 um buffer circular da SGA que cont\u00E9m informa\u00E7\u00F5es sobre as altera\u00E7\u00F5es feitas no banco de dados.\n        <br><br>\n        As informa\u00E7\u00F5es de Redo cont\u00EAm dados necess\u00E1rias para reconstruir ou refazer, as altera\u00E7\u00F5es feitas no banco de dados, como: INSERT, UPDATE, DELETE, CREATE, ALTER ou DROP.\n        Estas informa\u00E7\u00F5es s\u00E3o usadas para recupera\u00E7\u00E3o do banco de dados, se necess\u00E1rio.\n        <br><br>\n        As entradas de redo ocupam espa\u00E7o cont\u00EDnuo, sequencial no buffer. O processo background <span style='font-weight: bold'>Log Writer (LGWR)</span> grava as informa\u00E7\u00F5es do Redo Log Buffer para o Redo Log File em disco.\n         ");
	    }
	    return RedoLogBuffer;
	}());
	exports.RedoLogBuffer = RedoLogBuffer;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tooltip_1 = __webpack_require__(16);
	var Pmon = (function () {
	    function Pmon() {
	        this.element = $('#pmon')[0];
	        //tooltip do pmon
	        new tooltip_1.Tooltip("#pmon", "Process Monitor (PMON)", "Olá, eu sou o PMON!");
	    }
	    return Pmon;
	}());
	exports.Pmon = Pmon;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tooltip_1 = __webpack_require__(16);
	var Smon = (function () {
	    function Smon() {
	        this.element = $('#smon')[0];
	        //tooltip do pmon
	        new tooltip_1.Tooltip("#smon", "System Monitor (SMON)", "Olá, eu sou o SMON!");
	    }
	    return Smon;
	}());
	exports.Smon = Smon;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tooltip_1 = __webpack_require__(16);
	var Dbwr = (function () {
	    function Dbwr() {
	        this.element = $('#dbwr')[0];
	        //tooltip do pmon
	        new tooltip_1.Tooltip("#dbwr", "Database Writer (DBWn)", "Olá, eu sou o DBWn!");
	    }
	    return Dbwr;
	}());
	exports.Dbwr = Dbwr;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tooltip_1 = __webpack_require__(16);
	var Ckpt = (function () {
	    function Ckpt() {
	        this.element = $('#ckpt')[0];
	        //tooltip do pmon
	        new tooltip_1.Tooltip("#ckpt", "Checkpoint Process (CKPT)", "Olá, eu sou o CKPT!");
	    }
	    return Ckpt;
	}());
	exports.Ckpt = Ckpt;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tooltip_1 = __webpack_require__(16);
	var Lgwr = (function () {
	    function Lgwr() {
	        this.element = $('#lgwr')[0];
	        //tooltip do pmon
	        new tooltip_1.Tooltip("#lgwr", "Log Writer (LGWR)", "Olá, eu sou o LGWR!");
	    }
	    return Lgwr;
	}());
	exports.Lgwr = Lgwr;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tooltip_1 = __webpack_require__(16);
	var Arcn = (function () {
	    function Arcn() {
	        this.element = $('#arcn')[0];
	        //tooltip do pmon
	        new tooltip_1.Tooltip("#arcn", "Archive log (ARCn)", "Olá, eu sou o LGWR!");
	    }
	    return Arcn;
	}());
	exports.Arcn = Arcn;


/***/ }
/******/ ]);