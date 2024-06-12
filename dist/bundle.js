/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 2 */
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),
/* 4 */
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 6 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),
/* 7 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),
/* 8 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_fonts_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_login_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_agency_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _images_background5_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(15);
// Imports







var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_fonts_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_login_css__WEBPACK_IMPORTED_MODULE_3__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_agency_css__WEBPACK_IMPORTED_MODULE_4__["default"]);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_5___default()(_images_background5_jpg__WEBPACK_IMPORTED_MODULE_6__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  overflow-x: hidden;\n  margin: 0;\n  border: 0;\n  font-family: 'Averia Serif Libre';\n  /* overflow-y: hidden; */\n}\n\nbutton, input[type=\"submit\"] {\n    z-index: 2;\n    color: #fff;\n    padding: 9px 12px;\n    background: linear-gradient(0deg, rgba(0,172,238,1)0%, rgba(2,126,251,1) 100%);\n    border: 2px solid rgba(255, 255, 255, .5);\n    border-radius: 10px;\n    box-shadow: 0 .25em .5em 0 rgba(0, 0, 0, .1);\n    transition: all 0.4s ease;\n    outline: none;\n \n}\n\nbutton:hover, input[type=\"submit\"]:hover {\n  border-color: #fff;\n  cursor: pointer;\n}\n.background-wrapper {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-position: center;\n  background-size: cover;\n}\nnav {\n  background: rgba(255,255,255, 0.5);\n  display: flex;\n  justify-content: space-between;\n  padding: 0 10px 0 20px;\n  align-items: center;\n  font-size: 20px;\n  font-weight: 500;\n  .nav-title {\n    margin-left: 50px;\n  }\n  .nav-bar-menus{ \n    display: flex;\n    justify-content: space-evenly;\n    list-style-type: none;\n    width: 30vw;\n    #user-logout-btn {\n      all:unset;\n    }\n    #user-logout-btn:hover {\n      border-bottom: 2px solid #1373E6;\n      cursor: pointer;\n    }\n  }\n}\n\n.welcome-section {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 40px 0 40px;\n  margin: 50px 0 50px 0;\n  .welcome-message-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transform: translateY(18%);\n    background: rgba(255, 255, 255, 0.3);\n    border-radius: 5px;\n    backdrop-filter: blur(20px);\n    box-shadow: 10px 10px 30px;\n    width: 30vw;\n    height: 150px;   \n  }\n  h1 {\n    letter-spacing: 3px;\n    font-size: 50px;\n    margin: 0;\n  }\n  .user-wrapper {\n    transform: translateY(18%);\n    background: rgba(255, 255, 255, 0.3);\n    border-radius: 5px;\n    backdrop-filter: blur(20px);\n    box-shadow: 10px 10px 30px;\n    width: 30vw;\n    height: 150px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n\n    h2 {\n      font-size: 30px;\n    }\n    button {\n      transform: translateY(-10%);\n      border-radius: 10px;\n      padding: 15px 18px;\n      font-size: 18px;\n      width: fit-content;\n      height: fit-content;\n      align-self: center;\n    }\n  }\n}\n.summary-section {\n  display: flex;\n  justify-content: center;\n  text-align: center;\n  font-size: 20px;\n  align-items: center;\n  .summary-container {\n    transform: translateY(18%);\n    background: rgba(255, 255, 255, 0.3);\n    border-radius: 5px;\n    backdrop-filter: blur(20px);\n    box-shadow: 10px 10px 30px;\n    width: 30vw;\n    height: 150px;\n  }\n}\n\n.trips-section {\n  display: flex;\n  justify-content: space-around;\n  height: 72dvh;\n  margin-top: 100px;\n  .section-card-wrapper,.section-upcoming-card-wrapper {\n    background: rgba(255, 255, 255, 0.3);\n    backdrop-filter: blur(20px);\n    box-shadow: 10px 10px 30px;\n    display: flex;\n    flex-direction: column;\n    text-align: center;\n    border-radius: 10px;\n    width: 30vw;\n    height: 60vh;\n    h3 {\n      font-size: 30px;\n      margin: 10px 0 30px 0;\n    };\n    .user-pending-trips-title, .user-past-trips-title{\n      font-size: 25px;\n      margin: 0;\n    }\n    .pending-status {\n      font-weight: 500;\n      color: rgb(249,216,0)\n    }\n    .user-past-trips {\n      align-self: center;\n    }\n    .user-pending-trips {\n      hr {\n        width: 650px;\n      }\n    }\n  }\n.section-upcoming-card-wrapper {\n  .upcoming-trips-title {\n    text-wrap: balance;\n    font-size: 30px;\n    letter-spacing: 0.15rem;\n    line-height: 1.5;\n    transform: translateY(150%)\n  }\n}\n\n}\n.glide {\n  height: 45vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transform: translate(1%,-7%);\n  img {\n    align-content: center;\n    aspect-ratio: 16/9;\n    height: 25vh;\n  }\n  h4 {\n    font-size: 25px;\n    text-align: center;\n    padding: 0;\n    margin: 0;\n  }\n  button {\n    border-radius: 8px;\n    font-size: 18px;\n    width: 50px;\n    height: 40px;\n  }\n  button.glide__arrow--left {\n    margin-right: 50px;\n    border-radius: 5px;\n\n  }\n  button.glide__arrow--right {\n    margin-left: 50px;\n    border-radius: 5px;\n  }\n}\n/*modal*/\ndialog::backdrop {\n  background-color:hsl(234, 44%, 66%, .2);\n}\n.modal {\n  background: rgba(255,255,255, 0.5);\n  border-radius: 5px;\n  backdrop-filter: blur(20px);\n  height: 85vh;\n  width: 60vw;\n  align-content: center;\n  overflow-x: hidden;\n  border-color: none;\n  [data-close-modal] {\n    float: right;\n    transform: translate(-30%,-150%);\n    padding: 5px 20px;\n    border-radius: 5px;\n    font-size: 25px;\n  }\n  [data-close-modal]:hover {\n    cursor: pointer;\n  };\n  .glide {\n    margin-bottom: 10px;\n    img {\n      height: 45vh;\n      transform: translate(25%)\n    }\n    button {\n      width: 60px;\n    }\n    button.glide__arrow--left {\n      margin-left: 100px;\n      border-radius: 5px;\n\n    }\n    button.glide__arrow--right {\n      margin-right: 100px;\n      border-radius: 5px;\n    }\n    h4 {\n      font-size: 35px;\n    }\n  } \n}\n.form-estimate-wrapper {\n  display: flex;\n  justify-content: space-around;\n  #book-trip-form {\n    font-weight: 300;\n    transform: translate(23%);\n    input[type=\"number\"] {\n      width: 40px;\n    }\n    input[type=\"submit\"]:hover{\n      cursor: pointer;\n    }\n    select,input {\n      margin: 15px 0 15px 0;\n    }\n\n    label {\n      font-size: 18px;\n    }\n    #calculate-estimate-btn {\n      font-size: 15px;\n      transform: translate(0%, 10%)\n    }\n    #book-trip-btn {\n      font-size: 15px;\n      transform: translate(710%,10%);\n      z-index: 999;\n    }\n  }\n  .breakdown {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    transform: translate(-10%,-5%);\n    hr {\n      background-color: black;\n      width: 15vw;\n    }\n    h3 {\n      align-self: center;\n      margin: 0;\n      padding: 0;\n    }\n    p {\n      font-weight: 300;\n      font-size: 18px;\n    }\n    p.estimate-flight-cost {\n      margin: 0 14px 10px 0;\n    }\n    p.total-estimate {\n      margin: 5px 25px 0 0 ;\n      font-size: 20px;\n      border: 0;\n      padding: 0;\n      line-height: 2;\n      z-index: 0;\n    }\n  }\n}\n\n.hidden {\n  display: none;\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAGA;EACE,kBAAkB;EAClB,SAAS;EACT,SAAS;EACT,iCAAiC;EACjC,wBAAwB;AAC1B;;AAEA;IACI,UAAU;IACV,WAAW;IACX,iBAAiB;IACjB,8EAA8E;IAC9E,yCAAyC;IACzC,mBAAmB;IACnB,4CAA4C;IAC5C,yBAAyB;IACzB,aAAa;;AAEjB;;AAEA;EACE,kBAAkB;EAClB,eAAe;AACjB;AACA;EACE,yDAAkD;EAClD,2BAA2B;EAC3B,sBAAsB;AACxB;AACA;EACE,kCAAkC;EAClC,aAAa;EACb,8BAA8B;EAC9B,sBAAsB;EACtB,mBAAmB;EACnB,eAAe;EACf,gBAAgB;EAChB;IACE,iBAAiB;EACnB;EACA;IACE,aAAa;IACb,6BAA6B;IAC7B,qBAAqB;IACrB,WAAW;IACX;MACE,SAAS;IACX;IACA;MACE,gCAAgC;MAChC,eAAe;IACjB;EACF;AACF;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,sBAAsB;EACtB,qBAAqB;EACrB;IACE,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,0BAA0B;IAC1B,oCAAoC;IACpC,kBAAkB;IAClB,2BAA2B;IAC3B,0BAA0B;IAC1B,WAAW;IACX,aAAa;EACf;EACA;IACE,mBAAmB;IACnB,eAAe;IACf,SAAS;EACX;EACA;IACE,0BAA0B;IAC1B,oCAAoC;IACpC,kBAAkB;IAClB,2BAA2B;IAC3B,0BAA0B;IAC1B,WAAW;IACX,aAAa;IACb,aAAa;IACb,sBAAsB;IACtB,mBAAmB;;IAEnB;MACE,eAAe;IACjB;IACA;MACE,2BAA2B;MAC3B,mBAAmB;MACnB,kBAAkB;MAClB,eAAe;MACf,kBAAkB;MAClB,mBAAmB;MACnB,kBAAkB;IACpB;EACF;AACF;AACA;EACE,aAAa;EACb,uBAAuB;EACvB,kBAAkB;EAClB,eAAe;EACf,mBAAmB;EACnB;IACE,0BAA0B;IAC1B,oCAAoC;IACpC,kBAAkB;IAClB,2BAA2B;IAC3B,0BAA0B;IAC1B,WAAW;IACX,aAAa;EACf;AACF;;AAEA;EACE,aAAa;EACb,6BAA6B;EAC7B,aAAa;EACb,iBAAiB;EACjB;IACE,oCAAoC;IACpC,2BAA2B;IAC3B,0BAA0B;IAC1B,aAAa;IACb,sBAAsB;IACtB,kBAAkB;IAClB,mBAAmB;IACnB,WAAW;IACX,YAAY;IACZ;MACE,eAAe;MACf,qBAAqB;IACvB,CAAA;IACA;MACE,eAAe;MACf,SAAS;IACX;IACA;MACE,gBAAgB;MAChB;IACF;IACA;MACE,kBAAkB;IACpB;IACA;MACE;QACE,YAAY;MACd;IACF;EACF;AACF;EACE;IACE,kBAAkB;IAClB,eAAe;IACf,uBAAuB;IACvB,gBAAgB;IAChB;EACF;AACF;;AAEA;AACA;EACE,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,4BAA4B;EAC5B;IACE,qBAAqB;IACrB,kBAAkB;IAClB,YAAY;EACd;EACA;IACE,eAAe;IACf,kBAAkB;IAClB,UAAU;IACV,SAAS;EACX;EACA;IACE,kBAAkB;IAClB,eAAe;IACf,WAAW;IACX,YAAY;EACd;EACA;IACE,kBAAkB;IAClB,kBAAkB;;EAEpB;EACA;IACE,iBAAiB;IACjB,kBAAkB;EACpB;AACF;AACA,QAAQ;AACR;EACE,uCAAuC;AACzC;AACA;EACE,kCAAkC;EAClC,kBAAkB;EAClB,2BAA2B;EAC3B,YAAY;EACZ,WAAW;EACX,qBAAqB;EACrB,kBAAkB;EAClB,kBAAkB;EAClB;IACE,YAAY;IACZ,gCAAgC;IAChC,iBAAiB;IACjB,kBAAkB;IAClB,eAAe;EACjB;EACA;IACE,eAAe;EACjB,CAAA;EACA;IACE,mBAAmB;IACnB;MACE,YAAY;MACZ;IACF;IACA;MACE,WAAW;IACb;IACA;MACE,kBAAkB;MAClB,kBAAkB;;IAEpB;IACA;MACE,mBAAmB;MACnB,kBAAkB;IACpB;IACA;MACE,eAAe;IACjB;EACF;AACF;AACA;EACE,aAAa;EACb,6BAA6B;EAC7B;IACE,gBAAgB;IAChB,yBAAyB;IACzB;MACE,WAAW;IACb;IACA;MACE,eAAe;IACjB;IACA;MACE,qBAAqB;IACvB;;IAEA;MACE,eAAe;IACjB;IACA;MACE,eAAe;MACf;IACF;IACA;MACE,eAAe;MACf,8BAA8B;MAC9B,YAAY;IACd;EACF;EACA;IACE,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;IACnB,8BAA8B;IAC9B;MACE,uBAAuB;MACvB,WAAW;IACb;IACA;MACE,kBAAkB;MAClB,SAAS;MACT,UAAU;IACZ;IACA;MACE,gBAAgB;MAChB,eAAe;IACjB;IACA;MACE,qBAAqB;IACvB;IACA;MACE,qBAAqB;MACrB,eAAe;MACf,SAAS;MACT,UAAU;MACV,cAAc;MACd,UAAU;IACZ;EACF;AACF;;AAEA;EACE,aAAa;AACf","sourcesContent":["@import 'fonts.css';\n@import 'login.css';\n@import 'agency.css';\nbody {\n  overflow-x: hidden;\n  margin: 0;\n  border: 0;\n  font-family: 'Averia Serif Libre';\n  /* overflow-y: hidden; */\n}\n\nbutton, input[type=\"submit\"] {\n    z-index: 2;\n    color: #fff;\n    padding: 9px 12px;\n    background: linear-gradient(0deg, rgba(0,172,238,1)0%, rgba(2,126,251,1) 100%);\n    border: 2px solid rgba(255, 255, 255, .5);\n    border-radius: 10px;\n    box-shadow: 0 .25em .5em 0 rgba(0, 0, 0, .1);\n    transition: all 0.4s ease;\n    outline: none;\n \n}\n\nbutton:hover, input[type=\"submit\"]:hover {\n  border-color: #fff;\n  cursor: pointer;\n}\n.background-wrapper {\n  background-image: url('../images/background5.jpg');\n  background-position: center;\n  background-size: cover;\n}\nnav {\n  background: rgba(255,255,255, 0.5);\n  display: flex;\n  justify-content: space-between;\n  padding: 0 10px 0 20px;\n  align-items: center;\n  font-size: 20px;\n  font-weight: 500;\n  .nav-title {\n    margin-left: 50px;\n  }\n  .nav-bar-menus{ \n    display: flex;\n    justify-content: space-evenly;\n    list-style-type: none;\n    width: 30vw;\n    #user-logout-btn {\n      all:unset;\n    }\n    #user-logout-btn:hover {\n      border-bottom: 2px solid #1373E6;\n      cursor: pointer;\n    }\n  }\n}\n\n.welcome-section {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 40px 0 40px;\n  margin: 50px 0 50px 0;\n  .welcome-message-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transform: translateY(18%);\n    background: rgba(255, 255, 255, 0.3);\n    border-radius: 5px;\n    backdrop-filter: blur(20px);\n    box-shadow: 10px 10px 30px;\n    width: 30vw;\n    height: 150px;   \n  }\n  h1 {\n    letter-spacing: 3px;\n    font-size: 50px;\n    margin: 0;\n  }\n  .user-wrapper {\n    transform: translateY(18%);\n    background: rgba(255, 255, 255, 0.3);\n    border-radius: 5px;\n    backdrop-filter: blur(20px);\n    box-shadow: 10px 10px 30px;\n    width: 30vw;\n    height: 150px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n\n    h2 {\n      font-size: 30px;\n    }\n    button {\n      transform: translateY(-10%);\n      border-radius: 10px;\n      padding: 15px 18px;\n      font-size: 18px;\n      width: fit-content;\n      height: fit-content;\n      align-self: center;\n    }\n  }\n}\n.summary-section {\n  display: flex;\n  justify-content: center;\n  text-align: center;\n  font-size: 20px;\n  align-items: center;\n  .summary-container {\n    transform: translateY(18%);\n    background: rgba(255, 255, 255, 0.3);\n    border-radius: 5px;\n    backdrop-filter: blur(20px);\n    box-shadow: 10px 10px 30px;\n    width: 30vw;\n    height: 150px;\n  }\n}\n\n.trips-section {\n  display: flex;\n  justify-content: space-around;\n  height: 72dvh;\n  margin-top: 100px;\n  .section-card-wrapper,.section-upcoming-card-wrapper {\n    background: rgba(255, 255, 255, 0.3);\n    backdrop-filter: blur(20px);\n    box-shadow: 10px 10px 30px;\n    display: flex;\n    flex-direction: column;\n    text-align: center;\n    border-radius: 10px;\n    width: 30vw;\n    height: 60vh;\n    h3 {\n      font-size: 30px;\n      margin: 10px 0 30px 0;\n    };\n    .user-pending-trips-title, .user-past-trips-title{\n      font-size: 25px;\n      margin: 0;\n    }\n    .pending-status {\n      font-weight: 500;\n      color: rgb(249,216,0)\n    }\n    .user-past-trips {\n      align-self: center;\n    }\n    .user-pending-trips {\n      hr {\n        width: 650px;\n      }\n    }\n  }\n.section-upcoming-card-wrapper {\n  .upcoming-trips-title {\n    text-wrap: balance;\n    font-size: 30px;\n    letter-spacing: 0.15rem;\n    line-height: 1.5;\n    transform: translateY(150%)\n  }\n}\n\n}\n.glide {\n  height: 45vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transform: translate(1%,-7%);\n  img {\n    align-content: center;\n    aspect-ratio: 16/9;\n    height: 25vh;\n  }\n  h4 {\n    font-size: 25px;\n    text-align: center;\n    padding: 0;\n    margin: 0;\n  }\n  button {\n    border-radius: 8px;\n    font-size: 18px;\n    width: 50px;\n    height: 40px;\n  }\n  button.glide__arrow--left {\n    margin-right: 50px;\n    border-radius: 5px;\n\n  }\n  button.glide__arrow--right {\n    margin-left: 50px;\n    border-radius: 5px;\n  }\n}\n/*modal*/\ndialog::backdrop {\n  background-color:hsl(234, 44%, 66%, .2);\n}\n.modal {\n  background: rgba(255,255,255, 0.5);\n  border-radius: 5px;\n  backdrop-filter: blur(20px);\n  height: 85vh;\n  width: 60vw;\n  align-content: center;\n  overflow-x: hidden;\n  border-color: none;\n  [data-close-modal] {\n    float: right;\n    transform: translate(-30%,-150%);\n    padding: 5px 20px;\n    border-radius: 5px;\n    font-size: 25px;\n  }\n  [data-close-modal]:hover {\n    cursor: pointer;\n  };\n  .glide {\n    margin-bottom: 10px;\n    img {\n      height: 45vh;\n      transform: translate(25%)\n    }\n    button {\n      width: 60px;\n    }\n    button.glide__arrow--left {\n      margin-left: 100px;\n      border-radius: 5px;\n\n    }\n    button.glide__arrow--right {\n      margin-right: 100px;\n      border-radius: 5px;\n    }\n    h4 {\n      font-size: 35px;\n    }\n  } \n}\n.form-estimate-wrapper {\n  display: flex;\n  justify-content: space-around;\n  #book-trip-form {\n    font-weight: 300;\n    transform: translate(23%);\n    input[type=\"number\"] {\n      width: 40px;\n    }\n    input[type=\"submit\"]:hover{\n      cursor: pointer;\n    }\n    select,input {\n      margin: 15px 0 15px 0;\n    }\n\n    label {\n      font-size: 18px;\n    }\n    #calculate-estimate-btn {\n      font-size: 15px;\n      transform: translate(0%, 10%)\n    }\n    #book-trip-btn {\n      font-size: 15px;\n      transform: translate(710%,10%);\n      z-index: 999;\n    }\n  }\n  .breakdown {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    transform: translate(-10%,-5%);\n    hr {\n      background-color: black;\n      width: 15vw;\n    }\n    h3 {\n      align-self: center;\n      margin: 0;\n      padding: 0;\n    }\n    p {\n      font-weight: 300;\n      font-size: 18px;\n    }\n    p.estimate-flight-cost {\n      margin: 0 14px 10px 0;\n    }\n    p.total-estimate {\n      margin: 5px 25px 0 0 ;\n      font-size: 20px;\n      border: 0;\n      padding: 0;\n      line-height: 2;\n      z-index: 0;\n    }\n  }\n}\n\n.hidden {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 9 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 10 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 11 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* fonts */\n.averia-serif-libre-light {\n    font-family: \"Averia Serif Libre\", serif;\n    font-weight: 300;\n    font-style: normal;\n  }\n  \n  .averia-serif-libre-regular {\n    font-family: \"Averia Serif Libre\", serif;\n    font-weight: 400;\n    font-style: normal;\n  }\n  \n  .averia-serif-libre-bold {\n    font-family: \"Averia Serif Libre\", serif;\n    font-weight: 700;\n    font-style: normal;\n  }\n  \n  .averia-serif-libre-light-italic {\n    font-family: \"Averia Serif Libre\", serif;\n    font-weight: 300;\n    font-style: italic;\n  }\n  \n  .averia-serif-libre-regular-italic {\n    font-family: \"Averia Serif Libre\", serif;\n    font-weight: 400;\n    font-style: italic;\n  }\n  \n  .averia-serif-libre-bold-italic {\n    font-family: \"Averia Serif Libre\", serif;\n    font-weight: 700;\n    font-style: italic;\n  }\n  /* fonts */", "",{"version":3,"sources":["webpack://./src/css/fonts.css"],"names":[],"mappings":"AAAA,UAAU;AACV;IACI,wCAAwC;IACxC,gBAAgB;IAChB,kBAAkB;EACpB;;EAEA;IACE,wCAAwC;IACxC,gBAAgB;IAChB,kBAAkB;EACpB;;EAEA;IACE,wCAAwC;IACxC,gBAAgB;IAChB,kBAAkB;EACpB;;EAEA;IACE,wCAAwC;IACxC,gBAAgB;IAChB,kBAAkB;EACpB;;EAEA;IACE,wCAAwC;IACxC,gBAAgB;IAChB,kBAAkB;EACpB;;EAEA;IACE,wCAAwC;IACxC,gBAAgB;IAChB,kBAAkB;EACpB;EACA,UAAU","sourcesContent":["/* fonts */\n.averia-serif-libre-light {\n    font-family: \"Averia Serif Libre\", serif;\n    font-weight: 300;\n    font-style: normal;\n  }\n  \n  .averia-serif-libre-regular {\n    font-family: \"Averia Serif Libre\", serif;\n    font-weight: 400;\n    font-style: normal;\n  }\n  \n  .averia-serif-libre-bold {\n    font-family: \"Averia Serif Libre\", serif;\n    font-weight: 700;\n    font-style: normal;\n  }\n  \n  .averia-serif-libre-light-italic {\n    font-family: \"Averia Serif Libre\", serif;\n    font-weight: 300;\n    font-style: italic;\n  }\n  \n  .averia-serif-libre-regular-italic {\n    font-family: \"Averia Serif Libre\", serif;\n    font-weight: 400;\n    font-style: italic;\n  }\n  \n  .averia-serif-libre-bold-italic {\n    font-family: \"Averia Serif Libre\", serif;\n    font-weight: 700;\n    font-style: italic;\n  }\n  /* fonts */"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 12 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".login-page-header {\n    font-family: 'Averia Serif Libre';\n    background-image: linear-gradient(\n    45deg,\n    hsl(230deg 59% 22%) 0%,\n    hsl(229deg 57% 24%) 11%,\n    hsl(228deg 55% 26%) 22%,\n    hsl(228deg 54% 28%) 33%,\n    hsl(226deg 52% 30%) 44%,\n    hsl(225deg 50% 32%) 56%,\n    hsl(224deg 49% 34%) 67%,\n    hsl(223deg 47% 36%) 78%,\n    hsl(222deg 46% 38%) 89%,\n    hsl(222deg 44% 40%) 100%\n    );\n    height: 20vh;\n}\n#shadow-host-companion {\n    display: none;\n}\nheader {\n    opacity: 0.9;\n    margin: 0;\n    color: white;\n    h1 {\n        line-height: 2;\n        font-size: 70px;\n        padding: 0 20px 0 20px;\n        margin: 0 0 30px 0px;\n        letter-spacing: 5px;\n        text-align: center;\n    }\n    ul {\n        display: flex;\n        justify-content: center;\n        list-style-type: none;\n        gap: 10px;\n        padding: 0 40px 20px 40px;\n        margin-top: 40px;\n    }\n    li {\n        font-size: 20px;\n    }\n    li:first-child {\n        margin-left: 100px;\n        margin-right: 100px;\n    }\n    li:nth-child(2) {\n        margin-right: 200px;\n    }\n    li:nth-child(3) {\n        margin-right: 160px;\n    }\n    li:nth-child(4) {\n        margin-right: 100px;\n    }\n    li:nth-child(5) {\n        margin-right: 100px\n    }\n}\n.login-page-background {\n    width: 100vw;\n    height: 80vh;\n    background-image: linear-gradient(\n        45deg,\n        hsl(230deg 59% 22%) 0%,\n        hsl(229deg 57% 24%) 11%,\n        hsl(228deg 55% 26%) 22%,\n        hsl(228deg 54% 28%) 33%,\n        hsl(226deg 52% 30%) 44%,\n        hsl(225deg 50% 32%) 56%,\n        hsl(224deg 49% 34%) 67%,\n        hsl(223deg 47% 36%) 78%,\n        hsl(222deg 46% 38%) 89%,\n        hsl(222deg 44% 40%) 100%\n    );\n    opacity: 0.9;\n}\n.login-page-wrapper {\n    transform: translate(50%,20%);\n    height: 50vh;\n    width: 50vw;\n    display: flex;\n    justify-content: center;\n    form {\n        display: flex;\n        flex-direction: column;\n        align-self: center;\n        font-size: 20px;\n        label {\n            color: rgb(207 207 207);\n            padding: 5px 0 0 0;\n            margin-left: 10px;\n        }\n        input[type=text] {\n            border-radius: 2px;\n            width: 10vw;\n            height: 2vh;\n            margin: 0 10px 0 10px;\n            border: none;\n            background: transparent;\n            border-bottom: 2px solid rgb(207, 207, 207);\n            font-size: 18px;  \n            color:  rgb(207, 207, 207);\n        }\n        ::placeholder {\n            color:  rgb(207, 207, 207);\n        }\n        input[type=text]:focus, input[type=text]:focus-visible {\n            border-bottom: 2px solid #1373E6;\n            outline: none;\n        }\n        input[type=text]:-webkit-autofill {\n          transition: all 0s 5000s\n        }\n        input[type=submit] {\n            border-radius: 5px;\n            font-size: 15px;\n            margin: 20px 10px 0 10px;\n            padding: 9px 24px;\n            align-self: center;\n        }\n        .success-message {\n            margin: 20px 0 0 0;\n            transform: translate(3%)\n        }\n        .fail-message {\n            margin: 0 0 10px 0;\n            transform: translate(-2%,-20%)\n        }\n    }\n}", "",{"version":3,"sources":["webpack://./src/css/login.css"],"names":[],"mappings":"AAAA;IACI,iCAAiC;IACjC;;;;;;;;;;;;KAYC;IACD,YAAY;AAChB;AACA;IACI,aAAa;AACjB;AACA;IACI,YAAY;IACZ,SAAS;IACT,YAAY;IACZ;QACI,cAAc;QACd,eAAe;QACf,sBAAsB;QACtB,oBAAoB;QACpB,mBAAmB;QACnB,kBAAkB;IACtB;IACA;QACI,aAAa;QACb,uBAAuB;QACvB,qBAAqB;QACrB,SAAS;QACT,yBAAyB;QACzB,gBAAgB;IACpB;IACA;QACI,eAAe;IACnB;IACA;QACI,kBAAkB;QAClB,mBAAmB;IACvB;IACA;QACI,mBAAmB;IACvB;IACA;QACI,mBAAmB;IACvB;IACA;QACI,mBAAmB;IACvB;IACA;QACI;IACJ;AACJ;AACA;IACI,YAAY;IACZ,YAAY;IACZ;;;;;;;;;;;;KAYC;IACD,YAAY;AAChB;AACA;IACI,6BAA6B;IAC7B,YAAY;IACZ,WAAW;IACX,aAAa;IACb,uBAAuB;IACvB;QACI,aAAa;QACb,sBAAsB;QACtB,kBAAkB;QAClB,eAAe;QACf;YACI,uBAAuB;YACvB,kBAAkB;YAClB,iBAAiB;QACrB;QACA;YACI,kBAAkB;YAClB,WAAW;YACX,WAAW;YACX,qBAAqB;YACrB,YAAY;YACZ,uBAAuB;YACvB,2CAA2C;YAC3C,eAAe;YACf,0BAA0B;QAC9B;QACA;YACI,0BAA0B;QAC9B;QACA;YACI,gCAAgC;YAChC,aAAa;QACjB;QACA;UACE;QACF;QACA;YACI,kBAAkB;YAClB,eAAe;YACf,wBAAwB;YACxB,iBAAiB;YACjB,kBAAkB;QACtB;QACA;YACI,kBAAkB;YAClB;QACJ;QACA;YACI,kBAAkB;YAClB;QACJ;IACJ;AACJ","sourcesContent":[".login-page-header {\n    font-family: 'Averia Serif Libre';\n    background-image: linear-gradient(\n    45deg,\n    hsl(230deg 59% 22%) 0%,\n    hsl(229deg 57% 24%) 11%,\n    hsl(228deg 55% 26%) 22%,\n    hsl(228deg 54% 28%) 33%,\n    hsl(226deg 52% 30%) 44%,\n    hsl(225deg 50% 32%) 56%,\n    hsl(224deg 49% 34%) 67%,\n    hsl(223deg 47% 36%) 78%,\n    hsl(222deg 46% 38%) 89%,\n    hsl(222deg 44% 40%) 100%\n    );\n    height: 20vh;\n}\n#shadow-host-companion {\n    display: none;\n}\nheader {\n    opacity: 0.9;\n    margin: 0;\n    color: white;\n    h1 {\n        line-height: 2;\n        font-size: 70px;\n        padding: 0 20px 0 20px;\n        margin: 0 0 30px 0px;\n        letter-spacing: 5px;\n        text-align: center;\n    }\n    ul {\n        display: flex;\n        justify-content: center;\n        list-style-type: none;\n        gap: 10px;\n        padding: 0 40px 20px 40px;\n        margin-top: 40px;\n    }\n    li {\n        font-size: 20px;\n    }\n    li:first-child {\n        margin-left: 100px;\n        margin-right: 100px;\n    }\n    li:nth-child(2) {\n        margin-right: 200px;\n    }\n    li:nth-child(3) {\n        margin-right: 160px;\n    }\n    li:nth-child(4) {\n        margin-right: 100px;\n    }\n    li:nth-child(5) {\n        margin-right: 100px\n    }\n}\n.login-page-background {\n    width: 100vw;\n    height: 80vh;\n    background-image: linear-gradient(\n        45deg,\n        hsl(230deg 59% 22%) 0%,\n        hsl(229deg 57% 24%) 11%,\n        hsl(228deg 55% 26%) 22%,\n        hsl(228deg 54% 28%) 33%,\n        hsl(226deg 52% 30%) 44%,\n        hsl(225deg 50% 32%) 56%,\n        hsl(224deg 49% 34%) 67%,\n        hsl(223deg 47% 36%) 78%,\n        hsl(222deg 46% 38%) 89%,\n        hsl(222deg 44% 40%) 100%\n    );\n    opacity: 0.9;\n}\n.login-page-wrapper {\n    transform: translate(50%,20%);\n    height: 50vh;\n    width: 50vw;\n    display: flex;\n    justify-content: center;\n    form {\n        display: flex;\n        flex-direction: column;\n        align-self: center;\n        font-size: 20px;\n        label {\n            color: rgb(207 207 207);\n            padding: 5px 0 0 0;\n            margin-left: 10px;\n        }\n        input[type=text] {\n            border-radius: 2px;\n            width: 10vw;\n            height: 2vh;\n            margin: 0 10px 0 10px;\n            border: none;\n            background: transparent;\n            border-bottom: 2px solid rgb(207, 207, 207);\n            font-size: 18px;  \n            color:  rgb(207, 207, 207);\n        }\n        ::placeholder {\n            color:  rgb(207, 207, 207);\n        }\n        input[type=text]:focus, input[type=text]:focus-visible {\n            border-bottom: 2px solid #1373E6;\n            outline: none;\n        }\n        input[type=text]:-webkit-autofill {\n          transition: all 0s 5000s\n        }\n        input[type=submit] {\n            border-radius: 5px;\n            font-size: 15px;\n            margin: 20px 10px 0 10px;\n            padding: 9px 24px;\n            align-self: center;\n        }\n        .success-message {\n            margin: 20px 0 0 0;\n            transform: translate(3%)\n        }\n        .fail-message {\n            margin: 0 0 10px 0;\n            transform: translate(-2%,-20%)\n        }\n    }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 13 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#agent-page-background {\n    height: 100vh;\n    display: flex;\n    justify-content: space-between;\n}\n.welcome-message-wrapper,.summary-section-wrapper {\n    display: flex;\n    flex-direction: column;\n}\nh1 {\n    font-size: 30px;\n}\n#agent-welcome {\n    margin-top: 10px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background: rgba(255, 255, 255, 0.3);\n    border-radius: 10px;\n    backdrop-filter: blur(20px);\n    box-shadow: 10px 10px 30px;\n    width: 30vw;\n    height: 50px;   \n}\n.logout-btn {\n    align-self: flex-end;\n    width: fit-content;\n    margin: 20px 0 0 0;\n}\n.logout-btn:hover {\n    cursor: pointer;\n}\n.summary-section-container {\n    margin-top: 30px;\n    background: rgba(255, 255, 255, 0.3);\n    border-radius: 10px;\n    backdrop-filter: blur(20px);\n    box-shadow: 10px 10px 30px;\n    width: 30vw;\n    height: 150px;\n    text-align: center;\n    line-height: 1.5;\n}\n.card-section-container {\n\n    margin-top: 10px;\n    background: rgba(255, 255, 255, 0.3);\n    backdrop-filter: blur(20px);\n    box-shadow: 10px 10px 30px;\n    display: flex;\n    flex-direction: column;\n    text-align: flex-start;\n    border-radius: 10px;\n    width: 34vw;\n    height: 90vh;\n    font-size: 16px;\n    ul {\n        display: flex;\n        flex-direction: column;\n        list-style-type: none;\n        padding-left: 0;\n        text-align: center;\n        button {\n            display: inline-block;\n            width: fit-content;\n        }\n    }\n\n    h1 {\n        text-align: center;\n    };\n}\n.update-trip-message {\n    font-weight: 500;\n    color: #1373E6;\n}\n.delete-trip-message {\n    font-weight: 500;\n    color:rgba(213,107,31,1)\n}\n.pending-status {\n    font-weight: 500;\n    color: rgb(249,216,0)\n}\n.approved-status {\n    font-weight: 500;\n    color: #1373E6;\n}\n.deny-trip {\n    background: linear-gradient(0deg, rgba(213,107,31,1) 35%, rgba(250,77,9,1) 100%);\n}", "",{"version":3,"sources":["webpack://./src/css/agency.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,aAAa;IACb,8BAA8B;AAClC;AACA;IACI,aAAa;IACb,sBAAsB;AAC1B;AACA;IACI,eAAe;AACnB;AACA;IACI,gBAAgB;IAChB,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,oCAAoC;IACpC,mBAAmB;IACnB,2BAA2B;IAC3B,0BAA0B;IAC1B,WAAW;IACX,YAAY;AAChB;AACA;IACI,oBAAoB;IACpB,kBAAkB;IAClB,kBAAkB;AACtB;AACA;IACI,eAAe;AACnB;AACA;IACI,gBAAgB;IAChB,oCAAoC;IACpC,mBAAmB;IACnB,2BAA2B;IAC3B,0BAA0B;IAC1B,WAAW;IACX,aAAa;IACb,kBAAkB;IAClB,gBAAgB;AACpB;AACA;;IAEI,gBAAgB;IAChB,oCAAoC;IACpC,2BAA2B;IAC3B,0BAA0B;IAC1B,aAAa;IACb,sBAAsB;IACtB,sBAAsB;IACtB,mBAAmB;IACnB,WAAW;IACX,YAAY;IACZ,eAAe;IACf;QACI,aAAa;QACb,sBAAsB;QACtB,qBAAqB;QACrB,eAAe;QACf,kBAAkB;QAClB;YACI,qBAAqB;YACrB,kBAAkB;QACtB;IACJ;;IAEA;QACI,kBAAkB;IACtB,CAAA;AACJ;AACA;IACI,gBAAgB;IAChB,cAAc;AAClB;AACA;IACI,gBAAgB;IAChB;AACJ;AACA;IACI,gBAAgB;IAChB;AACJ;AACA;IACI,gBAAgB;IAChB,cAAc;AAClB;AACA;IACI,gFAAgF;AACpF","sourcesContent":["#agent-page-background {\n    height: 100vh;\n    display: flex;\n    justify-content: space-between;\n}\n.welcome-message-wrapper,.summary-section-wrapper {\n    display: flex;\n    flex-direction: column;\n}\nh1 {\n    font-size: 30px;\n}\n#agent-welcome {\n    margin-top: 10px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background: rgba(255, 255, 255, 0.3);\n    border-radius: 10px;\n    backdrop-filter: blur(20px);\n    box-shadow: 10px 10px 30px;\n    width: 30vw;\n    height: 50px;   \n}\n.logout-btn {\n    align-self: flex-end;\n    width: fit-content;\n    margin: 20px 0 0 0;\n}\n.logout-btn:hover {\n    cursor: pointer;\n}\n.summary-section-container {\n    margin-top: 30px;\n    background: rgba(255, 255, 255, 0.3);\n    border-radius: 10px;\n    backdrop-filter: blur(20px);\n    box-shadow: 10px 10px 30px;\n    width: 30vw;\n    height: 150px;\n    text-align: center;\n    line-height: 1.5;\n}\n.card-section-container {\n\n    margin-top: 10px;\n    background: rgba(255, 255, 255, 0.3);\n    backdrop-filter: blur(20px);\n    box-shadow: 10px 10px 30px;\n    display: flex;\n    flex-direction: column;\n    text-align: flex-start;\n    border-radius: 10px;\n    width: 34vw;\n    height: 90vh;\n    font-size: 16px;\n    ul {\n        display: flex;\n        flex-direction: column;\n        list-style-type: none;\n        padding-left: 0;\n        text-align: center;\n        button {\n            display: inline-block;\n            width: fit-content;\n        }\n    }\n\n    h1 {\n        text-align: center;\n    };\n}\n.update-trip-message {\n    font-weight: 500;\n    color: #1373E6;\n}\n.delete-trip-message {\n    font-weight: 500;\n    color:rgba(213,107,31,1)\n}\n.pending-status {\n    font-weight: 500;\n    color: rgb(249,216,0)\n}\n.approved-status {\n    font-weight: 500;\n    color: #1373E6;\n}\n.deny-trip {\n    background: linear-gradient(0deg, rgba(213,107,31,1) 35%, rgba(250,77,9,1) 100%);\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 14 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/background5.jpg");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_glide_core_min_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(17);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_glide_core_min_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_glide_core_min_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_glide_core_min_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_glide_core_min_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 17 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".glide{position:relative;width:100%;box-sizing:border-box}.glide *{box-sizing:inherit}.glide__track{overflow:hidden}.glide__slides{position:relative;width:100%;list-style:none;backface-visibility:hidden;transform-style:preserve-3d;touch-action:pan-Y;overflow:hidden;margin:0;padding:0;white-space:nowrap;display:flex;flex-wrap:nowrap;will-change:transform}.glide__slides--dragging{user-select:none}.glide__slide{width:100%;height:100%;flex-shrink:0;white-space:normal;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent}.glide__slide a{user-select:none;-webkit-user-drag:none;-moz-user-select:none;-ms-user-select:none}.glide__arrows{-webkit-touch-callout:none;user-select:none}.glide__bullets{-webkit-touch-callout:none;user-select:none}.glide--rtl{direction:rtl}.glide__lazy__loaded{-webkit-animation:fadeInFromNone .5s ease-in 0s forwards;animation:fadeInFromNone .5s ease-in 0s forwards}@keyframes fadeInFromNone{0%{visibility:hidden;opacity:0}1%{visibility:visible;opacity:0}100%{visibility:visible;opacity:1}}/*# sourceMappingURL=glide.core.min.css.map */\n", "",{"version":3,"sources":["webpack://./node_modules/@glidejs/glide/src/assets/sass/glide.core.scss"],"names":[],"mappings":"AAEA,OAME,iBAAA,CACA,UAAA,CACA,qBAAA,CAEA,SACE,kBAAA,CAGF,cACE,eAAA,CAGF,eACE,iBAAA,CACA,UAAA,CACA,eAAA,CACA,0BAAA,CACA,2BAAA,CACA,kBAAA,CACA,eAAA,CACA,QAAA,CACA,SAAA,CACA,kBAAA,CACA,YAAA,CACA,gBAAA,CACA,qBAAA,CAEA,yBACE,gBAAA,CAIJ,cACE,UAAA,CACA,WAAA,CACA,aAAA,CACA,kBAAA,CACA,gBAAA,CACA,0BAAA,CACA,uCAAA,CAEA,gBACE,gBAAA,CACA,sBAAA,CACA,qBAAA,CACA,oBAAA,CAIJ,eACE,0BAAA,CACA,gBAAA,CAGF,gBACE,0BAAA,CACA,gBAAA,CAGF,YACE,aAAA,CAGF,qBACE,wDAAA,CACM,gDAAA,CAIV,0BACE,GACE,iBAAA,CACA,SAAA,CAEF,GACE,kBAAA,CACA,SAAA,CAEF,KACE,kBAAA,CACA,SAAA,CAAA,CAAA,6CAAA","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_glide_theme_min_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(19);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_glide_theme_min_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_glide_theme_min_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_glide_theme_min_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_glide_theme_min_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 19 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".glide__arrow{position:absolute;display:block;top:50%;z-index:2;color:#fff;text-transform:uppercase;padding:9px 12px;background-color:transparent;border:2px solid rgba(255,255,255,.5);border-radius:4px;box-shadow:0 .25em .5em 0 rgba(0,0,0,.1);text-shadow:0 .25em .5em rgba(0,0,0,.1);opacity:1;cursor:pointer;transition:opacity 150ms ease,border 300ms ease-in-out;transform:translateY(-50%);line-height:1}.glide__arrow:focus{outline:none}.glide__arrow:hover{border-color:#fff}.glide__arrow--left{left:2em}.glide__arrow--right{right:2em}.glide__arrow--disabled{opacity:.33}.glide__bullets{position:absolute;z-index:2;bottom:2em;left:50%;display:inline-flex;list-style:none;transform:translateX(-50%)}.glide__bullet{background-color:rgba(255,255,255,.5);width:9px;height:9px;padding:0;border-radius:50%;border:2px solid transparent;transition:all 300ms ease-in-out;cursor:pointer;line-height:0;box-shadow:0 .25em .5em 0 rgba(0,0,0,.1);margin:0 .25em}.glide__bullet:focus{outline:none}.glide__bullet:hover,.glide__bullet:focus{border:2px solid #fff;background-color:rgba(255,255,255,.5)}.glide__bullet--active{background-color:#fff}.glide--swipeable{cursor:grab;cursor:-moz-grab;cursor:-webkit-grab}.glide--dragging{cursor:grabbing;cursor:-moz-grabbing;cursor:-webkit-grabbing}/*# sourceMappingURL=glide.theme.min.css.map */\n", "",{"version":3,"sources":["webpack://./node_modules/@glidejs/glide/src/assets/sass/glide.theme.scss"],"names":[],"mappings":"AAQE,cACE,iBAAA,CACA,aAAA,CACA,OAAA,CACA,SAAA,CACA,UAAA,CACA,wBAAA,CACA,gBAAA,CACA,4BAAA,CACA,qCAAA,CACA,iBAAA,CACA,wCAAA,CACA,uCAAA,CACA,SAAA,CACA,cAAA,CACA,sDAAA,CACA,0BAAA,CACA,aAAA,CAEA,oBAAA,YAAA,CACA,oBAAA,iBAAA,CAEA,oBACE,QAAA,CAGF,qBACE,SAAA,CAGF,wBACE,WAAA,CAIJ,gBACE,iBAAA,CACA,SAAA,CACA,UAAA,CACA,QAAA,CACA,mBAAA,CACA,eAAA,CACA,0BAAA,CAGF,eACE,qCAAA,CACA,SAAA,CACA,UAAA,CACA,SAAA,CACA,iBAAA,CACA,4BAAA,CACA,gCAAA,CACA,cAAA,CACA,aAAA,CACA,wCAAA,CACA,cAAA,CAEA,qBACE,YAAA,CAGF,0CAEE,qBAAA,CACA,qCAAA,CAGF,uBACE,qBAAA,CAIJ,kBACE,WAAA,CACA,gBAAA,CACA,mBAAA,CAGF,iBACE,eAAA,CACA,oBAAA,CACA,uBAAA,CAAA,8CAAA","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   apiCall: () => (/* binding */ apiCall),
/* harmony export */   setTripDate: () => (/* binding */ setTripDate)
/* harmony export */ });
/* harmony import */ var _userFunctions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _agency_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _glidejs_glide__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);




let currentTripId;
let currentUserId;
let singleDestinationInfo;
const welcomeHeader = document.querySelector('.welcome-message')
const userCosts = document.querySelector('.user-total-costs');
const userPastTrips = document.querySelector('.user-past-trips');
const userPendingTrips = document.querySelector('.user-pending-trips');
const lastTripDate = document.querySelector('.last-trip-date');
const openModalBtn = document.querySelector("[data-open-modal]");
const closeModalBtn = document.querySelector("[data-close-modal]");
const agentPageSection = document.querySelector('.agent-page')
const modal = document.querySelector("[data-modal]")
const bookTripForm = document.querySelector('#book-trip-form')
const modalSlides = document.getElementById('all-destinations')
const pastTripSlides = document.getElementById('past-destinations')
const destinationSelection = document.getElementById('destinations')
const tripDate = document.querySelector('#trip-date')
const bookTripBtn = document.getElementById('book-trip-btn')
const totalEstimateLine = document.getElementById('total-line')
const totalEstimate = document.querySelector('.total-estimate')
const estimatedLodgeCost = document.querySelector('.estimate-lodge-cost')
const estimatedFlightCost =  document.querySelector('.estimate-flight-cost')
const sliders = document.querySelectorAll('.glide')
const loginPageHeader = document.querySelector('.login-page-header');
const loginPage = document.querySelector('.login-page-background')
const dashboardPage = document.querySelector('.dashboard-page');
const loginForm = document.querySelector('.login')
const failMessage = document.querySelector('.fail-message')
const successMessage = document.querySelector('.success-message');
const userLogoutBtn = document.querySelector('#user-logout-btn')
const usernameLogin = document.querySelector('#username')
const passwordLogin = document.querySelector('#password')
const userUpcomingTripSection = document.querySelector('.user-upcoming-trips')
const upcomingTripMessage =  document.querySelector('.upcoming-trips-title')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  togglePage();
})
window.addEventListener('DOMContentLoaded', () => {
  toggleSuccessMessage('hidden')
  toggleFailMessage('hidden')
  toggleTotalEstimate('hidden')
})
window.addEventListener('load', () => {
  setTripDate()
})

openModalBtn.addEventListener('click', () =>{
  modal.showModal()
  new _glidejs_glide__WEBPACK_IMPORTED_MODULE_2__["default"](sliders[0]).mount()
})

closeModalBtn.addEventListener('click', () => {
  modal.close()
})
bookTripBtn.addEventListener('click', () => {
  postTripRequest()
  modal.close()
})

bookTripForm.addEventListener('submit', (e) => {
  e.preventDefault()
  postTripEstimate()
})


userLogoutBtn.addEventListener('click', (e) => {
  e.preventDefault()
  dashboardPage.classList.add('hidden')
  loginPageHeader.classList.remove('hidden')
  loginPage.classList.remove('hidden')
  clearModal();
})


destinationSelection.addEventListener('change', () => {
  const formData = getFormData()
  apiCall('destinations').then(e => {
    singleDestinationInfo = (0,_userFunctions_js__WEBPACK_IMPORTED_MODULE_0__.findDestinationInfo)(e.destinations, formData.destination)
  })
})

const togglePage = () => {
  const formData = new FormData(loginForm);
  const usernameInput = formData.get('username');
  const passwordInput = formData.get('password');
  if (usernameInput === 'agency' && passwordInput === 'travel') {
    toggleSuccessMessage('visible')
    toggleFailMessage('hidden')
    setTimeout(() => {
      usernameLogin.value = "";
      passwordLogin.value = "";
      loginPageHeader.classList.add('hidden');
      loginPage.classList.add('hidden');
      agentPageSection.classList.remove('hidden')
      toggleSuccessMessage('hidden')
      ;(0,_agency_js__WEBPACK_IMPORTED_MODULE_1__.fetchAllPendingUserTrips)()
    }, 2000)
    return;
  }
  for (var i = 0; i < 51; i++) {
    if (usernameInput === `traveler${i}` && passwordInput === 'travel') {
      toggleSuccessMessage('visible')
      toggleFailMessage('hidden')
      currentUserId = i;
      setTimeout(() => {
        usernameLogin.value = "";
        passwordLogin.value = "";
        toggleSuccessMessage('hidden')
        showDashboardPage()
      }, 2000)
      return;
    } else {
      toggleFailMessage('visible')
    }
  }
}
const showDashboardPage = () => {
  fetchUserData()
  loginPageHeader.classList.add('hidden');
  loginPage.classList.add('hidden');
  dashboardPage.classList.remove('hidden');
}

const apiCall = (urlEndPoint, options) => {
  return fetch(`http://localhost:3001/api/v1/${urlEndPoint}`, options).then(response => response.json())
}

const fetchUserData = () => {
  Promise.all([apiCall('travelers'), apiCall('trips'), apiCall('destinations'), apiCall(`travelers/${currentUserId}`)])
    .then(e => {
      const user = e[3]
      currentTripId = (0,_userFunctions_js__WEBPACK_IMPORTED_MODULE_0__.findLastTripId)(e[1].trips);
      const allDestinationIDs = (0,_userFunctions_js__WEBPACK_IMPORTED_MODULE_0__.getNonVisitedDestinationIDs)(e[1].trips, 0)
      const allDestinationInfo = (0,_userFunctions_js__WEBPACK_IMPORTED_MODULE_0__.getDestinationInfo)(e[2].destinations, allDestinationIDs)
      createGlideSlides(modalSlides, allDestinationInfo)
      createDestinationSelections(allDestinationInfo)
      const userCost = (0,_userFunctions_js__WEBPACK_IMPORTED_MODULE_0__.calculatePastTripCosts)(e[1].trips, e[2].destinations, user.id)
      const userTrips = (0,_userFunctions_js__WEBPACK_IMPORTED_MODULE_0__.getVisitedDestinationNames)(e[1].trips, e[2].destinations, user.id)
      const userPastTripInfo = (0,_userFunctions_js__WEBPACK_IMPORTED_MODULE_0__.getPastUserTrips)(e[1].trips, user.id).sort((a, b) => new Date(a.date) - new Date(b.date))
      const sortedUserDates = (0,_userFunctions_js__WEBPACK_IMPORTED_MODULE_0__.getPastUserTrips)(e[1].trips, user.id).map(trip => new Date(trip.date)).sort((a, b) => a - b);
      const userDestinationIDs = (0,_userFunctions_js__WEBPACK_IMPORTED_MODULE_0__.getPastUserTrips)(e[1].trips, user.id).map(trip => trip.destinationID);
      const userDestinationInfo = (0,_userFunctions_js__WEBPACK_IMPORTED_MODULE_0__.getDestinationInfo)(e[2].destinations, userDestinationIDs)
      const userUpcomingTrips = (0,_userFunctions_js__WEBPACK_IMPORTED_MODULE_0__.getUpcomingUserTrips)(e[1].trips, user.id).sort((a, b) => new Date(a.date) - new Date(b.date))
      const userUpcomingDestinationIds = userUpcomingTrips.map(trip => trip.destinationID);
      const userUpcomingDestinationInfo = (0,_userFunctions_js__WEBPACK_IMPORTED_MODULE_0__.getDestinationInfo)(e[2].destinations, userUpcomingDestinationIds).map(destination => destination.destination)
      createGlideSlides(pastTripSlides, userDestinationInfo)
      inputWelcomeMessage(user)
      inputLastTripDate(sortedUserDates[sortedUserDates.length - 1])
      inputTotalCosts(userCost.totalFlightCost, userCost.totalLodgingCost)
      inputPastTrips(userTrips, userPastTripInfo)
      inputUpcomingTrips(userUpcomingTrips, userUpcomingDestinationInfo)
      const userPendingTrips = (0,_userFunctions_js__WEBPACK_IMPORTED_MODULE_0__.getPendingUserTrips)(e[2].destinations, e[1].trips, currentUserId)
      inputPendingTrip(userPendingTrips)
      new _glidejs_glide__WEBPACK_IMPORTED_MODULE_2__["default"](sliders[1]).mount()
    }).catch(err => alert('Could not fetch user data..'))
}

const inputWelcomeMessage = (user) => {
  let firstName = user.name.split(' ')[0]
  welcomeHeader.innerText = `Welcome, ${firstName}!`
}

const inputLastTripDate = (date) => {
  lastTripDate.innerText = `Your last trip date was ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

const inputUpcomingTrips = (upcomingTrips, upcomingTripInfo) => {
  userUpcomingTripSection.innerHTML = "";
  if (upcomingTrips.length > 0) {
    upcomingTripMessage.classList.add('hidden')
    upcomingTripInfo.forEach((trip, i) => {
      userUpcomingTripSection.innerHTML += `<br><strong>[ ${trip} ]</strong>&nbsp;&nbsp;
        <span>Trip Date: ${upcomingTrips[i].date}&nbsp;&nbsp;&nbsp;Duration: ${upcomingTrips[i].duration} days&nbsp;&nbsp;
        Traveler(s): ${upcomingTrips[i].travelers}</span><hr>`
    })
  } else {
    upcomingTripMessage.classList.remove('hidden')
  }
}

const inputPendingTrip = (pendingTripInfos) => {
  userPendingTrips.innerHTML = ""
  pendingTripInfos.forEach(trip => {
    userPendingTrips.innerHTML += `<br><strong>[ ${trip.destinationName} ]</strong>&nbsp;&nbsp;
        <span>Trip Date: ${trip.date}&nbsp;&nbsp;&nbsp;Duration: ${trip.duration} days&nbsp;&nbsp;Status:</span>
        <span class=pending-status> Pending </span><hr>`
  })
}
const inputTotalCosts = (flightCost, lodgingCost) => {
  userCosts.innerHTML = `You have spent a total of $${flightCost} on flights. 
    <br>You have spent a total of $${lodgingCost} on lodging.`
}

const inputPastTrips = (trips, tripsInfo) => {
  userPastTrips.innerHTML = "";
  tripsInfo.forEach((trip, i) => {
    userPastTrips.innerHTML += `<br><strong>[ ${trips[i]} ]</strong>&nbsp;&nbsp;
        <span>Trip Date: ${trip.date}&nbsp;&nbsp;&nbsp;Duration: ${trip.duration} days&nbsp;&nbsp;
        Traveler(s): ${trip.travelers}</span><hr>`
  })
}
const createGlideSlides = (glideSlidesElement, destinations) => {
  destinations.forEach((destinations) => {
    glideSlidesElement.innerHTML += `
        <li class="glide__slide">
        <h4>${destinations.destination}</h4>
        <img src="${destinations.image}" alt="${destinations.alt}"/><br>
        </li>` 
  })
}

const createDestinationSelections = (destinations) => {
  destinationSelection.innerHTML = "";
  destinations.forEach(destination => {
    let option = document.createElement("option")
    option.value = destination.destination
    option.innerText = destination.destination
    destinationSelection.appendChild(option)
  })
}
const getFormData = () => {
  const formData = new FormData(bookTripForm)
  const destination = formData.get('destinations')
  const duration = formData.get('duration')
  const travelers = formData.get('travelers')
  const date = formData.get('date')
  return {
    destination,
    duration,
    travelers,
    date
  }
}
const postTripRequest = () => {
  const formData = getFormData()
  formData.date = formData.date.split("-").join("/")
  const options = {
    method: 'POST',
    body: JSON.stringify({
      id: currentTripId + 1,
      userID: currentUserId,
      destinationID: singleDestinationInfo.id,
      travelers: +formData.travelers,
      date: formData.date,
      duration: +formData.duration,
      status: 'pending',
      suggestedActivities: []
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  apiCall('trips', options).then(e => console.log(e)).catch(err => alert('did not work'))
  setTimeout(() => {
    Promise.all([apiCall('destinations'), apiCall('trips')]).then(e => {
      currentTripId = (0,_userFunctions_js__WEBPACK_IMPORTED_MODULE_0__.findLastTripId)(e[1].trips);
      const userPendingTrips = (0,_userFunctions_js__WEBPACK_IMPORTED_MODULE_0__.getPendingUserTrips)(e[0].destinations, e[1].trips, currentUserId);
      inputPendingTrip(userPendingTrips);
    }, 5000).catch(err => alert('did not work'))
  })
  clearModal();
}

const postTripEstimate = () => {
  const formData = getFormData()
  Promise.all([apiCall('destinations'), apiCall('trips')]).then(e => {
    currentTripId = (0,_userFunctions_js__WEBPACK_IMPORTED_MODULE_0__.findLastTripId)(e[1].trips);
    let totalCost = (0,_userFunctions_js__WEBPACK_IMPORTED_MODULE_0__.calculateTotalTripCost)(formData.duration, formData.travelers, formData.destination, e[0].destinations)
    toggleTotalEstimate('visible');
    estimatedFlightCost.innerHTML = `Estimated Total Flight Cost <br>
        <span>For ${formData.travelers} Adult(s): $${totalCost.flightCost}</span>`;
    estimatedLodgeCost.innerHTML = `Estimated Total Lodging Cost <br>
        <span>For ${formData.duration} Night(s): $${totalCost.lodgingCost}</span>`;
    totalEstimate.innerHTML = `Total Estimate: 
        <span class="dollar-estimate">$${totalCost.flightCost + totalCost.lodgingCost}
        </span>`;
    singleDestinationInfo = (0,_userFunctions_js__WEBPACK_IMPORTED_MODULE_0__.findDestinationInfo)(e[0].destinations, formData.destination)
  })
}
const clearModal = () => {
  estimatedFlightCost.innerHTML = 'Estimated Total Flight Cost';
  estimatedLodgeCost.innerHTML = 'Estimated Total Lodging Cost';
  toggleTotalEstimate('hidden')
  bookTripForm.reset();
}
const toggleSuccessMessage = (property) => {
  successMessage.style.visibility = property
}
const toggleFailMessage = (property) => {
  failMessage.style.visibility = property
}

const toggleTotalEstimate = (property) => {
  totalEstimateLine.style.visibility = property
  totalEstimate.style.visibility = property
  bookTripBtn.style.visibility = property
}
const setTripDate = () => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear()
  if (month < 10) {
    month = '0' + (date.getMonth() + 1)
  }
  if (day < 10) {
    day = '0' + (date.getDate())
  }
  tripDate.setAttribute("min", `${year}-${month}-${day}`)
  return {
    day, month, year
  }
}



/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculatePastTripCosts: () => (/* binding */ calculatePastTripCosts),
/* harmony export */   calculateTotalTripCost: () => (/* binding */ calculateTotalTripCost),
/* harmony export */   findDestinationInfo: () => (/* binding */ findDestinationInfo),
/* harmony export */   findLastTripId: () => (/* binding */ findLastTripId),
/* harmony export */   getAgencyIncome: () => (/* binding */ getAgencyIncome),
/* harmony export */   getAgencyTrips: () => (/* binding */ getAgencyTrips),
/* harmony export */   getDestinationInfo: () => (/* binding */ getDestinationInfo),
/* harmony export */   getNonVisitedDestinationIDs: () => (/* binding */ getNonVisitedDestinationIDs),
/* harmony export */   getPastUserTrips: () => (/* binding */ getPastUserTrips),
/* harmony export */   getPendingUserTrips: () => (/* binding */ getPendingUserTrips),
/* harmony export */   getUpcomingUserTrips: () => (/* binding */ getUpcomingUserTrips),
/* harmony export */   getVisitedDestinationNames: () => (/* binding */ getVisitedDestinationNames)
/* harmony export */ });
const calculatePastTripCosts = (tripData, destinationData, userID) =>  {
    var latestYear;
    let filteredTrips = tripData.filter(trip => trip.userID === userID && trip.status === 'approved')
    latestYear = new Date(filteredTrips[0].date).getFullYear()
    filteredTrips.forEach(trip => {
        if (latestYear < new Date(trip.date).getFullYear()) {
            latestYear = new Date(trip.date).getFullYear()
        }
    })
    let totals = filteredTrips.reduce((acc,trip) => {
        if (!acc.totalLodgingCost && !acc.totalFlightCost) {
            acc.totalLodgingCost = 0;
            acc.totalFlightCost = 0;
        }
        let currentYear = new Date(trip.date).getFullYear()
        destinationData.forEach(destination => {
            if(trip.destinationID === destination.id && latestYear === currentYear) {
                acc.totalLodgingCost += destination.estimatedLodgingCostPerDay * 1.1 * trip.duration
                acc.totalFlightCost += destination.estimatedFlightCostPerPerson * 1.1 * trip.travelers
            }
        })
        return acc;
    },{})
    totals.totalLodgingCost = +totals.totalLodgingCost.toFixed(2)
    totals.totalFlightCost = +totals.totalFlightCost.toFixed(2)
    totals.latestYear = latestYear
    return totals 
}

const getPendingUserTrips = (destinationData, tripData, userID) => {
    let pendingTrips = tripData.filter(trip => trip.status === 'pending' && trip.userID === userID)
    return pendingTrips.map(trip => {
        var destinationInfo = destinationData.find(destination => {
            return destination.id === trip.destinationID
        })
        return {destinationName: destinationInfo.destination, ...trip}
    })
}

const getAgencyTrips = (destinationData, tripData, status) => {
    let pendingTrips = tripData.filter(trip => trip.status === status)
    return pendingTrips.map(trip => {
        var destinationInfo = destinationData.find(destination => {
            return destination.id === trip.destinationID
        })
        return {destinationName: destinationInfo.destination, ...trip}
    })
}

const getPastUserTrips = (tripData, userID) => {
   return tripData.reduce((userTrips, trip) => {
        if(trip.userID === userID && trip.status === 'approved') {
            userTrips.push(trip)
        }
        return userTrips
    },[]).filter(trip => new Date(trip.date).getFullYear() < 2024)
}

const getUpcomingUserTrips = (tripData, userID) => {
    return tripData.reduce((userTrips, trip) => {
        if(trip.userID === userID && trip.status === 'approved') {
            userTrips.push(trip)
        }
        return userTrips
    },[]).filter(trip => new Date(trip.date).getFullYear() === 2024)
}

const getVisitedDestinationNames = (tripData, destinationData, userID) => {
    let places = [];
    const filteredTrips = tripData.filter(trip => trip.userID === userID && trip.status === 'approved').map(trip => trip.destinationID)
    filteredTrips.forEach(place => {
        let destination = destinationData.find(destination => destination.id === place)
        places.push(destination.destination)
    })
    return places;
}

const getNonVisitedDestinationIDs = (tripData, userID) => {
    let allids = [];
    tripData.filter(trip => trip.userID !== userID).map(trip => trip.destinationID).sort((a,b) => a-b).forEach(id => {
        if (!allids.includes(id)) {
            allids.push(id)
        }
    })
    return allids;
}

const getDestinationInfo = (destinationData, destinationIDs) => {
    let destinations = [];
    destinationIDs.forEach(id => {
       let location = destinationData.find(destination => destination.id === id)
        destinations.push({image: location.image, alt: location.alt, destination: location.destination, 
            lodgingCost: location.estimatedLodgingCostPerDay, flightCost: location.estimatedFlightCostPerPerson})
    })
    return destinations
}
const findDestinationInfo = (destinationData, destinationName) => {
    return destinationData.find(destination => destination.destination === destinationName)
}

const calculateTotalTripCost = (duration, travelers, destinationName, destinationData) => {
   const singleDestinationInfo = findDestinationInfo(destinationData, destinationName)
   let totalCost = {};
    totalCost.flightCost = singleDestinationInfo.estimatedFlightCostPerPerson * travelers * 1.1;
    totalCost.lodgingCost = singleDestinationInfo.estimatedLodgingCostPerDay * duration * 1.1;
    totalCost.flightCost = +totalCost.flightCost.toFixed(2)
    totalCost.lodgingCost = +totalCost.lodgingCost.toFixed(2)
    return totalCost
}

const findLastTripId = (tripData) => {
    return tripData[tripData.length-1].id
}
const getAgencyIncome = (destinationData, tripData) => {
    const currentYearTrips = tripData.map(trip => {
         trip.date = new Date(trip.date)
         return trip
     }).filter(trip => trip.date.getFullYear() === 2024 && trip.status === 'approved')
     let totals =currentYearTrips.reduce((total,trip) => {
         let foundDestination = destinationData.find(destination => destination.id === trip.destinationID)
         if (!total.flightIncome && !total.lodgingIncome) {
             total.flightIncome = 0;
             total.lodgingIncome = 0;
         }
         total.flightIncome += foundDestination.estimatedFlightCostPerPerson * trip.travelers * 0.1;
         total.lodgingIncome += foundDestination.estimatedLodgingCostPerDay * trip.duration * 0.1;
         return total;
     },{})
     totals.flightIncome = +totals.flightIncome .toFixed(2)
     totals.lodgingIncome = + totals.lodgingIncome.toFixed(2)
     return totals;
 }


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchAllPendingUserTrips: () => (/* binding */ fetchAllPendingUserTrips)
/* harmony export */ });
/* harmony import */ var _userFunctions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _domUpdates_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);


const allPendingUserTrips = document.querySelector('.agency-pending-user-trips')
const pendingSelections = document.querySelector('#pending-trips')
const logoutBtn = document.querySelector('.logout-btn')
const agentPageSection = document.querySelector('.agent-page')
const loginPageHeader = document.querySelector('.login-page-header')
const loginPageBackground = document.querySelector('.login-page-background')
const allUsersOnTrips = document.querySelector('.all-user-pending-approved-trips')
const allUserFutureTrips = document.querySelector('.all-future-pending-approved-trips')
const agencyTotal = document.querySelector('.agency-total')
let allPendingTrips = [];


window.addEventListener('load', () => {
  fetchAllPendingUserTrips()
})
pendingSelections.addEventListener('change', () => {
  changePendingUserList(allPendingTrips)
  addButtonAction()
})
logoutBtn.addEventListener('click', (e) => {
  e.preventDefault();
  agentPageSection.classList.add('hidden')
  loginPageHeader.classList.remove('hidden')
  loginPageBackground.classList.remove('hidden')
})
const fetchAllPendingUserTrips = () => {
  Promise.all([(0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.apiCall)('trips'), (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.apiCall)('destinations')]).then(e => {
    const pendingTrips = (0,_userFunctions_js__WEBPACK_IMPORTED_MODULE_0__.getAgencyTrips)(e[1].destinations, e[0].trips, 'pending');
    const approvedTrips = (0,_userFunctions_js__WEBPACK_IMPORTED_MODULE_0__.getAgencyTrips)(e[1].destinations, e[0].trips, 'approved');
    const agencyIncome = (0,_userFunctions_js__WEBPACK_IMPORTED_MODULE_0__.getAgencyIncome)(e[1].destinations, e[0].trips);
    if (allPendingTrips.length > 0) {
      allPendingTrips = [];
    }
    pendingTrips.forEach(trip => allPendingTrips.push(trip));
    createPendingSelections(pendingTrips);
    pendingSelections.selectedIndex = -1;
    changePendingUserList(pendingTrips);
    const allTrips = pendingTrips.concat(approvedTrips)
    displayUsersOnTrips(allTrips)
    displayAgencyIncome(agencyIncome)
  })
   
}
const displayAgencyIncome = (income) => {
  agencyTotal.innerHTML = `Total income generated from flights this year: $${income.flightIncome} 
    <br>Total income generated from lodging this year: $${income.lodgingIncome}`
}
const createPendingSelections = (trips) => {
  pendingSelections.innerHTML = "";
  trips.forEach(trip => {
    let option = document.createElement("option")
    option.value = trip.destinationName
    option.innerText = trip.destinationName
    pendingSelections.appendChild(option)
  })
  deleteSelectionDupes()
}
const deleteSelectionDupes = () => {
  const destinationNames = [];
  for (var i = 0; i < pendingSelections.options.length; i++) {
    destinationNames.push(pendingSelections.options[i].value)
  }  
  let counts = destinationNames.reduce((count, destination, index) => {
    let splitName = destination.split(',')
    if (!count[splitName[0]]) {
      count[splitName[0]] = {count: 0, index: []};
    }
    count[splitName[0]].count += 1;
    count[splitName[0]].index.push(index)
    return count;
  }, {})
  let keys = Object.keys(counts)
  keys.forEach(key => {
    if (counts[key].index.length > 1) {
      for (var i = 0; i < counts[key].index.length - 1; i++) {
        pendingSelections.options[counts[key].index[i + 1]].remove(counts[key].index[i + 1])
      }
    }
  })
       
}
const changePendingUserList = (trips) => {
  const sortedTrips = trips.map(trip => {
    trip.date = new Date(trip.date)
    return trip 
  }).sort((a, b) => a.date - b.date);
  allPendingUserTrips.innerHTML = "";
  let selectionValue = pendingSelections.value
  sortedTrips.forEach(trip => {
    if (trip.destinationName === selectionValue) {
      allPendingUserTrips.innerHTML += `<br><li><strong>[ user: ${trip.userID} ]</strong><br>
            Trip Date: ${trip.date.getFullYear()}/${trip.date.getMonth() + 1}/${trip.date.getDate()}<br>Duration: ${trip.duration} days<br>
           Traveler(s): ${trip.travelers}</li><hr>
           <div class="agent-buttons" id="buttons">
            <button class="approve-trip" id=${trip.id}>Approve</button>
             <button class="deny-trip" id=${trip.id}>Deny</button>
           </div>`
    }
  })

}

const findTripIndex = (id) => {
  return allPendingTrips.map(trip => trip.id).indexOf(id)
}
const addButtonAction = () => {
  const approveTripBtns = document.querySelectorAll('.approve-trip')
  approveTripBtns.forEach(approveBtn => {
    approveBtn.addEventListener('click', approveTrip)
  })
  const denyTripBtns = document.querySelectorAll('.deny-trip')
  denyTripBtns.forEach(denyBtn => {
    denyBtn.addEventListener('click', deleteTrip)
  })
}

const approveTrip = (e) => {
  const tripIndex = findTripIndex(+e.target.id)
  const options = {
    method: 'POST',
    body: JSON.stringify({
      id: allPendingTrips[tripIndex].id,
      status: 'approved'
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.apiCall)('updateTrip', options).then(e => console.log(e)).catch(err => 'did not update')
  allPendingUserTrips.innerHTML += `<p class=update-trip-message>Approved the trip for <strong>user: ${allPendingTrips[tripIndex].userID}</strong></p>`
  setTimeout(() => {
    fetchAllPendingUserTrips()
  }, 3000)
}

const deleteTrip = (e) => {
  const tripIndex = findTripIndex(+e.target.id)
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.apiCall)(`trips/${allPendingTrips[tripIndex].id}`, options).then(e => e).catch(err => 'did not delete')
  allPendingUserTrips.innerHTML += `<p class=delete-trip-message>Deleted the trip for 
  <strong>user: ${allPendingTrips[tripIndex].userID}</strong></p>`
  setTimeout(() => {
    fetchAllPendingUserTrips()
  }, 3000)
}

const displayUsersOnTrips = (trips) => {
  const currentDate = (0,_domUpdates_js__WEBPACK_IMPORTED_MODULE_1__.setTripDate)()
  let allTrips = trips.map(trip => { 
    trip.date = new Date(trip.date)
    return trip
  })
  const filteredTrips = allTrips.filter(trip => 
    ((trip.date.getDate() === currentDate.day) && 
    (trip.date.getMonth() + 1) === parseInt(currentDate.month) && 
    (trip.date.getFullYear() === currentDate.year))).sort((a, b)=>a.date - b.date)
  const futureTrips = allTrips.filter(trip => 
    ((trip.date.getDate() > currentDate.day) && 
    (trip.date.getMonth() + 1) >= parseInt(currentDate.month) && 
    (trip.date.getFullYear() >= currentDate.year))).sort((a, b)=>a.date - b.date)
  allUsersOnTrips.innerHTML = "";
  filteredTrips.forEach(trip => {
    allUsersOnTrips.innerHTML += `<strong>[ ${trip.destinationName} ]</strong>&nbsp;&nbsp;
        <span>Trip Date: ${trip.date.getFullYear()}/${trip.date.getMonth() + 1}/${trip.date.getDate()}&nbsp;&nbsp;&nbsp;
        Duration: ${trip.duration} days&nbsp;&nbsp;Status:</span>
        <span class=${trip.status}-status> ${trip.status}</span><hr>`
  })
  allUserFutureTrips.innerHTML = "";
  futureTrips.forEach(trip => {
    allUserFutureTrips.innerHTML += `<strong>[ ${trip.destinationName} ]</strong>&nbsp;&nbsp;
        <span>Trip Date: ${trip.date.getFullYear()}/${trip.date.getMonth() + 1}/${trip.date.getDate()}&nbsp;&nbsp;&nbsp;
        Duration: ${trip.duration} days&nbsp;&nbsp;Status:</span>
        <span class=${trip.status}-status> ${trip.status}</span><hr>`
  })
}



/***/ }),
/* 23 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Glide)
/* harmony export */ });
/*!
 * Glide.js v3.6.0
 * (c) 2013-2023 Jędrzej Chałubek (https://github.com/jedrzejchalubek/)
 * Released under the MIT License.
 */

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }

      return desc.value;
    };
  }

  return _get.apply(this, arguments);
}

var defaults = {
  /**
   * Type of the movement.
   *
   * Available types:
   * `slider` - Rewinds slider to the start/end when it reaches the first or last slide.
   * `carousel` - Changes slides without starting over when it reaches the first or last slide.
   *
   * @type {String}
   */
  type: 'slider',

  /**
   * Start at specific slide number defined with zero-based index.
   *
   * @type {Number}
   */
  startAt: 0,

  /**
   * A number of slides visible on the single viewport.
   *
   * @type {Number}
   */
  perView: 1,

  /**
   * Focus currently active slide at a specified position in the track.
   *
   * Available inputs:
   * `center` - Current slide will be always focused at the center of a track.
   * `0,1,2,3...` - Current slide will be focused on the specified zero-based index.
   *
   * @type {String|Number}
   */
  focusAt: 0,

  /**
   * A size of the gap added between slides.
   *
   * @type {Number}
   */
  gap: 10,

  /**
   * Change slides after a specified interval. Use `false` for turning off autoplay.
   *
   * @type {Number|Boolean}
   */
  autoplay: false,

  /**
   * Stop autoplay on mouseover event.
   *
   * @type {Boolean}
   */
  hoverpause: true,

  /**
   * Allow for changing slides with left and right keyboard arrows.
   *
   * @type {Boolean}
   */
  keyboard: true,

  /**
   * Stop running `perView` number of slides from the end. Use this
   * option if you don't want to have an empty space after
   * a slider. Works only with `slider` type and a
   * non-centered `focusAt` setting.
   *
   * @type {Boolean}
   */
  bound: false,

  /**
   * Minimal swipe distance needed to change the slide. Use `false` for turning off a swiping.
   *
   * @type {Number|Boolean}
   */
  swipeThreshold: 80,

  /**
   * Minimal mouse drag distance needed to change the slide. Use `false` for turning off a dragging.
   *
   * @type {Number|Boolean}
   */
  dragThreshold: 120,

  /**
   * A number of slides moved on single swipe.
   *
   * Available types:
   * `` - Moves slider by one slide per swipe
   * `|` - Moves slider between views per swipe (number of slides defined in `perView` options)
   *
   * @type {String}
   */
  perSwipe: '',

  /**
   * Moving distance ratio of the slides on a swiping and dragging.
   *
   * @type {Number}
   */
  touchRatio: 0.5,

  /**
   * Angle required to activate slides moving on swiping or dragging.
   *
   * @type {Number}
   */
  touchAngle: 45,

  /**
   * Duration of the animation in milliseconds.
   *
   * @type {Number}
   */
  animationDuration: 400,

  /**
   * Allows looping the `slider` type. Slider will rewind to the first/last slide when it's at the start/end.
   *
   * @type {Boolean}
   */
  rewind: true,

  /**
   * Duration of the rewinding animation of the `slider` type in milliseconds.
   *
   * @type {Number}
   */
  rewindDuration: 800,

  /**
   * Easing function for the animation.
   *
   * @type {String}
   */
  animationTimingFunc: 'cubic-bezier(.165, .840, .440, 1)',

  /**
   * Wait for the animation to finish until the next user input can be processed
   *
   * @type {boolean}
   */
  waitForTransition: true,

  /**
   * Throttle costly events at most once per every wait milliseconds.
   *
   * @type {Number}
   */
  throttle: 10,

  /**
   * Moving direction mode.
   *
   * Available inputs:
   * - 'ltr' - left to right movement,
   * - 'rtl' - right to left movement.
   *
   * @type {String}
   */
  direction: 'ltr',

  /**
   * The distance value of the next and previous viewports which
   * have to peek in the current view. Accepts number and
   * pixels as a string. Left and right peeking can be
   * set up separately with a directions object.
   *
   * For example:
   * `100` - Peek 100px on the both sides.
   * { before: 100, after: 50 }` - Peek 100px on the left side and 50px on the right side.
   *
   * @type {Number|String|Object}
   */
  peek: 0,

  /**
   * Defines how many clones of current viewport will be generated.
   *
   * @type {Number}
   */
  cloningRatio: 1,

  /**
   * Collection of options applied at specified media breakpoints.
   * For example: display two slides per view under 800px.
   * `{
   *   '800px': {
   *     perView: 2
   *   }
   * }`
   */
  breakpoints: {},

  /**
   * Enable lazy loading.
   *
   * @type {Boolean}
   */
  lazy: false,

  /**
   * Defines the threshold in which lazy loading will begin.
   * For example: a threshold of 1.2 will load the images if the carousel/slider
   * is within 120% of the screen width and height
   *
   * @type {Number}
   */
  lazyScrollThreshold: 1.2,

  /**
   * Defines the inital amount of slides to be loaded
   *
   * @type {Number}
   */
  lazyInitialSlidesLoaded: 2,

  /**
   * Collection of internally used HTML classes.
   *
   * @todo Refactor `slider` and `carousel` properties to single `type: { slider: '', carousel: '' }` object
   * @type {Object}
   */
  classes: {
    swipeable: 'glide--swipeable',
    dragging: 'glide--dragging',
    direction: {
      ltr: 'glide--ltr',
      rtl: 'glide--rtl'
    },
    type: {
      slider: 'glide--slider',
      carousel: 'glide--carousel'
    },
    slide: {
      clone: 'glide__slide--clone',
      active: 'glide__slide--active'
    },
    arrow: {
      disabled: 'glide__arrow--disabled'
    },
    nav: {
      active: 'glide__bullet--active'
    }
  }
};

/**
 * Outputs warning message to the bowser console.
 *
 * @param  {String} msg
 * @return {Void}
 */
function warn(msg) {
  console.error("[Glide warn]: ".concat(msg));
}

/**
 * Converts value entered as number
 * or string to integer value.
 *
 * @param {String} value
 * @returns {Number}
 */
function toInt(value) {
  return parseInt(value);
}
/**
 * Converts value entered as number
 * or string to flat value.
 *
 * @param {String} value
 * @returns {Number}
 */

function toFloat(value) {
  return parseFloat(value);
}
/**
 * Indicates whether the specified value is a string.
 *
 * @param  {*}   value
 * @return {Boolean}
 */

function isString(value) {
  return typeof value === 'string';
}
/**
 * Indicates whether the specified value is an object.
 *
 * @param  {*} value
 * @return {Boolean}
 *
 * @see https://github.com/jashkenas/underscore
 */

function isObject(value) {
  var type = _typeof(value);

  return type === 'function' || type === 'object' && !!value; // eslint-disable-line no-mixed-operators
}
/**
 * Indicates whether the specified value is a function.
 *
 * @param  {*} value
 * @return {Boolean}
 */

function isFunction(value) {
  return typeof value === 'function';
}
/**
 * Indicates whether the specified value is undefined.
 *
 * @param  {*} value
 * @return {Boolean}
 */

function isUndefined(value) {
  return typeof value === 'undefined';
}
/**
 * Indicates whether the specified value is an array.
 *
 * @param  {*} value
 * @return {Boolean}
 */

function isArray(value) {
  return value.constructor === Array;
}

/**
 * Creates and initializes specified collection of extensions.
 * Each extension receives access to instance of glide and rest of components.
 *
 * @param {Object} glide
 * @param {Object} extensions
 *
 * @returns {Object}
 */

function mount(glide, extensions, events) {
  var components = {};

  for (var name in extensions) {
    if (isFunction(extensions[name])) {
      components[name] = extensions[name](glide, components, events);
    } else {
      warn('Extension must be a function');
    }
  }

  for (var _name in components) {
    if (isFunction(components[_name].mount)) {
      components[_name].mount();
    }
  }

  return components;
}

/**
 * Defines getter and setter property on the specified object.
 *
 * @param  {Object} obj         Object where property has to be defined.
 * @param  {String} prop        Name of the defined property.
 * @param  {Object} definition  Get and set definitions for the property.
 * @return {Void}
 */
function define(obj, prop, definition) {
  Object.defineProperty(obj, prop, definition);
}
/**
 * Sorts aphabetically object keys.
 *
 * @param  {Object} obj
 * @return {Object}
 */

function sortKeys(obj) {
  return Object.keys(obj).sort().reduce(function (r, k) {
    r[k] = obj[k];
    return r[k], r;
  }, {});
}
/**
 * Merges passed settings object with default options.
 *
 * @param  {Object} defaults
 * @param  {Object} settings
 * @return {Object}
 */

function mergeOptions(defaults, settings) {
  var options = Object.assign({}, defaults, settings); // `Object.assign` do not deeply merge objects, so we
  // have to do it manually for every nested object
  // in options. Although it does not look smart,
  // it's smaller and faster than some fancy
  // merging deep-merge algorithm script.

  if (settings.hasOwnProperty('classes')) {
    options.classes = Object.assign({}, defaults.classes, settings.classes);

    if (settings.classes.hasOwnProperty('direction')) {
      options.classes.direction = Object.assign({}, defaults.classes.direction, settings.classes.direction);
    }

    if (settings.classes.hasOwnProperty('type')) {
      options.classes.type = Object.assign({}, defaults.classes.type, settings.classes.type);
    }

    if (settings.classes.hasOwnProperty('slide')) {
      options.classes.slide = Object.assign({}, defaults.classes.slide, settings.classes.slide);
    }

    if (settings.classes.hasOwnProperty('arrow')) {
      options.classes.arrow = Object.assign({}, defaults.classes.arrow, settings.classes.arrow);
    }

    if (settings.classes.hasOwnProperty('nav')) {
      options.classes.nav = Object.assign({}, defaults.classes.nav, settings.classes.nav);
    }
  }

  if (settings.hasOwnProperty('breakpoints')) {
    options.breakpoints = Object.assign({}, defaults.breakpoints, settings.breakpoints);
  }

  return options;
}

var EventsBus = /*#__PURE__*/function () {
  /**
   * Construct a EventBus instance.
   *
   * @param {Object} events
   */
  function EventsBus() {
    var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, EventsBus);

    this.events = events;
    this.hop = events.hasOwnProperty;
  }
  /**
   * Adds listener to the specifed event.
   *
   * @param {String|Array} event
   * @param {Function} handler
   */


  _createClass(EventsBus, [{
    key: "on",
    value: function on(event, handler) {
      if (isArray(event)) {
        for (var i = 0; i < event.length; i++) {
          this.on(event[i], handler);
        }

        return;
      } // Create the event's object if not yet created


      if (!this.hop.call(this.events, event)) {
        this.events[event] = [];
      } // Add the handler to queue


      var index = this.events[event].push(handler) - 1; // Provide handle back for removal of event

      return {
        remove: function remove() {
          delete this.events[event][index];
        }
      };
    }
    /**
     * Runs registered handlers for specified event.
     *
     * @param {String|Array} event
     * @param {Object=} context
     */

  }, {
    key: "emit",
    value: function emit(event, context) {
      if (isArray(event)) {
        for (var i = 0; i < event.length; i++) {
          this.emit(event[i], context);
        }

        return;
      } // If the event doesn't exist, or there's no handlers in queue, just leave


      if (!this.hop.call(this.events, event)) {
        return;
      } // Cycle through events queue, fire!


      this.events[event].forEach(function (item) {
        item(context || {});
      });
    }
  }]);

  return EventsBus;
}();

var Glide$1 = /*#__PURE__*/function () {
  /**
   * Construct glide.
   *
   * @param  {String} selector
   * @param  {Object} options
   */
  function Glide(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Glide);

    this._c = {};
    this._t = [];
    this._e = new EventsBus();
    this.disabled = false;
    this.selector = selector;
    this.settings = mergeOptions(defaults, options);
    this.index = this.settings.startAt;
  }
  /**
   * Initializes glide.
   *
   * @param {Object} extensions Collection of extensions to initialize.
   * @return {Glide}
   */


  _createClass(Glide, [{
    key: "mount",
    value: function mount$1() {
      var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this._e.emit('mount.before');

      if (isObject(extensions)) {
        this._c = mount(this, extensions, this._e);
      } else {
        warn('You need to provide a object on `mount()`');
      }

      this._e.emit('mount.after');

      return this;
    }
    /**
     * Collects an instance `translate` transformers.
     *
     * @param  {Array} transformers Collection of transformers.
     * @return {Void}
     */

  }, {
    key: "mutate",
    value: function mutate() {
      var transformers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (isArray(transformers)) {
        this._t = transformers;
      } else {
        warn('You need to provide a array on `mutate()`');
      }

      return this;
    }
    /**
     * Updates glide with specified settings.
     *
     * @param {Object} settings
     * @return {Glide}
     */

  }, {
    key: "update",
    value: function update() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.settings = mergeOptions(this.settings, settings);

      if (settings.hasOwnProperty('startAt')) {
        this.index = settings.startAt;
      }

      this._e.emit('update');

      return this;
    }
    /**
     * Change slide with specified pattern. A pattern must be in the special format:
     * `>` - Move one forward
     * `<` - Move one backward
     * `={i}` - Go to {i} zero-based slide (eq. '=1', will go to second slide)
     * `>>` - Rewinds to end (last slide)
     * `<<` - Rewinds to start (first slide)
     * `|>` - Move one viewport forward
     * `|<` - Move one viewport backward
     *
     * @param {String} pattern
     * @return {Glide}
     */

  }, {
    key: "go",
    value: function go(pattern) {
      this._c.Run.make(pattern);

      return this;
    }
    /**
     * Move track by specified distance.
     *
     * @param {String} distance
     * @return {Glide}
     */

  }, {
    key: "move",
    value: function move(distance) {
      this._c.Transition.disable();

      this._c.Move.make(distance);

      return this;
    }
    /**
     * Destroy instance and revert all changes done by this._c.
     *
     * @return {Glide}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this._e.emit('destroy');

      return this;
    }
    /**
     * Start instance autoplaying.
     *
     * @param {Boolean|Number} interval Run autoplaying with passed interval regardless of `autoplay` settings
     * @return {Glide}
     */

  }, {
    key: "play",
    value: function play() {
      var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (interval) {
        this.settings.autoplay = interval;
      }

      this._e.emit('play');

      return this;
    }
    /**
     * Stop instance autoplaying.
     *
     * @return {Glide}
     */

  }, {
    key: "pause",
    value: function pause() {
      this._e.emit('pause');

      return this;
    }
    /**
     * Sets glide into a idle status.
     *
     * @return {Glide}
     */

  }, {
    key: "disable",
    value: function disable() {
      this.disabled = true;
      return this;
    }
    /**
     * Sets glide into a active status.
     *
     * @return {Glide}
     */

  }, {
    key: "enable",
    value: function enable() {
      this.disabled = false;
      return this;
    }
    /**
     * Adds cuutom event listener with handler.
     *
     * @param  {String|Array} event
     * @param  {Function} handler
     * @return {Glide}
     */

  }, {
    key: "on",
    value: function on(event, handler) {
      this._e.on(event, handler);

      return this;
    }
    /**
     * Checks if glide is a precised type.
     *
     * @param  {String} name
     * @return {Boolean}
     */

  }, {
    key: "isType",
    value: function isType(name) {
      return this.settings.type === name;
    }
    /**
     * Gets value of the core options.
     *
     * @return {Object}
     */

  }, {
    key: "settings",
    get: function get() {
      return this._o;
    }
    /**
     * Sets value of the core options.
     *
     * @param  {Object} o
     * @return {Void}
     */
    ,
    set: function set(o) {
      if (isObject(o)) {
        this._o = o;
      } else {
        warn('Options must be an `object` instance.');
      }
    }
    /**
     * Gets current index of the slider.
     *
     * @return {Object}
     */

  }, {
    key: "index",
    get: function get() {
      return this._i;
    }
    /**
     * Sets current index a slider.
     *
     * @return {Object}
     */
    ,
    set: function set(i) {
      this._i = toInt(i);
    }
    /**
     * Gets type name of the slider.
     *
     * @return {String}
     */

  }, {
    key: "type",
    get: function get() {
      return this.settings.type;
    }
    /**
     * Gets value of the idle status.
     *
     * @return {Boolean}
     */

  }, {
    key: "disabled",
    get: function get() {
      return this._d;
    }
    /**
     * Sets value of the idle status.
     *
     * @return {Boolean}
     */
    ,
    set: function set(status) {
      this._d = !!status;
    }
  }]);

  return Glide;
}();

function Run (Glide, Components, Events) {
  var Run = {
    /**
     * Initializes autorunning of the glide.
     *
     * @return {Void}
     */
    mount: function mount() {
      this._o = false;
    },

    /**
     * Makes glides running based on the passed moving schema.
     *
     * @param {String} move
     */
    make: function make(move) {
      var _this = this;

      if (!Glide.disabled) {
        !Glide.settings.waitForTransition || Glide.disable();
        this.move = move;
        Events.emit('run.before', this.move);
        this.calculate();
        Events.emit('run', this.move);
        Components.Transition.after(function () {
          if (_this.isStart()) {
            Events.emit('run.start', _this.move);
          }

          if (_this.isEnd()) {
            Events.emit('run.end', _this.move);
          }

          if (_this.isOffset()) {
            _this._o = false;
            Events.emit('run.offset', _this.move);
          }

          Events.emit('run.after', _this.move);
          Glide.enable();
        });
      }
    },

    /**
     * Calculates current index based on defined move.
     *
     * @return {Number|Undefined}
     */
    calculate: function calculate() {
      var move = this.move,
          length = this.length;
      var steps = move.steps,
          direction = move.direction; // By default assume that size of view is equal to one slide

      var viewSize = 1; // While direction is `=` we want jump to
      // a specified index described in steps.

      if (direction === '=') {
        // Check if bound is true, 
        // as we want to avoid whitespaces.
        if (Glide.settings.bound && toInt(steps) > length) {
          Glide.index = length;
          return;
        }

        Glide.index = steps;
        return;
      } // When pattern is equal to `>>` we want
      // fast forward to the last slide.


      if (direction === '>' && steps === '>') {
        Glide.index = length;
        return;
      } // When pattern is equal to `<<` we want
      // fast forward to the first slide.


      if (direction === '<' && steps === '<') {
        Glide.index = 0;
        return;
      } // pagination movement


      if (direction === '|') {
        viewSize = Glide.settings.perView || 1;
      } // we are moving forward


      if (direction === '>' || direction === '|' && steps === '>') {
        var index = calculateForwardIndex(viewSize);

        if (index > length) {
          this._o = true;
        }

        Glide.index = normalizeForwardIndex(index, viewSize);
        return;
      } // we are moving backward


      if (direction === '<' || direction === '|' && steps === '<') {
        var _index = calculateBackwardIndex(viewSize);

        if (_index < 0) {
          this._o = true;
        }

        Glide.index = normalizeBackwardIndex(_index, viewSize);
        return;
      }

      warn("Invalid direction pattern [".concat(direction).concat(steps, "] has been used"));
    },

    /**
     * Checks if we are on the first slide.
     *
     * @return {Boolean}
     */
    isStart: function isStart() {
      return Glide.index <= 0;
    },

    /**
     * Checks if we are on the last slide.
     *
     * @return {Boolean}
     */
    isEnd: function isEnd() {
      return Glide.index >= this.length;
    },

    /**
     * Checks if we are making a offset run.
     *
     * @param {String} direction
     * @return {Boolean}
     */
    isOffset: function isOffset() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      if (!direction) {
        return this._o;
      }

      if (!this._o) {
        return false;
      } // did we view to the right?


      if (direction === '|>') {
        return this.move.direction === '|' && this.move.steps === '>';
      } // did we view to the left?


      if (direction === '|<') {
        return this.move.direction === '|' && this.move.steps === '<';
      }

      return this.move.direction === direction;
    },

    /**
     * Checks if bound mode is active
     *
     * @return {Boolean}
     */
    isBound: function isBound() {
      return Glide.isType('slider') && Glide.settings.focusAt !== 'center' && Glide.settings.bound;
    }
  };
  /**
   * Returns index value to move forward/to the right
   *
   * @param viewSize
   * @returns {Number}
   */

  function calculateForwardIndex(viewSize) {
    var index = Glide.index;

    if (Glide.isType('carousel')) {
      return index + viewSize;
    }

    return index + (viewSize - index % viewSize);
  }
  /**
   * Normalizes the given forward index based on glide settings, preventing it to exceed certain boundaries
   *
   * @param index
   * @param length
   * @param viewSize
   * @returns {Number}
   */


  function normalizeForwardIndex(index, viewSize) {
    var length = Run.length;

    if (index <= length) {
      return index;
    }

    if (Glide.isType('carousel')) {
      return index - (length + 1);
    }

    if (Glide.settings.rewind) {
      // bound does funny things with the length, therefor we have to be certain
      // that we are on the last possible index value given by bound
      if (Run.isBound() && !Run.isEnd()) {
        return length;
      }

      return 0;
    }

    if (Run.isBound()) {
      return length;
    }

    return Math.floor(length / viewSize) * viewSize;
  }
  /**
   * Calculates index value to move backward/to the left
   *
   * @param viewSize
   * @returns {Number}
   */


  function calculateBackwardIndex(viewSize) {
    var index = Glide.index;

    if (Glide.isType('carousel')) {
      return index - viewSize;
    } // ensure our back navigation results in the same index as a forward navigation
    // to experience a homogeneous paging


    var view = Math.ceil(index / viewSize);
    return (view - 1) * viewSize;
  }
  /**
   * Normalizes the given backward index based on glide settings, preventing it to exceed certain boundaries
   *
   * @param index
   * @param length
   * @param viewSize
   * @returns {*}
   */


  function normalizeBackwardIndex(index, viewSize) {
    var length = Run.length;

    if (index >= 0) {
      return index;
    }

    if (Glide.isType('carousel')) {
      return index + (length + 1);
    }

    if (Glide.settings.rewind) {
      // bound does funny things with the length, therefor we have to be certain
      // that we are on first possible index value before we to rewind to the length given by bound
      if (Run.isBound() && Run.isStart()) {
        return length;
      }

      return Math.floor(length / viewSize) * viewSize;
    }

    return 0;
  }

  define(Run, 'move', {
    /**
     * Gets value of the move schema.
     *
     * @returns {Object}
     */
    get: function get() {
      return this._m;
    },

    /**
     * Sets value of the move schema.
     *
     * @returns {Object}
     */
    set: function set(value) {
      var step = value.substr(1);
      this._m = {
        direction: value.substr(0, 1),
        steps: step ? toInt(step) ? toInt(step) : step : 0
      };
    }
  });
  define(Run, 'length', {
    /**
     * Gets value of the running distance based
     * on zero-indexing number of slides.
     *
     * @return {Number}
     */
    get: function get() {
      var settings = Glide.settings;
      var length = Components.Html.slides.length; // If the `bound` option is active, a maximum running distance should be
      // reduced by `perView` and `focusAt` settings. Running distance
      // should end before creating an empty space after instance.

      if (this.isBound()) {
        return length - 1 - (toInt(settings.perView) - 1) + toInt(settings.focusAt);
      }

      return length - 1;
    }
  });
  define(Run, 'offset', {
    /**
     * Gets status of the offsetting flag.
     *
     * @return {Boolean}
     */
    get: function get() {
      return this._o;
    }
  });
  return Run;
}

/**
 * Returns a current time.
 *
 * @return {Number}
 */
function now() {
  return new Date().getTime();
}

/**
 * Returns a function, that, when invoked, will only be triggered
 * at most once during a given window of time.
 *
 * @param {Function} func
 * @param {Number} wait
 * @param {Object=} options
 * @return {Function}
 *
 * @see https://github.com/jashkenas/underscore
 */

function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function later() {
    previous = options.leading === false ? 0 : now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function throttled() {
    var at = now();
    if (!previous && options.leading === false) previous = at;
    var remaining = wait - (at - previous);
    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      previous = at;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}

var MARGIN_TYPE = {
  ltr: ['marginLeft', 'marginRight'],
  rtl: ['marginRight', 'marginLeft']
};
function Gaps (Glide, Components, Events) {
  var Gaps = {
    /**
     * Applies gaps between slides. First and last
     * slides do not receive it's edge margins.
     *
     * @param {HTMLCollection} slides
     * @return {Void}
     */
    apply: function apply(slides) {
      for (var i = 0, len = slides.length; i < len; i++) {
        var style = slides[i].style;
        var direction = Components.Direction.value;

        if (i !== 0) {
          style[MARGIN_TYPE[direction][0]] = "".concat(this.value / 2, "px");
        } else {
          style[MARGIN_TYPE[direction][0]] = '';
        }

        if (i !== slides.length - 1) {
          style[MARGIN_TYPE[direction][1]] = "".concat(this.value / 2, "px");
        } else {
          style[MARGIN_TYPE[direction][1]] = '';
        }
      }
    },

    /**
     * Removes gaps from the slides.
     *
     * @param {HTMLCollection} slides
     * @returns {Void}
    */
    remove: function remove(slides) {
      for (var i = 0, len = slides.length; i < len; i++) {
        var style = slides[i].style;
        style.marginLeft = '';
        style.marginRight = '';
      }
    }
  };
  define(Gaps, 'value', {
    /**
     * Gets value of the gap.
     *
     * @returns {Number}
     */
    get: function get() {
      return toInt(Glide.settings.gap);
    }
  });
  define(Gaps, 'grow', {
    /**
     * Gets additional dimensions value caused by gaps.
     * Used to increase width of the slides wrapper.
     *
     * @returns {Number}
     */
    get: function get() {
      return Gaps.value * Components.Sizes.length;
    }
  });
  define(Gaps, 'reductor', {
    /**
     * Gets reduction value caused by gaps.
     * Used to subtract width of the slides.
     *
     * @returns {Number}
     */
    get: function get() {
      var perView = Glide.settings.perView;
      return Gaps.value * (perView - 1) / perView;
    }
  });
  /**
   * Apply calculated gaps:
   * - after building, so slides (including clones) will receive proper margins
   * - on updating via API, to recalculate gaps with new options
   */

  Events.on(['build.after', 'update'], throttle(function () {
    Gaps.apply(Components.Html.wrapper.children);
  }, 30));
  /**
   * Remove gaps:
   * - on destroying to bring markup to its inital state
   */

  Events.on('destroy', function () {
    Gaps.remove(Components.Html.wrapper.children);
  });
  return Gaps;
}

/**
 * Finds siblings nodes of the passed node.
 *
 * @param  {Element} node
 * @return {Array}
 */
function siblings(node) {
  if (node && node.parentNode) {
    var n = node.parentNode.firstChild;
    var matched = [];

    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== node) {
        matched.push(n);
      }
    }

    return matched;
  }

  return [];
}
/**
 * Checks if passed node exist and is a valid element.
 *
 * @param  {Element} node
 * @return {Boolean}
 */

