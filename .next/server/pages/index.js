module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/primeflex/primeflex.css":
/*!**********************************************!*\
  !*** ./node_modules/primeflex/primeflex.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/primeicons/primeicons.css":
/*!************************************************!*\
  !*** ./node_modules/primeicons/primeicons.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/primereact/resources/primereact.min.css":
/*!**************************************************************!*\
  !*** ./node_modules/primereact/resources/primereact.min.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/primereact/resources/themes/saga-blue/theme.css":
/*!**********************************************************************!*\
  !*** ./node_modules/primereact/resources/themes/saga-blue/theme.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/pages/index.tsx":
/*!*****************************!*\
  !*** ./src/pages/index.tsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return layout; });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var primereact_resources_themes_saga_blue_theme_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primereact/resources/themes/saga-blue/theme.css */ "./node_modules/primereact/resources/themes/saga-blue/theme.css");
/* harmony import */ var primereact_resources_themes_saga_blue_theme_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(primereact_resources_themes_saga_blue_theme_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var primereact_resources_primereact_min_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primereact/resources/primereact.min.css */ "./node_modules/primereact/resources/primereact.min.css");
/* harmony import */ var primereact_resources_primereact_min_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(primereact_resources_primereact_min_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var primeicons_primeicons_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeicons/primeicons.css */ "./node_modules/primeicons/primeicons.css");
/* harmony import */ var primeicons_primeicons_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(primeicons_primeicons_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var primeflex_primeflex_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeflex/primeflex.css */ "./node_modules/primeflex/primeflex.css");
/* harmony import */ var primeflex_primeflex_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(primeflex_primeflex_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ui_topbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ui/topbar */ "./src/ui/topbar.tsx");
/* harmony import */ var _ui_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../ui/store */ "./src/ui/store.ts");
/* harmony import */ var _ui_traders__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../ui/traders */ "./src/ui/traders.tsx");











function layout() {
  const {
    0: store,
    1: dispatch
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useReducer"])(_ui_store__WEBPACK_IMPORTED_MODULE_7__["reducer"], _ui_store__WEBPACK_IMPORTED_MODULE_7__["initialState"]);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(() => {
    Object(_ui_store__WEBPACK_IMPORTED_MODULE_7__["fetchPairs"])(dispatch);
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(() => {
    Object(_ui_store__WEBPACK_IMPORTED_MODULE_7__["fetchAssetPairs"])(dispatch);
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(() => {
    Object(_ui_store__WEBPACK_IMPORTED_MODULE_7__["fetchBalance"])(dispatch);
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(() => {
    Object(_ui_store__WEBPACK_IMPORTED_MODULE_7__["fetchTicks"])(dispatch);
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(() => {
    const pid = setInterval(() => Object(_ui_store__WEBPACK_IMPORTED_MODULE_7__["fetchBalance"])(dispatch), 10000);
    return () => clearInterval(pid);
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(() => {
    const pid = setInterval(() => Object(_ui_store__WEBPACK_IMPORTED_MODULE_7__["fetchTick"])(dispatch), 6000);
    return () => clearInterval(pid);
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(() => {
    Object(_ui_store__WEBPACK_IMPORTED_MODULE_7__["fetchTransactions"])(dispatch);
    const pid = setInterval(() => Object(_ui_store__WEBPACK_IMPORTED_MODULE_7__["fetchTransactions"])(dispatch), 10000);
    return () => clearInterval(pid);
  }, []);
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ui_topbar__WEBPACK_IMPORTED_MODULE_6__["default"], {
      store: store
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ui_traders__WEBPACK_IMPORTED_MODULE_8__["default"], {
      store: store
    })]
  });
}

/***/ }),

/***/ "./src/ui/params.tsx":
/*!***************************!*\
  !*** ./src/ui/params.tsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Params; });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var primereact_datatable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primereact/datatable */ "primereact/datatable");
/* harmony import */ var primereact_datatable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(primereact_datatable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var primereact_column__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primereact/column */ "primereact/column");
/* harmony import */ var primereact_column__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(primereact_column__WEBPACK_IMPORTED_MODULE_3__);





function Params({
  store,
  pair
}) {
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
    className: "card",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h5", {
      children: "Parameters"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(primereact_datatable__WEBPACK_IMPORTED_MODULE_2__["DataTable"], {
      value: transactions,
      scrollable: true,
      scrollHeight: "200px",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(primereact_column__WEBPACK_IMPORTED_MODULE_3__["Column"], {
        field: "date",
        header: "Date"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(primereact_column__WEBPACK_IMPORTED_MODULE_3__["Column"], {
        field: "type",
        header: "Type"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(primereact_column__WEBPACK_IMPORTED_MODULE_3__["Column"], {
        field: "volume",
        header: "Volume"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(primereact_column__WEBPACK_IMPORTED_MODULE_3__["Column"], {
        field: "price",
        header: "Price"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(primereact_column__WEBPACK_IMPORTED_MODULE_3__["Column"], {
        field: "fee",
        header: "Fee"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(primereact_column__WEBPACK_IMPORTED_MODULE_3__["Column"], {
        field: "status",
        header: "Status"
      })]
    })]
  });
}

/***/ }),

/***/ "./src/ui/store.ts":
/*!*************************!*\
  !*** ./src/ui/store.ts ***!
  \*************************/
/*! exports provided: initialState, reducer, fetchPairs, fetchBalance, fetchTick, fetchTicks, fetchTransactions, fetchAssetPairs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchPairs", function() { return fetchPairs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchBalance", function() { return fetchBalance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTick", function() { return fetchTick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTicks", function() { return fetchTicks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTransactions", function() { return fetchTransactions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchAssetPairs", function() { return fetchAssetPairs; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const initialState = {
  balance: {},
  pairs: {},
  ticks: [],
  closedTransactions: [],
  assetPairs: {}
};
const reducer = (state, action) => {
  if (action.type === 'SET_BALANCE') {
    return _objectSpread(_objectSpread({}, state), {}, {
      balance: action.payload
    });
  }

  if (action.type === 'SET_PAIRS') {
    return _objectSpread(_objectSpread({}, state), {}, {
      pairs: action.payload
    });
  }

  if (action.type === 'ADD_TICK') {
    const newTicks = state.ticks;
    if (newTicks.length > 100) newTicks.shift();
    newTicks.push(action.payload);
    return _objectSpread(_objectSpread({}, state), {}, {
      ticks: newTicks
    });
  }

  if (action.type === 'SET_TICKS') {
    return _objectSpread(_objectSpread({}, state), {}, {
      ticks: action.payload
    });
  }

  if (action.type === 'SET_TRANSACTIONS') {
    return _objectSpread(_objectSpread({}, state), {}, {
      closedTransactions: action.payload
    });
  }

  if (action.type === 'SET_ASSETPAIRS') {
    return _objectSpread(_objectSpread({}, state), {}, {
      assetPairs: action.payload
    });
  }

  return state;
};
const fetchPairs = dispatch => axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/pairs').then(results => dispatch({
  type: "SET_PAIRS",
  payload: results.data
}));
const fetchBalance = dispatch => axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/balance').then(results => dispatch({
  type: "SET_BALANCE",
  payload: results.data
}));
const fetchTick = dispatch => axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/tick').then(results => dispatch({
  type: "ADD_TICK",
  payload: results.data
}));
const fetchTicks = dispatch => axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/ticks').then(results => dispatch({
  type: "SET_TICKS",
  payload: results.data
}));
const fetchTransactions = dispatch => axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/transactions').then(results => dispatch({
  type: "SET_TRANSACTIONS",
  payload: results.data
}));
const fetchAssetPairs = dispatch => axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/assetPairs').then(results => dispatch({
  type: "SET_ASSETPAIRS",
  payload: results.data
}));

/***/ }),

/***/ "./src/ui/topbar.tsx":
/*!***************************!*\
  !*** ./src/ui/topbar.tsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TopBar; });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var primereact_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primereact/button */ "primereact/button");
/* harmony import */ var primereact_button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(primereact_button__WEBPACK_IMPORTED_MODULE_2__);




function TopBar({
  store
}) {
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
    className: "p-d-flex p-p-3 card p-jc-center p-shadow-1",
    children: Object.entries(store.balance).map(([coin, value], i, {
      length
    }) => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
      className: 'p-mr-2',
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(primereact_button__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        type: "button",
        label: value,
        className: "p-button-warning"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(primereact_button__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        type: "button",
        label: coin
      })]
    }, coin))
  });
}

/***/ }),

