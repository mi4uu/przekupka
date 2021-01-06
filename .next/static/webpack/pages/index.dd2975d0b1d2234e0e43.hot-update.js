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
  var store = _ref.store,
      pair = _ref.pair;
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

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3VpL3BhcmFtcy50c3giXSwibmFtZXMiOlsiUGFyYW1zIiwic3RvcmUiLCJwYWlyIiwidHJhbnNhY3Rpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBRWUsU0FBU0EsTUFBVCxPQUF3RDtBQUFBLE1BQXZDQyxLQUF1QyxRQUF2Q0EsS0FBdUM7QUFBQSxNQUFqQ0MsSUFBaUMsUUFBakNBLElBQWlDO0FBR3ZFLHNCQUFVO0FBQUssYUFBUyxFQUFDLE1BQWY7QUFBQSw0QkFDVjtBQUFBO0FBQUEsTUFEVSxlQUVWLCtEQUFDLDhEQUFEO0FBQVcsV0FBSyxFQUFFQyxZQUFsQjtBQUFnQyxnQkFBVSxNQUExQztBQUEyQyxrQkFBWSxFQUFDLE9BQXhEO0FBQUEsOEJBQ0EsOERBQUMsd0RBQUQ7QUFBUSxhQUFLLEVBQUMsTUFBZDtBQUFxQixjQUFNLEVBQUM7QUFBNUIsUUFEQSxlQUVJLDhEQUFDLHdEQUFEO0FBQVEsYUFBSyxFQUFDLE1BQWQ7QUFBcUIsY0FBTSxFQUFDO0FBQTVCLFFBRkosZUFHSSw4REFBQyx3REFBRDtBQUFRLGFBQUssRUFBQyxRQUFkO0FBQXVCLGNBQU0sRUFBQztBQUE5QixRQUhKLGVBSUksOERBQUMsd0RBQUQ7QUFBUSxhQUFLLEVBQUMsT0FBZDtBQUFzQixjQUFNLEVBQUM7QUFBN0IsUUFKSixlQUtJLDhEQUFDLHdEQUFEO0FBQVEsYUFBSyxFQUFDLEtBQWQ7QUFBb0IsY0FBTSxFQUFDO0FBQTNCLFFBTEosZUFNSSw4REFBQyx3REFBRDtBQUFRLGFBQUssRUFBQyxRQUFkO0FBQXVCLGNBQU0sRUFBQztBQUE5QixRQU5KO0FBQUEsTUFGVTtBQUFBLElBQVY7QUFXQztLQWR1QkgsTSIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9pbmRleC5kZDI5NzVkMGIxZDIyMzRlMGU0My5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IERhdGFUYWJsZSB9IGZyb20gJ3ByaW1lcmVhY3QvZGF0YXRhYmxlJztcbmltcG9ydCB7IENvbHVtbiB9IGZyb20gJ3ByaW1lcmVhY3QvY29sdW1uJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGFyYW1zKHtzdG9yZSxwYWlyfTp7c3RvcmU6SVN0YXRlLHBhaXI6c3RyaW5nfSl7XG5cblxucmV0dXJuICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiPlxuPGg1PlBhcmFtZXRlcnM8L2g1PlxuPERhdGFUYWJsZSB2YWx1ZT17dHJhbnNhY3Rpb25zfSBzY3JvbGxhYmxlIHNjcm9sbEhlaWdodD1cIjIwMHB4XCIgPlxuPENvbHVtbiBmaWVsZD1cImRhdGVcIiBoZWFkZXI9XCJEYXRlXCI+PC9Db2x1bW4+XG4gICAgPENvbHVtbiBmaWVsZD1cInR5cGVcIiBoZWFkZXI9XCJUeXBlXCI+PC9Db2x1bW4+XG4gICAgPENvbHVtbiBmaWVsZD1cInZvbHVtZVwiIGhlYWRlcj1cIlZvbHVtZVwiPjwvQ29sdW1uPlxuICAgIDxDb2x1bW4gZmllbGQ9XCJwcmljZVwiIGhlYWRlcj1cIlByaWNlXCI+PC9Db2x1bW4+XG4gICAgPENvbHVtbiBmaWVsZD1cImZlZVwiIGhlYWRlcj1cIkZlZVwiPjwvQ29sdW1uPlxuICAgIDxDb2x1bW4gZmllbGQ9XCJzdGF0dXNcIiBoZWFkZXI9XCJTdGF0dXNcIj48L0NvbHVtbj5cbjwvRGF0YVRhYmxlPlxuPC9kaXY+XG59Il0sInNvdXJjZVJvb3QiOiIifQ==