function exist(node) {
  if (node && node instanceof window.HTMLElement) {
    return true;
  }

  return false;
}
/**
 * Coerces a NodeList to an Array.
 *
 * @param  {NodeList} nodeList
 * @return {Array}
 */

function toArray(nodeList) {
  return Array.prototype.slice.call(nodeList);
}

var TRACK_SELECTOR = '[data-glide-el="track"]';
function Html (Glide, Components, Events) {
  var Html = {
    /**
     * Setup slider HTML nodes.
     *
     * @param {Glide} glide
     */
    mount: function mount() {
      this.root = Glide.selector;
      this.track = this.root.querySelector(TRACK_SELECTOR);
      this.collectSlides();
    },

    /**
     * Collect slides
     */
    collectSlides: function collectSlides() {
      this.slides = toArray(this.wrapper.children).filter(function (slide) {
        return !slide.classList.contains(Glide.settings.classes.slide.clone);
      });
    }
  };
  define(Html, 'root', {
    /**
     * Gets node of the glide main element.
     *
     * @return {Object}
     */
    get: function get() {
      return Html._r;
    },

    /**
     * Sets node of the glide main element.
     *
     * @return {Object}
     */
    set: function set(r) {
      if (isString(r)) {
        r = document.querySelector(r);
      }

      if (exist(r)) {
        Html._r = r;
      } else {
        warn('Root element must be a existing Html node');
      }
    }
  });
  define(Html, 'track', {
    /**
     * Gets node of the glide track with slides.
     *
     * @return {Object}
     */
    get: function get() {
      return Html._t;
    },

    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set: function set(t) {
      if (exist(t)) {
        Html._t = t;
      } else {
        warn("Could not find track element. Please use ".concat(TRACK_SELECTOR, " attribute."));
      }
    }
  });
  define(Html, 'wrapper', {
    /**
     * Gets node of the slides wrapper.
     *
     * @return {Object}
     */
    get: function get() {
      return Html.track.children[0];
    }
  });
  /**
   * Add/remove/reorder dynamic slides
   */

  Events.on('update', function () {
    Html.collectSlides();
  });
  return Html;
}