/***/ "./src/ui/trader.tsx":
/*!***************************!*\
  !*** ./src/ui/trader.tsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return trader; });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var primereact_chart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primereact/chart */ "primereact/chart");
/* harmony import */ var primereact_chart__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(primereact_chart__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _transactions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transactions */ "./src/ui/transactions.tsx");
/* harmony import */ var _params__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./params */ "./src/ui/params.tsx");




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






function trader({
  pair,
  data,
  store
}) {
  const lastPrices = store.ticks.map(tick => {
    console.log(tick);
    return {
      y: tick.pairs[pair].c[0],
      x: moment__WEBPACK_IMPORTED_MODULE_3___default.a.unix(tick.timestamp).format("HH:mm:ss")
    };
  });
  const transactions = Object.values(store.closedTransactions).filter(t => {
    var _store$assetPairs$pai;

    return t.descr.pair === pair || t.descr.pair === ((_store$assetPairs$pai = store.assetPairs[pair]) === null || _store$assetPairs$pai === void 0 ? void 0 : _store$assetPairs$pai.altname);
  }).map(t => _objectSpread(_objectSpread({}, t.descr), {}, {
    status: t.status,
    volume: t.vol,
    cost: t.cost,
    fee: t.fee,
    time: t.opentm,
    date: moment__WEBPACK_IMPORTED_MODULE_3___default.a.unix(t.opentm).format("YYYY-MM-DD HH:mm:ss")
  })).sort((a, b) => b.time - a.time);
  const sellData = transactions.filter(t => t.type === "sell" && t.status === "closed").map(t => ({
    y: t.price,
    x: moment__WEBPACK_IMPORTED_MODULE_3___default.a.unix(t.time).format("HH:mm:ss")
  }));
  const buyData = transactions.filter(t => t.type === "buy" && t.status === "closed").map(t => ({
    y: t.price,
    x: moment__WEBPACK_IMPORTED_MODULE_3___default.a.unix(t.time).format("HH:mm:ss")
  }));
  const sellDataExpired = transactions.filter(t => t.type === "sell" && t.status === "expired").map(t => ({
    y: t.price,
    x: moment__WEBPACK_IMPORTED_MODULE_3___default.a.unix(t.time).format("HH:mm:ss")
  }));
  const buyDataExpired = transactions.filter(t => t.type === "buy" && t.status === "expired").map(t => ({
    y: t.price,
    x: moment__WEBPACK_IMPORTED_MODULE_3___default.a.unix(t.time).format("HH:mm:ss")
  }));
  const labels = [...store.ticks.map(tick => tick.timestamp), ...transactions.map(t => t.time)].sort().map(l => moment__WEBPACK_IMPORTED_MODULE_3___default.a.unix(l).format("HH:mm:ss"));
  const basicData = {
    labels: labels,
    datasets: [{
      label: 'price',
      data: lastPrices,
      fill: false,
      borderColor: '#42A5F5'
    }, {
      label: 'buy',
      data: buyData,
      showLine: false,
      pointBorderWidth: 7,
      fill: false,
      borderColor: '#10a366'
    }, {
      label: 'sell',
      showLine: false,
      pointBorderWidth: 7,
      data: sellData,
      fill: false,
      borderColor: '#a31510'
    }, {
      label: 'expired sell',
      showLine: false,
      pointBorderWidth: 1,
      data: sellDataExpired,
      fill: false,
      radius: 5,
      borderStyle: 'cross',
      borderColor: '#a31510'
    }, {
      label: 'expired buy',
      showLine: false,
      pointBorderWidth: 1,
      radius: 5,
      data: buyDataExpired,
      fill: false,
      borderStyle: 'cross',
      borderColor: '#10a366'
    }]
  };
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(primereact_chart__WEBPACK_IMPORTED_MODULE_2__["Chart"], {
      type: "line",
      data: basicData,
      style: {
        height: 200
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0
        }
      }
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
      className: "p-d-flex",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
        className: "p-mr-2",
        children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_transactions__WEBPACK_IMPORTED_MODULE_4__["default"], {
          transactions: transactions
        })
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
        className: "p-mr-2",
        children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_params__WEBPACK_IMPORTED_MODULE_5__["default"], {
          store: store,
          pair: pair
        })
      })]
    })]
  });
}

