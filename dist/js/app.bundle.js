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
	var server_process_1 = __webpack_require__(6);
	var user_process_1 = __webpack_require__(7);
	var animation_1 = __webpack_require__(8);
	var oracle_database_1 = __webpack_require__(11);
	var oracle_instance_1 = __webpack_require__(14);
	var Main = (function () {
	    function Main() {
	        this.sqlConsole = new sql_console_1.SqlConsole();
	        this.serverProcess = new server_process_1.ServerProcess();
	        this.userProcess = new user_process_1.UserProcess();
	        this.animation = new animation_1.Animation();
	        this.oracleInstance = new oracle_instance_1.OracleInstance();
	        this.oracleDatabase = new oracle_database_1.OracleDatabase();
	    }
	    Main.prototype.getUserProcess = function () {
	        return this.userProcess;
	    };
	    Main.prototype.getServerProcess = function () {
	        return this.serverProcess;
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
	//storing main instance into global namespace
	window.Orasim = new Main();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var sql_parser_1 = __webpack_require__(2);
	var sql_console_msg_info_1 = __webpack_require__(3);
	var sql_console_msg_error_1 = __webpack_require__(5);
	var SqlConsole = (function () {
	    function SqlConsole() {
	        this.sqlParser = new sql_parser_1.SqlParser();
	    }
	    SqlConsole.prototype.handleKeyPress = function (e) {
	        //enter key pressed
	        if (e.keyCode === 13) {
	            var userSqlCmd = $("#console-input").val();
	            this.sqlParser.parse(userSqlCmd);
	            this.addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo('( ' + this.sqlParser.getQuery() + ' )'));
	            if (this.sqlParser.parsedSuccess())
	                Orasim.getAnimation().start(this.sqlParser);
	            else
	                this.addMsg(new sql_console_msg_error_1.SqlConsoleMsgError('Query Inválida!'));
	            $("#console-input").val('');
	        }
	    };
	    SqlConsole.prototype.addMsg = function (msg) {
	        $("#console-msg-list-container").append(msg.getMsg());
	    };
	    SqlConsole.prototype.logPrint = function (aMsg) {
	        console.log(aMsg);
	    };
	    return SqlConsole;
	}());
	exports.SqlConsole = SqlConsole;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var SqlParser = (function () {
	    function SqlParser() {
	        this.isParsedSuccess = false;
	        this.query = "";
	        this.isParsedSuccess = false;
	    }
	    SqlParser.prototype.parse = function (query) {
	        try {
	            SQLParser.parse(query);
	            this.query = query;
	            this.queryTokenId = SQLParser.lexer.tokenize(query)[0][0];
	            this.isParsedSuccess = true;
	        }
	        catch (err) {
	            console.log("Erro SqlParser.parse:", err);
	            this.isParsedSuccess = false;
	            this.queryTokenId = "";
	            this.query = "";
	        }
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
	var sql_console_message_1 = __webpack_require__(4);
	var SqlConsoleMsgInfo = (function (_super) {
	    __extends(SqlConsoleMsgInfo, _super);
	    function SqlConsoleMsgInfo(msg) {
	        _super.call(this, 'info', msg);
	    }
	    return SqlConsoleMsgInfo;
	}(sql_console_message_1.SqlConsoleMessage));
	exports.SqlConsoleMsgInfo = SqlConsoleMsgInfo;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	var SqlConsoleMessage = (function () {
	    function SqlConsoleMessage(type, msg) {
	        this.msgElement = $("<li class=\"console-li-" + type + "\">" + msg + "</li>")[0];
	    }
	    SqlConsoleMessage.prototype.getMsg = function () {
	        return this.msgElement;
	    };
	    return SqlConsoleMessage;
	}());
	exports.SqlConsoleMessage = SqlConsoleMessage;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var sql_console_message_1 = __webpack_require__(4);
	var SqlConsoleMsgError = (function (_super) {
	    __extends(SqlConsoleMsgError, _super);
	    function SqlConsoleMsgError(msg) {
	        _super.call(this, 'error', msg);
	    }
	    return SqlConsoleMsgError;
	}(sql_console_message_1.SqlConsoleMessage));
	exports.SqlConsoleMsgError = SqlConsoleMsgError;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	var ServerProcess = (function () {
	    function ServerProcess() {
	        this.element = $("#server-process")[0];
	    }
	    ServerProcess.prototype.getElement = function () {
	        return this.element;
	    };
	    ServerProcess.prototype.getElementOffset = function () {
	        return $(this.element).offset();
	    };
	    ServerProcess.prototype.getBlockFromDatFiles = function (dataFiles, delay) {
	        var blockHtml = dataFiles.getNewBlockHtml();
	        Orasim.getAnimation().moveTo(blockHtml, this.getElement(), delay);
	        return blockHtml;
	    };
	    //DbBufferCache
	    ServerProcess.prototype.getNewBlockFromDbBufferCache = function (dbBufferCache, delay) {
	        var blockHtml = dbBufferCache.getNewBlockHtml();
	        Orasim.getAnimation().moveTo(blockHtml, this.getElement(), delay);
	        return blockHtml;
	    };
	    ServerProcess.prototype.storeBlockInDbBufferCache = function (blockHtml, dbBufferCache, memLocation, delay) {
	        Orasim.getAnimation().moveTo(blockHtml, dbBufferCache.getElement(), delay, function () {
	            dbBufferCache.setMemoryLocationUsed(memLocation);
	        });
	    };
	    ServerProcess.prototype.getBlockFromDbBufferCache = function (blockHtml, dbBufferCache, delay) {
	        Orasim.getAnimation().moveTo(blockHtml, this.getElement(), delay);
	    };
	    //UserProcess
	    ServerProcess.prototype.sendDataToUserProcess = function (blockHtml, userProcess, delay) {
	        Orasim.getAnimation().moveTo(blockHtml, userProcess.getElement(), delay);
	    };
	    return ServerProcess;
	}());
	exports.ServerProcess = ServerProcess;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	var UserProcess = (function () {
	    function UserProcess() {
	        this.element = $("#user-process")[0];
	    }
	    UserProcess.prototype.getElement = function () {
	        return this.element;
	    };
	    return UserProcess;
	}());
	exports.UserProcess = UserProcess;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var crc32_1 = __webpack_require__(9);
	var sql_console_msg_info_1 = __webpack_require__(3);
	var Animation = (function () {
	    function Animation() {
	        //miliseconds
	        this.delay = 1000;
	    }
	    Animation.prototype.start = function (sqlParser) {
	        //if here query was parsed successfully       
	        if (sqlParser.getQueryTokenId() == "SELECT") {
	            this.selectAnimation(sqlParser);
	        }
	    };
	    // animate source to dest within delay
	    Animation.prototype.moveTo = function (sourceElem, destElem, delay) {
	        var x;
	        var y;
	        x = $(destElem).offset().top - $(sourceElem).offset().top + $(sourceElem).position().top;
	        y = ($(destElem).offset().left - $(sourceElem).offset().left) + $(sourceElem).position().left;
	        $(sourceElem).animate({ top: x, left: y }, { duration: delay * 2,
	            complete: function () { return null; } });
	    };
	    Animation.prototype.selectAnimation = function (sqlParser) {
	        var _this = this;
	        var query = sqlParser.getQuery();
	        var hash = new crc32_1.Crc32(query);
	        this.sendDataFromUserProcessToServerProcess()
	            .then(function (res) {
	            return _this.serverProcessDoSelect(hash);
	        });
	    };
	    Animation.prototype.sendDataFromUserProcessToServerProcess = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            //animate user process sending 2 server process            
	            $('.arrow.from-userp-2-serverp').show();
	            $('.arrow.from-userp-2-serverp').repeat().fadeTo(_this.delay, 0.1).fadeTo(_this.delay, 1).until(2).wait().hide();
	            $('#server-process').repeat().fadeTo(_this.delay, 0.1).fadeTo(_this.delay, 1).until(2);
	            $('#user-process').repeat().fadeTo(_this.delay, 0.1).fadeTo(_this.delay, 1).until(2);
	            $('#user img').repeat().fadeTo(_this.delay, 0.1).fadeTo(_this.delay, 1).until(2);
	            setTimeout(function () {
	                resolve(0);
	            }, _this.delay * 2 * 2);
	        });
	    };
	    Animation.prototype.serverProcessDoSelect = function (hash) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            var animationTime = 0;
	            var dataFiles = Orasim.getOracleDatabase().getDataFiles();
	            var sharedPool = Orasim.getOracleInstance().getSga().getSharedPool();
	            var dbBufferCache = Orasim.getOracleInstance().getSga().getDbBufferCache();
	            var sqlConsole = Orasim.getSqlConsole();
	            var serverProcess = Orasim.getServerProcess();
	            var userProcess = Orasim.getUserProcess();
	            //finding hash into sharedPool
	            if (sharedPool.findHash(hash)) {
	                //hash found, server process getting data directly from dbBufferCache
	                //let memoryLocation = dbBufferCache.getMemoryLocation(hashIndex)
	                console.log("hash encontrado");
	                var memLocation = sharedPool.getMemoryLocation(hash);
	                console.log('hashIndex: ' + memLocation);
	                $('#server-process').repeat().fadeTo(_this.delay, 0.1).fadeTo(_this.delay, 1).until(2);
	                $('#db-buffer-cache').repeat().fadeTo(_this.delay, 0.1).fadeTo(_this.delay, 1).until(2);
	                // animacao pegando dados do dbBufferCache
	                var blockHtml_1 = serverProcess.getNewBlockFromDbBufferCache(dbBufferCache, _this.delay);
	                serverProcess.getBlockFromDbBufferCache(blockHtml_1, dbBufferCache, _this.delay);
	                // animacao enviando dados para userProcess
	                serverProcess.sendDataToUserProcess(blockHtml_1, userProcess, _this.delay);
	                setTimeout(function () {
	                    blockHtml_1.remove();
	                    resolve(0);
	                }, _this.delay * 6);
	            }
	            else {
	                //hash not found, we need 2 get data from database first, and save it into dbBufferCache
	                sqlConsole.addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo("ServerProcess nao encontrou o hash na SharedPool"));
	                sqlConsole.addMsg(new sql_console_msg_info_1.SqlConsoleMsgInfo("ServerProcess criando hash da user query"));
	                // animacao fade server process e shared pool
	                $('#server-process').repeat().fadeTo(_this.delay, 0.1).fadeTo(_this.delay, 1).until(2);
	                $('#shared-pool').repeat().fadeTo(_this.delay, 0.1).fadeTo(_this.delay, 1).until(2);
	                $('#data-files').repeat().fadeTo(_this.delay, 0.1).fadeTo(_this.delay, 1).until(2);
	                //adicionando hash na shared pool, adicionando dados no dbBufferCache
	                sharedPool.addHash(hash);
	                var memLocation = sharedPool.getMemoryLocation(hash);
	                dbBufferCache.setMemoryLocationUsed(memLocation);
	                // animacao requisitando dados do dataFiles
	                // animacao gravando dados no dbBufferCache
	                // animacao pegando dados do dbBufferCache
	                // animacao enviando dados para userProcess
	                var blockHtml_2 = serverProcess.getBlockFromDatFiles(dataFiles, _this.delay);
	                serverProcess.storeBlockInDbBufferCache(blockHtml_2, dbBufferCache, memLocation, _this.delay);
	                serverProcess.getBlockFromDbBufferCache(blockHtml_2, dbBufferCache, _this.delay);
	                serverProcess.sendDataToUserProcess(blockHtml_2, userProcess, _this.delay);
	                setTimeout(function () {
	                    $(blockHtml_2).remove();
	                    resolve(0);
	                }, _this.delay * 8);
	            }
	            //setTimeout(() => { resolve(0); }, animationTime);  
	        });
	    };
	    return Animation;
	}());
	exports.Animation = Animation;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var hash_1 = __webpack_require__(10);
	var Crc32 = (function (_super) {
	    __extends(Crc32, _super);
	    function Crc32(data) {
	        _super.call(this, data);
	        var uintCrc = (new Uint32Array([this.crc32Str(data)]))[0];
	        _super.prototype.setHash.call(this, uintCrc);
	    }
	    // TAKEN
	    // modified version from from http://www.webtoolkit.info/    
	    Crc32.prototype.Utf8Encode = function (data) {
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
	    // TAKEN
	    // modified version from from http://www.webtoolkit.info/    
	    Crc32.prototype.crc32Str = function (str) {
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
/* 10 */
/***/ function(module, exports) {

	"use strict";
	var Hash = (function () {
	    function Hash(data) {
	    }
	    Hash.prototype.setHash = function (hash) {
	        this.hash = hash;
	    };
	    Hash.prototype.getHexStrHash = function () {
	        return '0x' + this.hash.toString(16);
	    };
	    Hash.prototype.getHash = function () {
	        return this.hash;
	    };
	    return Hash;
	}());
	exports.Hash = Hash;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var data_files_1 = __webpack_require__(12);
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var block_1 = __webpack_require__(13);
	var DataFiles = (function () {
	    function DataFiles() {
	        this.block = new block_1.Block();
	        this.element = $("#data-files")[0];
	        //$(this.element).append(this.block.getElement())
	    }
	    // returns existing block
	    DataFiles.prototype.getBlock = function () {
	        return this.block.getElement();
	    };
	    // returns a new block, only for animation purposes
	    DataFiles.prototype.getNewBlockHtml = function () {
	        var newBlock = new block_1.Block();
	        $(this.element).append(newBlock.getElement());
	        return newBlock.getElement();
	    };
	    return DataFiles;
	}());
	exports.DataFiles = DataFiles;


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	var Block = (function () {
	    function Block() {
	        this.element = $("<div class=\"cache-box\"></div>")[0];
	        //this.element = $(`<div class="block"></div>`)[0]
	        this.size = 4096;
	        this.used = false;
	    }
	    Block.prototype.setUsed = function (flag) {
	        this.used = flag;
	        $(this.element).css("background-color", "#f00");
	    };
	    Block.prototype.getElement = function () {
	        return this.element;
	    };
	    return Block;
	}());
	exports.Block = Block;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var sga_1 = __webpack_require__(15);
	var OracleInstance = (function () {
	    function OracleInstance() {
	        this.sga = new sga_1.Sga();
	    }
	    OracleInstance.prototype.getSga = function () {
	        return this.sga;
	    };
	    return OracleInstance;
	}());
	exports.OracleInstance = OracleInstance;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var db_buffer_cache_1 = __webpack_require__(16);
	var shared_pool_1 = __webpack_require__(17);
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var block_1 = __webpack_require__(13);
	var DbBufferCache = (function () {
	    function DbBufferCache() {
	        this.numBlocks = 30;
	        this.element = $('#db-buffer-cache')[0];
	        this.blocks = new Array();
	        this.initBlocks();
	    }
	    DbBufferCache.prototype.initBlocks = function () {
	        for (var i = 0; i < this.numBlocks; i++) {
	            var block = new block_1.Block();
	            this.blocks.push(block);
	            $('#db-buffer-cache').append(block.getElement());
	        }
	    };
	    DbBufferCache.prototype.setMemoryLocationUsed = function (memLocation) {
	        this.blocks[memLocation].setUsed(true);
	    };
	    // getMemoryLocation(index: number): number {
	    //     return 0
	    // }
	    DbBufferCache.prototype.getNewBlockHtml = function () {
	        var newBlock = new block_1.Block();
	        //$(newBlock.getElement()).css("top", "0px") 
	        //$(newBlock.getElement()).css('left', "0px")        
	        $(this.element).prepend(newBlock.getElement());
	        $(newBlock.getElement()).offset($(this.element).offset());
	        $(newBlock.getElement()).css("position", "absolute");
	        $(newBlock.getElement()).css("z-index", 100);
	        return newBlock.getElement();
	    };
	    DbBufferCache.prototype.getElement = function () {
	        return this.element;
	    };
	    return DbBufferCache;
	}());
	exports.DbBufferCache = DbBufferCache;


/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	var SharedPool = (function () {
	    function SharedPool() {
	        this.hashCollection = [];
	        this.hashHtmlTemplate = "<li class=\"hash\"></li>";
	    }
	    SharedPool.prototype.addHash = function (hash) {
	        this.hashCollection.push(hash);
	        //adding to view
	        $("#hash-ul-container").append($(this.hashHtmlTemplate).append(hash.getHexStrHash())[0].outerHTML);
	    };
	    //getting index of some hash in collection
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
	    //finding hash in collection
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


/***/ }
/******/ ]);