function Peek (Glide, Components, Events) {
  var Peek = {
    /**
     * Setups how much to peek based on settings.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.value = Glide.settings.peek;
    }
  };
  define(Peek, 'value', {
    /**
     * Gets value of the peek.
     *
     * @returns {Number|Object}
     */
    get: function get() {
      return Peek._v;
    },

    /**
     * Sets value of the peek.
     *
     * @param {Number|Object} value
     * @return {Void}
     */
    set: function set(value) {
      if (isObject(value)) {
        value.before = toInt(value.before);
        value.after = toInt(value.after);
      } else {
        value = toInt(value);
      }

      Peek._v = value;
    }
  });
  define(Peek, 'reductor', {
    /**
     * Gets reduction value caused by peek.
     *
     * @returns {Number}
     */
    get: function get() {
      var value = Peek.value;
      var perView = Glide.settings.perView;

      if (isObject(value)) {
        return value.before / perView + value.after / perView;
      }

      return value * 2 / perView;
    }
  });
  /**
   * Recalculate peeking sizes on:
   * - when resizing window to update to proper percents
   */

  Events.on(['resize', 'update'], function () {
    Peek.mount();
  });
  return Peek;
}

function Move (Glide, Components, Events) {
  var Move = {
    /**
     * Constructs move component.
     *
     * @returns {Void}
     */
    mount: function mount() {
      this._o = 0;
    },

    /**
     * Calculates a movement value based on passed offset and currently active index.
     *
     * @param  {Number} offset
     * @return {Void}
     */
    make: function make() {
      var _this = this;

      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.offset = offset;
      Events.emit('move', {
        movement: this.value
      });
      Components.Transition.after(function () {
        Events.emit('move.after', {
          movement: _this.value
        });
      });
    }
  };
  define(Move, 'offset', {
    /**
     * Gets an offset value used to modify current translate.
     *
     * @return {Object}
     */
    get: function get() {
      return Move._o;
    },

    /**
     * Sets an offset value used to modify current translate.
     *
     * @return {Object}
     */
    set: function set(value) {
      Move._o = !isUndefined(value) ? toInt(value) : 0;
    }
  });
  define(Move, 'translate', {
    /**
     * Gets a raw movement value.
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Sizes.slideWidth * Glide.index;
    }
  });
  define(Move, 'value', {
    /**
     * Gets an actual movement value corrected by offset.
     *
     * @return {Number}
     */
    get: function get() {
      var offset = this.offset;
      var translate = this.translate;

      if (Components.Direction.is('rtl')) {
        return translate + offset;
      }

      return translate - offset;
    }
  });
  /**
   * Make movement to proper slide on:
   * - before build, so glide will start at `startAt` index
   * - on each standard run to move to newly calculated index
   */

  Events.on(['build.before', 'run'], function () {
    Move.make();
  });
  return Move;
}