/***/ }),

/***/ "./src/ui/traders.tsx":
/*!****************************!*\
  !*** ./src/ui/traders.tsx ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return traders; });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var primereact_panel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primereact/panel */ "primereact/panel");
/* harmony import */ var primereact_panel__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(primereact_panel__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _trader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./trader */ "./src/ui/trader.tsx");





function traders({
  store
}) {
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
    children: Object.entries(store.pairs).map(([pair, data]) => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(primereact_panel__WEBPACK_IMPORTED_MODULE_2__["Panel"], {
      header: pair,
      toggleable: true,
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_trader__WEBPACK_IMPORTED_MODULE_3__["default"], {
        pair: pair,
        data: data,
        store: store
      })
    }, pair))
  });
}

/***/ }),

/***/ "./src/ui/transactions.tsx":
/*!*********************************!*\
  !*** ./src/ui/transactions.tsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Transactions; });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var primereact_datatable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primereact/datatable */ "primereact/datatable");
/* harmony import */ var primereact_datatable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(primereact_datatable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var primereact_column__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primereact/column */ "primereact/column");
/* harmony import */ var primereact_column__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(primereact_column__WEBPACK_IMPORTED_MODULE_3__);





function Transactions({
  transactions
}) {
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
    className: "card",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h5", {
      children: "Transactions"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(primereact_datatable__WEBPACK_IMPORTED_MODULE_2__["DataTable"], {
      value: transactions,
      scrollable: true,
      scrollHeight: "200px",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(primereact_column__WEBPACK_IMPORTED_MODULE_3__["Column"], {
        field: "date",
        header: "Date"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(primereact_column__WEBPACK_IMPORTED_MODULE_3__["Column"], {
        field: "type",
        header: "Type"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(primereact_column__WEBPACK_IMPORTED_MODULE_3__["Column"], {
        field: "volume",
        header: "Volume"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(primereact_column__WEBPACK_IMPORTED_MODULE_3__["Column"], {
        field: "price",
        header: "Price"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(primereact_column__WEBPACK_IMPORTED_MODULE_3__["Column"], {
        field: "fee",
        header: "Fee"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(primereact_column__WEBPACK_IMPORTED_MODULE_3__["Column"], {
        field: "status",
        header: "Status"
      })]
    })]
  });
}

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "primereact/button":
/*!************************************!*\
  !*** external "primereact/button" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("primereact/button");

/***/ }),

/***/ "primereact/chart":
/*!***********************************!*\
  !*** external "primereact/chart" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("primereact/chart");

/***/ }),

/***/ "primereact/column":
/*!************************************!*\
  !*** external "primereact/column" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("primereact/column");

/***/ }),

/***/ "primereact/datatable":
/*!***************************************!*\
  !*** external "primereact/datatable" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("primereact/datatable");

/***/ }),

