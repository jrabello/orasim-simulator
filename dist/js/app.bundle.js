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
	var Main = (function () {
	    //lol
	    function Main() {
	        this.sqlConsole = new sql_console_1.SqlConsole();
	    }
	    Main.prototype.getSqlConsole = function () {
	        return this.sqlConsole;
	    };
	    return Main;
	}());
	//storing main instance into global namespace
	window.Orasim = new Main();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var animation_1 = __webpack_require__(2);
	var sql_parser_1 = __webpack_require__(3);
	var sql_console_message_1 = __webpack_require__(4);
	var SqlConsole = (function () {
	    function SqlConsole() {
	        this.sqlParser = new sql_parser_1.SqlParser();
	    }
	    SqlConsole.prototype.handleKeyPress = function (e) {
	        //enter key pressed
	        if (e.keyCode === 13) {
	            var userSqlCmd = $("#console-input").val();
	            this.sqlParser.parse(userSqlCmd);
	            //if query parsed successfully, run animation otherwise print error
	            if (this.sqlParser.parsedSuccess())
	                animation_1.Animation.start(this.sqlParser);
	            else
	                this.addMsg(new sql_console_message_1.SqlConsoleMessage('error', 'Query Inválida!'));
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
	var Animation = (function () {
	    function Animation() {
	    }
	    Animation.start = function (sqlParser) {
	        var delay = 1000;
	        if (sqlParser.getQueryToken() == "SELECT") {
	            //animate user process sending 2 server process
	            $('.arrow.from-userp-2-serverp').show();
	            $('.arrow.from-userp-2-serverp').repeat().fadeTo(delay, 0.1).fadeTo(delay, 1).until(2).hide();
	            $('#server-process').repeat().fadeTo(delay, 0.1).fadeTo(delay, 1).until(2);
	            $('#user-process').repeat().fadeTo(delay, 0.1).fadeTo(delay, 1).until(2);
	            $('#user img').repeat().fadeTo(delay, 0.1).fadeTo(delay, 1).until(2);
	        }
	    };
	    return Animation;
	}());
	exports.Animation = Animation;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var SqlParser = (function () {
	    function SqlParser() {
	        this.isParsedSuccess = false;
	    }
	    SqlParser.prototype.parse = function (query) {
	        try {
	            SQLParser.parse(query);
	            this.queryToken = SQLParser.lexer.tokenize(query)[0][0];
	            this.isParsedSuccess = true;
	        }
	        catch (err) {
	            console.log("Erro SqlParser.parse:", err);
	            this.isParsedSuccess = false;
	            this.queryToken = "";
	        }
	    };
	    SqlParser.prototype.parsedSuccess = function () {
	        return this.isParsedSuccess;
	    };
	    SqlParser.prototype.getQueryToken = function () {
	        return this.queryToken;
	    };
	    return SqlParser;
	}());
	exports.SqlParser = SqlParser;


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


/***/ }
/******/ ]);