function Sizes (Glide, Components, Events) {
  var Sizes = {
    /**
     * Setups dimensions of slides.
     *
     * @return {Void}
     */
    setupSlides: function setupSlides() {
      var width = "".concat(this.slideWidth, "px");
      var slides = Components.Html.slides;

      for (var i = 0; i < slides.length; i++) {
        slides[i].style.width = width;
      }
    },

    /**
     * Setups dimensions of slides wrapper.
     *
     * @return {Void}
     */
    setupWrapper: function setupWrapper() {
      Components.Html.wrapper.style.width = "".concat(this.wrapperSize, "px");
    },

    /**
     * Removes applied styles from HTML elements.
     *
     * @returns {Void}
     */
    remove: function remove() {
      var slides = Components.Html.slides;

      for (var i = 0; i < slides.length; i++) {
        slides[i].style.width = '';
      }

      Components.Html.wrapper.style.width = '';
    }
  };
  define(Sizes, 'length', {
    /**
     * Gets count number of the slides.
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Html.slides.length;
    }
  });
  define(Sizes, 'width', {
    /**
     * Gets width value of the slider (visible area).
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Html.track.offsetWidth;
    }
  });
  define(Sizes, 'wrapperSize', {
    /**
     * Gets size of the slides wrapper.
     *
     * @return {Number}
     */
    get: function get() {
      return Sizes.slideWidth * Sizes.length + Components.Gaps.grow + Components.Clones.grow;
    }
  });
  define(Sizes, 'slideWidth', {
    /**
     * Gets width value of a single slide.
     *
     * @return {Number}
     */
    get: function get() {
      return Sizes.width / Glide.settings.perView - Components.Peek.reductor - Components.Gaps.reductor;
    }
  });
  /**
   * Apply calculated glide's dimensions:
   * - before building, so other dimensions (e.g. translate) will be calculated propertly
   * - when resizing window to recalculate sildes dimensions
   * - on updating via API, to calculate dimensions based on new options
   */

  Events.on(['build.before', 'resize', 'update'], function () {
    Sizes.setupSlides();
    Sizes.setupWrapper();
  });
  /**
   * Remove calculated glide's dimensions:
   * - on destoting to bring markup to its inital state
   */

  Events.on('destroy', function () {
    Sizes.remove();
  });
  return Sizes;
}