/***/ "primereact/panel":
/*!***********************************!*\
  !*** external "primereact/panel" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("primereact/panel");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react/jsx-runtime");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2luZGV4LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvcGFyYW1zLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvc3RvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL3RvcGJhci50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL3RyYWRlci50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpL3RyYWRlcnMudHN4Iiwid2VicGFjazovLy8uL3NyYy91aS90cmFuc2FjdGlvbnMudHN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHJpbWVyZWFjdC9idXR0b25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwcmltZXJlYWN0L2NoYXJ0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHJpbWVyZWFjdC9jb2x1bW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwcmltZXJlYWN0L2RhdGF0YWJsZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInByaW1lcmVhY3QvcGFuZWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0L2pzeC1ydW50aW1lXCIiXSwibmFtZXMiOlsibGF5b3V0Iiwic3RvcmUiLCJkaXNwYXRjaCIsInVzZVJlZHVjZXIiLCJyZWR1Y2VyIiwiaW5pdGlhbFN0YXRlIiwidXNlRWZmZWN0IiwiZmV0Y2hQYWlycyIsImZldGNoQXNzZXRQYWlycyIsImZldGNoQmFsYW5jZSIsImZldGNoVGlja3MiLCJwaWQiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJmZXRjaFRpY2siLCJmZXRjaFRyYW5zYWN0aW9ucyIsIlBhcmFtcyIsInBhaXIiLCJ0cmFuc2FjdGlvbnMiLCJiYWxhbmNlIiwicGFpcnMiLCJ0aWNrcyIsImNsb3NlZFRyYW5zYWN0aW9ucyIsImFzc2V0UGFpcnMiLCJzdGF0ZSIsImFjdGlvbiIsInR5cGUiLCJwYXlsb2FkIiwibmV3VGlja3MiLCJsZW5ndGgiLCJzaGlmdCIsInB1c2giLCJheGlvcyIsImdldCIsInRoZW4iLCJyZXN1bHRzIiwiZGF0YSIsIlRvcEJhciIsIk9iamVjdCIsImVudHJpZXMiLCJtYXAiLCJjb2luIiwidmFsdWUiLCJpIiwidHJhZGVyIiwibGFzdFByaWNlcyIsInRpY2siLCJjb25zb2xlIiwibG9nIiwieSIsImMiLCJ4IiwibW9tZW50IiwidW5peCIsInRpbWVzdGFtcCIsImZvcm1hdCIsInZhbHVlcyIsImZpbHRlciIsInQiLCJkZXNjciIsImFsdG5hbWUiLCJzdGF0dXMiLCJ2b2x1bWUiLCJ2b2wiLCJjb3N0IiwiZmVlIiwidGltZSIsIm9wZW50bSIsImRhdGUiLCJzb3J0IiwiYSIsImIiLCJzZWxsRGF0YSIsInByaWNlIiwiYnV5RGF0YSIsInNlbGxEYXRhRXhwaXJlZCIsImJ1eURhdGFFeHBpcmVkIiwibGFiZWxzIiwibCIsImJhc2ljRGF0YSIsImRhdGFzZXRzIiwibGFiZWwiLCJmaWxsIiwiYm9yZGVyQ29sb3IiLCJzaG93TGluZSIsInBvaW50Qm9yZGVyV2lkdGgiLCJyYWRpdXMiLCJib3JkZXJTdHlsZSIsImhlaWdodCIsInJlc3BvbnNpdmUiLCJtYWludGFpbkFzcGVjdFJhdGlvIiwiYW5pbWF0aW9uIiwiZHVyYXRpb24iLCJ0cmFkZXJzIiwiVHJhbnNhY3Rpb25zIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FB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Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVEQ7QUFDQTtBQUNBO0FBa0JlLFNBQVM2RSxZQUFULENBQXNCO0FBQUM1RTtBQUFELENBQXRCLEVBQW1FO0FBR2xGLHNCQUFVO0FBQUssYUFBUyxFQUFDLE1BQWY7QUFBQSw0QkFDVjtBQUFBO0FBQUEsTUFEVSxlQUVWLCtEQUFDLDhEQUFEO0FBQVcsV0FBSyxFQUFFQSxZQUFsQjtBQUFnQyxnQkFBVSxNQUExQztBQUEyQyxrQkFBWSxFQUFDLE9BQXhEO0FBQUEsOEJBQ0EsOERBQUMsd0RBQUQ7QUFBUSxhQUFLLEVBQUMsTUFBZDtBQUFxQixjQUFNLEVBQUM7QUFBNUIsUUFEQSxlQUVJLDhEQUFDLHdEQUFEO0FBQVEsYUFBSyxFQUFDLE1BQWQ7QUFBcUIsY0FBTSxFQUFDO0FBQTVCLFFBRkosZUFHSSw4REFBQyx3REFBRDtBQUFRLGFBQUssRUFBQyxRQUFkO0FBQXVCLGNBQU0sRUFBQztBQUE5QixRQUhKLGVBSUksOERBQUMsd0RBQUQ7QUFBUSxhQUFLLEVBQUMsT0FBZDtBQUFzQixjQUFNLEVBQUM7QUFBN0IsUUFKSixlQUtJLDhEQUFDLHdEQUFEO0FBQVEsYUFBSyxFQUFDLEtBQWQ7QUFBb0IsY0FBTSxFQUFDO0FBQTNCLFFBTEosZUFNSSw4REFBQyx3REFBRDtBQUFRLGFBQUssRUFBQyxRQUFkO0FBQXVCLGNBQU0sRUFBQztBQUE5QixRQU5KO0FBQUEsTUFGVTtBQUFBLElBQVY7QUFXQyxDOzs7Ozs7Ozs7OztBQ2xDRCxrQzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSw4Qzs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSw4Qzs7Ozs7Ozs7Ozs7QUNBQSxpRDs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSw4QyIsImZpbGUiOiJwYWdlcy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0gcmVxdWlyZSgnLi4vc3NyLW1vZHVsZS1jYWNoZS5qcycpO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHR2YXIgdGhyZXcgPSB0cnVlO1xuIFx0XHR0cnkge1xuIFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuIFx0XHRcdHRocmV3ID0gZmFsc2U7XG4gXHRcdH0gZmluYWxseSB7XG4gXHRcdFx0aWYodGhyZXcpIGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0fVxuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3BhZ2VzL2luZGV4LnRzeFwiKTtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZHVjZXIgfSBmcm9tICdyZWFjdCdcblxuaW1wb3J0ICdwcmltZXJlYWN0L3Jlc291cmNlcy90aGVtZXMvc2FnYS1ibHVlL3RoZW1lLmNzcydcbmltcG9ydCAncHJpbWVyZWFjdC9yZXNvdXJjZXMvcHJpbWVyZWFjdC5taW4uY3NzJ1xuaW1wb3J0ICdwcmltZWljb25zL3ByaW1laWNvbnMuY3NzJ1xuaW1wb3J0ICdwcmltZWZsZXgvcHJpbWVmbGV4LmNzcydcbmltcG9ydCBUb3BiYXIgZnJvbSAnLi4vdWkvdG9wYmFyJ1xuaW1wb3J0IHsgZmV0Y2hBc3NldFBhaXJzLCBmZXRjaEJhbGFuY2UsIGZldGNoUGFpcnMsIGZldGNoVGljaywgZmV0Y2hUaWNrcywgZmV0Y2hUcmFuc2FjdGlvbnMsIGluaXRpYWxTdGF0ZSwgcmVkdWNlciB9IGZyb20gJy4uL3VpL3N0b3JlJ1xuaW1wb3J0IFRyYWRlcnMgZnJvbSAnLi4vdWkvdHJhZGVycydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGF5b3V0KCkge1xuICBjb25zdCBbc3RvcmUsIGRpc3BhdGNoXSA9IHVzZVJlZHVjZXIocmVkdWNlciwgaW5pdGlhbFN0YXRlKVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGZldGNoUGFpcnMoZGlzcGF0Y2gpXG4gIH0sIFtdKVxuICB1c2VFZmZlY3QoKCkgPT4geyBmZXRjaEFzc2V0UGFpcnMoZGlzcGF0Y2gpIH0sIFtdKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7IGZldGNoQmFsYW5jZShkaXNwYXRjaCkgfSwgW10pXG4gIHVzZUVmZmVjdCgoKSA9PiB7IGZldGNoVGlja3MoZGlzcGF0Y2gpIH0sIFtdKVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHBpZCA9IHNldEludGVydmFsKCgpID0+IGZldGNoQmFsYW5jZShkaXNwYXRjaCksIDEwMDAwKVxuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKHBpZClcbiAgfSwgW10pXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgcGlkID0gc2V0SW50ZXJ2YWwoKCkgPT4gZmV0Y2hUaWNrKGRpc3BhdGNoKSwgNjAwMClcbiAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbChwaWQpXG4gIH0sIFtdKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZmV0Y2hUcmFuc2FjdGlvbnMoZGlzcGF0Y2gpXG4gICAgY29uc3QgcGlkID0gc2V0SW50ZXJ2YWwoKCkgPT4gZmV0Y2hUcmFuc2FjdGlvbnMoZGlzcGF0Y2gpLCAxMDAwMClcbiAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbChwaWQpXG4gIH0sIFtdKVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxUb3BiYXIgc3RvcmU9e3N0b3JlfSAvPlxuICAgICAgPFRyYWRlcnMgc3RvcmU9e3N0b3JlfSAvPlxuICAgIDwvPlxuICApXG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgRGF0YVRhYmxlIH0gZnJvbSAncHJpbWVyZWFjdC9kYXRhdGFibGUnO1xuaW1wb3J0IHsgQ29sdW1uIH0gZnJvbSAncHJpbWVyZWFjdC9jb2x1bW4nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQYXJhbXMoe3N0b3JlLHBhaXJ9OntzdG9yZTpJU3RhdGUscGFpcjpzdHJpbmd9KXtcblxuXG5yZXR1cm4gICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCI+XG48aDU+UGFyYW1ldGVyczwvaDU+XG48RGF0YVRhYmxlIHZhbHVlPXt0cmFuc2FjdGlvbnN9IHNjcm9sbGFibGUgc2Nyb2xsSGVpZ2h0PVwiMjAwcHhcIiA+XG48Q29sdW1uIGZpZWxkPVwiZGF0ZVwiIGhlYWRlcj1cIkRhdGVcIj48L0NvbHVtbj5cbiAgICA8Q29sdW1uIGZpZWxkPVwidHlwZVwiIGhlYWRlcj1cIlR5cGVcIj48L0NvbHVtbj5cbiAgICA8Q29sdW1uIGZpZWxkPVwidm9sdW1lXCIgaGVhZGVyPVwiVm9sdW1lXCI+PC9Db2x1bW4+XG4gICAgPENvbHVtbiBmaWVsZD1cInByaWNlXCIgaGVhZGVyPVwiUHJpY2VcIj48L0NvbHVtbj5cbiAgICA8Q29sdW1uIGZpZWxkPVwiZmVlXCIgaGVhZGVyPVwiRmVlXCI+PC9Db2x1bW4+XG4gICAgPENvbHVtbiBmaWVsZD1cInN0YXR1c1wiIGhlYWRlcj1cIlN0YXR1c1wiPjwvQ29sdW1uPlxuPC9EYXRhVGFibGU+XG48L2Rpdj5cbn0iLCJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCJcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxTdGF0ZTpJU3RhdGUgPSB7XG4gICAgYmFsYW5jZTp7fSxcbiAgICBwYWlyczp7fSxcbiAgICB0aWNrczpbXSxcbiAgICBjbG9zZWRUcmFuc2FjdGlvbnM6W10sXG4gICAgYXNzZXRQYWlyczp7fVxufVxuXG5leHBvcnQgY29uc3QgcmVkdWNlcj0oc3RhdGU6SVN0YXRlLGFjdGlvbjpJQWN0aW9uKTpJU3RhdGU9PntcbiAgICBpZihhY3Rpb24udHlwZT09PSdTRVRfQkFMQU5DRScpe1xuICAgICAgICByZXR1cm4gey4uLnN0YXRlLCBiYWxhbmNlOmFjdGlvbi5wYXlsb2FkfVxuICAgIH1cbiAgICBpZihhY3Rpb24udHlwZT09PSdTRVRfUEFJUlMnKXtcbiAgICAgICAgcmV0dXJuIHsuLi5zdGF0ZSwgcGFpcnM6YWN0aW9uLnBheWxvYWR9XG4gICAgfVxuICAgIGlmKGFjdGlvbi50eXBlPT09J0FERF9USUNLJyl7XG4gICAgICAgIGNvbnN0IG5ld1RpY2tzID0gc3RhdGUudGlja3NcbiAgICAgICAgaWYobmV3VGlja3MubGVuZ3RoPjEwMClcbiAgICAgICAgICAgIG5ld1RpY2tzLnNoaWZ0KClcbiAgICAgICAgbmV3VGlja3MucHVzaChhY3Rpb24ucGF5bG9hZClcbiAgICAgICAgcmV0dXJuIHsuLi5zdGF0ZSwgdGlja3M6bmV3VGlja3N9XG4gICAgfVxuICAgIGlmKGFjdGlvbi50eXBlPT09J1NFVF9USUNLUycpe1xuICAgICAgICByZXR1cm4gey4uLnN0YXRlLCB0aWNrczphY3Rpb24ucGF5bG9hZH1cbiAgICB9XG4gICAgaWYoYWN0aW9uLnR5cGU9PT0nU0VUX1RSQU5TQUNUSU9OUycpe1xuICAgICAgICByZXR1cm4gey4uLnN0YXRlLCBjbG9zZWRUcmFuc2FjdGlvbnM6YWN0aW9uLnBheWxvYWR9XG4gICAgfVxuICAgIGlmKGFjdGlvbi50eXBlPT09J1NFVF9BU1NFVFBBSVJTJyl7XG4gICAgICAgIHJldHVybiB7Li4uc3RhdGUsIGFzc2V0UGFpcnM6YWN0aW9uLnBheWxvYWR9XG4gICAgfVxuICAgIHJldHVybiBzdGF0ZVxufVxuXG5cbmV4cG9ydCBjb25zdCBmZXRjaFBhaXJzID0gKGRpc3BhdGNoOlJlYWN0LkRpc3BhdGNoPElBY3Rpb24+KT0+YXhpb3MuZ2V0KCcvcGFpcnMnKS50aGVuKHJlc3VsdHM9PiBkaXNwYXRjaCh7dHlwZTpcIlNFVF9QQUlSU1wiLCBwYXlsb2FkOnJlc3VsdHMuZGF0YX0pIClcbmV4cG9ydCBjb25zdCBmZXRjaEJhbGFuY2UgPSAoZGlzcGF0Y2g6UmVhY3QuRGlzcGF0Y2g8SUFjdGlvbj4pPT5heGlvcy5nZXQoJy9iYWxhbmNlJykudGhlbihyZXN1bHRzPT4gZGlzcGF0Y2goe3R5cGU6XCJTRVRfQkFMQU5DRVwiLCBwYXlsb2FkOnJlc3VsdHMuZGF0YX0pIClcblxuZXhwb3J0IGNvbnN0IGZldGNoVGljayA9IChkaXNwYXRjaDpSZWFjdC5EaXNwYXRjaDxJQWN0aW9uPik9PmF4aW9zLmdldCgnL3RpY2snKS50aGVuKHJlc3VsdHM9PiBkaXNwYXRjaCh7dHlwZTpcIkFERF9USUNLXCIsIHBheWxvYWQ6cmVzdWx0cy5kYXRhfSkgKVxuZXhwb3J0IGNvbnN0IGZldGNoVGlja3MgPSAoZGlzcGF0Y2g6UmVhY3QuRGlzcGF0Y2g8SUFjdGlvbj4pPT5heGlvcy5nZXQoJy90aWNrcycpLnRoZW4ocmVzdWx0cz0+IGRpc3BhdGNoKHt0eXBlOlwiU0VUX1RJQ0tTXCIsIHBheWxvYWQ6cmVzdWx0cy5kYXRhfSkgKVxuZXhwb3J0IGNvbnN0IGZldGNoVHJhbnNhY3Rpb25zID0gKGRpc3BhdGNoOlJlYWN0LkRpc3BhdGNoPElBY3Rpb24+KT0+YXhpb3MuZ2V0KCcvdHJhbnNhY3Rpb25zJykudGhlbihyZXN1bHRzPT4gZGlzcGF0Y2goe3R5cGU6XCJTRVRfVFJBTlNBQ1RJT05TXCIsIHBheWxvYWQ6cmVzdWx0cy5kYXRhfSkgKVxuZXhwb3J0IGNvbnN0IGZldGNoQXNzZXRQYWlycyA9IChkaXNwYXRjaDpSZWFjdC5EaXNwYXRjaDxJQWN0aW9uPik9PmF4aW9zLmdldCgnL2Fzc2V0UGFpcnMnKS50aGVuKHJlc3VsdHM9PiBkaXNwYXRjaCh7dHlwZTpcIlNFVF9BU1NFVFBBSVJTXCIsIHBheWxvYWQ6cmVzdWx0cy5kYXRhfSkgKSIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFRvb2xiYXIgfSBmcm9tIFwicHJpbWVyZWFjdC90b29sYmFyXCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwicHJpbWVyZWFjdC9idXR0b25cIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVG9wQmFyKHsgc3RvcmUgfTogeyBzdG9yZTogSVN0YXRlIH0pIHtcblxuXG4gIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInAtZC1mbGV4IHAtcC0zIGNhcmQgcC1qYy1jZW50ZXIgcC1zaGFkb3ctMVwiPlxuICB7T2JqZWN0LmVudHJpZXMoc3RvcmUuYmFsYW5jZSkubWFwKChbY29pbiwgdmFsdWVdLCBpLCB7IGxlbmd0aCB9KSA9PiAoXG4gICAgPGRpdiBjbGFzc05hbWU9eydwLW1yLTInfSBrZXk9e2NvaW59PlxuICAgICAgPEJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbGFiZWw9e3ZhbHVlfSBjbGFzc05hbWU9XCJwLWJ1dHRvbi13YXJuaW5nXCIgLz5cbiAgICAgIDxCdXR0b24gdHlwZT1cImJ1dHRvblwiIGxhYmVsPXtjb2lufSAvPlxuICAgXG4gICAgPC9kaXY+XG4gICkpfVxuPC9kaXY+XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBDaGFydCB9IGZyb20gJ3ByaW1lcmVhY3QvY2hhcnQnXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCdcbmltcG9ydCBUcmFuc2FjdGlvbnMgZnJvbSAnLi90cmFuc2FjdGlvbnMnXG5pbXBvcnQgUGFyYW1zIGZyb20gJy4vcGFyYW1zJ1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJhZGVyKHtwYWlyLGRhdGEsc3RvcmV9OntwYWlyOnN0cmluZywgZGF0YTphbnkgLHN0b3JlOklTdGF0ZX0pe1xuICAgIGNvbnN0IGxhc3RQcmljZXMgPSBzdG9yZS50aWNrcy5tYXAoKHRpY2s6SVRpY2spPT57XG4gICAgICAgIGNvbnNvbGUubG9nKHRpY2spXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB5OnRpY2sucGFpcnNbcGFpcl0uY1swXSxcbiAgICAgICAgICAgIHg6bW9tZW50LnVuaXgodGljay50aW1lc3RhbXApLmZvcm1hdChcIkhIOm1tOnNzXCIpXG4gICAgICAgIH1cbiAgICB9KVxuICAgIGNvbnN0IHRyYW5zYWN0aW9ucyA9IE9iamVjdC52YWx1ZXMoc3RvcmUuY2xvc2VkVHJhbnNhY3Rpb25zKVxuXG4gICAgLmZpbHRlcih0PT50LmRlc2NyLnBhaXI9PT1wYWlyIHx8IHQuZGVzY3IucGFpcj09PSBzdG9yZS5hc3NldFBhaXJzW3BhaXJdPy5hbHRuYW1lKVxuICAgIC5tYXAodD0+KHtcbiAgICAgICAgICAgIC4uLnQuZGVzY3IsXG4gICAgICAgICAgICBzdGF0dXM6dC5zdGF0dXMsXG4gICAgICAgICAgICB2b2x1bWU6dC52b2wsXG4gICAgICAgICAgICBjb3N0OnQuY29zdCxcbiAgICAgICAgICAgIGZlZTp0LmZlZSxcbiAgICAgICAgICAgIHRpbWU6dC5vcGVudG0sXG4gICAgICAgICAgICBkYXRlOm1vbWVudC51bml4KHQub3BlbnRtKS5mb3JtYXQoXCJZWVlZLU1NLUREIEhIOm1tOnNzXCIpXG4gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICApLnNvcnQoKGEsYik9PmIudGltZS1hLnRpbWUpXG4gICAgY29uc3Qgc2VsbERhdGEgPSB0cmFuc2FjdGlvbnNcbiAgICAuZmlsdGVyKHQ9PnQudHlwZT09PVwic2VsbFwiICYmIHQuc3RhdHVzPT09XCJjbG9zZWRcIilcbiAgICAubWFwKHQ9Pih7XG4gICAgICAgIHk6dC5wcmljZSxcbiAgICAgICAgeDogbW9tZW50LnVuaXgodC50aW1lKS5mb3JtYXQoXCJISDptbTpzc1wiKVxuICAgIH0pIClcbiAgICBjb25zdCBidXlEYXRhID0gdHJhbnNhY3Rpb25zXG4gICAgLmZpbHRlcih0PT50LnR5cGU9PT1cImJ1eVwiICYmIHQuc3RhdHVzPT09XCJjbG9zZWRcIilcbiAgICAubWFwKHQ9Pih7XG4gICAgICAgIHk6dC5wcmljZSxcbiAgICAgICAgeDogbW9tZW50LnVuaXgodC50aW1lKS5mb3JtYXQoXCJISDptbTpzc1wiKVxuICAgIH0pIClcbiAgICBjb25zdCBzZWxsRGF0YUV4cGlyZWQgPSB0cmFuc2FjdGlvbnNcbiAgICAuZmlsdGVyKHQ9PnQudHlwZT09PVwic2VsbFwiICYmIHQuc3RhdHVzPT09XCJleHBpcmVkXCIpXG4gICAgLm1hcCh0PT4oe1xuICAgICAgICB5OnQucHJpY2UsXG4gICAgICAgIHg6IG1vbWVudC51bml4KHQudGltZSkuZm9ybWF0KFwiSEg6bW06c3NcIilcbiAgICB9KSApXG4gICAgY29uc3QgYnV5RGF0YUV4cGlyZWQgPSB0cmFuc2FjdGlvbnNcbiAgICAuZmlsdGVyKHQ9PnQudHlwZT09PVwiYnV5XCIgJiYgdC5zdGF0dXM9PT1cImV4cGlyZWRcIilcbiAgICAubWFwKHQ9Pih7XG4gICAgICAgIHk6dC5wcmljZSxcbiAgICAgICAgeDogbW9tZW50LnVuaXgodC50aW1lKS5mb3JtYXQoXCJISDptbTpzc1wiKVxuICAgIH0pIClcbiAgICBjb25zdCBsYWJlbHMgPSBbIC4uLnN0b3JlLnRpY2tzLm1hcCh0aWNrPT50aWNrLnRpbWVzdGFtcCksIC4uLnRyYW5zYWN0aW9ucy5tYXAodD0+dC50aW1lKSBdLnNvcnQoKS5tYXAobD0+bW9tZW50LnVuaXgobCkuZm9ybWF0KFwiSEg6bW06c3NcIikpXG4gICAgY29uc3QgYmFzaWNEYXRhID0ge1xuICAgICAgICBcbiAgICAgICBsYWJlbHM6bGFiZWxzLFxuICAgICAgICBkYXRhc2V0czogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAncHJpY2UnLFxuICAgICAgICAgICAgICAgIGRhdGE6bGFzdFByaWNlcyxcbiAgICAgICAgICAgICAgICBmaWxsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJyM0MkE1RjUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnYnV5JyxcbiAgICAgICAgICAgICAgICBkYXRhOmJ1eURhdGEsXG4gICAgICAgICAgICAgICAgc2hvd0xpbmU6ZmFsc2UsXG4gICAgICAgICAgICAgICAgcG9pbnRCb3JkZXJXaWR0aDo3LFxuICAgICAgICAgICAgICAgIGZpbGw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnIzEwYTM2NidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdzZWxsJyxcbiAgICAgICAgICAgICAgICBzaG93TGluZTpmYWxzZSxcbiAgICAgICAgICAgICAgICBwb2ludEJvcmRlcldpZHRoOjcsXG4gICAgICAgICAgICAgICAgZGF0YTpzZWxsRGF0YSxcbiAgICAgICAgICAgICAgICBmaWxsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJyNhMzE1MTAnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnZXhwaXJlZCBzZWxsJyxcbiAgICAgICAgICAgICAgICBzaG93TGluZTpmYWxzZSxcbiAgICAgICAgICAgICAgICBwb2ludEJvcmRlcldpZHRoOjEsXG4gICAgICAgICAgICAgICAgZGF0YTpzZWxsRGF0YUV4cGlyZWQsXG4gICAgICAgICAgICAgICAgZmlsbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmFkaXVzOjUsXG5cbiAgICAgICAgICAgICAgICBib3JkZXJTdHlsZTonY3Jvc3MnLFxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnI2EzMTUxMCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdleHBpcmVkIGJ1eScsXG4gICAgICAgICAgICAgICAgc2hvd0xpbmU6ZmFsc2UsXG4gICAgICAgICAgICAgICAgcG9pbnRCb3JkZXJXaWR0aDoxLFxuICAgICAgICAgICAgICAgIHJhZGl1czo1LFxuICAgICAgICAgICAgICAgIGRhdGE6YnV5RGF0YUV4cGlyZWQsXG4gICAgICAgICAgICAgICAgZmlsbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgYm9yZGVyU3R5bGU6J2Nyb3NzJyxcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJyMxMGEzNjYnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICBcbiAgICAgICAgXVxuICAgIH1cbiAgICByZXR1cm4gPD5cbiAgIDxDaGFydCAgIHR5cGU9XCJsaW5lXCIgZGF0YT17YmFzaWNEYXRhfSBzdHlsZT17e2hlaWdodDoyMDB9fSBvcHRpb25zPXt7XG4gICAgICAgcmVzcG9uc2l2ZTp0cnVlLCAgbWFpbnRhaW5Bc3BlY3RSYXRpbzogZmFsc2UsXG4gICAgYW5pbWF0aW9uOntcbiAgICAgICAgZHVyYXRpb246MFxuICAgIH1cbn19IC8+XG48ZGl2IGNsYXNzTmFtZT1cInAtZC1mbGV4XCI+XG48ZGl2IGNsYXNzTmFtZT1cInAtbXItMlwiPjxUcmFuc2FjdGlvbnMgdHJhbnNhY3Rpb25zPXt0cmFuc2FjdGlvbnN9Lz48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cInAtbXItMlwiPlxuICAgICAgICA8UGFyYW1zIHN0b3JlPXtzdG9yZX0gcGFpcj17cGFpcn0vPlxuXG4gICAgPC9kaXY+XG48L2Rpdj5cblxuICAgIFxuICAgIDwvPlxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFBhbmVsIH0gZnJvbSAncHJpbWVyZWFjdC9wYW5lbCdcbmltcG9ydCBUcmFkZXIgZnJvbSAnLi90cmFkZXInXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYWRlcnMoe3N0b3JlfTp7c3RvcmU6SVN0YXRlfSl7XG4gICAgcmV0dXJuIDw+e09iamVjdC5lbnRyaWVzKHN0b3JlLnBhaXJzKS5tYXAoKFtwYWlyLGRhdGFdKT0+PFBhbmVsIGtleT17cGFpcn0gaGVhZGVyPXtwYWlyfSB0b2dnbGVhYmxlID5cblxuPFRyYWRlciBwYWlyPXtwYWlyfSBkYXRhPXtkYXRhfSBzdG9yZT17c3RvcmV9Lz5cbiAgICA8L1BhbmVsPil9PC8+XG59IiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IERhdGFUYWJsZSB9IGZyb20gJ3ByaW1lcmVhY3QvZGF0YXRhYmxlJztcbmltcG9ydCB7IENvbHVtbiB9IGZyb20gJ3ByaW1lcmVhY3QvY29sdW1uJztcblxuaW50ZXJmYWNlIElUcmFuc2FjdGlvbiB7XG4gICAgICAgIHN0YXR1czogc3RyaW5nO1xuICAgICAgICB2b2x1bWU6IHN0cmluZztcbiAgICAgICAgY29zdDogc3RyaW5nO1xuICAgICAgICBmZWU6IHN0cmluZztcbiAgICAgICAgdGltZTogbnVtYmVyO1xuICAgICAgICBwYWlyOiBzdHJpbmc7XG4gICAgICAgIHR5cGU6IHN0cmluZztcbiAgICAgICAgb3JkZXJ0eXBlOiBzdHJpbmc7XG4gICAgICAgIHByaWNlOiBzdHJpbmc7XG4gICAgICAgIHByaWNlMjogc3RyaW5nO1xuICAgICAgICBsZXZlcmFnZTogc3RyaW5nO1xuICAgICAgICBvcmRlcjogc3RyaW5nO1xuICAgICAgICBjbG9zZTogc3RyaW5nO1xuICAgICAgICBkYXRlOnN0cmluZztcbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRyYW5zYWN0aW9ucyh7dHJhbnNhY3Rpb25zfTp7dHJhbnNhY3Rpb25zOklUcmFuc2FjdGlvbltdfSl7XG5cblxucmV0dXJuICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiPlxuPGg1PlRyYW5zYWN0aW9uczwvaDU+XG48RGF0YVRhYmxlIHZhbHVlPXt0cmFuc2FjdGlvbnN9IHNjcm9sbGFibGUgc2Nyb2xsSGVpZ2h0PVwiMjAwcHhcIiA+XG48Q29sdW1uIGZpZWxkPVwiZGF0ZVwiIGhlYWRlcj1cIkRhdGVcIj48L0NvbHVtbj5cbiAgICA8Q29sdW1uIGZpZWxkPVwidHlwZVwiIGhlYWRlcj1cIlR5cGVcIj48L0NvbHVtbj5cbiAgICA8Q29sdW1uIGZpZWxkPVwidm9sdW1lXCIgaGVhZGVyPVwiVm9sdW1lXCI+PC9Db2x1bW4+XG4gICAgPENvbHVtbiBmaWVsZD1cInByaWNlXCIgaGVhZGVyPVwiUHJpY2VcIj48L0NvbHVtbj5cbiAgICA8Q29sdW1uIGZpZWxkPVwiZmVlXCIgaGVhZGVyPVwiRmVlXCI+PC9Db2x1bW4+XG4gICAgPENvbHVtbiBmaWVsZD1cInN0YXR1c1wiIGhlYWRlcj1cIlN0YXR1c1wiPjwvQ29sdW1uPlxuPC9EYXRhVGFibGU+XG48L2Rpdj5cbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb21lbnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHJpbWVyZWFjdC9idXR0b25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHJpbWVyZWFjdC9jaGFydFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcmltZXJlYWN0L2NvbHVtblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcmltZXJlYWN0L2RhdGF0YWJsZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcmltZXJlYWN0L3BhbmVsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1ydW50aW1lXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=