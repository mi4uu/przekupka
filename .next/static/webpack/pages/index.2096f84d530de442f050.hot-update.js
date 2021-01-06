webpackHotUpdate_N_E("pages/index",{

/***/ "./src/ui/params.tsx":
/*!***************************!*\
  !*** ./src/ui/params.tsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Params; });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var primereact_datatable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primereact/datatable */ "./node_modules/primereact/datatable.js");
/* harmony import */ var primereact_datatable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(primereact_datatable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var primereact_column__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primereact/column */ "./node_modules/primereact/column.js");
/* harmony import */ var primereact_column__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(primereact_column__WEBPACK_IMPORTED_MODULE_3__);





function Params(_ref) {
  var store = _ref.store;
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
_c = Params;

var _c;

$RefreshReg$(_c, "Params");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/ui/trader.tsx":
/*!***************************!*\
  !*** ./src/ui/trader.tsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return trader; });
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var primereact_chart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primereact/chart */ "./node_modules/primereact/chart.js");
/* harmony import */ var primereact_chart__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(primereact_chart__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _transactions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./transactions */ "./src/ui/transactions.tsx");
/* harmony import */ var _params__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./params */ "./src/ui/params.tsx");






function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }






function trader(_ref) {
  var pair = _ref.pair,
      data = _ref.data,
      store = _ref.store;
  var lastPrices = store.ticks.map(function (tick) {
    console.log(tick);
    return {
      y: tick.pairs[pair].c[0],
      x: moment__WEBPACK_IMPORTED_MODULE_5___default.a.unix(tick.timestamp).format("HH:mm:ss")
    };
  });
  var transactions = Object.values(store.closedTransactions).filter(function (t) {
    var _store$assetPairs$pai;

    return t.descr.pair === pair || t.descr.pair === ((_store$assetPairs$pai = store.assetPairs[pair]) === null || _store$assetPairs$pai === void 0 ? void 0 : _store$assetPairs$pai.altname);
  }).map(function (t) {
    return _objectSpread(_objectSpread({}, t.descr), {}, {
      status: t.status,
      volume: t.vol,
      cost: t.cost,
      fee: t.fee,
      time: t.opentm,
      date: moment__WEBPACK_IMPORTED_MODULE_5___default.a.unix(t.opentm).format("YYYY-MM-DD HH:mm:ss")
    });
  }).sort(function (a, b) {
    return b.time - a.time;
  });
  var sellData = transactions.filter(function (t) {
    return t.type === "sell" && t.status === "closed";
  }).map(function (t) {
    return {
      y: t.price,
      x: moment__WEBPACK_IMPORTED_MODULE_5___default.a.unix(t.time).format("HH:mm:ss")
    };
  });
  var buyData = transactions.filter(function (t) {
    return t.type === "buy" && t.status === "closed";
  }).map(function (t) {
    return {
      y: t.price,
      x: moment__WEBPACK_IMPORTED_MODULE_5___default.a.unix(t.time).format("HH:mm:ss")
    };
  });
  var sellDataExpired = transactions.filter(function (t) {
    return t.type === "sell" && t.status === "expired";
  }).map(function (t) {
    return {
      y: t.price,
      x: moment__WEBPACK_IMPORTED_MODULE_5___default.a.unix(t.time).format("HH:mm:ss")
    };
  });
  var buyDataExpired = transactions.filter(function (t) {
    return t.type === "buy" && t.status === "expired";
  }).map(function (t) {
    return {
      y: t.price,
      x: moment__WEBPACK_IMPORTED_MODULE_5___default.a.unix(t.time).format("HH:mm:ss")
    };
  });
  var labels = [].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(store.ticks.map(function (tick) {
    return tick.timestamp;
  })), Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(transactions.map(function (t) {
    return t.time;
  }))).sort().map(function (l) {
    return moment__WEBPACK_IMPORTED_MODULE_5___default.a.unix(l).format("HH:mm:ss");
  });
  var basicData = {
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
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxs"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["Fragment"], {
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])(primereact_chart__WEBPACK_IMPORTED_MODULE_4__["Chart"], {
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
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxs"])("div", {
      className: "p-d-flex",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])("div", {
        className: "p-mr-2",
        children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])(_transactions__WEBPACK_IMPORTED_MODULE_6__["default"], {
          transactions: transactions
        })
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])("div", {
        className: "p-mr-2",
        children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])(_params__WEBPACK_IMPORTED_MODULE_7__["default"], {
          store: store,
          pair: pair
        })
      })]
    })]
  });
}

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3VpL3BhcmFtcy50c3giLCJ3ZWJwYWNrOi8vX05fRS8uL3NyYy91aS90cmFkZXIudHN4Il0sIm5hbWVzIjpbIlBhcmFtcyIsInN0b3JlIiwidHJhbnNhY3Rpb25zIiwidHJhZGVyIiwicGFpciIsImRhdGEiLCJsYXN0UHJpY2VzIiwidGlja3MiLCJtYXAiLCJ0aWNrIiwiY29uc29sZSIsImxvZyIsInkiLCJwYWlycyIsImMiLCJ4IiwibW9tZW50IiwidW5peCIsInRpbWVzdGFtcCIsImZvcm1hdCIsIk9iamVjdCIsInZhbHVlcyIsImNsb3NlZFRyYW5zYWN0aW9ucyIsImZpbHRlciIsInQiLCJkZXNjciIsImFzc2V0UGFpcnMiLCJhbHRuYW1lIiwic3RhdHVzIiwidm9sdW1lIiwidm9sIiwiY29zdCIsImZlZSIsInRpbWUiLCJvcGVudG0iLCJkYXRlIiwic29ydCIsImEiLCJiIiwic2VsbERhdGEiLCJ0eXBlIiwicHJpY2UiLCJidXlEYXRhIiwic2VsbERhdGFFeHBpcmVkIiwiYnV5RGF0YUV4cGlyZWQiLCJsYWJlbHMiLCJsIiwiYmFzaWNEYXRhIiwiZGF0YXNldHMiLCJsYWJlbCIsImZpbGwiLCJib3JkZXJDb2xvciIsInNob3dMaW5lIiwicG9pbnRCb3JkZXJXaWR0aCIsInJhZGl1cyIsImJvcmRlclN0eWxlIiwiaGVpZ2h0IiwicmVzcG9uc2l2ZSIsIm1haW50YWluQXNwZWN0UmF0aW8iLCJhbmltYXRpb24iLCJkdXJhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVlLFNBQVNBLE1BQVQsT0FBdUM7QUFBQSxNQUF0QkMsS0FBc0IsUUFBdEJBLEtBQXNCO0FBR3RELHNCQUFVO0FBQUssYUFBUyxFQUFDLE1BQWY7QUFBQSw0QkFDVjtBQUFBO0FBQUEsTUFEVSxlQUVWLCtEQUFDLDhEQUFEO0FBQVcsV0FBSyxFQUFFQyxZQUFsQjtBQUFnQyxnQkFBVSxNQUEx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O0FBQTVCO0FBQXhCLFFBREEsZUFFSTtBQUFLLGlCQUFTLEVBQUMsUUFBZjtBQUFBLCtCQUNJLDhEQUFDLCtDQUFEO0FBQVEsZUFBSyxFQUFFRCxLQUFmO0FBQXNCLGNBQUksRUFBRUc7QUFBNUI7QUFESixRQUZKO0FBQUEsTUFQVztBQUFBLElBQVA7QUFpQkgiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvaW5kZXguMjA5NmY4NGQ1MzBkZTQ0MmYwNTAuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBEYXRhVGFibGUgfSBmcm9tICdwcmltZXJlYWN0L2RhdGF0YWJsZSc7XG5pbXBvcnQgeyBDb2x1bW4gfSBmcm9tICdwcmltZXJlYWN0L2NvbHVtbic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhcmFtcyh7c3RvcmV9OntzdG9yZTpJU3RhdGV9KXtcblxuXG5yZXR1cm4gICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCI+XG48aDU+UGFyYW1ldGVyczwvaDU+XG48RGF0YVRhYmxlIHZhbHVlPXt0cmFuc2FjdGlvbnN9IHNjcm9sbGFibGUgc2Nyb2xsSGVpZ2h0PVwiMjAwcHhcIiA+XG48Q29sdW1uIGZpZWxkPVwiZGF0ZVwiIGhlYWRlcj1cIkRhdGVcIj48L0NvbHVtbj5cbiAgICA8Q29sdW1uIGZpZWxkPVwidHlwZVwiIGhlYWRlcj1cIlR5cGVcIj48L0NvbHVtbj5cbiAgICA8Q29sdW1uIGZpZWxkPVwidm9sdW1lXCIgaGVhZGVyPVwiVm9sdW1lXCI+PC9Db2x1bW4+XG4gICAgPENvbHVtbiBmaWVsZD1cInByaWNlXCIgaGVhZGVyPVwiUHJpY2VcIj48L0NvbHVtbj5cbiAgICA8Q29sdW1uIGZpZWxkPVwiZmVlXCIgaGVhZGVyPVwiRmVlXCI+PC9Db2x1bW4+XG4gICAgPENvbHVtbiBmaWVsZD1cInN0YXR1c1wiIGhlYWRlcj1cIlN0YXR1c1wiPjwvQ29sdW1uPlxuPC9EYXRhVGFibGU+XG48L2Rpdj5cbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBDaGFydCB9IGZyb20gJ3ByaW1lcmVhY3QvY2hhcnQnXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCdcbmltcG9ydCBUcmFuc2FjdGlvbnMgZnJvbSAnLi90cmFuc2FjdGlvbnMnXG5pbXBvcnQgUGFyYW1zIGZyb20gJy4vcGFyYW1zJ1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJhZGVyKHtwYWlyLGRhdGEsc3RvcmV9OntwYWlyOnN0cmluZywgZGF0YTphbnkgLHN0b3JlOklTdGF0ZX0pe1xuICAgIGNvbnN0IGxhc3RQcmljZXMgPSBzdG9yZS50aWNrcy5tYXAoKHRpY2s6SVRpY2spPT57XG4gICAgICAgIGNvbnNvbGUubG9nKHRpY2spXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB5OnRpY2sucGFpcnNbcGFpcl0uY1swXSxcbiAgICAgICAgICAgIHg6bW9tZW50LnVuaXgodGljay50aW1lc3RhbXApLmZvcm1hdChcIkhIOm1tOnNzXCIpXG4gICAgICAgIH1cbiAgICB9KVxuICAgIGNvbnN0IHRyYW5zYWN0aW9ucyA9IE9iamVjdC52YWx1ZXMoc3RvcmUuY2xvc2VkVHJhbnNhY3Rpb25zKVxuXG4gICAgLmZpbHRlcih0PT50LmRlc2NyLnBhaXI9PT1wYWlyIHx8IHQuZGVzY3IucGFpcj09PSBzdG9yZS5hc3NldFBhaXJzW3BhaXJdPy5hbHRuYW1lKVxuICAgIC5tYXAodD0+KHtcbiAgICAgICAgICAgIC4uLnQuZGVzY3IsXG4gICAgICAgICAgICBzdGF0dXM6dC5zdGF0dXMsXG4gICAgICAgICAgICB2b2x1bWU6dC52b2wsXG4gICAgICAgICAgICBjb3N0OnQuY29zdCxcbiAgICAgICAgICAgIGZlZTp0LmZlZSxcbiAgICAgICAgICAgIHRpbWU6dC5vcGVudG0sXG4gICAgICAgICAgICBkYXRlOm1vbWVudC51bml4KHQub3BlbnRtKS5mb3JtYXQoXCJZWVlZLU1NLUREIEhIOm1tOnNzXCIpXG4gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICApLnNvcnQoKGEsYik9PmIudGltZS1hLnRpbWUpXG4gICAgY29uc3Qgc2VsbERhdGEgPSB0cmFuc2FjdGlvbnNcbiAgICAuZmlsdGVyKHQ9PnQudHlwZT09PVwic2VsbFwiICYmIHQuc3RhdHVzPT09XCJjbG9zZWRcIilcbiAgICAubWFwKHQ9Pih7XG4gICAgICAgIHk6dC5wcmljZSxcbiAgICAgICAgeDogbW9tZW50LnVuaXgodC50aW1lKS5mb3JtYXQoXCJISDptbTpzc1wiKVxuICAgIH0pIClcbiAgICBjb25zdCBidXlEYXRhID0gdHJhbnNhY3Rpb25zXG4gICAgLmZpbHRlcih0PT50LnR5cGU9PT1cImJ1eVwiICYmIHQuc3RhdHVzPT09XCJjbG9zZWRcIilcbiAgICAubWFwKHQ9Pih7XG4gICAgICAgIHk6dC5wcmljZSxcbiAgICAgICAgeDogbW9tZW50LnVuaXgodC50aW1lKS5mb3JtYXQoXCJISDptbTpzc1wiKVxuICAgIH0pIClcbiAgICBjb25zdCBzZWxsRGF0YUV4cGlyZWQgPSB0cmFuc2FjdGlvbnNcbiAgICAuZmlsdGVyKHQ9PnQudHlwZT09PVwic2VsbFwiICYmIHQuc3RhdHVzPT09XCJleHBpcmVkXCIpXG4gICAgLm1hcCh0PT4oe1xuICAgICAgICB5OnQucHJpY2UsXG4gICAgICAgIHg6IG1vbWVudC51bml4KHQudGltZSkuZm9ybWF0KFwiSEg6bW06c3NcIilcbiAgICB9KSApXG4gICAgY29uc3QgYnV5RGF0YUV4cGlyZWQgPSB0cmFuc2FjdGlvbnNcbiAgICAuZmlsdGVyKHQ9PnQudHlwZT09PVwiYnV5XCIgJiYgdC5zdGF0dXM9PT1cImV4cGlyZWRcIilcbiAgICAubWFwKHQ9Pih7XG4gICAgICAgIHk6dC5wcmljZSxcbiAgICAgICAgeDogbW9tZW50LnVuaXgodC50aW1lKS5mb3JtYXQoXCJISDptbTpzc1wiKVxuICAgIH0pIClcbiAgICBjb25zdCBsYWJlbHMgPSBbIC4uLnN0b3JlLnRpY2tzLm1hcCh0aWNrPT50aWNrLnRpbWVzdGFtcCksIC4uLnRyYW5zYWN0aW9ucy5tYXAodD0+dC50aW1lKSBdLnNvcnQoKS5tYXAobD0+bW9tZW50LnVuaXgobCkuZm9ybWF0KFwiSEg6bW06c3NcIikpXG4gICAgY29uc3QgYmFzaWNEYXRhID0ge1xuICAgICAgICBcbiAgICAgICBsYWJlbHM6bGFiZWxzLFxuICAgICAgICBkYXRhc2V0czogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAncHJpY2UnLFxuICAgICAgICAgICAgICAgIGRhdGE6bGFzdFByaWNlcyxcbiAgICAgICAgICAgICAgICBmaWxsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJyM0MkE1RjUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnYnV5JyxcbiAgICAgICAgICAgICAgICBkYXRhOmJ1eURhdGEsXG4gICAgICAgICAgICAgICAgc2hvd0xpbmU6ZmFsc2UsXG4gICAgICAgICAgICAgICAgcG9pbnRCb3JkZXJXaWR0aDo3LFxuICAgICAgICAgICAgICAgIGZpbGw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnIzEwYTM2NidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdzZWxsJyxcbiAgICAgICAgICAgICAgICBzaG93TGluZTpmYWxzZSxcbiAgICAgICAgICAgICAgICBwb2ludEJvcmRlcldpZHRoOjcsXG4gICAgICAgICAgICAgICAgZGF0YTpzZWxsRGF0YSxcbiAgICAgICAgICAgICAgICBmaWxsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJyNhMzE1MTAnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnZXhwaXJlZCBzZWxsJyxcbiAgICAgICAgICAgICAgICBzaG93TGluZTpmYWxzZSxcbiAgICAgICAgICAgICAgICBwb2ludEJvcmRlcldpZHRoOjEsXG4gICAgICAgICAgICAgICAgZGF0YTpzZWxsRGF0YUV4cGlyZWQsXG4gICAgICAgICAgICAgICAgZmlsbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmFkaXVzOjUsXG5cbiAgICAgICAgICAgICAgICBib3JkZXJTdHlsZTonY3Jvc3MnLFxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnI2EzMTUxMCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdleHBpcmVkIGJ1eScsXG4gICAgICAgICAgICAgICAgc2hvd0xpbmU6ZmFsc2UsXG4gICAgICAgICAgICAgICAgcG9pbnRCb3JkZXJXaWR0aDoxLFxuICAgICAgICAgICAgICAgIHJhZGl1czo1LFxuICAgICAgICAgICAgICAgIGRhdGE6YnV5RGF0YUV4cGlyZWQsXG4gICAgICAgICAgICAgICAgZmlsbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgYm9yZGVyU3R5bGU6J2Nyb3NzJyxcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJyMxMGEzNjYnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICBcbiAgICAgICAgXVxuICAgIH1cbiAgICByZXR1cm4gPD5cbiAgIDxDaGFydCAgIHR5cGU9XCJsaW5lXCIgZGF0YT17YmFzaWNEYXRhfSBzdHlsZT17e2hlaWdodDoyMDB9fSBvcHRpb25zPXt7XG4gICAgICAgcmVzcG9uc2l2ZTp0cnVlLCAgbWFpbnRhaW5Bc3BlY3RSYXRpbzogZmFsc2UsXG4gICAgYW5pbWF0aW9uOntcbiAgICAgICAgZHVyYXRpb246MFxuICAgIH1cbn19IC8+XG48ZGl2IGNsYXNzTmFtZT1cInAtZC1mbGV4XCI+XG48ZGl2IGNsYXNzTmFtZT1cInAtbXItMlwiPjxUcmFuc2FjdGlvbnMgdHJhbnNhY3Rpb25zPXt0cmFuc2FjdGlvbnN9Lz48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cInAtbXItMlwiPlxuICAgICAgICA8UGFyYW1zIHN0b3JlPXtzdG9yZX0gcGFpcj17cGFpcn0vPlxuXG4gICAgPC9kaXY+XG48L2Rpdj5cblxuICAgIFxuICAgIDwvPlxufSJdLCJzb3VyY2VSb290IjoiIn0=