function Build (Glide, Components, Events) {
  var Build = {
    /**
     * Init glide building. Adds classes, sets
     * dimensions and setups initial state.
     *
     * @return {Void}
     */
    mount: function mount() {
      Events.emit('build.before');
      this.typeClass();
      this.activeClass();
      Events.emit('build.after');
    },

    /**
     * Adds `type` class to the glide element.
     *
     * @return {Void}
     */
    typeClass: function typeClass() {
      Components.Html.root.classList.add(Glide.settings.classes.type[Glide.settings.type]);
    },

    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    activeClass: function activeClass() {
      var classes = Glide.settings.classes;
      var slide = Components.Html.slides[Glide.index];

      if (slide) {
        slide.classList.add(classes.slide.active);
        siblings(slide).forEach(function (sibling) {
          sibling.classList.remove(classes.slide.active);
        });
      }
    },

    /**
     * Removes HTML classes applied at building.
     *
     * @return {Void}
     */
    removeClasses: function removeClasses() {
      var _Glide$settings$class = Glide.settings.classes,
          type = _Glide$settings$class.type,
          slide = _Glide$settings$class.slide;
      Components.Html.root.classList.remove(type[Glide.settings.type]);
      Components.Html.slides.forEach(function (sibling) {
        sibling.classList.remove(slide.active);
      });
    }
  };
  /**
   * Clear building classes:
   * - on destroying to bring HTML to its initial state
   * - on updating to remove classes before remounting component
   */

  Events.on(['destroy', 'update'], function () {
    Build.removeClasses();
  });
  /**
   * Remount component:
   * - on resizing of the window to calculate new dimensions
   * - on updating settings via API
   */

  Events.on(['resize', 'update'], function () {
    Build.mount();
  });
  /**
   * Swap active class of current slide:
   * - after each move to the new index
   */

  Events.on('move.after', function () {
    Build.activeClass();
  });
  return Build;
}

function Clones (Glide, Components, Events) {
  var Clones = {
    /**
     * Create pattern map and collect slides to be cloned.
     */
    mount: function mount() {
      this.items = [];

      if (Glide.isType('carousel')) {
        this.items = this.collect();
      }
    },

    /**
     * Collect clones with pattern.
     *
     * @return {[]}
     */
    collect: function collect() {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var slides = Components.Html.slides;
      var _Glide$settings = Glide.settings,
          perView = _Glide$settings.perView,
          classes = _Glide$settings.classes,
          cloningRatio = _Glide$settings.cloningRatio;

      if (slides.length !== 0) {
        var peekIncrementer = +!!Glide.settings.peek;
        var cloneCount = perView + peekIncrementer + Math.round(perView / 2);
        var append = slides.slice(0, cloneCount).reverse();
        var prepend = slides.slice(cloneCount * -1);

        for (var r = 0; r < Math.max(cloningRatio, Math.floor(perView / slides.length)); r++) {
          for (var i = 0; i < append.length; i++) {
            var clone = append[i].cloneNode(true);
            clone.classList.add(classes.slide.clone);
            items.push(clone);
          }

          for (var _i = 0; _i < prepend.length; _i++) {
            var _clone = prepend[_i].cloneNode(true);

            _clone.classList.add(classes.slide.clone);

            items.unshift(_clone);
          }
        }
      }

      return items;
    },

    /**
     * Append cloned slides with generated pattern.
     *
     * @return {Void}
     */
    append: function append() {
      var items = this.items;
      var _Components$Html = Components.Html,
          wrapper = _Components$Html.wrapper,
          slides = _Components$Html.slides;
      var half = Math.floor(items.length / 2);
      var prepend = items.slice(0, half).reverse();
      var append = items.slice(half * -1).reverse();
      var width = "".concat(Components.Sizes.slideWidth, "px");

      for (var i = 0; i < append.length; i++) {
        wrapper.appendChild(append[i]);
      }

      for (var _i2 = 0; _i2 < prepend.length; _i2++) {
        wrapper.insertBefore(prepend[_i2], slides[0]);
      }

      for (var _i3 = 0; _i3 < items.length; _i3++) {
        items[_i3].style.width = width;
      }
    },

    /**
     * Remove all cloned slides.
     *
     * @return {Void}
     */
    remove: function remove() {
      var items = this.items;

      for (var i = 0; i < items.length; i++) {
        Components.Html.wrapper.removeChild(items[i]);
      }
    }
  };
  define(Clones, 'grow', {
    /**
     * Gets additional dimensions value caused by clones.
     *
     * @return {Number}
     */
    get: function get() {
      return (Components.Sizes.slideWidth + Components.Gaps.value) * Clones.items.length;
    }
  });
  /**
   * Append additional slide's clones:
   * - while glide's type is `carousel`
   */

  Events.on('update', function () {
    Clones.remove();
    Clones.mount();
    Clones.append();
  });
  /**
   * Append additional slide's clones:
   * - while glide's type is `carousel`
   */

  Events.on('build.before', function () {
    if (Glide.isType('carousel')) {
      Clones.append();
    }
  });
  /**
   * Remove clones HTMLElements:
   * - on destroying, to bring HTML to its initial state
   */

  Events.on('destroy', function () {
    Clones.remove();
  });
  return Clones;
}

var EventsBinder = /*#__PURE__*/function () {
  /**
   * Construct a EventsBinder instance.
   */
  function EventsBinder() {
    var listeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, EventsBinder);

    this.listeners = listeners;
  }
  /**
   * Adds events listeners to arrows HTML elements.
   *
   * @param  {String|Array} events
   * @param  {Element|Window|Document} el
   * @param  {Function} closure
   * @param  {Boolean|Object} capture
   * @return {Void}
   */


  _createClass(EventsBinder, [{
    key: "on",
    value: function on(events, el, closure) {
      var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (isString(events)) {
        events = [events];
      }

      for (var i = 0; i < events.length; i++) {
        this.listeners[events[i]] = closure;
        el.addEventListener(events[i], this.listeners[events[i]], capture);
      }
    }
    /**
     * Removes event listeners from arrows HTML elements.
     *
     * @param  {String|Array} events
     * @param  {Element|Window|Document} el
     * @param  {Boolean|Object} capture
     * @return {Void}
     */

  }, {
    key: "off",
    value: function off(events, el) {
      var capture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (isString(events)) {
        events = [events];
      }

      for (var i = 0; i < events.length; i++) {
        el.removeEventListener(events[i], this.listeners[events[i]], capture);
      }
    }
    /**
     * Destroy collected listeners.
     *
     * @returns {Void}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      delete this.listeners;
    }
  }]);

  return EventsBinder;
}();

function Resize (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var Resize = {
    /**
     * Initializes window bindings.
     */
    mount: function mount() {
      this.bind();
    },

    /**
     * Binds `rezsize` listener to the window.
     * It's a costly event, so we are debouncing it.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('resize', window, throttle(function () {
        Events.emit('resize');
      }, Glide.settings.throttle));
    },

    /**
     * Unbinds listeners from the window.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('resize', window);
    }
  };
  /**
   * Remove bindings from window:
   * - on destroying, to remove added EventListener
   */

  Events.on('destroy', function () {
    Resize.unbind();
    Binder.destroy();
  });
  return Resize;
}

var VALID_DIRECTIONS = ['ltr', 'rtl'];
var FLIPED_MOVEMENTS = {
  '>': '<',
  '<': '>',
  '=': '='
};
function Direction (Glide, Components, Events) {
  var Direction = {
    /**
     * Setups gap value based on settings.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.value = Glide.settings.direction;
    },

    /**
     * Resolves pattern based on direction value
     *
     * @param {String} pattern
     * @returns {String}
     */
    resolve: function resolve(pattern) {
      var token = pattern.slice(0, 1);

      if (this.is('rtl')) {
        return pattern.split(token).join(FLIPED_MOVEMENTS[token]);
      }

      return pattern;
    },

    /**
     * Checks value of direction mode.
     *
     * @param {String} direction
     * @returns {Boolean}
     */
    is: function is(direction) {
      return this.value === direction;
    },

    /**
     * Applies direction class to the root HTML element.
     *
     * @return {Void}
     */
    addClass: function addClass() {
      Components.Html.root.classList.add(Glide.settings.classes.direction[this.value]);
    },

    /**
     * Removes direction class from the root HTML element.
     *
     * @return {Void}
     */
    removeClass: function removeClass() {
      Components.Html.root.classList.remove(Glide.settings.classes.direction[this.value]);
    }
  };
  define(Direction, 'value', {
    /**
     * Gets value of the direction.
     *
     * @returns {Number}
     */
    get: function get() {
      return Direction._v;
    },

    /**
     * Sets value of the direction.
     *
     * @param {String} value
     * @return {Void}
     */
    set: function set(value) {
      if (VALID_DIRECTIONS.indexOf(value) > -1) {
        Direction._v = value;
      } else {
        warn('Direction value must be `ltr` or `rtl`');
      }
    }
  });
  /**
   * Clear direction class:
   * - on destroy to bring HTML to its initial state
   * - on update to remove class before reappling bellow
   */

  Events.on(['destroy', 'update'], function () {
    Direction.removeClass();
  });
  /**
   * Remount component:
   * - on update to reflect changes in direction value
   */

  Events.on('update', function () {
    Direction.mount();
  });
  /**
   * Apply direction class:
   * - before building to apply class for the first time
   * - on updating to reapply direction class that may changed
   */

  Events.on(['build.before', 'update'], function () {
    Direction.addClass();
  });
  return Direction;
}

/**
 * Reflects value of glide movement.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Rtl (Glide, Components) {
  return {
    /**
     * Negates the passed translate if glide is in RTL option.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      if (Components.Direction.is('rtl')) {
        return -translate;
      }

      return translate;
    }
  };
}

/**
 * Updates glide movement with a `gap` settings.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Gap (Glide, Components) {
  return {
    /**
     * Modifies passed translate value with number in the `gap` settings.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      var multiplier = Math.floor(translate / Components.Sizes.slideWidth);
      return translate + Components.Gaps.value * multiplier;
    }
  };
}

/**
 * Updates glide movement with width of additional clones width.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Grow (Glide, Components) {
  return {
    /**
     * Adds to the passed translate width of the half of clones.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      return translate + Components.Clones.grow / 2;
    }
  };
}

/**
 * Updates glide movement with a `peek` settings.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */

function Peeking (Glide, Components) {
  return {
    /**
     * Modifies passed translate value with a `peek` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      if (Glide.settings.focusAt >= 0) {
        var peek = Components.Peek.value;

        if (isObject(peek)) {
          return translate - peek.before;
        }

        return translate - peek;
      }

      return translate;
    }
  };
}

/**
 * Updates glide movement with a `focusAt` settings.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Focusing (Glide, Components) {
  return {
    /**
     * Modifies passed translate value with index in the `focusAt` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      var gap = Components.Gaps.value;
      var width = Components.Sizes.width;
      var focusAt = Glide.settings.focusAt;
      var slideWidth = Components.Sizes.slideWidth;

      if (focusAt === 'center') {
        return translate - (width / 2 - slideWidth / 2);
      }

      return translate - slideWidth * focusAt - gap * focusAt;
    }
  };
}

/**
 * Applies diffrent transformers on translate value.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */

function mutator (Glide, Components, Events) {
  /**
   * Merge instance transformers with collection of default transformers.
   * It's important that the Rtl component be last on the list,
   * so it reflects all previous transformations.
   *
   * @type {Array}
   */
  var TRANSFORMERS = [Gap, Grow, Peeking, Focusing].concat(Glide._t, [Rtl]);
  return {
    /**
     * Piplines translate value with registered transformers.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    mutate: function mutate(translate) {
      for (var i = 0; i < TRANSFORMERS.length; i++) {
        var transformer = TRANSFORMERS[i];

        if (isFunction(transformer) && isFunction(transformer().modify)) {
          translate = transformer(Glide, Components, Events).modify(translate);
        } else {
          warn('Transformer should be a function that returns an object with `modify()` method');
        }
      }

      return translate;
    }
  };
}

function Translate (Glide, Components, Events) {
  var Translate = {
    /**
     * Sets value of translate on HTML element.
     *
     * @param {Number} value
     * @return {Void}
     */
    set: function set(value) {
      var transform = mutator(Glide, Components).mutate(value);
      var translate3d = "translate3d(".concat(-1 * transform, "px, 0px, 0px)");
      Components.Html.wrapper.style.mozTransform = translate3d; // needed for supported Firefox 10-15

      Components.Html.wrapper.style.webkitTransform = translate3d; // needed for supported Chrome 10-35, Safari 5.1-8, and Opera 15-22

      Components.Html.wrapper.style.transform = translate3d;
    },

    /**
     * Removes value of translate from HTML element.
     *
     * @return {Void}
     */
    remove: function remove() {
      Components.Html.wrapper.style.transform = '';
    },

    /**
     * @return {number}
     */
    getStartIndex: function getStartIndex() {
      var length = Components.Sizes.length;
      var index = Glide.index;
      var perView = Glide.settings.perView;

      if (Components.Run.isOffset('>') || Components.Run.isOffset('|>')) {
        return length + (index - perView);
      } // "modulo length" converts an index that equals length to zero


      return (index + perView) % length;
    },

    /**
     * @return {number}
     */
    getTravelDistance: function getTravelDistance() {
      var travelDistance = Components.Sizes.slideWidth * Glide.settings.perView;

      if (Components.Run.isOffset('>') || Components.Run.isOffset('|>')) {
        // reverse travel distance so that we don't have to change subtract operations
        return travelDistance * -1;
      }

      return travelDistance;
    }
  };
  /**
   * Set new translate value:
   * - on move to reflect index change
   * - on updating via API to reflect possible changes in options
   */

  Events.on('move', function (context) {
    if (!Glide.isType('carousel') || !Components.Run.isOffset()) {
      return Translate.set(context.movement);
    }

    Components.Transition.after(function () {
      Events.emit('translate.jump');
      Translate.set(Components.Sizes.slideWidth * Glide.index);
    });
    var startWidth = Components.Sizes.slideWidth * Components.Translate.getStartIndex();
    return Translate.set(startWidth - Components.Translate.getTravelDistance());
  });
  /**
   * Remove translate:
   * - on destroying to bring markup to its inital state
   */

  Events.on('destroy', function () {
    Translate.remove();
  });
  return Translate;
}

function Transition (Glide, Components, Events) {
  /**
   * Holds inactivity status of transition.
   * When true transition is not applied.
   *
   * @type {Boolean}
   */
  var disabled = false;
  var Transition = {
    /**
     * Composes string of the CSS transition.
     *
     * @param {String} property
     * @return {String}
     */
    compose: function compose(property) {
      var settings = Glide.settings;

      if (!disabled) {
        return "".concat(property, " ").concat(this.duration, "ms ").concat(settings.animationTimingFunc);
      }

      return "".concat(property, " 0ms ").concat(settings.animationTimingFunc);
    },

    /**
     * Sets value of transition on HTML element.
     *
     * @param {String=} property
     * @return {Void}
     */
    set: function set() {
      var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';
      Components.Html.wrapper.style.transition = this.compose(property);
    },

    /**
     * Removes value of transition from HTML element.
     *
     * @return {Void}
     */
    remove: function remove() {
      Components.Html.wrapper.style.transition = '';
    },

    /**
     * Runs callback after animation.
     *
     * @param  {Function} callback
     * @return {Void}
     */
    after: function after(callback) {
      setTimeout(function () {
        callback();
      }, this.duration);
    },

    /**
     * Enable transition.
     *
     * @return {Void}
     */
    enable: function enable() {
      disabled = false;
      this.set();
    },

    /**
     * Disable transition.
     *
     * @return {Void}
     */
    disable: function disable() {
      disabled = true;
      this.set();
    }
  };
  define(Transition, 'duration', {
    /**
     * Gets duration of the transition based
     * on currently running animation type.
     *
     * @return {Number}
     */
    get: function get() {
      var settings = Glide.settings;

      if (Glide.isType('slider') && Components.Run.offset) {
        return settings.rewindDuration;
      }

      return settings.animationDuration;
    }
  });
  /**
   * Set transition `style` value:
   * - on each moving, because it may be cleared by offset move
   */

  Events.on('move', function () {
    Transition.set();
  });
  /**
   * Disable transition:
   * - before initial build to avoid transitioning from `0` to `startAt` index
   * - while resizing window and recalculating dimensions
   * - on jumping from offset transition at start and end edges in `carousel` type
   */

  Events.on(['build.before', 'resize', 'translate.jump'], function () {
    Transition.disable();
  });
  /**
   * Enable transition:
   * - on each running, because it may be disabled by offset move
   */

  Events.on('run', function () {
    Transition.enable();
  });
  /**
   * Remove transition:
   * - on destroying to bring markup to its inital state
   */

  Events.on('destroy', function () {
    Transition.remove();
  });
  return Transition;
}

/**
 * Test via a getter in the options object to see
 * if the passive property is accessed.
 *
 * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
 */
var supportsPassive = false;

try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function get() {
      supportsPassive = true;
    }
  });
  window.addEventListener('testPassive', null, opts);
  window.removeEventListener('testPassive', null, opts);
} catch (e) {}

var supportsPassive$1 = supportsPassive;

var START_EVENTS = ['touchstart', 'mousedown'];
var MOVE_EVENTS = ['touchmove', 'mousemove'];
var END_EVENTS = ['touchend', 'touchcancel', 'mouseup', 'mouseleave'];
var MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];
function Swipe (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var swipeSin = 0;
  var swipeStartX = 0;
  var swipeStartY = 0;
  var disabled = false;
  var capture = supportsPassive$1 ? {
    passive: true
  } : false;
  var Swipe = {
    /**
     * Initializes swipe bindings.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.bindSwipeStart();
    },

    /**
     * Handler for `swipestart` event. Calculates entry points of the user's tap.
     *
     * @param {Object} event
     * @return {Void}
     */
    start: function start(event) {
      if (!disabled && !Glide.disabled) {
        this.disable();
        var swipe = this.touches(event);
        swipeSin = null;
        swipeStartX = toInt(swipe.pageX);
        swipeStartY = toInt(swipe.pageY);
        this.bindSwipeMove();
        this.bindSwipeEnd();
        Events.emit('swipe.start');
      }
    },

    /**
     * Handler for `swipemove` event. Calculates user's tap angle and distance.
     *
     * @param {Object} event
     */
    move: function move(event) {
      if (!Glide.disabled) {
        var _Glide$settings = Glide.settings,
            touchAngle = _Glide$settings.touchAngle,
            touchRatio = _Glide$settings.touchRatio,
            classes = _Glide$settings.classes;
        var swipe = this.touches(event);
        var subExSx = toInt(swipe.pageX) - swipeStartX;
        var subEySy = toInt(swipe.pageY) - swipeStartY;
        var powEX = Math.abs(subExSx << 2);
        var powEY = Math.abs(subEySy << 2);
        var swipeHypotenuse = Math.sqrt(powEX + powEY);
        var swipeCathetus = Math.sqrt(powEY);
        swipeSin = Math.asin(swipeCathetus / swipeHypotenuse);

        if (swipeSin * 180 / Math.PI < touchAngle) {
          event.stopPropagation();
          Components.Move.make(subExSx * toFloat(touchRatio));
          Components.Html.root.classList.add(classes.dragging);
          Events.emit('swipe.move');
        } else {
          return false;
        }
      }
    },

    /**
     * Handler for `swipeend` event. Finitializes user's tap and decides about glide move.
     *
     * @param {Object} event
     * @return {Void}
     */
    end: function end(event) {
      if (!Glide.disabled) {
        var _Glide$settings2 = Glide.settings,
            perSwipe = _Glide$settings2.perSwipe,
            touchAngle = _Glide$settings2.touchAngle,
            classes = _Glide$settings2.classes;
        var swipe = this.touches(event);
        var threshold = this.threshold(event);
        var swipeDistance = swipe.pageX - swipeStartX;
        var swipeDeg = swipeSin * 180 / Math.PI;
        this.enable();

        if (swipeDistance > threshold && swipeDeg < touchAngle) {
          Components.Run.make(Components.Direction.resolve("".concat(perSwipe, "<")));
        } else if (swipeDistance < -threshold && swipeDeg < touchAngle) {
          Components.Run.make(Components.Direction.resolve("".concat(perSwipe, ">")));
        } else {
          // While swipe don't reach distance apply previous transform.
          Components.Move.make();
        }

        Components.Html.root.classList.remove(classes.dragging);
        this.unbindSwipeMove();
        this.unbindSwipeEnd();
        Events.emit('swipe.end');
      }
    },

    /**
     * Binds swipe's starting event.
     *
     * @return {Void}
     */
    bindSwipeStart: function bindSwipeStart() {
      var _this = this;

      var _Glide$settings3 = Glide.settings,
          swipeThreshold = _Glide$settings3.swipeThreshold,
          dragThreshold = _Glide$settings3.dragThreshold;

      if (swipeThreshold) {
        Binder.on(START_EVENTS[0], Components.Html.wrapper, function (event) {
          _this.start(event);
        }, capture);
      }

      if (dragThreshold) {
        Binder.on(START_EVENTS[1], Components.Html.wrapper, function (event) {
          _this.start(event);
        }, capture);
      }
    },

    /**
     * Unbinds swipe's starting event.
     *
     * @return {Void}
     */
    unbindSwipeStart: function unbindSwipeStart() {
      Binder.off(START_EVENTS[0], Components.Html.wrapper, capture);
      Binder.off(START_EVENTS[1], Components.Html.wrapper, capture);
    },

    /**
     * Binds swipe's moving event.
     *
     * @return {Void}
     */
    bindSwipeMove: function bindSwipeMove() {
      var _this2 = this;

      Binder.on(MOVE_EVENTS, Components.Html.wrapper, throttle(function (event) {
        _this2.move(event);
      }, Glide.settings.throttle), capture);
    },

    /**
     * Unbinds swipe's moving event.
     *
     * @return {Void}
     */
    unbindSwipeMove: function unbindSwipeMove() {
      Binder.off(MOVE_EVENTS, Components.Html.wrapper, capture);
    },

    /**
     * Binds swipe's ending event.
     *
     * @return {Void}
     */
    bindSwipeEnd: function bindSwipeEnd() {
      var _this3 = this;

      Binder.on(END_EVENTS, Components.Html.wrapper, function (event) {
        _this3.end(event);
      });
    },

    /**
     * Unbinds swipe's ending event.
     *
     * @return {Void}
     */
    unbindSwipeEnd: function unbindSwipeEnd() {
      Binder.off(END_EVENTS, Components.Html.wrapper);
    },

    /**
     * Normalizes event touches points accorting to different types.
     *
     * @param {Object} event
     */
    touches: function touches(event) {
      if (MOUSE_EVENTS.indexOf(event.type) > -1) {
        return event;
      }

      return event.touches[0] || event.changedTouches[0];
    },

    /**
     * Gets value of minimum swipe distance settings based on event type.
     *
     * @return {Number}
     */
    threshold: function threshold(event) {
      var settings = Glide.settings;

      if (MOUSE_EVENTS.indexOf(event.type) > -1) {
        return settings.dragThreshold;
      }

      return settings.swipeThreshold;
    },

    /**
     * Enables swipe event.
     *
     * @return {self}
     */
    enable: function enable() {
      disabled = false;
      Components.Transition.enable();
      return this;
    },

    /**
     * Disables swipe event.
     *
     * @return {self}
     */
    disable: function disable() {
      disabled = true;
      Components.Transition.disable();
      return this;
    }
  };
  /**
   * Add component class:
   * - after initial building
   */

  Events.on('build.after', function () {
    Components.Html.root.classList.add(Glide.settings.classes.swipeable);
  });
  /**
   * Remove swiping bindings:
   * - on destroying, to remove added EventListeners
   */

  Events.on('destroy', function () {
    Swipe.unbindSwipeStart();
    Swipe.unbindSwipeMove();
    Swipe.unbindSwipeEnd();
    Binder.destroy();
  });
  return Swipe;
}

function Images (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var Images = {
    /**
     * Binds listener to glide wrapper.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.bind();
    },

    /**
     * Binds `dragstart` event on wrapper to prevent dragging images.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('dragstart', Components.Html.wrapper, this.dragstart);
    },

    /**
     * Unbinds `dragstart` event on wrapper.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('dragstart', Components.Html.wrapper);
    },

    /**
     * Event handler. Prevents dragging.
     *
     * @return {Void}
     */
    dragstart: function dragstart(event) {
      event.preventDefault();
    }
  };
  /**
   * Remove bindings from images:
   * - on destroying, to remove added EventListeners
   */

  Events.on('destroy', function () {
    Images.unbind();
    Binder.destroy();
  });
  return Images;
}

function Lazy (Glide, Components, Events) {
  /**
   * Holds reference to settings.
   *
   * @type {Object}
   */
  var settings = Glide.settings;
  var inView = false;
  var Lazy = {
    mount: function mount() {
      /**
       * Collection of slide elements
       *
       * @private
       * @type {HTMLCollection}
       */
      if (settings.lazy) {
        this._wrapper = Components.Html.root;
        this._slideElements = this._wrapper.querySelectorAll('.glide__slide');
      }
    },
    withinView: function withinView() {
      var rect = this._wrapper.getBoundingClientRect();

      if (rect.bottom > 0 && rect.right > 0 && rect.top <= (window.innerHeight * settings.lazyScrollThreshold || document.documentElement.clientHeight) * settings.lazyScrollThreshold && rect.left <= (window.innerWidth * settings.lazyScrollThreshold || document.documentElement.clientWidth * settings.lazyScrollThreshold)) {
        this.lazyLoad();
      }
    },
    lazyLoad: function lazyLoad() {
      var length;
      var additionSlides = settings.lazyInitialSlidesLoaded - 1;
      inView = true;

      if (Glide.index + additionSlides < this._slideElements.length) {
        length = Glide.index + additionSlides;
      } else {
        length = Glide.index;
      }

      for (var i = 0; i <= length; i++) {
        var img = this._slideElements[i].getElementsByTagName('img')[0];

        if (img && img.classList.contains('glide__lazy')) {
          if (!this._slideElements[i].classList.contains('glide__lazy__loaded')) {
            this.loadImage(img);
          }
        }
      }
    },
    loadImage: function loadImage(image) {
      if (image.dataset.src) {
        image.src = image.dataset.src;
        image.classList.add('glide__lazy__loaded');
        image.classList.remove('glide__lazy');
        image.removeAttribute('data-src');
      }
    }
  };
  Events.on(['mount.after'], function () {
    if (settings.lazy) {
      Lazy.withinView();
    }
  });
  Events.on(['move.after'], throttle(function () {
    if (settings.lazy && inView) {
      Lazy.lazyLoad();
    } else if (settings.lazy) {
      Lazy.withinView();
    }
  }, 100));
  document.addEventListener('scroll', throttle(function () {
    if (settings.lazy && !inView) {
      Lazy.withinView();
    }
  }, 100));
  return Lazy;
}

function Anchors (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  /**
   * Holds detaching status of anchors.
   * Prevents detaching of already detached anchors.
   *
   * @private
   * @type {Boolean}
   */

  var detached = false;
  /**
   * Holds preventing status of anchors.
   * If `true` redirection after click will be disabled.
   *
   * @private
   * @type {Boolean}
   */

  var prevented = false;
  var Anchors = {
    /**
     * Setups a initial state of anchors component.
     *
     * @returns {Void}
     */
    mount: function mount() {
      /**
       * Holds collection of anchors elements.
       *
       * @private
       * @type {HTMLCollection}
       */
      this._a = Components.Html.wrapper.querySelectorAll('a');
      this.bind();
    },

    /**
     * Binds events to anchors inside a track.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('click', Components.Html.wrapper, this.click);
    },

    /**
     * Unbinds events attached to anchors inside a track.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('click', Components.Html.wrapper);
    },

    /**
     * Handler for click event. Prevents clicks when glide is in `prevent` status.
     *
     * @param  {Object} event
     * @return {Void}
     */
    click: function click(event) {
      if (prevented) {
        event.stopPropagation();
        event.preventDefault();
      }
    },

    /**
     * Detaches anchors click event inside glide.
     *
     * @return {self}
     */
    detach: function detach() {
      prevented = true;

      if (!detached) {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].draggable = false;
        }

        detached = true;
      }

      return this;
    },

    /**
     * Attaches anchors click events inside glide.
     *
     * @return {self}
     */
    attach: function attach() {
      prevented = false;

      if (detached) {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].draggable = true;
        }

        detached = false;
      }

      return this;
    }
  };
  define(Anchors, 'items', {
    /**
     * Gets collection of the arrows HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get: function get() {
      return Anchors._a;
    }
  });
  /**
   * Detach anchors inside slides:
   * - on swiping, so they won't redirect to its `href` attributes
   */

  Events.on('swipe.move', function () {
    Anchors.detach();
  });
  /**
   * Attach anchors inside slides:
   * - after swiping and transitions ends, so they can redirect after click again
   */

  Events.on('swipe.end', function () {
    Components.Transition.after(function () {
      Anchors.attach();
    });
  });
  /**
   * Unbind anchors inside slides:
   * - on destroying, to bring anchors to its initial state
   */

  Events.on('destroy', function () {
    Anchors.attach();
    Anchors.unbind();
    Binder.destroy();
  });
  return Anchors;
}

var NAV_SELECTOR = '[data-glide-el="controls[nav]"]';
var CONTROLS_SELECTOR = '[data-glide-el^="controls"]';
var PREVIOUS_CONTROLS_SELECTOR = "".concat(CONTROLS_SELECTOR, " [data-glide-dir*=\"<\"]");
var NEXT_CONTROLS_SELECTOR = "".concat(CONTROLS_SELECTOR, " [data-glide-dir*=\">\"]");
function Controls (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var capture = supportsPassive$1 ? {
    passive: true
  } : false;
  var Controls = {
    /**
     * Inits arrows. Binds events listeners
     * to the arrows HTML elements.
     *
     * @return {Void}
     */
    mount: function mount() {
      /**
       * Collection of navigation HTML elements.
       *
       * @private
       * @type {HTMLCollection}
       */
      this._n = Components.Html.root.querySelectorAll(NAV_SELECTOR);
      /**
       * Collection of controls HTML elements.
       *
       * @private
       * @type {HTMLCollection}
       */

      this._c = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR);
      /**
       * Collection of arrow control HTML elements.
       *
       * @private
       * @type {Object}
       */

      this._arrowControls = {
        previous: Components.Html.root.querySelectorAll(PREVIOUS_CONTROLS_SELECTOR),
        next: Components.Html.root.querySelectorAll(NEXT_CONTROLS_SELECTOR)
      };
      this.addBindings();
    },

    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    setActive: function setActive() {
      for (var i = 0; i < this._n.length; i++) {
        this.addClass(this._n[i].children);
      }
    },

    /**
     * Removes active class to current slide.
     *
     * @return {Void}
     */
    removeActive: function removeActive() {
      for (var i = 0; i < this._n.length; i++) {
        this.removeClass(this._n[i].children);
      }
    },

    /**
     * Toggles active class on items inside navigation.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */
    addClass: function addClass(controls) {
      var settings = Glide.settings;
      var item = controls[Glide.index];

      if (!item) {
        return;
      }

      if (item) {
        item.classList.add(settings.classes.nav.active);
        siblings(item).forEach(function (sibling) {
          sibling.classList.remove(settings.classes.nav.active);
        });
      }
    },

    /**
     * Removes active class from active control.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */
    removeClass: function removeClass(controls) {
      var item = controls[Glide.index];

      if (item) {
        item.classList.remove(Glide.settings.classes.nav.active);
      }
    },

    /**
     * Calculates, removes or adds `Glide.settings.classes.disabledArrow` class on the control arrows
     */
    setArrowState: function setArrowState() {
      if (Glide.settings.rewind) {
        return;
      }

      var next = Controls._arrowControls.next;
      var previous = Controls._arrowControls.previous;
      this.resetArrowState(next, previous);

      if (Glide.index === 0) {
        this.disableArrow(previous);
      }

      if (Glide.index === Components.Run.length) {
        this.disableArrow(next);
      }
    },

    /**
     * Removes `Glide.settings.classes.disabledArrow` from given NodeList elements
     *
     * @param {NodeList[]} lists
     */
    resetArrowState: function resetArrowState() {
      var settings = Glide.settings;

      for (var _len = arguments.length, lists = new Array(_len), _key = 0; _key < _len; _key++) {
        lists[_key] = arguments[_key];
      }

      lists.forEach(function (list) {
        toArray(list).forEach(function (element) {
          element.classList.remove(settings.classes.arrow.disabled);
        });
      });
    },

    /**
     * Adds `Glide.settings.classes.disabledArrow` to given NodeList elements
     *
     * @param {NodeList[]} lists
     */
    disableArrow: function disableArrow() {
      var settings = Glide.settings;

      for (var _len2 = arguments.length, lists = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        lists[_key2] = arguments[_key2];
      }

      lists.forEach(function (list) {
        toArray(list).forEach(function (element) {
          element.classList.add(settings.classes.arrow.disabled);
        });
      });
    },

    /**
     * Adds handles to the each group of controls.
     *
     * @return {Void}
     */
    addBindings: function addBindings() {
      for (var i = 0; i < this._c.length; i++) {
        this.bind(this._c[i].children);
      }
    },

    /**
     * Removes handles from the each group of controls.
     *
     * @return {Void}
     */
    removeBindings: function removeBindings() {
      for (var i = 0; i < this._c.length; i++) {
        this.unbind(this._c[i].children);
      }
    },

    /**
     * Binds events to arrows HTML elements.
     *
     * @param {HTMLCollection} elements
     * @return {Void}
     */
    bind: function bind(elements) {
      for (var i = 0; i < elements.length; i++) {
        Binder.on('click', elements[i], this.click);
        Binder.on('touchstart', elements[i], this.click, capture);
      }
    },

    /**
     * Unbinds events binded to the arrows HTML elements.
     *
     * @param {HTMLCollection} elements
     * @return {Void}
     */
    unbind: function unbind(elements) {
      for (var i = 0; i < elements.length; i++) {
        Binder.off(['click', 'touchstart'], elements[i]);
      }
    },

    /**
     * Handles `click` event on the arrows HTML elements.
     * Moves slider in direction given via the
     * `data-glide-dir` attribute.
     *
     * @param {Object} event
     * @return {void}
     */
    click: function click(event) {
      if (!supportsPassive$1 && event.type === 'touchstart') {
        event.preventDefault();
      }

      var direction = event.currentTarget.getAttribute('data-glide-dir');
      Components.Run.make(Components.Direction.resolve(direction));
    }
  };
  define(Controls, 'items', {
    /**
     * Gets collection of the controls HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get: function get() {
      return Controls._c;
    }
  });
  /**
   * Swap active class of current navigation item:
   * - after mounting to set it to initial index
   * - after each move to the new index
   */

  Events.on(['mount.after', 'move.after'], function () {
    Controls.setActive();
  });
  /**
   * Add or remove disabled class of arrow elements
   */

  Events.on(['mount.after', 'run'], function () {
    Controls.setArrowState();
  });
  /**
   * Remove bindings and HTML Classes:
   * - on destroying, to bring markup to its initial state
   */

  Events.on('destroy', function () {
    Controls.removeBindings();
    Controls.removeActive();
    Binder.destroy();
  });
  return Controls;
}

function Keyboard (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var Keyboard = {
    /**
     * Binds keyboard events on component mount.
     *
     * @return {Void}
     */
    mount: function mount() {
      if (Glide.settings.keyboard) {
        this.bind();
      }
    },

    /**
     * Adds keyboard press events.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('keyup', document, this.press);
    },

    /**
     * Removes keyboard press events.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('keyup', document);
    },

    /**
     * Handles keyboard's arrows press and moving glide foward and backward.
     *
     * @param  {Object} event
     * @return {Void}
     */
    press: function press(event) {
      var perSwipe = Glide.settings.perSwipe;

      if (event.code === 'ArrowRight') {
        Components.Run.make(Components.Direction.resolve("".concat(perSwipe, ">")));
      }

      if (event.code === 'ArrowLeft') {
        Components.Run.make(Components.Direction.resolve("".concat(perSwipe, "<")));
      }
    }
  };
  /**
   * Remove bindings from keyboard:
   * - on destroying to remove added events
   * - on updating to remove events before remounting
   */

  Events.on(['destroy', 'update'], function () {
    Keyboard.unbind();
  });
  /**
   * Remount component
   * - on updating to reflect potential changes in settings
   */

  Events.on('update', function () {
    Keyboard.mount();
  });
  /**
   * Destroy binder:
   * - on destroying to remove listeners
   */

  Events.on('destroy', function () {
    Binder.destroy();
  });
  return Keyboard;
}

function Autoplay (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var Autoplay = {
    /**
     * Initializes autoplaying and events.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.enable();
      this.start();

      if (Glide.settings.hoverpause) {
        this.bind();
      }
    },

    /**
     * Enables autoplaying
     *
     * @returns {Void}
     */
    enable: function enable() {
      this._e = true;
    },

    /**
     * Disables autoplaying.
     *
     * @returns {Void}
     */
    disable: function disable() {
      this._e = false;
    },

    /**
     * Starts autoplaying in configured interval.
     *
     * @param {Boolean|Number} force Run autoplaying with passed interval regardless of `autoplay` settings
     * @return {Void}
     */
    start: function start() {
      var _this = this;

      if (!this._e) {
        return;
      }

      this.enable();

      if (Glide.settings.autoplay) {
        if (isUndefined(this._i)) {
          this._i = setInterval(function () {
            _this.stop();

            Components.Run.make('>');

            _this.start();

            Events.emit('autoplay');
          }, this.time);
        }
      }
    },

    /**
     * Stops autorunning of the glide.
     *
     * @return {Void}
     */
    stop: function stop() {
      this._i = clearInterval(this._i);
    },

    /**
     * Stops autoplaying while mouse is over glide's area.
     *
     * @return {Void}
     */
    bind: function bind() {
      var _this2 = this;

      Binder.on('mouseover', Components.Html.root, function () {
        if (_this2._e) {
          _this2.stop();
        }
      });
      Binder.on('mouseout', Components.Html.root, function () {
        if (_this2._e) {
          _this2.start();
        }
      });
    },

    /**
     * Unbind mouseover events.
     *
     * @returns {Void}
     */
    unbind: function unbind() {
      Binder.off(['mouseover', 'mouseout'], Components.Html.root);
    }
  };
  define(Autoplay, 'time', {
    /**
     * Gets time period value for the autoplay interval. Prioritizes
     * times in `data-glide-autoplay` attrubutes over options.
     *
     * @return {Number}
     */
    get: function get() {
      var autoplay = Components.Html.slides[Glide.index].getAttribute('data-glide-autoplay');

      if (autoplay) {
        return toInt(autoplay);
      }

      return toInt(Glide.settings.autoplay);
    }
  });
  /**
   * Stop autoplaying and unbind events:
   * - on destroying, to clear defined interval
   * - on updating via API to reset interval that may changed
   */

  Events.on(['destroy', 'update'], function () {
    Autoplay.unbind();
  });
  /**
   * Stop autoplaying:
   * - before each run, to restart autoplaying
   * - on pausing via API
   * - on destroying, to clear defined interval
   * - while starting a swipe
   * - on updating via API to reset interval that may changed
   */

  Events.on(['run.before', 'swipe.start', 'update'], function () {
    Autoplay.stop();
  });
  Events.on(['pause', 'destroy'], function () {
    Autoplay.disable();
    Autoplay.stop();
  });
  /**
   * Start autoplaying:
   * - after each run, to restart autoplaying
   * - on playing via API
   * - while ending a swipe
   */

  Events.on(['run.after', 'swipe.end'], function () {
    Autoplay.start();
  });
  /**
   * Start autoplaying:
   * - after each run, to restart autoplaying
   * - on playing via API
   * - while ending a swipe
   */

  Events.on(['play'], function () {
    Autoplay.enable();
    Autoplay.start();
  });
  /**
   * Remount autoplaying:
   * - on updating via API to reset interval that may changed
   */

  Events.on('update', function () {
    Autoplay.mount();
  });
  /**
   * Destroy a binder:
   * - on destroying glide instance to clearup listeners
   */

  Events.on('destroy', function () {
    Binder.destroy();
  });
  return Autoplay;
}

/**
 * Sorts keys of breakpoint object so they will be ordered from lower to bigger.
 *
 * @param {Object} points
 * @returns {Object}
 */

function sortBreakpoints(points) {
  if (isObject(points)) {
    return sortKeys(points);
  } else {
    warn("Breakpoints option must be an object");
  }

  return {};
}

function Breakpoints (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  /**
   * Holds reference to settings.
   *
   * @type {Object}
   */

  var settings = Glide.settings;
  /**
   * Holds reference to breakpoints object in settings. Sorts breakpoints
   * from smaller to larger. It is required in order to proper
   * matching currently active breakpoint settings.
   *
   * @type {Object}
   */

  var points = sortBreakpoints(settings.breakpoints);
  /**
   * Cache initial settings before overwritting.
   *
   * @type {Object}
   */

  var defaults = Object.assign({}, settings);
  var Breakpoints = {
    /**
     * Matches settings for currectly matching media breakpoint.
     *
     * @param {Object} points
     * @returns {Object}
     */
    match: function match(points) {
      if (typeof window.matchMedia !== 'undefined') {
        for (var point in points) {
          if (points.hasOwnProperty(point)) {
            if (window.matchMedia("(max-width: ".concat(point, "px)")).matches) {
              return points[point];
            }
          }
        }
      }

      return defaults;
    }
  };
  /**
   * Overwrite instance settings with currently matching breakpoint settings.
   * This happens right after component initialization.
   */

  Object.assign(settings, Breakpoints.match(points));
  /**
   * Update glide with settings of matched brekpoint:
   * - window resize to update slider
   */

  Binder.on('resize', window, throttle(function () {
    Glide.settings = mergeOptions(settings, Breakpoints.match(points));
  }, Glide.settings.throttle));
  /**
   * Resort and update default settings:
   * - on reinit via API, so breakpoint matching will be performed with options
   */

  Events.on('update', function () {
    points = sortBreakpoints(points);
    defaults = Object.assign({}, settings);
  });
  /**
   * Unbind resize listener:
   * - on destroying, to bring markup to its initial state
   */

  Events.on('destroy', function () {
    Binder.off('resize', window);
  });
  return Breakpoints;
}

var COMPONENTS = {
  // Required
  Html: Html,
  Translate: Translate,
  Transition: Transition,
  Direction: Direction,
  Peek: Peek,
  Sizes: Sizes,
  Gaps: Gaps,
  Move: Move,
  Clones: Clones,
  Resize: Resize,
  Build: Build,
  Run: Run,
  // Optional
  Swipe: Swipe,
  Images: Images,
  Anchors: Anchors,
  Controls: Controls,
  Keyboard: Keyboard,
  Autoplay: Autoplay,
  Breakpoints: Breakpoints,
  Lazy: Lazy
};

var Glide = /*#__PURE__*/function (_Core) {
  _inherits(Glide, _Core);

  var _super = _createSuper(Glide);

  function Glide() {
    _classCallCheck(this, Glide);

    return _super.apply(this, arguments);
  }

  _createClass(Glide, [{
    key: "mount",
    value: function mount() {
      var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _get(_getPrototypeOf(Glide.prototype), "mount", this).call(this, Object.assign({}, COMPONENTS, extensions));
    }
  }]);

  return Glide;
}(Glide$1);




/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_glidejs_glide_dist_css_glide_core_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var _node_modules_glidejs_glide_dist_css_glide_theme_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var _domUpdates_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _agency_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22);








})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map