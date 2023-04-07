// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"utils/_domFunction.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findEl = exports.removeAllActiveElClassInArr = exports.findActiveElInArr = exports.setActiveElInArr = exports.toggleClass = exports.addClassToArrAllEl = exports.removeArrAllElClass = exports.replaceClass = exports.removeClass = exports.addClass = exports.closest = exports.contains = void 0;

var contains = function contains(target, className) {
  return target.classList.contains(className);
};

exports.contains = contains;

var closest = function closest(target, className) {
  return target.closest(".".concat(className));
};

exports.closest = closest;

var addClass = function addClass(target, className) {
  target.classList.add(className);
};

exports.addClass = addClass;

var removeClass = function removeClass(target, className) {
  target.classList.remove(className);
};

exports.removeClass = removeClass;

var replaceClass = function replaceClass(target, class1, class2) {
  target.classList.replace(class1, class2);
};

exports.replaceClass = replaceClass;

var removeArrAllElClass = function removeArrAllElClass(arr, className) {
  arr.forEach(function (mov) {
    return mov.classList.remove(className);
  });
};

exports.removeArrAllElClass = removeArrAllElClass;

var addClassToArrAllEl = function addClassToArrAllEl(arr, className) {
  arr.forEach(function (mov) {
    return mov.classList.add(className);
  });
};

exports.addClassToArrAllEl = addClassToArrAllEl;

var toggleClass = function toggleClass(target, className) {
  target.classList.toggle(className);
};

exports.toggleClass = toggleClass;

var setActiveElInArr = function setActiveElInArr(elementArr, target, className) {
  elementArr.forEach(function (mov) {
    return mov.classList.remove(className);
  });
  target.classList.add(className);
};

exports.setActiveElInArr = setActiveElInArr;

var findActiveElInArr = function findActiveElInArr(arr, activeClass) {
  return arr.find(function (mov) {
    return contains(mov, activeClass);
  });
};

exports.findActiveElInArr = findActiveElInArr;

var removeAllActiveElClassInArr = function removeAllActiveElClassInArr(elementArr, activeClass) {
  elementArr.forEach(function (mov) {
    return mov.classList.remove(activeClass);
  });
};

exports.removeAllActiveElClassInArr = removeAllActiveElClassInArr;

var findEl = function findEl(className) {
  return document.querySelector(".".concat(className));
};

exports.findEl = findEl;
},{}],"View/Common/ListView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domFunction = require("../../utils/_domFunction.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ListView = /*#__PURE__*/function () {
  function ListView() {
    _classCallCheck(this, ListView);

    _defineProperty(this, "_parentEl", void 0);
  }

  _createClass(ListView, [{
    key: "_getAllItems",
    value: function _getAllItems() {
      return _toConsumableArray(this._parentEl.querySelectorAll(".list-item"));
    }
  }, {
    key: "_setItemActive",
    value: function _setItemActive(target) {
      var active = target.dataset.active;
      active = active === "true" ? "false" : "true";

      var itemEls = this._getAllItems();

      var _iterator = _createForOfIteratorHelper(itemEls),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var el = _step.value;
          el.dataset.active = false;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      target.dataset.active = active;
    }
  }, {
    key: "handleList",
    value: function handleList() {
      var _this = this;

      this._parentEl.addEventListener("click", function (e) {
        var target = (0, _domFunction.closest)(e.target, "list-item");
        if (!target) return;

        _this._setItemActive(target);
      });
    }
  }]);

  return ListView;
}();

var _default = ListView;
exports.default = _default;
},{"../../utils/_domFunction.js":"utils/_domFunction.js"}],"View/Layouts/NavBarView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domFunction = require("../../utils/_domFunction.js");

var _ListView2 = _interopRequireDefault(require("../Common/ListView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NavBarView = /*#__PURE__*/function (_ListView) {
  _inherits(NavBarView, _ListView);

  var _super = _createSuper(NavBarView);

  function NavBarView() {
    var _this;

    _classCallCheck(this, NavBarView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_parentEl", (0, _domFunction.findEl)("nav-list"));

    _this.handleList();

    return _this;
  }

  _createClass(NavBarView, [{
    key: "setCurrentSectionActive",
    value: function setCurrentSectionActive(section) {
      var navItemEls = _toConsumableArray(this._parentEl.querySelectorAll(".nav-item"));

      navItemEls.forEach(function (el) {
        return el.dataset.active = el.dataset.section !== section ? false : true;
      });
    }
  }, {
    key: "addHandlerShowSection",
    value: function addHandlerShowSection(handle) {
      this._parentEl.addEventListener("click", function (e) {
        var item = (0, _domFunction.closest)(e.target, "nav-item");
        if (!item) return;
        var section = item.dataset.section;
        handle(section);
      });
    }
  }]);

  return NavBarView;
}(_ListView2.default);

var _default = NavBarView;
exports.default = _default;
},{"../../utils/_domFunction.js":"utils/_domFunction.js","../Common/ListView.js":"View/Common/ListView.js"}],"Controller/Layouts/Navbar.js":[function(require,module,exports) {
"use strict";

var _NavBarView = _interopRequireDefault(require("../../View/Layouts/NavBarView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var navEl = document.querySelector(".nav");

var controlChangeSection = function controlChangeSection(section) {
  setTimeout(function () {
    location.assign("/".concat(section, ".html"));
  }, 300);
};

if (navEl) {
  var View = new _NavBarView.default();
  var curSection = location.pathname.split(".")[0].slice(1);
  View.setCurrentSectionActive(curSection);
  View.addHandlerShowSection(controlChangeSection);
}
},{"../../View/Layouts/NavBarView.js":"View/Layouts/NavBarView.js"}],"utils/_helper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTime = formatTime;
exports.formatCurTime = formatCurTime;
exports.changeStrTimeInSeconds = changeStrTimeInSeconds;
exports.advanceFormatTime = advanceFormatTime;
exports.calculateRemainingTimeStr = calculateRemainingTimeStr;
exports.calculateRemainingTimeStrInDays = calculateRemainingTimeStrInDays;
exports.calculateTimeFromSeconds = exports.calculateRemainingTimeProps = exports.getCurDay = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function formatSeconds(time) {
  if (time < 10) time = "0".concat(time);else time = time;
  return time;
}

function formatMinutes(time) {
  if (time < 10) time = "0".concat(time);
  time;
  return time;
}

function formatHour(time) {
  time = Math.floor(time / 3600);
  if (time < 10) time = "0".concat(time);
  return time;
}

function formatTime(time) {
  var day, hour, minutes, seconds;
  hour = formatHour(time);
  minutes = Math.floor(time % 3600 / 60);
  minutes = formatMinutes(minutes);
  seconds = Math.floor(time % 3600 % 60);
  seconds = formatSeconds(seconds);
  return "".concat(hour, ":").concat(minutes, ":").concat(seconds);
}

function advanceFormatTime(time) {
  time = formatTime(time);

  var _time$split = time.split(":"),
      _time$split2 = _slicedToArray(_time$split, 3),
      hour = _time$split2[0],
      minute = _time$split2[1],
      second = _time$split2[2];

  if (hour === "00") return " ".concat(minute, " minutes");
  if (hour === "01") return "1 hour, ".concat(minute, " minutes");
  return "".concat(hour, " hours, ").concat(minute, " minutes");
} // if (time > 60) {
//   minutes = Math.floor(time / 60);
//   seconds = time % 60;
//   if (seconds < 10) seconds = `0${seconds}`;
// }
// return `${minutes}:${seconds}`;


function formatCurTime(date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric"
  }).format(date).split(" ")[0];
}

function changeStrTimeInSeconds(time) {
  time = time.split(":");
  time = time.map(function (el) {
    return Number(el);
  });

  var _time = time,
      _time2 = _slicedToArray(_time, 3),
      hour = _time2[0],
      minute = _time2[1],
      second = _time2[2];

  var duration = hour * 60 * 60 + minute * 60 + second;
  return duration;
} ///////////////////////////////////////////


function formatNumUnitIntoStr(time) {
  var _time$split3 = time.split(":"),
      _time$split4 = _slicedToArray(_time$split3, 2),
      hour = _time$split4[0],
      minute = _time$split4[1];

  hour = Number(hour);
  minute = Number(minute);
  if (hour === 0) return " ".concat(minute, " minutes");
  if (hour === 1) return "1 hour, ".concat(minute, " minutes");
  return "".concat(hour, " hours, ").concat(minute, " minutes");
}

function calculateRemainingTimeStr(timeStr) {
  var _timeStr$split = timeStr.split(":"),
      _timeStr$split2 = _slicedToArray(_timeStr$split, 2),
      hour = _timeStr$split2[0],
      minute = _timeStr$split2[1];

  hour = Number(hour);
  minute = Number(minute);

  var _formatCurTime$split = formatCurTime(new Date()).split(":"),
      _formatCurTime$split2 = _slicedToArray(_formatCurTime$split, 2),
      curHour = _formatCurTime$split2[0],
      curMinute = _formatCurTime$split2[1];

  curHour = Number(curHour);
  curMinute = Number(curMinute);
  var remainingHour = hour - (curHour + 12);
  var remainingMin = minute - curMinute;
  remainingHour = remainingHour <= 0 ? 0 : remainingHour;
  remainingMin = remainingMin <= 0 ? 0 : remainingMin;
  var remainingTime = "".concat(remainingHour, ":").concat(remainingMin, ":00");
  return formatNumUnitIntoStr(remainingTime);
}

var getDayValue = function getDayValue(day) {
  var daysArr = [{
    day: "Su",
    value: 1
  }, {
    day: "M",
    value: 2
  }, {
    day: "Tu",
    value: 3
  }, {
    day: "We",
    value: 4
  }, {
    day: "Th",
    value: 5
  }, {
    day: "Fr",
    value: 6
  }, {
    day: "Sa",
    value: 7
  }];
  var dayObj = daysArr.find(function (el) {
    return el.day === day;
  });
  var value = dayObj.value;
  if (value === "M") value = "Mo";
  var curMonth = new Date().getMonth() + 1;
  var curDate = new Date().getDate();
  var curYear = new Date().getFullYear();
  var alarmDate = new Date("".concat(value, " ").concat(curMonth, "/").concat(curDate, "/").concat(curYear, " ").concat(alarm_hour, ":").concat(alarm_minute));
  return value;
};

var getCurDay = function getCurDay() {
  var str = new Intl.DateTimeFormat("en-US", {
    weekday: "long"
  }).format(new Date());
  var day = str.slice(0, 2);
  if (day === "Mon" || day === "Mo") day = "Mo";
  return day;
};

exports.getCurDay = getCurDay;

function calculateRemainingTimeStrInDays(day_left, hour_left, min_left) {
  // const day_left = Math.floor(remainingTimeInSec / (86400 * 1000));
  // const hour = Math.floor(
  //   (Number(remainingTimeInSec) - day_left * 86400 * 1000) / (3600 * 1000)
  // );
  // const minute = Math.ceil(
  //   (Number(remainingTimeInSec) -
  //     (day_left * 86400 * 1000 + hour * 3600 * 1000)) /
  //     (60 * 1000)
  // );
  var dayUnit = day_left <= 0 ? "" : day_left > 1 ? "days," : "day,";
  var hourUnit = hour_left <= 0 ? "" : hour_left === 1 ? "hour," : "hours,";
  var minuteUnit = min_left <= 0 ? "" : min_left === 1 ? "minute" : "minutes";
  return "".concat(day_left === 0 ? "" : day_left, " ").concat(dayUnit, " ").concat(hour_left === 0 ? "" : hour_left, " ").concat(hourUnit, " ").concat(min_left === 0 ? "" : min_left, " ").concat(minuteUnit);
}

var getCurHourAndMin = function getCurHourAndMin() {
  var curTime = formatCurTime(new Date());

  var _curTime$split = curTime.split(":"),
      _curTime$split2 = _slicedToArray(_curTime$split, 2),
      hour = _curTime$split2[0],
      min = _curTime$split2[1];

  return "".concat(Number(hour) + 12, ":").concat(min);
}; // DEPENDENT ------------------------------------------------


var calAlarmTimeProp = function calAlarmTimeProp(day_left, alarm_hour, alarm_minute) {
  var oneTime = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  // new Date("8/15/2022 9:41")
  var curMonth = new Date().getMonth() + 1;
  var curDate = new Date().getDate() + day_left;
  var curYear = new Date().getFullYear();
  var alarmDate = new Date("".concat(curMonth, "/").concat(curDate, "/").concat(curYear, " ").concat(alarm_hour, ":").concat(alarm_minute));
  var curDateSec = +new Date();
  var remainingTimeInSec = alarmDate - curDateSec; // hour = day - sec )/3600
  // minute= day - sec )%3600 remainder minute

  var hour_left = Math.abs(Math.floor((Number(remainingTimeInSec) - day_left * 86400 * 1000) / (3600 * 1000)));
  var min_left = Math.floor(Math.abs((day_left * 86400 * 1000 - Number(remainingTimeInSec)) / (3600 * 1000) % (60 * 1000)));
  return {
    hour_left: hour_left,
    min_left: min_left,
    remainingTimeInSec: remainingTimeInSec
  };
};

var calculateRemainingTimeForDailyAlarm = function calculateRemainingTimeForDailyAlarm(day_left, alarm_hour, alarm_minute) {
  return calAlarmTimeProp(day_left, alarm_hour, alarm_minute);
};

var calculateRemainingTimeForOneTimeAlarm = function calculateRemainingTimeForOneTimeAlarm(day_left, alarm_hour, alarm_minute) {
  var timeProp = calAlarmTimeProp(day_left, alarm_hour, alarm_minute, true);
  return timeProp;
};

var calculateRemainingTimeProps = function calculateRemainingTimeProps(timeStr, day) {
  var oneTimeAlarm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var dayValue = getDayValue(day);
  var curDay = getCurDay();
  var curDayValue = getDayValue(curDay);
  var day_left = Math.abs(dayValue - curDayValue);

  var _timeStr$split3 = timeStr.split(":"),
      _timeStr$split4 = _slicedToArray(_timeStr$split3, 2),
      alarm_hour = _timeStr$split4[0],
      alarm_minute = _timeStr$split4[1];

  var hour_left, min_left, remainingTimeInSec;

  if (!oneTimeAlarm) {
    var timeProp = calculateRemainingTimeForDailyAlarm(day_left, alarm_hour, alarm_minute);
    hour_left = timeProp.hour_left;
    min_left = timeProp.min_left;
    remainingTimeInSec = timeProp.remainingTimeInSec;
  }

  if (oneTimeAlarm) {
    day_left = day_left + 1;

    var _timeProp = calculateRemainingTimeForOneTimeAlarm(day_left, alarm_hour, alarm_minute);

    day_left = 0;
    hour_left = _timeProp.hour_left;
    min_left = _timeProp.min_left;
    remainingTimeInSec = _timeProp.remainingTimeInSec;
  }

  var remainingTimeStr = calculateRemainingTimeStrInDays(day_left, hour_left, min_left);
  return {
    remainingTimeInSec: remainingTimeInSec,
    remainingTimeStr: remainingTimeStr
  };
};

exports.calculateRemainingTimeProps = calculateRemainingTimeProps;

var calculateTimeFromSeconds = function calculateTimeFromSeconds(remainingTimeInSec) {
  var newDate = new Date(+new Date() + Number(remainingTimeInSec));
  var curTime = formatCurTime(newDate);

  var _curTime$split3 = curTime.split(":"),
      _curTime$split4 = _slicedToArray(_curTime$split3, 2),
      hour = _curTime$split4[0],
      min = _curTime$split4[1];

  return "".concat(Number(hour) + 12, ":").concat(min);
};

exports.calculateTimeFromSeconds = calculateTimeFromSeconds;
},{}],"View/Common/CardView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CardView = /*#__PURE__*/function () {
  function CardView() {
    _classCallCheck(this, CardView);
  }

  _createClass(CardView, [{
    key: "showEditModal",
    value: function showEditModal(card, ModalView) {
      var _card$dataset = card.dataset,
          name = _card$dataset.name,
          index = _card$dataset.index,
          remainingTimeStr = _card$dataset.remainingTimeStr;
      ModalView.show(name, index, remainingTimeStr, "edit");
    }
  }, {
    key: "showAddModal",
    value: function showAddModal(ModalView, cardType) {
      var name, index, remainingTimeStr;
      index = this.generateNewCardNumber();
      name = "".concat(cardType, " (").concat(index, ")");
      remainingTimeStr = "00:00:00";
      ModalView.show(name, index, remainingTimeStr, "add");
    }
  }]);

  return CardView;
}();

var _default = CardView;
exports.default = _default;
},{}],"View/Components/Card/TimerCardView.js":[function(require,module,exports) {
"use strict"; // import AddTimerView from "../Modal/Timer/AddTimerView.js";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helper = require("../../../utils/_helper.js");

var _CardView2 = _interopRequireDefault(require("../../Common/CardView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TimerCardView = /*#__PURE__*/function (_CardView) {
  _inherits(TimerCardView, _CardView);

  var _super = _createSuper(TimerCardView);

  //////////////////////////////////////
  // it compare the last left time with actual duration so we can know how much time is left for timer to complete
  // other class dependent on
  // function provided by controller
  function TimerCardView() {
    var _this;

    _classCallCheck(this, TimerCardView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_parentEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "_percentageCircleEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "_percentageCircleControllerEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "_timeValueEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "resetBtn", void 0);

    _defineProperty(_assertThisInitialized(_this), "startBtn", void 0);

    _defineProperty(_assertThisInitialized(_this), "_percentageCircleSettimeoutID", void 0);

    _defineProperty(_assertThisInitialized(_this), "_duration", 0);

    _defineProperty(_assertThisInitialized(_this), "_timePassed", 0);

    _defineProperty(_assertThisInitialized(_this), "_remainingTimeStr", void 0);

    _defineProperty(_assertThisInitialized(_this), "_circleCompletedPercent", 0);

    _defineProperty(_assertThisInitialized(_this), "_timerName", void 0);

    return _this;
  } //////////////////////////////////////////////////////////
  ///////////////////////////////////////////////
  //  Common
  // _getTimerCircleEl() {
  //   return this._parentEl.querySelector(".timerFinishPercent");
  // }


  _createClass(TimerCardView, [{
    key: "_updateTimerCirclePercentageControllerEl",
    value: function _updateTimerCirclePercentageControllerEl(percent) {
      // const el = this._getTimerCircleEl();
      // console.log(el);
      this._percentageCircleControllerEl.setAttribute("stroke-dasharray", "".concat(percent, ",100"));
    }
  }, {
    key: "_calculateTimerCirclePercent",
    value: function _calculateTimerCirclePercent() {
      return Math.floor(this._timePassed / this._duration * 100);
    }
  }, {
    key: "_setTimerEndTime",
    value: function _setTimerEndTime() {
      var endTime = this._duration * 1000 + Date.now();
      endTime = (0, _helper.formatCurTime)(endTime);
      this._timerEndTimeEl.textContent = endTime;
    }
  }, {
    key: "_updateTimerTimeValue",
    value: function _updateTimerTimeValue() {
      var timeLeft = this._duration - this._timePassed;
      var timeLeftStr = (0, _helper.formatTime)(timeLeft);
      this._remainingTimeStr = timeLeftStr;
      this._timeValueEl.textContent = timeLeftStr;
    }
  }, {
    key: "_updateTimeAndPercentageCircle",
    value: function _updateTimeAndPercentageCircle() {
      var _this2 = this;

      // 1Percentage.percent completed
      // 2.check if timer has finished
      // this._timePassed = this._getTimerTimePassed();
      this._percentageCircleSettimeoutID = setInterval(function () {
        _this2._timePassed = _this2._timePassed + 1;
        _this2._circleCompletedPercent = _this2._calculateTimerCirclePercent();

        _this2._updateTimerCirclePercentageControllerEl(_this2._circleCompletedPercent);

        _this2._updateTimerTimeValue();

        if (_this2._timePassed === _this2._duration) {
          return _this2.resetTimer(null, true);
        }
      }, 1000);
    }
  }, {
    key: "_stopUpdatingTimerPercentageCircle",
    value: function _stopUpdatingTimerPercentageCircle() {
      clearTimeout(this._percentageCircleSettimeoutID);
    }
  }, {
    key: "resetTimerPercentageCircle",
    value: function resetTimerPercentageCircle() {
      this._timePassed = 0;
      this._circleCompletedPercent = 0;

      this._stopUpdatingTimerPercentageCircle();

      this._updateTimerCirclePercentageControllerEl(0);
    }
  }, {
    key: "_resetTimeTimeValue",
    value: function _resetTimeTimeValue() {
      this._timeValueEl.textContent = (0, _helper.formatTime)(0);
    } ///////////////////////////////////////////////////////
    // Handle 1 // show addTimer modal
    // handle 2

  }, {
    key: "_expandTimer",
    value: function _expandTimer(target, TimerView) {
      if (!target.closest('button[data-action="expand"]')) return;
      TimerView.showOverlay();
      this._parentEl.dataset.expand = true;
    } // handle 3

  }, {
    key: "_backToNormalTimer",
    value: function _backToNormalTimer(target, TimerView) {
      if (!target.closest('button[data-action="normal"]')) return;
      TimerView.hideOverlay();
      this._parentEl.dataset.expand = false;
      this._parentEl.dataset.mini = false;
    } // Handle 4

  }, {
    key: "_minimizeTimer",
    value: function _minimizeTimer(target, TimerView) {
      if (!target.closest('button[data-action="mini"]')) return;
      TimerView.showOverlay();
      this._parentEl.dataset.expand = false;
      this._parentEl.dataset.mini = true;
    } // Handle 5

  }, {
    key: "_startTimer",
    value: function _startTimer(target) {
      var btn = target.closest('button[data-action="start"]');
      if (!btn) return;
      this._parentEl.dataset.start = true;
      this._parentEl.dataset.pause = false;
      this.resetBtn.disabled = false; // these values are taken from clicked card

      var _this$_parentEl$datas = this._parentEl.dataset,
          duration = _this$_parentEl$datas.duration,
          timePassed = _this$_parentEl$datas.timePassed,
          remainingTimeStr = _this$_parentEl$datas.remainingTimeStr,
          name = _this$_parentEl$datas.name;
      this._timerName = name;
      this._duration = Number(duration);
      this._timePassed = Number(timePassed);
      this._remainingTimeStr = remainingTimeStr;

      this._updateTimeAndPercentageCircle();

      this._setTimerEndTime();
    } // Handle 6

  }, {
    key: "_pauseTimer",
    value: function _pauseTimer(target, handle) {
      var btn = target.closest('button[data-action="pause"]');
      if (!btn) return;
      this._parentEl.dataset.pause = true;
      this._parentEl.dataset.start = false;

      this._stopUpdatingTimerPercentageCircle();

      handle("pause-timer", this._timerName, {
        timePassed: this._timePassed,
        circlePercentCompleted: this._circleCompletedPercent,
        remainingTimeStr: this._remainingTimeStr
      });
    } // Handle 7

  }, {
    key: "_resetTimer",
    value: function _resetTimer(target) {
      var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var handle = arguments.length > 2 ? arguments[2] : undefined;
      var btn = target === null || target === void 0 ? void 0 : target.closest('button[data-action="reset"]');
      if (!btn && !reset) return;
      this._parentEl.dataset.pause = false;
      this._parentEl.dataset.start = false;
      this.resetBtn.disabled = true;

      this._resetTimeTimeValue();

      this.resetTimerPercentageCircle();
      handle("reset-timer", this._timerName, {
        timePassed: 0,
        circlePercentCompleted: 0,
        remainingTimeStr: "00:00:00"
      });
    } // Handle 8

  }, {
    key: "_deleteTimer",
    value: function _deleteTimer(target, handle) {
      var deleteBtn = target.closest("button[data-action='delete']");
      if (!deleteBtn) return;
      handle("delete-timer", this._parentEl.dataset.name);
    } // handle 8

  }, {
    key: "_editTimer",
    value: function _editTimer(target, TimerModalView) {
      if (target.closest("button") || document.querySelector(".card-list").getAttribute("data-enable-remove")) return;
      this.showEditModal(this._parentEl, TimerModalView);
    } // _addTimer(handle) {
    //   this.showAddModal("add", TimerModalView, handle, "Timer");
    // }
    // _handle 0

  }, {
    key: "_setDOMElForAccessibilityUse",
    value: function _setDOMElForAccessibilityUse() {
      this._percentageCircleControllerEl = this._parentEl.querySelector(".timerFinishPercent");
      this._timePercentCircleEl = this._parentEl.querySelector(".timerCard__time-percent");
      this._timeValueEl = this._parentEl.querySelector(".timerCard__time-value");
      this.resetBtn = this._parentEl.querySelector('button[data-action="reset"]');
      this.startBtn = this._parentEl.querySelector('button[data-action="start"]');
      this._timerEndTimeEl = this._parentEl.querySelector(".timerCard__timer-EndTime-value");
    }
  }, {
    key: "_updateDOMEls",
    value: function _updateDOMEls() {} // handle 9

  }, {
    key: "handleCard",
    value: function handleCard(handle, TimerModalView, TimerView, e) {
      var target = e.target;
      this._parentEl = target.closest(".timerCard");
      if (!this._parentEl) return; // set dom el for use in the handleBtns case

      this._setDOMElForAccessibilityUse();

      this._updateDOMEls(); // expandTimer timer


      this._expandTimer(target, TimerView); // cancel expand and take us to original timer


      this._backToNormalTimer(target, TimerView); // shrink timer


      this._minimizeTimer(target, TimerView); // play btn


      this._startTimer(target); // pause btn


      this._pauseTimer(target, handle); // reset Btn


      this._resetTimer(target, false, handle); // deleteCard is same as deleting timer


      this._deleteTimer(target, handle); // show edit Timer modal to edit timer


      this._editTimer(target, TimerModalView);
    } /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  }]);

  return TimerCardView;
}(_CardView2.default);

var _default = new TimerCardView();

exports.default = _default;
},{"../../../utils/_helper.js":"utils/_helper.js","../../Common/CardView.js":"View/Common/CardView.js"}],"View/ParentView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ParentView = /*#__PURE__*/function () {
  function ParentView() {
    _classCallCheck(this, ParentView);

    _defineProperty(this, "_parentEl", void 0);
  }

  _createClass(ParentView, [{
    key: "render",
    value: function render(arr) {
      var _render = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var clearHTML = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      clearHTML ? this._clear() : "";

      var html = this._generateMarkUpList(arr);

      if (!_render) return html;

      this._parentEl.insertAdjacentHTML("afterBegin", html);

      this.setSomeCSSChangesAfterRenderCompleted();
    }
  }, {
    key: "setSomeCSSChangesAfterRenderCompleted",
    value: function setSomeCSSChangesAfterRenderCompleted() {}
  }, {
    key: "_generateMarkUpList",
    value: function _generateMarkUpList(arr) {
      var _this = this;

      return arr.map(function (mov) {
        return _this._generateMarkUpItem(mov);
      }).join("");
    }
  }, {
    key: "_generateMarkUpItem",
    value: function _generateMarkUpItem(mov) {
      return "mov";
    }
  }, {
    key: "_clear",
    value: function _clear(parentEl) {
      if (parentEl) parentEl.innerHTML = "";else this._parentEl.innerHTML = "";
    }
  }]);

  return ParentView;
}();

var _default = ParentView;
exports.default = _default;
},{}],"View/Common/CardListView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ParentView2 = _interopRequireDefault(require("../ParentView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CardListView = /*#__PURE__*/function (_ParentView) {
  _inherits(CardListView, _ParentView);

  var _super = _createSuper(CardListView);

  function CardListView() {
    _classCallCheck(this, CardListView);

    return _super.apply(this, arguments);
  }

  _createClass(CardListView, [{
    key: "addNewCard",
    value: function addNewCard(card) {
      var html = this.render([card], false, false);

      this._parentEl.insertAdjacentHTML("beforeend", html);
    }
  }, {
    key: "allowToRemoveCardFromList",
    value: function allowToRemoveCardFromList() {
      this._parentEl.dataset.enableRemove = "true";
    }
  }, {
    key: "notAllowToRemoveCardFromList",
    value: function notAllowToRemoveCardFromList() {
      this._parentEl.dataset.enableRemove = "false";
    }
  }, {
    key: "getAllCardsIndex",
    value: function getAllCardsIndex() {
      return _toConsumableArray(document.querySelectorAll(".card")).map(function (card) {
        return card.dataset.index;
      });
    } // generate new index for new card willl be done by cardlist weare going to loop throug all cards

  }, {
    key: "generateNewCardNumber",
    value: function generateNewCardNumber() {
      var num;
      var allCardsEl = this.getAllCardsIndex();

      for (var i = 1; i < 100; i++) {
        if (!allCardsEl.includes("".concat(i))) {
          num = i;
          break;
        }
      }

      return num;
    }
  }, {
    key: "deleteCard",
    value: function deleteCard(card_index) {
      this.getAllCards().forEach(function (card) {
        if (Number(card.dataset.index) === Number(card_index)) card.remove();
      });
    }
  }]);

  return CardListView;
}(_ParentView2.default);

var _default = CardListView;
exports.default = _default;
},{"../ParentView.js":"View/ParentView.js"}],"View/Components/CardList/TimerCardListView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TimerCardView = _interopRequireDefault(require("../Card/TimerCardView.js"));

var _domFunction = require("../../../utils/_domFunction.js");

var _CardListView2 = _interopRequireDefault(require("../../Common/CardListView.js"));

var _helper = require("../../../utils/_helper.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TimerListView = /*#__PURE__*/function (_CardListView) {
  _inherits(TimerListView, _CardListView);

  var _super = _createSuper(TimerListView);

  function TimerListView() {
    var _this;

    _classCallCheck(this, TimerListView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_parentEl", (0, _domFunction.findEl)("timer__list"));

    return _this;
  }

  _createClass(TimerListView, [{
    key: "_generateMarkUpItem",
    value: // constructor() {
    //   super();
    //   this.addHandlerCardList();
    //   // this.render(timerState.timers);
    // }
    function _generateMarkUpItem(timer) {
      return "<div\n              class=\"card timerCard\"\n              data-name=\"".concat(timer.name, "\"\n              data-index=").concat(timer.index, "\n              data-duration=\"").concat(timer.duration, "\"\n              data-remaining-time-str=").concat(timer.remainingTimeStr, "\n              data-time-passed=").concat(timer.timePassed, "\n              data-percent-completed=").concat(timer.circlePercentCompleted, "\n              data-start=\"false\"\n              data-pause=\"false\"\n              data-expand=\"false\"\n              data-mini=\"false\"\n            >\n            <header class=\"timerCard__header card-header mg-lw\">\n              <h8 class=\"h-8 timerCard__name\"\n                >").concat(timer.name, "\n              </h8>\n              <div class=\"timerCard__header-btns\">\n                <button\n                  class=\"timerCard__header-btn card-header__btn btn-icon--square\"\n                  data-action=\"expand\"\n                >\n                  <i class=\"fa fa-expand\"></i>\n                </button>\n\n                <button\n                  class=\"timerCard__header-btn card-header__btn btn-icon--square\"\n                  data-action=\"mini\"\n                >\n                  <i class=\"icon fa fa-compress\"></i>\n                  <!-- <i class=\"fas fa-external-link-alt\"></i> -->\n                </button>\n                <button\n                  class=\"timerCard__header-btn card-header__btn btn-icon--square hidden\"\n                  data-action=\"delete\"\n                >\n                  <!-- <i class=\"icon fa fa-compress\"></i> -->\n                  <i class=\"fas fa-trash-alt\"></i>\n                </button>\n\n                <button\n                  class=\"timerCard__header-btn card-header__btn btn-icon--square hidden\"\n                  data-action=\"normal\"\n                >\n                  <i class=\"fas fa-arrows-alt\"></i>\n                </button>\n              </div>\n            </header>\n            <div class=\"timerCard__time-box mg-sm\">\n              <div class=\"timerCard__time-figure\"></div>\n\n              <div class=\"flex-wrapper timerCard__time-percent ").concat(timer.circlePercentCompleted > 0 ? "show" : "", "\">\n                <div class=\"single-chart\">\n                  <svg viewBox=\"0 0 36 36\" class=\"circular-chart orange\">\n                    <path\n                      class=\"circle-bg\"\n                      d=\"M18 2.0845\n                        a 15.9155 15.9155 0 0 1 0 31.831\n                        a 15.9155 15.9155 0 0 1 0 -31.831\"\n                    />\n                    <path\n                      class=\"circle timerFinishPercent\"\n                      stroke-dasharray=\"").concat(timer.circlePercentCompleted, ", 100\"\n                      d=\"M18 2.0845\n                        a 15.9155 15.9155 0 0 1 0 31.831\n                        a 15.9155 15.9155 0 0 1 0 -31.831\"\n                    />\n                    <!-- <text x=\"18\" y=\"20.35\" class=\"percentage\">30%</text> -->\n                  </svg>\n                </div>\n              </div>\n              <p class=\"timerCard__time-value timerCard__timer-leftTime\">\n             ").concat(timer.remainingTimeStr, "\n              </p>\n              <button\n                class=\"timerCard__end-value timerCard__timer-End Time btn--grey btn--sm hidden\"\n              >\n                <i class=\"fas fa-bell\"></i>\n                <span class=\"timerCard__timer-EndTime-value\">").concat((0, _helper.formatCurTime)(Date.now() + timer.duration), "</span>\n              </button>\n            </div>\n            <div class=\"timerCard__footer\">\n              <button class=\"btn-icon--primary\" data-action=\"start\">\n                <i class=\"fas icon fa-play\" data-action=\"start\"></i>\n              </button>\n\n              <button\n                class=\"btn-icon--primary hidden\"\n                data-action=\"pause\"\n              >\n                <i class=\"fas icon fa-pause\" data-action=\"pause\"></i>\n              </button>\n\n              <button class=\"btn-icon\" data-action=\"reset\" disabled>\n                <i class=\"fas icon fa-circle-notch\"></i>\n              </button>\n            </div>\n          </div>");
    } //////////////////////////////////////////////////////////

  }, {
    key: "addHandlerCardList",
    value: function addHandlerCardList(handle, TimerModalView, TimerView) {
      this._parentEl.addEventListener("click", _TimerCardView.default.handleCard.bind(_TimerCardView.default, handle, TimerModalView, TimerView));
    } ///////////////////////////////////////////////

  }]);

  return TimerListView;
}(_CardListView2.default);

var _default = TimerListView;
exports.default = _default;
},{"../Card/TimerCardView.js":"View/Components/Card/TimerCardView.js","../../../utils/_domFunction.js":"utils/_domFunction.js","../../Common/CardListView.js":"View/Common/CardListView.js","../../../utils/_helper.js":"utils/_helper.js"}],"View/Pages/TimerView.js":[function(require,module,exports) {
"use strict"; // what i can do is all all srcipt its papge 
// time_page
// alarm_page
// world_clock_page

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domFunction = require("../../utils/_domFunction.js");

var _ParentView2 = _interopRequireDefault(require("../ParentView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TimerView = /*#__PURE__*/function (_ParentView) {
  _inherits(TimerView, _ParentView);

  var _super = _createSuper(TimerView);

  function TimerView() {
    var _this;

    _classCallCheck(this, TimerView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_sectionEl", (0, _domFunction.findEl)("section-timer"));

    _defineProperty(_assertThisInitialized(_this), "_sectionOverlayEl", _this._sectionEl.querySelector(".overlay"));

    _defineProperty(_assertThisInitialized(_this), "_timerContainerParentEl", _this._sectionEl.querySelector(".timer"));

    _defineProperty(_assertThisInitialized(_this), "_timerContainerEl", (0, _domFunction.findEl)("timer__container"));

    _defineProperty(_assertThisInitialized(_this), "_parentEl", (0, _domFunction.findEl)("timer__list"));

    return _this;
  }

  _createClass(TimerView, [{
    key: "showOverlay",
    value: //////////////////////////////////////////////////////////
    function showOverlay() {
      (0, _domFunction.removeClass)(this._sectionOverlayEl, "hidden");
    }
  }, {
    key: "hideOverlay",
    value: function hideOverlay() {
      (0, _domFunction.addClass)(this._sectionOverlayEl, "hidden");
    } ///////////////////////////////////////////////

  }]);

  return TimerView;
}(_ParentView2.default);

var _default = TimerView;
exports.default = _default;
},{"../../utils/_domFunction.js":"utils/_domFunction.js","../ParentView.js":"View/ParentView.js"}],"Controller/Pages/Timer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimerView = void 0;

var _TimerView = _interopRequireDefault(require("../../View/Pages/TimerView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sectionTimer = document.querySelector(".section-timer");
var View;

var getTimerView = function getTimerView() {
  return View;
};

exports.getTimerView = getTimerView;

if (sectionTimer) {
  View = new _TimerView.default();
}
},{"../../View/Pages/TimerView.js":"View/Pages/TimerView.js"}],"View/Common/ModalView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domFunction = require("../../utils/_domFunction.js");

var _helper = require("../../utils/_helper.js");

var _ParentView2 = _interopRequireDefault(require("../ParentView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ModalView = /*#__PURE__*/function (_ParentView) {
  _inherits(ModalView, _ParentView);

  var _super = _createSuper(ModalView);

  function ModalView() {
    var _this;

    _classCallCheck(this, ModalView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_topParentEl", document.querySelector(".modal"));

    _defineProperty(_assertThisInitialized(_this), "_parentElContainerEl", document.querySelector(".modal-container"));

    _defineProperty(_assertThisInitialized(_this), "_parentEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "handle", void 0);

    _defineProperty(_assertThisInitialized(_this), "cardType", void 0);

    _defineProperty(_assertThisInitialized(_this), "cardIndex", void 0);

    _defineProperty(_assertThisInitialized(_this), "cardAction", void 0);

    return _this;
  }

  _createClass(ModalView, [{
    key: "render",
    value: function render(name, index, remainingTime, duration, type, action) {
      this._clear(this._parentElContainerEl);

      var html = this._generateMarkUp(name, index, remainingTime, duration, type, action);

      this._parentElContainerEl.insertAdjacentHTML("afterbegin", html);
    } // common ***************************************

  }, {
    key: "show",
    value: function show() {// defined in own modal component
    }
  }, {
    key: "hide",
    value: function hide() {
      (0, _domFunction.replaceClass)(this._topParentEl, "display", "hidden");
    }
  }, {
    key: "_getAllTimeUnitValueEl",
    value: function _getAllTimeUnitValueEl() {
      return _toConsumableArray(this._parentEl.querySelectorAll(".modal-time__value"));
    }
  }, {
    key: "_getInputNameEl",
    value: function _getInputNameEl() {
      return this._parentEl.querySelector(".modal-name__input");
    }
  }, {
    key: "_getCardName",
    value: function _getCardName() {
      return this._parentEl.querySelector(".modal-name__input").value; // send new name in handler
      // this.handle(nameInput.value)
    }
  }, {
    key: "_getCardIndex",
    value: function _getCardIndex() {
      return this._parentEl.dataset.index;
    } // showAddModal(CardListView, cardType) {
    //   let name, index, remainingTimeStr;
    //   index = CardListView.generateNewCardNumber();
    //   name = `${cardType} (${index})`;
    //   remainingTimeStr = "00:00:00";
    //   this.show(name, index, remainingTimeStr, "add");
    // }
    // handler not a render function

  }, {
    key: "_hideModal",
    value: function _hideModal(target) {
      if (target.classList.contains("overlay-transparent")) {
        this.hide();
      }
    } // handler 1

  }, {
    key: "_handleDeleteBtn",
    value: function _handleDeleteBtn(target, handle) {
      if (!target.closest('button[data-action="delete"]')) return;
      handle("delete", this.cardIndex); // this.CardListView.deleteCard(this.index);

      this.hide(); // this.handle(this.cardType,  this.cardIndex);
    } // handler 2 *************************************

  }, {
    key: "_setTime",
    value: function _setTime(action, timeEl, max_time_value) {
      var time = Number(timeEl.dataset.value);
      time = action === "decrease" ? time - 1 : time + 1;
      time = time > max_time_value ? "0" : time;
      time = time < 0 ? max_time_value : time;
      time = time < 10 ? "0".concat(time) : time;
      timeEl.dataset.value = time;
      timeEl.textContent = time;
    }
  }, {
    key: "_updateHour",
    value: function _updateHour(action, timeEl) {
      this._setTime(action, timeEl, 24);
    }
  }, {
    key: "_updateMinute",
    value: function _updateMinute(action, timeEl) {
      this._setTime(action, timeEl, 60);
    }
  }, {
    key: "_updateSecond",
    value: function _updateSecond(action, timeEl) {
      this._setTime(action, timeEl, 60);
    }
  }, {
    key: "_updateCardTimeCommonCSS",
    value: function _updateCardTimeCommonCSS(target) {
      var modalTimeContainer = target.closest(".modal-box");
      if (!modalTimeContainer) return;
      var timeUpdateBtn = target.closest(".modal-box__btn");
      var timeValueEl = modalTimeContainer.querySelector(".modal-time__value");
      if (!timeUpdateBtn) return;
      var timeUnit = modalTimeContainer.dataset.timeUnit;
      var action = timeUpdateBtn.dataset.action;
      if (timeUnit === "hour") this._updateHour(action, timeValueEl);
      if (timeUnit === "minute") this._updateMinute(action, timeValueEl);
      if (timeUnit === "second") this._updateSecond(action, timeValueEl);
    } // ***********************************************
    // handler 3

  }, {
    key: "getUpdatedCardTime",
    value: function getUpdatedCardTime() {
      var timeEls = this._getAllTimeUnitValueEl();

      var time = timeEls.map(function (mov) {
        return [mov.dataset.unit, mov.dataset.value];
      });
      time = Object.fromEntries(time);
      var _time = time,
          hour = _time.hour,
          minute = _time.minute,
          second = _time.second;
      var remainingTimeStr = "".concat(hour, ":").concat(minute, ":").concat(second || "00");
      var duration = (0, _helper.changeStrTimeInSeconds)(remainingTimeStr);
      return {
        remainingTimeStr: remainingTimeStr,
        duration: duration
      };
    }
  }, {
    key: "getUpdateCardName",
    value: function getUpdateCardName() {
      var newName = this._getCardName();

      return newName;
    }
  }, {
    key: "saveCardUpdatedValues",
    value: function saveCardUpdatedValues() {// modified in ModalView component
    }
  }, {
    key: "_handleSaveBtn",
    value: function _handleSaveBtn(target, handle) {
      var btn = target.closest('button[data-action="save"]');
      if (!btn) return;
      var updatedName = this.getUpdateCardName().trim();
      if (updatedName === "") return;
      this.saveCardUpdatedValues(this.cardAction, this.cardIndex, handle); //  handle({name,time})
      //
      //
    } // ***********************************************
    // handler 4

  }, {
    key: "_handleCancelBtn",
    value: function _handleCancelBtn(target) {
      var btn = target.closest('button[data-action="cancel"]');
      if (!btn) return;
      this.hide();
    } // ***********************************************
    //handle 5 => done in own Modal Component

  }, {
    key: "handleAdditionBtns",
    value: function handleAdditionBtns() {} // handle 6 in own COMPONET MODAL

  }, {
    key: "updateAdditionalCSS",
    value: function updateAdditionalCSS() {} // whenever addEventListener is not working it just mean the element which you add Event listener is removed from dom
    // handleModal(handle, CardListView) {

  }, {
    key: "handleModal",
    value: function handleModal(handle) {
      var _this2 = this;

      this._topParentEl.addEventListener("click", function (e) {
        _this2._parentEl = _this2._topParentEl.querySelector(".modal-content");
        var target = e.target;
        _this2.handle = handle; // // this.CardListView = CardListView;

        _this2.cardType = _this2._parentEl.dataset.type;
        _this2.cardIndex = _this2._parentEl.dataset.index;
        _this2.cardAction = _this2._parentEl.dataset.action; // CSS ******************************************
        // auto adjust time by clicking up and down arrow
        // increase arrow
        // decrease arrow

        _this2._updateCardTimeCommonCSS(target);

        _this2._hideModal(target); // update css in own defined modal component


        _this2.updateAdditionalCSS(target); // JS ******************************************
        // delete alarm or timer


        _this2._handleDeleteBtn(target, handle); // save btn


        _this2._handleSaveBtn(target, handle); // cancel btn


        _this2._handleCancelBtn(target, handle); // done in own Modal Component


        _this2.handleAdditionBtns(target, handle);
      });
    }
  }]);

  return ModalView;
}(_ParentView2.default);

var _default = ModalView;
exports.default = _default;
},{"../../utils/_domFunction.js":"utils/_domFunction.js","../../utils/_helper.js":"utils/_helper.js","../ParentView.js":"View/ParentView.js"}],"View/Components/Modal/TimerModalView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ModalView2 = _interopRequireDefault(require("../../Common/ModalView.js"));

var _domFunction = require("../../../utils/_domFunction.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TimerModalView = /*#__PURE__*/function (_ModalView) {
  _inherits(TimerModalView, _ModalView);

  var _super = _createSuper(TimerModalView);

  function TimerModalView() {
    _classCallCheck(this, TimerModalView);

    return _super.apply(this, arguments);
  }

  _createClass(TimerModalView, [{
    key: "_generateMarkUp",
    value: // _TimerCardListView = new TimerCardListView();
    function _generateMarkUp(name, index, time, action) {
      var _time$split = time.split(":"),
          _time$split2 = _slicedToArray(_time$split, 3),
          hour = _time$split2[0],
          minute = _time$split2[1],
          second = _time$split2[2];

      return "   \n      <div\n        class=\"modal-content\"\n        data-action=".concat(action, "\n        data-index=").concat(index, "\n        data-name=").concat(name, "\n        data-type=\"timer\"\n        data-remaining-time-str=").concat(time, "\n      >\n          <button\n            class=\"timerCard__header-btn card-header__btn btn-icon--square\"\n            data-action=\"delete\"\n          >\n            <!-- <i class=\"icon fa fa-compress\"></i> -->\n            <i class=\"fas fa-trash-alt\"></i>\n          </button>\n          <h5 class=\"h-5 mg-bg\">").concat(action.slice(0, 1).toUpperCase() + action.slice(1), " timer</h5>\n\n          <div class=\"modal-boxs mg-bg\" data-disabled=\"false\">\n            <div class=\"modal-box\" data-active=\"true\" data-time-unit=\"hour\">\n              <button\n                class=\"modal-box__btn btn-icon--square\"\n                data-action=\"increase\"\n              >\n                <i class=\"fas fa-angle-up\"></i>\n              </button>\n              <p\n                type=\"text\"\n                class=\"modal-time__value\"\n                data-value=\"").concat(hour, "\"\n                data-unit=\"hour\"\n              >\n                ").concat(hour, "\n              </p>\n              <button\n                class=\"modal-box__btn btn-icon--square\"\n                data-action=\"decrease\"\n              >\n                <i class=\"fas fa-angle-down\"></i>\n              </button>\n            </div>\n            <i class=\"fas fa-ellipsis-v icon--dim icon--bg\"></i>\n            <div\n              class=\"modal-box\"\n              data-active=\"false\"\n              data-time-unit=\"minute\"\n            >\n              <button\n                class=\"modal-box__btn btn-icon--square\"\n                data-action=\"increase\"\n              >\n                <i class=\"fas fa-angle-up\"></i>\n              </button>\n              <p\n                type=\"text\"\n                data-value=\"").concat(minute, "\"\n                data-unit=\"minute\"\n                class=\"modal-time__value\"\n              >\n                ").concat(minute, "\n              </p>\n              <button\n                class=\"modal-box__btn btn-icon--square\"\n                data-action=\"decrease\"\n              >\n                <i class=\"fas fa-angle-down\"></i>\n              </button>\n            </div>\n            <i class=\"fas fa-ellipsis-v icon--dim icon--bg\"></i>\n            <div\n              class=\"modal-box\"\n              data-active=\"false\"\n              data-time-unit=\"second\"\n            >\n              <button\n                class=\"modal-box__btn btn-icon--square\"\n                data-action=\"increase\"\n              >\n                <i class=\"fas fa-angle-up\"></i>\n              </button>\n              <p\n                type=\"text\"\n                data-value=\"").concat(second, "\"\n                data-unit=\"second\"\n                class=\"modal-time__value\"\n              >\n                ").concat(second, "\n              </p>\n              <button\n                class=\"modal-box__btn btn-icon--square\"\n                data-action=\"decrease\"\n              >\n                <i class=\"fas fa-angle-down\"></i>\n              </button>\n            </div>\n          </div>\n\n          <div class=\"modal-name mg-bg\" data-active=\"false\">\n            <i class=\"fas fa-edit icon--md\"></i>\n            <input type=\"text\" class=\"modal-name__input\" value=\"").concat(name, "\" />\n          </div>\n\n          <div class=\"modal-crud__btns\">\n            <button class=\"modal-crud__btn btn--primary\" data-action=\"save\">\n              <i class=\"fas fa-save\"></i>\n              <span>Save</span>\n            </button>\n            <button class=\"modal-crud__btn btn--outline\" data-action=\"cancel\">\n              <i class=\"fas fa-times\"></i>\n              <span>Cancel</span>\n            </button>\n          </div>\n      </div>");
    }
  }, {
    key: "show",
    value: function show(name, index, remainingTime, duration, type, action) {
      this.render(name, index, remainingTime, duration, type, action);
      (0, _domFunction.replaceClass)(this._topParentEl, "hidden", "display");
    }
  }, {
    key: "showAddModal",
    value: function showAddModal(CardListView, cardType) {
      var name, index, remainingTimeStr;
      index = CardListView.generateNewCardNumber();
      name = "".concat(cardType, " (").concat(index, ")");
      remainingTimeStr = "00:00:00";
      this.show(name, index, remainingTimeStr, "add");
    } // _updateExistingCard(name, time) {
    //   const curCard = document.querySelector(
    //     `.card[data-index="${this.cardIndex}"]`
    //     );
    //     console.log(curCard)
    //   curCard.querySelector(".card-name").textContent = name;
    //   curCard.querySelector(".card-time").textContent = time;
    //   console.log(name, time);
    // }

  }, {
    key: "saveCardUpdatedValues",
    value: function saveCardUpdatedValues(action, index, handle) {
      var name = this.getUpdateCardName();
      var time = this.getUpdatedCardTime();
      var duration = time.duration,
          remainingTimeStr = time.remainingTimeStr;
      handle(action, index, {
        name: name,
        duration: duration,
        remainingTimeStr: remainingTimeStr
      });
      this.hide();
    }
  }, {
    key: "addHandlerModal",
    value: function addHandlerModal(handle) {
      // this.handleModal(handle, TimerCardListView);
      this.handleModal(handle); //
    }
  }]);

  return TimerModalView;
}(_ModalView2.default);

var _default = TimerModalView;
exports.default = _default;
},{"../../Common/ModalView.js":"View/Common/ModalView.js","../../../utils/_domFunction.js":"utils/_domFunction.js"}],"Model/timerModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modelCreateTimer = exports.modelDeleteAllTimer = exports.modelDeleteTimerByIndex = exports.modelDeleteTimer = exports.modelUpdateAllTimers = exports.modelUpdateTimerByIndex = exports.modelUpdateTimer = exports.modelGetTimerByIndex = exports.modelGetTimer = exports.modelGetAllTimers = void 0;

var _helper = require("../utils/_helper.js");

function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

var timerState = {
  timers: [{
    index: 1,
    name: "Timer (1)",
    duration: 300,
    remainingTimeStr: "00:05:00",
    timePassed: 0,
    circlePercentCompleted: 0,
    type: "timer"
  }, {
    index: 2,
    name: "Timer (2)",
    duration: 900,
    remainingTimeStr: "00:15:00",
    timePassed: 0,
    circlePercentCompleted: 0,
    type: "timer"
  }, {
    index: 3,
    name: "Timer (3)",
    duration: 120,
    remainingTimeStr: "00:02:00",
    timePassed: 0,
    circlePercentCompleted: 0,
    type: "timer"
  }, {
    index: 4,
    name: "Timer (4)",
    duration: 60,
    remainingTimeStr: "00:01:00",
    timePassed: 0,
    circlePercentCompleted: 0,
    type: "timer"
  }]
}; // get one
// get all
// update one
// update all
// delete one
// delete all

var modelGetAllTimers = function modelGetAllTimers() {
  return timerState.timers;
};

exports.modelGetAllTimers = modelGetAllTimers;

var modelGetTimer = function modelGetTimer(name) {
  return timerState.timers.filter(function (timer) {
    return timer.name === name;
  })[0];
};

exports.modelGetTimer = modelGetTimer;

var modelGetTimerByIndex = function modelGetTimerByIndex(index) {
  return timerState.timers.filter(function (timer) {
    return Number(timer.index) === Number(index);
  })[0];
};

exports.modelGetTimerByIndex = modelGetTimerByIndex;

var modelUpdateTimer = function modelUpdateTimer(name, updateProp) {
  var timer = modelGetTimer(name);
  var updatePropArr = Object.entries(updateProp);
  updatePropArr.forEach(function (prop) {
    return timer[prop[0]] = prop[1];
  });
};

exports.modelUpdateTimer = modelUpdateTimer;

var modelUpdateTimerByIndex = function modelUpdateTimerByIndex(index, updateProp) {
  var timer = modelGetTimerByIndex(index);
  var updatePropArr = Object.entries(updateProp);
  updatePropArr.forEach(function (prop) {
    return timer[prop[0]] = prop[1];
  });
};

exports.modelUpdateTimerByIndex = modelUpdateTimerByIndex;

var modelUpdateAllTimers = function modelUpdateAllTimers(updateProp) {
  var allTimers = modelGetAllTimers();
  allTimers.forEach(function (timer) {
    return modelUpdateTimer(timer.name, updateProp);
  });
};

exports.modelUpdateAllTimers = modelUpdateAllTimers;

var modelDeleteTimer = function modelDeleteTimer(name) {
  var allTimers = modelGetAllTimers();
  timerState.timers = allTimers.filter(function (timer) {
    return timer.name !== name;
  });
};

exports.modelDeleteTimer = modelDeleteTimer;

var modelDeleteTimerByIndex = function modelDeleteTimerByIndex(index) {
  var allTimers = modelGetAllTimers();
  timerState.timers = allTimers.filter(function (timer) {
    return Number(timer.index) !== Number(index);
  });
};

exports.modelDeleteTimerByIndex = modelDeleteTimerByIndex;

var modelDeleteAllTimer = function modelDeleteAllTimer(name) {
  var allTimers = modelGetAllTimers();
  [], _readOnlyError("allTimers");
};

exports.modelDeleteAllTimer = modelDeleteAllTimer;

var modelCreateTimer = function modelCreateTimer(timerObj) {
  var newTimerObj = {
    index: timerObj.index,
    name: timerObj.name,
    type: "timer",
    remainingTimeStr: timerObj.remainingTimeStr,
    // duration: changeStrTimeInSeconds(timerObj.remainingTimeStr),
    duration: timerObj.duration,
    timePassed: 0,
    circlePercentCompleted: 0
  };
  timerState.timers.push(newTimerObj);
};

exports.modelCreateTimer = modelCreateTimer;
},{"../utils/_helper.js":"utils/_helper.js"}],"Controller/Components/Modal/timerModal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controlAddTimer = exports.controlDeleteTimer = exports.controlEditTimer = exports.getTimerModalView = void 0;

var _TimerModalView = _interopRequireDefault(require("../../../View/Components/Modal/TimerModalView.js"));

var _timerCardList = require("../CardList/timerCardList.js");

var _timerModel = require("../../../Model/timerModel.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var View;
var timerModal = document.querySelector(".timer");

var getTimerModalView = function getTimerModalView() {
  return View;
};

exports.getTimerModalView = getTimerModalView;

var controlEditTimer = function controlEditTimer(index, updateProp) {
  updateProp.timePassed = 0;
  updateProp.circlePercentCompleted = 0;
  (0, _timerModel.modelUpdateTimerByIndex)(index, updateProp);
};

exports.controlEditTimer = controlEditTimer;

var controlDeleteTimer = function controlDeleteTimer(index) {
  return (0, _timerModel.modelDeleteTimerByIndex)(index);
};

exports.controlDeleteTimer = controlDeleteTimer;

var controlAddTimer = function controlAddTimer(index, updateProp) {
  updateProp.index = index;
  (0, _timerModel.modelCreateTimer)(updateProp);
};

exports.controlAddTimer = controlAddTimer;

var controlTimerModal = function controlTimerModal(action, index, updateProp) {
  index = Number(index);
  console.log(action, index, updateProp); // update time by index

  if (action === "edit") controlEditTimer(index, updateProp); // delete timer by index

  if (action === "delete") controlDeleteTimer(index);
  if (action === "add") controlAddTimer(index, updateProp);
  console.log((0, _timerModel.modelGetTimerByIndex)(index));
  (0, _timerCardList.controlLoadTimers)();
};

if (timerModal) {
  View = new _TimerModalView.default();
  View.addHandlerModal(controlTimerModal);
}
},{"../../../View/Components/Modal/TimerModalView.js":"View/Components/Modal/TimerModalView.js","../CardList/timerCardList.js":"Controller/Components/CardList/timerCardList.js","../../../Model/timerModel.js":"Model/timerModel.js"}],"Controller/Components/CardList/timerCardList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controlLoadTimers = exports.getTimerCardListView = void 0;

var _TimerCardListView = _interopRequireDefault(require("../../../View/Components/CardList/TimerCardListView.js"));

var _Timer = require("../../Pages/Timer.js");

var _timerModal = require("../Modal/timerModal.js");

var _timerModel = require("../../../Model/timerModel.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimerCardListEl = document.querySelector(".timer");
var View;

var getTimerCardListView = function getTimerCardListView() {
  return View;
};

exports.getTimerCardListView = getTimerCardListView;

var controlLoadTimers = function controlLoadTimers() {
  var timers = (0, _timerModel.modelGetAllTimers)();
  View.render(timers);
};

exports.controlLoadTimers = controlLoadTimers;

var controlTimerCardList = function controlTimerCardList(action, timerName, timerUpdateProp) {
  console.log(action, timerName, timerUpdateProp);
  if (action === "pause-timer") (0, _timerModel.modelUpdateTimer)(timerName, timerUpdateProp);
  if (action === "reset-timer") (0, _timerModel.modelUpdateTimer)(timerName, timerUpdateProp);
  if (action === "delete-timer") (0, _timerModel.modelDeleteTimer)(timerName);
  controlLoadTimers();
};

if (TimerCardListEl) {
  View = new _TimerCardListView.default();
  controlLoadTimers(); // manageCard

  var TimerView = (0, _Timer.getTimerView)();
  var TimerModalView = (0, _timerModal.getTimerModalView)();
  View.addHandlerCardList(controlTimerCardList, TimerModalView, TimerView);
}
},{"../../../View/Components/CardList/TimerCardListView.js":"View/Components/CardList/TimerCardListView.js","../../Pages/Timer.js":"Controller/Pages/Timer.js","../Modal/timerModal.js":"Controller/Components/Modal/timerModal.js","../../../Model/timerModel.js":"Model/timerModel.js"}],"View/Common/CrudView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CrudView = /*#__PURE__*/function () {
  function CrudView() {
    _classCallCheck(this, CrudView);

    _defineProperty(this, "_parentEl", document.querySelector(".crud-btns"));

    _defineProperty(this, "_editBtn", this._parentEl.querySelector('button[data-action="edit"]'));

    _defineProperty(this, "_doneBtn", this._parentEl.querySelector('button[data-action="done"]'));

    _defineProperty(this, "_addBtn", this._parentEl.querySelector('button[data-action="add"]'));
  }

  _createClass(CrudView, [{
    key: "render",
    value: // writing common function is quite resusable
    //   _removeTimerBtn =
    function render(page_name) {
      this._parentEl.dataset.page = page_name;
    } // CSS *************************************
    // HANDLE ***********************************
    // handle 1

  }, {
    key: "_handleRemoveCard",
    value: function _handleRemoveCard(action, CardListView) {
      if (action !== "edit") return;
      CardListView.allowToRemoveCardFromList();
      this._parentEl.dataset.edit = true;
    } // handle 2

  }, {
    key: "_handleDoneRemovingCard",
    value: function _handleDoneRemovingCard(action, CardListView) {
      if (action !== "done") return;
      CardListView.notAllowToRemoveCardFromList();
      this._parentEl.dataset.edit = false;
    } // handle 3

  }, {
    key: "_handleAddCard",
    value: function _handleAddCard(action, ModalView, CardListView, cardType, handle) {
      if (action !== "add") return;
      ModalView.showAddModal(CardListView, cardType, handle);
    }
  }, {
    key: "handleBtns",
    value: function handleBtns(handle, CardListView, ModalView, cardType) {
      var _this = this;

      this._parentEl.addEventListener("click", function (e) {
        var target = e.target.closest("button");
        if (!target) return;
        var action = target.dataset.action;

        _this._handleRemoveCard(action, CardListView, handle);

        _this._handleDoneRemovingCard(action, CardListView);

        _this._handleAddCard(action, ModalView, CardListView, cardType, handle);
      });
    }
  }]);

  return CrudView;
}();

var _default = CrudView;
exports.default = _default;
},{}],"View/Components/Crud/TimerCrudView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CrudView2 = _interopRequireDefault(require("../../Common/CrudView.js"));

var _TimerCardListView = _interopRequireDefault(require("../CardList/TimerCardListView.js"));

var _TimerCardView = _interopRequireDefault(require("../Card/TimerCardView.js"));

var _TimerModalView = _interopRequireDefault(require("../Modal/TimerModalView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TimerCrudView = /*#__PURE__*/function (_CrudView) {
  _inherits(TimerCrudView, _CrudView);

  var _super = _createSuper(TimerCrudView);

  function TimerCrudView() {
    var _this;

    _classCallCheck(this, TimerCrudView);

    _this = _super.call(this);

    _this.setAccoringToPage();

    return _this;
  }

  _createClass(TimerCrudView, [{
    key: "setAccoringToPage",
    value: function setAccoringToPage() {
      this.render("timer");
    }
  }, {
    key: "addHandlerBtns",
    value: function addHandlerBtns(handle, TimerCardListView, TimerModalView) {
      this.handleBtns(handle, TimerCardListView, TimerModalView, "timer");
    }
  }]);

  return TimerCrudView;
}(_CrudView2.default); // index = TimerCardListView.generateNewCardNumber();
// name=`Timer(index)`
// time:"00:00:00"
// duration:0
// type:'timer'


var _default = TimerCrudView;
exports.default = _default;
},{"../../Common/CrudView.js":"View/Common/CrudView.js","../CardList/TimerCardListView.js":"View/Components/CardList/TimerCardListView.js","../Card/TimerCardView.js":"View/Components/Card/TimerCardView.js","../Modal/TimerModalView.js":"View/Components/Modal/TimerModalView.js"}],"Controller/Components/Crud/timerCrud.js":[function(require,module,exports) {
"use strict";

var _TimerCrudView = _interopRequireDefault(require("../../../View/Components/Crud/TimerCrudView.js"));

var _timerCardList = require("../../Components/CardList/timerCardList.js");

var _timerModal = require("../Modal/timerModal.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timerCrudEl = document.querySelector('.crud-btns[data-page="timer"]');

var controlCrudBtns = function controlCrudBtns(action) {};

if (timerCrudEl) {
  var View = new _TimerCrudView.default();
  var TimerCardListView = (0, _timerCardList.getTimerCardListView)();
  var TimerModalView = (0, _timerModal.getTimerModalView)();
  View.addHandlerBtns(controlCrudBtns, TimerCardListView, TimerModalView);
}
},{"../../../View/Components/Crud/TimerCrudView.js":"View/Components/Crud/TimerCrudView.js","../../Components/CardList/timerCardList.js":"Controller/Components/CardList/timerCardList.js","../Modal/timerModal.js":"Controller/Components/Modal/timerModal.js"}],"View/Components/CardList/AlarmCardListView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domFunction = require("../../../utils/_domFunction.js");

var _CardListView2 = _interopRequireDefault(require("../../Common/CardListView.js"));

var _helper = require("../../../utils/_helper.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AlarmListView = /*#__PURE__*/function (_CardListView) {
  _inherits(AlarmListView, _CardListView);

  var _super = _createSuper(AlarmListView);

  function AlarmListView() {
    var _this;

    _classCallCheck(this, AlarmListView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_parentEl", (0, _domFunction.findEl)("alarm__list"));

    return _this;
  }

  _createClass(AlarmListView, [{
    key: "_generateMarkUpItem",
    value: // constructor() {
    //   super();
    //   this.addHandlerCardList();
    //   // this.render(timerState.timers);
    // }
    function _generateMarkUpItem(alarm) {
      // the only imformation i need in data-attribute is INDEX n
      // NO more No LESSSSSSSSSSSSSSSSSSS||||||||||||!!!!!!!!
      // data-alarm-tunes='${JSON.stringify(alarm.alarm_tunes)}'
      return "   \n          <div\n            class=\"card alarm-card\"\n            data-name=\"".concat(alarm.name, "\"\n            data-index=\"").concat(alarm.index, "\"\n            data-time=\"").concat(alarm.time, "\"\n            data-remaining-time=\"").concat(alarm.remainingTimeStr, "\"\n            data-type=\"alarm\"\n            data-active=\"").concat(alarm.active, "\"\n            data-alarm-tune=\"").concat(alarm.alarm_tune, "\"\n            data-alarm-repeat-time-period=").concat(alarm.alarm_repeat_time_period, "\n            data-alarm-days='").concat(JSON.stringify(alarm.alarm_days), "'\n\n            \n          >\n            <button\n              class=\"card-deleteBtn btn-icon--square hidden\"\n              data-action=\"delete\"\n            >\n              <i class=\"fas fa-trash-alt\"></i>\n            </button>\n            <button\n              class=\"alarm-btn alarm-startAndpauseBtn\"\n              data-action=\"start&pause\"\n              data-active=\"").concat(alarm.active, "\"\n            >\n              <i class=\"fas fa-circle\"></i>\n            </button>\n\n            <h1 class=\"h-1 alarm-time\">").concat(alarm.time, "</h1>\n            <p class=\"text-lw alarm-remainingTime\">\n              <i class=\"fas fa-bell\"></i>\n              in\n              <span class=\"alarm-remainingTime__value\"\n                >").concat(alarm.remainingTimeStr, "</span\n              >\n            </p>\n            <h5 class=\"h-5 alarm-name mg-lw\">").concat(alarm.name, "</h5>\n\n            <div class=\"alarm-days\">\n              ").concat(alarm.alarm_days.map(function (alarm_day) {
        return "      \n                <button\n                  class=\"alarm-dayBtn btn-icon--primary\"\n                  data-day=".concat(alarm_day.day, "\n                  data-active=\"").concat(alarm_day.active, "\"\n                >\n                  <span class=\"alarm-dayName\">").concat(alarm_day.day, "</span>\n                </button>");
      }).join(""), "\n            </div>\n          </div>");
    } //////////////////////////////////////////////////////////

  }, {
    key: "addHandlerCardList",
    value: function addHandlerCardList(handle, AlarmCardView, AlarmModalView) {
      this._parentEl.addEventListener("click", AlarmCardView.handleCard.bind(AlarmCardView, handle, AlarmModalView));
    } ///////////////////////////////////////////////

  }]);

  return AlarmListView;
}(_CardListView2.default);

var _default = AlarmListView;
exports.default = _default;
},{"../../../utils/_domFunction.js":"utils/_domFunction.js","../../Common/CardListView.js":"View/Common/CardListView.js","../../../utils/_helper.js":"utils/_helper.js"}],"View/Components/Card/AlarmCardView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CardView2 = _interopRequireDefault(require("../../Common/CardView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AlarmCardView = /*#__PURE__*/function (_CardView) {
  _inherits(AlarmCardView, _CardView);

  var _super = _createSuper(AlarmCardView);

  function AlarmCardView() {
    var _this;

    _classCallCheck(this, AlarmCardView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_parentEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "_alarmIndex", void 0);

    return _this;
  }

  _createClass(AlarmCardView, [{
    key: "_showEditModal",
    value: // handle 1
    function _showEditModal(e, AlarmModalView) {
      // i should have send the handle here and pass the index to it so the control can render the EditModal with all the imformation it needed
      // in attriute i just need to save just identity values like most important once like
      // index
      // or if want one more then name
      // index is self explanatory on its own
      if (e.target.closest("button") || document.querySelector(".card-list").getAttribute("data-enable-remove") === "true") return;
      AlarmModalView.show("edit", this._parentEl.dataset);
    } // handle 2

  }, {
    key: "_startOrPauseAlarm",
    value: function _startOrPauseAlarm(e, handle) {
      var btn = e.target.closest('button[data-action="start&pause"]');
      if (!btn) return;
      var active = btn.dataset.active;
      active = active === "false" ? "true" : "false";
      btn.dataset.active = active;
      this._parentEl.dataset.active = active;
      active === "true" ? handle("start-alarm", this._alarmIndex) : handle("pause-alarm", this._alarmIndex);
    }
  }, {
    key: "_handleDeleteBtn",
    value: function _handleDeleteBtn(e, handle) {
      var btn = e.target.closest('button[data-action="delete"]');
      if (!btn) return;
      handle("delete-alarm", this._alarmIndex);
    } // MAIN --------------------------------------------

  }, {
    key: "handleCard",
    value: function handleCard(handle, AlarmModalView, e) {
      this._parentEl = e.target.closest(".card");
      if (!this._parentEl) return;
      this._alarmIndex = this._parentEl.dataset.index; // show edit modal

      this._showEditModal(e, AlarmModalView); // start and pause alarm


      this._startOrPauseAlarm(e, handle); // handle deltete Btn


      this._handleDeleteBtn(e, handle);
    }
  }]);

  return AlarmCardView;
}(_CardView2.default);

var _default = AlarmCardView;
exports.default = _default;
},{"../../Common/CardView.js":"View/Common/CardView.js"}],"View/Components/AlarmRarelyUsedComponent/AlarmCompletedPopupView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ParentView2 = _interopRequireDefault(require("../../ParentView.js"));

var _domFunction = require("../../../utils/_domFunction.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AlarmCompletedPopupView = /*#__PURE__*/function (_ParentView) {
  _inherits(AlarmCompletedPopupView, _ParentView);

  var _super = _createSuper(AlarmCompletedPopupView);

  function AlarmCompletedPopupView() {
    var _this;

    _classCallCheck(this, AlarmCompletedPopupView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_topParentEl", document.querySelector(".popup"));

    _defineProperty(_assertThisInitialized(_this), "_parentEl", document.querySelector(".popup-container"));

    _defineProperty(_assertThisInitialized(_this), "audio", document.querySelector("audio"));

    _defineProperty(_assertThisInitialized(_this), "_subParentEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "_snoozeTimeInputEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "_snoozeTextEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "_snoozeTimeDropdownEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "_snoozeTimeDropdownItemsElArr", void 0);

    _defineProperty(_assertThisInitialized(_this), "_alarm_index", void 0);

    _defineProperty(_assertThisInitialized(_this), "_alarm_day", void 0);

    return _this;
  }

  _createClass(AlarmCompletedPopupView, [{
    key: "_generateMarkUpList",
    value: function _generateMarkUpList(alarm) {
      // alaways set data attribute inside the semi-container if it is a overlay component
      var index = alarm.index,
          day = alarm.day;
      return "       \n            <div class=\"popup-content data-action=\"alarm-completed\" data-alarm-index=".concat(index, " data-alarm-day=").concat(day, ">\n            <header class=\"popup-header f-s mg-lw\">\n            <div class=\"f-sm\">\n                <i class=\"fa fa-clock\"></i>\n                <p class=\"paragraph--md\">Clock</p>\n            </div>\n            <div class=\"f-sm\">\n                <button\n                class=\"btn-icon btn--sm\"\n                data-action=\"dismiss-alarm-by-close-btn\"\n                >\n                <i class=\"fa fa-times\"></i>\n                </button>\n            </div>\n            </header>\n\n            <div class=\"popup-content mg-lw\">\n            <p class=\"paragraph--md\">Alarm</p>\n            <p class=\"paragraph--md\">Alarm (").concat(index, ")</p>\n            <p class=\"paragraph--md mg-lw\">00:00</p>\n\n            <button\n                class=\"btn--black btn--100 btn--change-time dropdown-parent f-s\"\n                data-active=\"false\"\n                data-action=\"snooze-alarm-time-period\"\n                data-dpos=\"top\"\n            >\n                <input type=\"text\" class=\"hidden\" value=\"10\" name=\"snooze\" />\n                <p class=\"paragraph--md popup-snooze-text\">10 minutes</p>\n\n                <i class=\"fas fa-angle-down\"></i>\n\n                <div class=\"dropdown dropdown--auto\" data-type=\"snooze-alarm\">\n                <div class=\"list\">\n                    <div class=\"list-item\" data-active=\"true\" data-value=\"10\">10 minutes</div>\n                    <div class=\"list-item\" data-value=\"20\">20 minutes</div>\n                    <div class=\"list-item\" data-value=\"30\">30 minutes</div>\n                    <div class=\"list-item\" data-value=\"50\">50 minutes</div>\n                    <div class=\"list-item\" data-value=\"60\">1 hour</div>\n                </div>\n                </div>\n            </button>\n            </div>\n\n            <footer class=\"popup-footer f-b\">\n            <button class=\"btn--black\" data-action=\"save-snooze-time\">\n                Snooze\n            </button>\n            <button\n                class=\"btn--black\"\n                data-action=\"dismiss-alarm-by-main-btn\"\n            >\n                Dismiss\n            </button>\n            </footer>\n        </div>\n  ");
    } // setSomeCSSChangesAfterRenderCompleted() {
    //   this._show();
    // }
    // HANDLE ************************************
    // handle HELPER *********************

  }, {
    key: "_show",
    value: function _show(alarm_tune) {
      this.audio.src = "../../../music/".concat(alarm_tune, ".mp3");
      this.audio.play();

      this._topParentEl.classList.remove("hidden");
    }
  }, {
    key: "_hide",
    value: function _hide() {
      this._topParentEl.classList.add("hidden");

      this.audio.pause();
    }
  }, {
    key: "_setDOMElsForUse",
    value: function _setDOMElsForUse() {
      this._subParentEl = this._parentEl.querySelector(".popup-content");
      this._snoozeTimeInputEl = this._parentEl.querySelector('input[name="snooze"]');
      this._snoozeTextEl = this._parentEl.querySelector(".popup-snooze-text");
      this._snoozeTimeDropdownEl = this._parentEl.querySelector('.dropdown[data-type="snooze-alarm"]');
      this._snoozeTimeDropdownItemsElArr = _toConsumableArray(this._snoozeTimeDropdownEl.querySelectorAll(".list-item"));
    }
  }, {
    key: "_dismissAlarm",
    value: function _dismissAlarm(handle) {
      handle("dismiss-alarm", {
        index: this._alarm_index,
        day: this._alarm_day
      });
    } //////////////////////////////////////
    // - handle 1

  }, {
    key: "_handleDismissAlarmByCloseBtn",
    value: function _handleDismissAlarmByCloseBtn(target, handle) {
      if (!target.closest('button[data-action="dismiss-alarm-by-close-btn"]')) return;

      this._dismissAlarm(handle);

      this._hide();
    } // - handle 2

  }, {
    key: "_handleSetSnoozeTimePeriod",
    value: function _handleSetSnoozeTimePeriod(target) {
      var btn = target.closest('button[ data-action="snooze-alarm-time-period"]');
      if (!btn) return;
      var active = btn.dataset.active; // if open and  click on item

      var listItem = (0, _domFunction.closest)(target, "list-item");

      if (listItem) {
        var value = listItem.dataset.value;
        this._snoozeTimeInputEl.value = value;
        this._snoozeTextEl.textContent = "".concat(value, " minutes");
        btn.dataset.active = "false";
        return;
      } // if not open || active === false


      var curValue = this._snoozeTimeInputEl.value;

      this._snoozeTimeDropdownItemsElArr.forEach(function (el) {
        if (el.dataset.value === curValue) return el.dataset.active = true;
        el.dataset.active = false;
      });

      btn.dataset.active = "true";
    } // - handle 3

  }, {
    key: "_handleSnoozeBtn",
    value: function _handleSnoozeBtn(target, handle) {
      if (!target.closest("button[data-action='save-snooze-time']")) return;
      var snoozeTime = this._snoozeTimeInputEl.value;
      handle("snooze-alarm-time", {
        index: this._alarm_index,
        day: this._alarm_day,
        snoozeTimePeriod: snoozeTime
      });

      this._hide();
    } // handle 4

  }, {
    key: "_handleDismissAlarmByMainBtn",
    value: function _handleDismissAlarmByMainBtn(target, handle) {
      if (!target.closest('button[data-action="dismiss-alarm-by-main-btn"]')) return;

      this._dismissAlarm(handle);

      this._hide();
    } // handle 5

  }, {
    key: "_handleHidePosAbsElsWhenLoseFocus",
    value: function _handleHidePosAbsElsWhenLoseFocus(target) {
      // Clicked on overlay
      if (target.closest(".overlay")) this._hide(); // hide dropdown

      if (!target.closest(".dropdown-parent")) this._snoozeTimeDropdownEl.closest(".dropdown-parent").dataset.active = false;
    } // handle 6

  }, {
    key: "_handleDismissAlarmByClickingOnOverlay",
    value: function _handleDismissAlarmByClickingOnOverlay(target, handle) {
      if (target.closest(".overlay")) this._dismissAlarm(handle);
    }
  }, {
    key: "addHandlerPopup",
    value: function addHandlerPopup(handle) {
      var _this2 = this;

      this._topParentEl.addEventListener("click", function (e) {
        _this2._setDOMElsForUse();

        var target = e.target; // storing important imformation

        var _this2$_subParentEl$d = _this2._subParentEl.dataset,
            alarmIndex = _this2$_subParentEl$d.alarmIndex,
            alarmDay = _this2$_subParentEl$d.alarmDay;
        _this2._alarm_index = alarmIndex;
        _this2._alarm_day = alarmDay; // dismiss alarm by icon

        _this2._handleDismissAlarmByCloseBtn(target, handle); // select snooze alarm time period


        _this2._handleSetSnoozeTimePeriod(target); // snooze alarm for selected time period


        _this2._handleSnoozeBtn(target, handle); // dismiss alarm by button


        _this2._handleDismissAlarmByMainBtn(target, handle); // dismiss alarm by clicking on overlay


        _this2._handleDismissAlarmByClickingOnOverlay(target, handle);

        _this2._handleHidePosAbsElsWhenLoseFocus(target);
      });
    }
  }]);

  return AlarmCompletedPopupView;
}(_ParentView2.default);

var _default = AlarmCompletedPopupView;
exports.default = _default;
},{"../../ParentView.js":"View/ParentView.js","../../../utils/_domFunction.js":"utils/_domFunction.js"}],"Model/alarmModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modelIncreaseAlarmDayRingTime = exports.modelUpdateAlarmsTimingAndRemainingTimeProp = exports.modelResetAllAlarmsCompleteStateEveryWeek = exports.modelSetAlarmDayCompleted = exports.modelSetAlarmTimingForGivenDayAlarms = exports.modelSetAlarmAllDaysTiming = exports.modelGetAlarmRemainingTime = exports.modelCalulateRemainingTimeProps = exports.modelGetAlarmDays = exports.modelReplaceAlarm = exports.modelCreateAlarm = exports.modelDeleteAllAlarm = exports.modelDeleteAlarm = exports.modelUpdateAllAlarms = exports.modelUpdateAlarm = exports.modelGetAlarm = exports.modelGetAllAlarms = exports.newObj = void 0;

var _helper = require("../utils/_helper.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// pay attention to model very properly and rightly
// write correct property names which are self explanable
// use dummy as real
var alarmState = {
  // to reset alarm completed as false every week
  alarms: [{
    index: 1,
    name: "Alarm (1)",
    time: "13:50",
    // i just only need remainingTime though it can calculate alll other time related prop easily
    remainingTimeStr: "",
    remainingTimeInSec: 0,
    type: "alarm",
    active: true,
    ring_once: false,
    ring_day_set: true,
    alarm_repeat_time_period: 10,
    alarm_tune: "cool",
    alarm_days: [{
      day: "Mo",
      active: "false",
      timing: "",
      completed: "false"
    }, {
      day: "Tu",
      active: "true",
      completed: "false",
      timing: ""
    }, {
      day: "We",
      active: "false",
      completed: "false",
      timing: ""
    }, {
      day: "Th",
      active: "false",
      completed: "false",
      timing: ""
    }, {
      day: "Fr",
      active: "false",
      completed: "false",
      timing: ""
    }, {
      day: "Sa",
      active: "false",
      completed: "false",
      timing: ""
    }, {
      day: "Su",
      active: "false",
      completed: "false"
    }],
    alarm_tunes: ["cool", "io", "mdf", "mom", "pio", "risen", "roi"]
  } // {
  //   index: 2,
  //   name: "Alarm (2)",
  //   remainingTimeStr: "",
  //   remainingTimeInSec: 0,
  //   remainingTimeInSec: 0,
  //   time: "2:50",
  //   // i just only need remainingTime though it can calculate alll other time related prop easily
  //   type: "alarm",
  //   active: true,
  //   ring_once: true,
  //   ring_day_set: false,
  //   alarm_repeat_time_period: 10,
  //   alarm_tune: "cool",
  //   alarm_days: [
  //     {
  //       day: "M",
  //       active: "false",
  //       completed: "false",
  //       timing: "",
  //     },
  //     {
  //       day: "Tu",
  //       active: "false",
  //       completed: "false",
  //       timing: "",
  //     },
  //     {
  //       day: "We",
  //       active: "false",
  //       completed: "false",
  //       timing: "",
  //     },
  //     {
  //       day: "Th",
  //       active: "false",
  //       completed: "false",
  //       timing: "",
  //     },
  //     {
  //       day: "Fri",
  //       active: "false",
  //       completed: "false",
  //       timing: "",
  //     },
  //     {
  //       day: "Sa",
  //       active: "false",
  //       completed: "false",
  //       timing: "",
  //     },
  //     {
  //       day: "Su",
  //       active: "false",
  //       completed: "false",
  //       timing: "",
  //     },
  //   ],
  //   alarm_tunes: ["cool", "io", "mdf", "mom", "pio", "risen", "roi"],
  // },
  ]
};

var newObj = function newObj(obj) {
  return immer.produce(obj, function (draft) {
    return draft;
  });
};

exports.newObj = newObj;

var modelGetAllAlarms = function modelGetAllAlarms() {
  return immer.produce(alarmState, function (draft) {
    return draft.alarms;
  });
};

exports.modelGetAllAlarms = modelGetAllAlarms;

var modelGetAlarm = function modelGetAlarm(index) {
  return immer.produce(alarmState, function (draft) {
    var alarm = draft.alarms.filter(function (alarm) {
      return Number(alarm.index) === Number(index);
    })[0];
    return alarm;
  });
};

exports.modelGetAlarm = modelGetAlarm;

var modelUpdateAlarm = function modelUpdateAlarm(index, updateProp) {
  var rIndex = Number(index); // obj new Create but reference obj inside are same

  var alarm = modelGetAlarm(rIndex);
  var updateAlarm = immer.produce(alarm, function (draft) {
    // expensive thing to copy a obj
    var updatePropArr = Object.entries(updateProp);
    updatePropArr.map(function (prop) {
      if (prop[1] === undefined) return;
      draft[prop[0]] = prop[1];
      return draft;
    });
    return draft;
  });
  alarmState = immer.produce(alarmState, function (draft) {
    draft.alarms.splice(rIndex - 1, 1, updateAlarm);
    return draft;
  });
  return updateAlarm;
}; // export const modelUpdateAlarmAndReturnAlarmArr = (index, updateProp) => {
//   modelUpdateAlarm(index, updateProp);
//   return modelGetAllAlarms();
// };


exports.modelUpdateAlarm = modelUpdateAlarm;

var modelUpdateAllAlarms = function modelUpdateAllAlarms(updateProp) {
  var alarms = modelGetAllAlarms();
  var updatedAlarms = alarms.map(function (alarm) {
    return modelUpdateAlarm(alarm.index, updateProp);
  });
  return updatedAlarms;
};

exports.modelUpdateAllAlarms = modelUpdateAllAlarms;

var modelDeleteAlarm = function modelDeleteAlarm(index) {
  var rIndex = Number(index);
  alarmState = immer.produce(alarmState, function (draft) {
    draft.alarms.splice(rIndex - 1, 1);
  });
};

exports.modelDeleteAlarm = modelDeleteAlarm;

var modelDeleteAllAlarm = function modelDeleteAllAlarm() {
  alarmState = immer.produce(alarmState, function (draft) {
    draft.timers = [];
    return draft;
  });
  return alarmState.alarms;
};

exports.modelDeleteAllAlarm = modelDeleteAllAlarm;

var modelCreateAlarm = function modelCreateAlarm(alarmObj) {
  var newAlarmObj = alarmObj;
  alarmState = immer.produce(alarmState, function (draft) {
    draft.alarms.push(newAlarmObj);
  });
  console.log(alarmState);
};

exports.modelCreateAlarm = modelCreateAlarm;

var modelReplaceAlarm = function modelReplaceAlarm(alarmIndex, updateAlarmObj) {
  alarmState = immer.produce(alarmState, function (draft) {
    draft.alarms.splice(alarmIndex, 1, updateAlarmObj);
  });
}; // anything related to alarm model should be taken care here whether is remainingTimeStr or whatever
///////////////////////////////////////////////////////////////////
// - Query model for properies or to get dynamic values
///////////////////////////////////////////////////////////////////


exports.modelReplaceAlarm = modelReplaceAlarm;

var modelGetAlarmDays = function modelGetAlarmDays(index) {
  var alarm = modelGetAlarm(index);
  return immer.produce(alarm.alarm_days, function (draft) {
    return draft;
  });
};

exports.modelGetAlarmDays = modelGetAlarmDays;

var modelCalulateRemainingTimeProps = function modelCalulateRemainingTimeProps(alarm_ring_time) {
  var timing = alarm_ring_time;
  var remainingSec = Number(timing) - Number(new Date());
  var sec_in_day = 86400 * 1000;
  var sec_in_hour = 3600 * 1000;
  var sec_in_min = 60 * 1000;
  var day = Math.floor(remainingSec / sec_in_day);
  if (!day) day = 0;
  var hour = Math.floor(remainingSec % sec_in_day / sec_in_hour);
  var min = Math.floor(remainingSec % sec_in_day % sec_in_hour / sec_in_min);
  var dayStr, hourStr, minStr;

  if (day) {
    dayStr = day === 0 ? "" : day;
    dayStr = day === 1 && day !== 0 ? "".concat(day, " day, ") : "".concat(day, " days, ");
  }

  if (hour) {
    hourStr = hour === 0 ? "" : hour;
    hourStr = hour === 1 && hour !== 0 ? "".concat(hour, " hour, ") : "".concat(hour, " hours, ");
  }

  if (min) {
    minStr = min === 0 ? "" : min;
    minStr = min === 1 && min !== 0 ? "".concat(min, " minute") : "".concat(min, " minutes");
  }

  if (day <= 0) dayStr = "";
  if (hour <= 0) hourStr = "";
  if (min <= 0) minStr = "0 minute";
  return {
    remainingTimeStr: "".concat(dayStr).concat(hourStr).concat(minStr),
    remainingTimeInSec: remainingSec
  };
};

exports.modelCalulateRemainingTimeProps = modelCalulateRemainingTimeProps;

var modelGetAlarmRemainingTime = function modelGetAlarmRemainingTime(index, optional_alarm_obj) {
  var alarm = index ? modelGetAlarm(index) : optional_alarm_obj; // if for set alarm on days

  var orderAlarmDays = immer.produce(alarm.alarm_days, function (draft) {
    return draft.sort(function (a, b) {
      return Number(a.timing) - Number(b.timing);
    });
  });
  var nearest_alarm = orderAlarmDays.find(function (el) {
    return el.active === "true" && el.completed === "false";
  });
  console.log(nearest_alarm); // alarm set for only once

  if (!nearest_alarm) {
    nearest_alarm = orderAlarmDays.find(function (el) {
      return new Date(el.timing) > new Date();
    });
  }

  var _nearest_alarm = nearest_alarm,
      timing = _nearest_alarm.timing;
  return modelCalulateRemainingTimeProps(timing);
}; // this function set particular alarm all 7 day alarm timing when they will ring not remaining time , remaining time will be done by another function
// need to call in starting to set alarm timing
// like
// {sun:7, mon:7,tue:7,wed:7}


exports.modelGetAlarmRemainingTime = modelGetAlarmRemainingTime;

var modelSetAlarmAllDaysTiming = function modelSetAlarmAllDaysTiming(index, time) {
  var updateState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var optional_alarm_obj = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var alarm = index ? modelGetAlarm(index) : optional_alarm_obj;
  var cur_date = new Date().toLocaleString().split(",")[0].split("/");
  cur_date = cur_date.slice(1, 2) + "/" + cur_date.slice(0, 1) + "/" + cur_date.slice(2);
  var default_alarm_date = +new Date("".concat(cur_date, " ").concat(time));
  console.log(new Date(default_alarm_date)); // checking is current set time is less if less we start from next day
  // if we start with today and time is less the alarm will not work proper so we do it from tommorrow
  // if set on friday 00:00 and its friday 6:30 then we need to set the friday as next week by changing the day order

  var cur_time_is_less = default_alarm_date < +new Date();
  console.log(cur_time_is_less);
  var properWeekDayOrder = cur_time_is_less ? modelGetProperDayOrderAccToCurDay(true) : modelGetProperDayOrderAccToCurDay();
  console.log(properWeekDayOrder);
  var updateAlarm = immer.produce(alarm, function (draft) {
    properWeekDayOrder.map(function (el, i) {
      var current_alarm = draft.alarm_days.find(function (mov) {
        return mov.day === el;
      });
      current_alarm.timing = new Date(default_alarm_date + 86400 * (cur_time_is_less ? i + 1 : i) * 1000);
      return current_alarm;
    });
  });
  if (index && updateState) modelReplaceAlarm(Number(index) - 1, updateAlarm);
  return updateAlarm;
};

exports.modelSetAlarmAllDaysTiming = modelSetAlarmAllDaysTiming;

var modelSetAlarmTimingForGivenDayAlarms = function modelSetAlarmTimingForGivenDayAlarms(alarms, time) {
  var cur_date = new Date().toLocaleString().split(",")[0];
  var default_alarm_date = +new Date("".concat(cur_date, " ").concat(time));
  var updateAlarmsTiming = immer.produce(alarms, function (draft) {
    draft.map(function (alarm, i) {
      alarm.timing = new Date(default_alarm_date + 86400 * i * 1000);
    });
  });
  return updateAlarmsTiming;
};

exports.modelSetAlarmTimingForGivenDayAlarms = modelSetAlarmTimingForGivenDayAlarms;

var modelSetAlarmDayCompleted = function modelSetAlarmDayCompleted(index, day) {
  var rIndex = Number(index);
  var alarm = modelGetAlarm(rIndex);
  var updateAlarm = immer.produce(alarm, function (draft) {
    var cur_alarm_day = draft.alarm_days.find(function (el) {
      return el.day === day;
    });
    cur_alarm_day.active = "true";
    cur_alarm_day.completed = "true";
  });
  return updateAlarm;
};

exports.modelSetAlarmDayCompleted = modelSetAlarmDayCompleted;

var modelResetAllAlarmsCompleteStateEveryWeek = function modelResetAllAlarmsCompleteStateEveryWeek() {
  setTimeout(function () {
    var day = new Date().getDay();
    var hour = new Date().getHours();
    if (day !== 0 && hour !== 24) return;
    alarmState.alarms = immer.produce(alarmState.alarms, function (draft) {
      return draft.map(function (alarm) {
        var alarm_with_timing_update = modelSetAlarmAllDaysTiming(alarm.index, alarm.time);
        return immer.produce(alarm_with_timing_update, function (draft) {
          draft.alarm_days.map(function (day) {
            day.completed = "false";
          });
        });
      });
    });
  }, 3600 * 1000);
};

exports.modelResetAllAlarmsCompleteStateEveryWeek = modelResetAllAlarmsCompleteStateEveryWeek;

var modelUpdateAlarmsTimingAndRemainingTimeProp = function modelUpdateAlarmsTimingAndRemainingTimeProp(alarmObj) {
  var rAlarmObj = alarmObj; // name as alarm_days

  var updateAlarmObj = modelSetAlarmAllDaysTiming(false, rAlarmObj.time, false, rAlarmObj);

  var _modelGetAlarmRemaini = modelGetAlarmRemainingTime(false, updateAlarmObj),
      remainingTimeInSec = _modelGetAlarmRemaini.remainingTimeInSec,
      remainingTimeStr = _modelGetAlarmRemaini.remainingTimeStr;

  updateAlarmObj = immer.produce(updateAlarmObj, function (draft) {
    draft.remainingTimeInSec = remainingTimeInSec;
    draft.remainingTimeStr = remainingTimeStr;
  });
  return updateAlarmObj;
};

exports.modelUpdateAlarmsTimingAndRemainingTimeProp = modelUpdateAlarmsTimingAndRemainingTimeProp;

var modelGetProperDayOrderAccToCurDay = function modelGetProperDayOrderAccToCurDay() {
  var include_cur_day_next_week = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  console.log("next", include_cur_day_next_week);
  var daysArr = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  var curDay = (0, _helper.getCurDay)();
  var cur_day_index = daysArr.indexOf(curDay);
  cur_day_index = cur_day_index === daysArr.length - 1 ? 0 : cur_day_index;
  var new_days_arr = immer.produce(daysArr, function (draft) {
    var new_day_arr = include_cur_day_next_week ? draft.slice(cur_day_index + 1) : draft.slice(cur_day_index);
    var left_day_count = draft.length - new_day_arr.length - 1;
    new_day_arr.push.apply(new_day_arr, _toConsumableArray(draft.slice(0, left_day_count + 1)));
    return new_day_arr;
  });
  return new_days_arr;
};

var modelIncreaseAlarmDayRingTime = function modelIncreaseAlarmDayRingTime(index, day, time) {
  var rIndex = Number(index);
  var alarm = modelGetAlarm(rIndex);
  var updateAlarm = immer.produce(alarm, function (draft) {
    var cur_alarm_day = draft.alarm_days.find(function (el) {
      return el.day === day;
    });
    cur_alarm_day.timing = Number(cur_alarm_day.timing) + Number(time) * 60 * 1000;

    var _modelCalulateRemaini = modelCalulateRemainingTimeProps(cur_alarm_day.timing),
        remainingTimeInSec = _modelCalulateRemaini.remainingTimeInSec,
        remainingTimeStr = _modelCalulateRemaini.remainingTimeStr;

    draft.remainingTimeInSec = remainingTimeInSec;
    draft.remainingTimeStr = remainingTimeStr;
  });
  console.log(updateAlarm);
  return updateAlarm;
}; // modelGetProperDayOrderAccToCurDay();
// modelSetAlarmAllDaysTiming(2, "10:00", true);


exports.modelIncreaseAlarmDayRingTime = modelIncreaseAlarmDayRingTime;
},{"../utils/_helper.js":"utils/_helper.js"}],"Controller/Components/Popup/AlarmCompletedPopupController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controlLoadAlarmCompletedPopup = void 0;

var _AlarmCompletedPopupView = _interopRequireDefault(require("../../../View/Components/AlarmRarelyUsedComponent/AlarmCompletedPopupView.js"));

var _alarmCardList = require("../CardList/alarmCardList.js");

var _alarmModel = require("../../../Model/alarmModel.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controlDismissAlarm = function controlDismissAlarm(propObj) {
  var index = propObj.index,
      day = propObj.day;
  (0, _alarmModel.modelSetAlarmDayCompleted)(index, day);
};

var controlSnoozeAlarm = function controlSnoozeAlarm(propObj) {
  var index = propObj.index,
      day = propObj.day,
      snoozeTimePeriod = propObj.snoozeTimePeriod;
  var updateAlarm = (0, _alarmModel.modelIncreaseAlarmDayRingTime)(index, day, Number(snoozeTimePeriod));
  (0, _alarmModel.modelReplaceAlarm)(index - 1, updateAlarm);
};

var controlAlarmCompleted = function controlAlarmCompleted(action, propObj) {
  if (action === "dismiss-alarm") controlDismissAlarm(propObj);
  if (action === "snooze-alarm-time") controlSnoozeAlarm(propObj);
  (0, _alarmCardList.controlLoadAlarms)();
};

var controlLoadAlarmCompletedPopup = function controlLoadAlarmCompletedPopup(index, day, tune) {
  var View = new _AlarmCompletedPopupView.default();
  var alarmObj = {
    index: index,
    day: day
  };
  View.render(alarmObj);

  View._show(tune);

  View.addHandlerPopup(controlAlarmCompleted);
};

exports.controlLoadAlarmCompletedPopup = controlLoadAlarmCompletedPopup;
},{"../../../View/Components/AlarmRarelyUsedComponent/AlarmCompletedPopupView.js":"View/Components/AlarmRarelyUsedComponent/AlarmCompletedPopupView.js","../CardList/alarmCardList.js":"Controller/Components/CardList/alarmCardList.js","../../../Model/alarmModel.js":"Model/alarmModel.js"}],"Controller/Components/Card/alarmCard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlarmCardView = exports.controlUpdateAlarmTime = exports.controlAlarm = void 0;

var _AlarmCardView = _interopRequireDefault(require("../../../View/Components/Card/AlarmCardView.js"));

var _AlarmCompletedPopupController = require("../Popup/AlarmCompletedPopupController.js");

var _alarmModel = require("../../../Model/alarmModel.js");

var _helper = require("../../../utils/_helper.js");

var _alarmCardList = require("../CardList/alarmCardList.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alarmSection = document.querySelector(".section-alarm");
var View;

var controlAlarm = function controlAlarm(action, alarm_index) {
  if (action === "start-alarm") (0, _alarmModel.modelUpdateAlarm)(alarm_index, {
    active: true
  });
  if (action === "pause-alarm") (0, _alarmModel.modelUpdateAlarm)(alarm_index, {
    active: false
  });
  if (action === "delete-alarm") (0, _alarmModel.modelDeleteAlarm)(alarm_index);
  (0, _alarmCardList.controlLoadAlarms)();
}; // dependent ---------------------------


exports.controlAlarm = controlAlarm;

var controlAlarmSettings = function controlAlarmSettings(alarm) {
  var active, ring_once, alarm_days;

  var _modelGetAlarmRemaini = (0, _alarmModel.modelGetAlarmRemainingTime)(alarm.index),
      remainingTimeInSec = _modelGetAlarmRemaini.remainingTimeInSec,
      remainingTimeStr = _modelGetAlarmRemaini.remainingTimeStr;

  remainingTimeInSec = Number(remainingTimeInSec); // check if alarm complete and then  alarming user alarm has completed

  if (remainingTimeInSec <= 0 && alarm.active === true) {
    var cur_day = (0, _helper.getCurDay)();
    (0, _AlarmCompletedPopupController.controlLoadAlarmCompletedPopup)(alarm.index, cur_day, alarm.alarm_tune);
  }

  if (remainingTimeInSec <= 0 && alarm.ring_once) {
    ring_once = false;
    active = false;
  }

  return {
    remainingTimeInSec: remainingTimeInSec,
    remainingTimeStr: remainingTimeStr,
    alarm_days: alarm_days,
    ring_once: ring_once,
    active: active
  };
};

var controlUpdateAlarmTime = function controlUpdateAlarmTime(alarm) {
  var updatedProp = controlAlarmSettings(alarm);
  (0, _alarmModel.modelUpdateAlarm)(alarm.index, updatedProp);
  return (0, _alarmModel.modelGetAllAlarms)();
}; // ------------------------------------------------------


exports.controlUpdateAlarmTime = controlUpdateAlarmTime;

var getAlarmCardView = function getAlarmCardView() {
  return View;
};

exports.getAlarmCardView = getAlarmCardView;

if (alarmSection) {
  View = new _AlarmCardView.default();
}
},{"../../../View/Components/Card/AlarmCardView.js":"View/Components/Card/AlarmCardView.js","../Popup/AlarmCompletedPopupController.js":"Controller/Components/Popup/AlarmCompletedPopupController.js","../../../Model/alarmModel.js":"Model/alarmModel.js","../../../utils/_helper.js":"utils/_helper.js","../CardList/alarmCardList.js":"Controller/Components/CardList/alarmCardList.js"}],"View/Components/Modal/AlarmModalView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ModalView2 = _interopRequireDefault(require("../../Common/ModalView.js"));

var _helper = require("../../../utils/_helper.js");

var _domFunction = require("../../../utils/_domFunction.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var AlarmModalView = /*#__PURE__*/function (_ModalView) {
  _inherits(AlarmModalView, _ModalView);

  var _super = _createSuper(AlarmModalView);

  function AlarmModalView() {
    _classCallCheck(this, AlarmModalView);

    return _super.apply(this, arguments);
  }

  _createClass(AlarmModalView, [{
    key: "_generateMarkUp",
    value: function _generateMarkUp(action, datasetObj) {
      if (action === "edit") return this._generateEditModalMarkUp(action, datasetObj);
      return this._generateAddModalMarkUp(action, datasetObj);
    }
  }, {
    key: "_generateEditModalMarkUp",
    value: function _generateEditModalMarkUp(action, datasetObj) {
      var datasets = JSON.parse(JSON.stringify(datasetObj)); // const days = JSON.parse()

      var days = JSON.parse(datasets.alarmDays);
      var tunes = ["cool", "io", "mdf", "mom", "pio", "risen", "roi"];

      var _datasets$time$split = datasets.time.split(":"),
          _datasets$time$split2 = _slicedToArray(_datasets$time$split, 2),
          hour = _datasets$time$split2[0],
          minute = _datasets$time$split2[1];

      var repeat_alarm_period = [5, 10, 20, 30, 50, 60];
      return "<div\n              class=\"modal-content\"\n              data-action=".concat(action, "\n              data-index=").concat(datasets.index, "\n              data-name=\"").concat(datasets.name, "\"\n              data-type=\"alarm\"\n              data-remaining-time-str=\"").concat(datasets.remainingTime, "\"   \n              data-alarm-tune=\"").concat(datasetObj.alarmTune, "\"\n              data-alarmRepeat-time-period=").concat(datasetObj.alarmRepeatTimePeriod, "\n            >\n              <button\n                class=\"timerCard__header-btn card-header__btn btn-icon--square\"\n                data-action=\"delete\"\n              >\n                <!-- <i class=\"icon fa fa-compress\"></i> -->\n                <i class=\"fas fa-trash-alt\"></i>\n              </button>\n              <h5 class=\"h-5 mg-bg\">").concat(action.slice(0, 1).toUpperCase() + action.slice(1), " alarm</h5>\n\n              <div class=\"modal-boxs mg-bg\" data-disabled=\"false\">\n                <div class=\"modal-box\" data-active=\"true\" data-time-unit=\"hour\">\n                  <button\n                    class=\"modal-box__btn btn-icon--square\"\n                    data-action=\"increase\"\n                  >\n                    <i class=\"fas fa-angle-up\"></i>\n                  </button>\n                  <p\n                    type=\"text\"\n                    class=\"modal-time__value\"\n                    data-value=\"").concat(hour, "\"\n                    data-unit=\"hour\"\n                  >\n                   ").concat(hour, "\n                  </p>\n                  <button\n                    class=\"modal-box__btn btn-icon--square\"\n                    data-action=\"decrease\"\n                  >\n                    <i class=\"fas fa-angle-down\"></i>\n                  </button>\n                </div>\n                <i class=\"fas fa-ellipsis-v icon--dim icon--bg\"></i>\n                <div\n                  class=\"modal-box\"\n                  data-active=\"false\"\n                  data-time-unit=\"minute\"\n                >\n                  <button\n                    class=\"modal-box__btn btn-icon--square\"\n                    data-action=\"increase\"\n                  >\n                    <i class=\"fas fa-angle-up\"></i>\n                  </button>\n                  <p\n                    type=\"text\"\n                    data-value=\"").concat(minute, "\"\n                    data-unit=\"minute\"\n                    class=\"modal-time__value\"\n                  >\n                    ").concat(minute, "\n                  </p>\n                  <button\n                    class=\"modal-box__btn btn-icon--square\"\n                    data-action=\"decrease\"\n                  >\n                    <i class=\"fas fa-angle-down\"></i>\n                  </button>\n                </div>\n              </div>\n\n              <div class=\"modal-input__box mg-sm\" data-active=\"false\">\n                <i class=\"fas fa-edit icon--md\"></i>\n                <input type=\"text\" name=\"name\" class=\"modal-name__input\" value=\"").concat(datasets.name, "\" />\n              </div>\n\n              <div class=\"modal-input__box mg-sm\" >\n              <button class=\"btn-checkbox\" data-action=\"toggle-all-set-alarms\" data-active=").concat(datasetObj.ring_day_set ? true : false, ">\n                <i class=\"fa fa-check icon--md\"></i>\n              </button>\n              <p class=\"paragraph\">Repeat alarm</p>\n            </div>\n\n              <div class=\"alarm-days mg-sm\">\n              \n                  ").concat(days.map(function (alarm_day) {
        return "      \n                      <button\n                        class=\"alarm-dayBtn btn-icon--primary\"\n                        data-day=".concat(alarm_day.day, "\n                        data-active=\"").concat(alarm_day.active, "\"\n                        data-completed=\"").concat(alarm_day.completed, "\"\n                      >\n                        <span class=\"alarm-dayName\">").concat(alarm_day.day, "</span>\n                      </button>");
      }).join(""), "\n            </div>\n\n              <div class=\"modal-input__box mg-sm\" data-action=\"set-alarm-tune\">\n                <i class=\"fas fa-music icon--md\"></i>\n  \n                <div class=\"modal-input__content dropdown-parent\" data-active=\"false\">\n\n                  <input type=\"text\" class=\"modal-input\" data-action=\"set-alarm-tune\" name=\"alarm_tune\" value=\"").concat(datasetObj.alarmTune, "\" />\n\n                  <div class=\"dropdown dropdown-scale-middle\">\n                    <div class=\"list\">\n                        ").concat(tunes.map(function (value) {
        return "<div class=\"list-item\" data-value=\"".concat(value, "\">\n                                  <span class=\"list-text\">").concat(value, " </span>\n                                  <i class=\"fa fa-play\"></i>\n                              </div>");
      }).join(""), "\n                   \n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div\n                class=\"modal-input__box mg-md\"\n                data-active=\"false\" \n                data-action=\"set-repeat-alarm-timer-period\"\n           \n              >\n                <i class=\"fas fa-bell icon--md\"></i>\n\n                <div class=\"modal-input__content dropdown-parent\">\n                  <input\n                    type=\"text\"\n                    class=\"modal-input modal-input-repeat\"\n                    name=\"repeat_alarm_time_period\"\n                    data-action=\"set-repeat-alarm-timer-period\"\n                    value=\"").concat(datasetObj.alarmRepeatTimePeriod, " minutes\"\n                  />\n                  <div class=\"dropdown dropdown-scale-middle\">\n                    <div class=\"list\">\n                        <div class=\"list-item\" data-value=\"disabled\">\n                        <span class=\"list-text\">Disabled</span>\n                      </div>\n                        ").concat(repeat_alarm_period.map(function (value) {
        return "<div class=\"list-item\" data-value=\"".concat(value, "\">\n                                  <span class=\"list-text\">").concat(value, " minutes</span>\n                              </div>");
      }).join(""), "\n                        </div>\n                      </div>\n                </div>\n              </div>\n\n              <div class=\"modal-crud__btns\">\n                <button class=\"modal-crud__btn btn--primary\" data-action=\"save\">\n                  <i class=\"fas fa-save\"></i>\n                  <span>Save</span>\n                </button>\n                <button class=\"modal-crud__btn btn--outline\" data-action=\"cancel\">\n                  <i class=\"fas fa-times\"></i>\n                  <span>Cancel</span>\n                </button>\n              </div>\n            </div>");
    }
  }, {
    key: "_generateAddModalMarkUp",
    value: function _generateAddModalMarkUp(action, datasetObj) {
      var index = datasetObj.index,
          name = datasetObj.name,
          remainingTimeStr = datasetObj.remainingTimeStr;

      var _remainingTimeStr$spl = remainingTimeStr.split(":"),
          _remainingTimeStr$spl2 = _slicedToArray(_remainingTimeStr$spl, 2),
          hour = _remainingTimeStr$spl2[0],
          minute = _remainingTimeStr$spl2[1];

      var days = [{
        day: "Mo",
        active: "false",
        completed: "false"
      }, {
        day: "Tu",
        active: "false",
        completed: "false"
      }, {
        day: "We",
        active: "false",
        completed: "false"
      }, {
        day: "Th",
        active: "false",
        completed: "false"
      }, {
        day: "Fr",
        active: "false",
        completed: "false"
      }, {
        day: "Sa",
        active: "false",
        completed: "false"
      }, {
        day: "Su",
        active: false,
        completed: "false"
      }];
      var repeat_time_period = [5, 10, 20, 30, 50, 60];
      var tunes = ["cool", "io", "mdf", "mom", "pio", "risen", "roi"];
      return "<div\n              class=\"modal-content\"\n              data-action=".concat(action, "\n              data-index=").concat(index, "\n              data-name=\"").concat(name, "\"\n              data-type=\"alarm\"\n              data-remaining-time-str=\"").concat(remainingTimeStr, "\"   \n              \n            >\n              <button\n                class=\"timerCard__header-btn card-header__btn btn-icon--square\"\n                data-action=\"delete\"\n              >\n                <!-- <i class=\"icon fa fa-compress\"></i> -->\n                <i class=\"fas fa-trash-alt\"></i>\n              </button>\n              <h5 class=\"h-5 mg-bg\">").concat(action.slice(0, 1).toUpperCase() + action.slice(1), " alarm</h5>\n\n              <div class=\"modal-boxs mg-bg\" data-disabled=\"false\">\n                <div class=\"modal-box\" data-active=\"true\" data-time-unit=\"hour\">\n                  <button\n                    class=\"modal-box__btn btn-icon--square\"\n                    data-action=\"increase\"\n                  >\n                    <i class=\"fas fa-angle-up\"></i>\n                  </button>\n                  <p\n                    type=\"text\"\n                    class=\"modal-time__value\"\n                    data-value=\"").concat(hour, "\"\n                    data-unit=\"hour\"\n                  >\n                   ").concat(hour, "\n                  </p>\n                  <button\n                    class=\"modal-box__btn btn-icon--square\"\n                    data-action=\"decrease\"\n                  >\n                    <i class=\"fas fa-angle-down\"></i>\n                  </button>\n                </div>\n                <i class=\"fas fa-ellipsis-v icon--dim icon--bg\"></i>\n                <div\n                  class=\"modal-box\"\n                  data-active=\"false\"\n                  data-time-unit=\"minute\"\n                >\n                  <button\n                    class=\"modal-box__btn btn-icon--square\"\n                    data-action=\"increase\"\n                  >\n                    <i class=\"fas fa-angle-up\"></i>\n                  </button>\n                  <p\n                    type=\"text\"\n                    data-value=\"").concat(minute, "\"\n                    data-unit=\"minute\"\n                    class=\"modal-time__value\"\n                  >\n                    ").concat(minute, "\n                  </p>\n                  <button\n                    class=\"modal-box__btn btn-icon--square\"\n                    data-action=\"decrease\"\n                  >\n                    <i class=\"fas fa-angle-down\"></i>\n                  </button>\n                </div>\n              </div>\n\n              <div class=\"modal-input__box mg-sm\" data-active=\"false\">\n                <i class=\"fas fa-edit icon--md\"></i>\n                <input type=\"text\" name=\"name\" class=\"modal-name__input\" value=\"").concat(name, "\" />\n              </div>\n\n              <div class=\"modal-input__box mg-sm\" >\n              <button class=\"btn-checkbox\" data-action=\"toggle-all-set-alarms\" data-active=\"false\">\n                <i class=\"fa fa-check icon--md\"></i>\n              </button>\n              <p class=\"paragraph\">Repeat alarm</p>\n            </div>\n\n              <div class=\"alarm-days mg-sm\">\n              \n                  ").concat(days.map(function (alarm_day) {
        return "      \n                      <button\n                        class=\"alarm-dayBtn btn-icon--primary\"\n                        data-day=".concat(alarm_day.day, "\n                        data-active=\"").concat(alarm_day.active, "\"\n                        data-completed=\"").concat(alarm_day.completed, "\"\n                      >\n                        <span class=\"alarm-dayName\">").concat(alarm_day.day, "</span>\n                      </button>");
      }).join(""), "\n            </div>\n\n              <div class=\"modal-input__box mg-sm\" data-action=\"set-alarm-tune\">\n                <i class=\"fas fa-music icon--md\"></i>\n  \n                <div class=\"modal-input__content dropdown-parent\" data-active=\"false\">\n\n                  <input type=\"text\" class=\"modal-input\" data-action=\"set-alarm-tune\" name=\"alarm_tune\" value=\"").concat(tunes[0], "\" />\n\n                  <div class=\"dropdown dropdown-scale-middle\">\n                    <div class=\"list\">\n                        ").concat(tunes.map(function (value) {
        return "<div class=\"list-item\" data-value=\"".concat(value, "\">\n                                  <span class=\"list-text\">").concat(value, " </span>\n                                  <i class=\"fa fa-play\"></i>\n                              </div>");
      }).join(""), "\n                   \n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div\n                class=\"modal-input__box mg-md\"\n                data-active=\"false\" \n                data-action=\"set-repeat-alarm-timer-period\"\n           \n              >\n                <i class=\"fas fa-bell icon--md\"></i>\n\n                <div class=\"modal-input__content dropdown-parent\">\n                  <input\n                    type=\"text\"\n                    class=\"modal-input modal-input-repeat\"\n                    name=\"repeat_alarm_time_period\"\n                    data-action=\"set-repeat-alarm-timer-period\"\n                    value=\"10 minutes\"\n                  />\n                  <div class=\"dropdown dropdown-scale-middle\">\n                    <div class=\"list\">\n                        <div class=\"list-item\" data-value=\"disabled\">\n                        <span class=\"list-text\">Disabled</span>\n                      </div>\n                        ").concat(repeat_time_period.map(function (value) {
        return "<div class=\"list-item\" data-value=\"".concat(value, "\">\n                                  <span class=\"list-text\">").concat(value, " minutes</span>\n                              </div>");
      }).join(""), "\n                        </div>\n                      </div>\n                </div>\n              </div>\n\n              <div class=\"modal-crud__btns\">\n                <button class=\"modal-crud__btn btn--primary\" data-action=\"save\">\n                  <i class=\"fas fa-save\"></i>\n                  <span>Save</span>\n                </button>\n                <button class=\"modal-crud__btn btn--outline\" data-action=\"cancel\">\n                  <i class=\"fas fa-times\"></i>\n                  <span>Cancel</span>\n                </button>\n              </div>\n            </div>");
    }
  }, {
    key: "showAddModal",
    value: function showAddModal(CardListView, cardType) {
      var name, index, remainingTimeStr;
      index = CardListView.generateNewCardNumber();
      name = "".concat(cardType, " (").concat(index, ")");
      remainingTimeStr = "00:00";
      var datasetObj = {
        name: name,
        index: index,
        remainingTimeStr: remainingTimeStr
      };
      this.show("add", datasetObj);
    }
  }, {
    key: "show",
    value: function show(action, datasetObj) {
      this.render(action, datasetObj);
      (0, _domFunction.replaceClass)(this._topParentEl, "hidden", "display");
    }
  }, {
    key: "_getInputRepeatEl",
    value: function _getInputRepeatEl() {
      return this._parentElContainerEl.querySelector(".modal-input-repeat");
    } // CSS ***********************************************
    // updateAdditionalCSS(target) {
    //   // toggle display of dropdown list
    //   const dropdownParentEl = target.closest(".dropdown-parent");
    //   if (!dropdownParentEl) return;
    //   let { active } = dropdownParentEl.dataset;
    //   active = active === "true" ? "false" : "true";
    //   dropdownParentEl.dataset.active = active;
    // }
    // COMMON

  }, {
    key: "_getAllDropdownParentEls",
    value: function _getAllDropdownParentEls() {
      return _toConsumableArray(document.querySelectorAll(".dropdown-parent"));
    }
  }, {
    key: "_getAllAlarmsDayBtns",
    value: function _getAllAlarmsDayBtns() {
      return _toConsumableArray(this._parentEl.querySelectorAll(".alarm-dayBtn"));
    }
  }, {
    key: "_showOnlyClickedDropdownList",
    value: function _showOnlyClickedDropdownList(curDropdownParent) {
      var allDropdownParentEls = this._getAllDropdownParentEls();

      allDropdownParentEls.forEach(function (parent) {
        if (parent === curDropdownParent) {
          parent.dataset.active = "true";
          return;
        }

        parent.dataset.active = "false";
      });
    }
  }, {
    key: "_hideAllDropdownList",
    value: function _hideAllDropdownList() {
      var allDropdownParentEls = this._getAllDropdownParentEls();

      allDropdownParentEls.forEach(function (el) {
        return el.dataset.active = "false";
      });
    }
  }, {
    key: "_setClickDropdownItemValueInInput",
    value: function _setClickDropdownItemValueInInput(target) {
      var inputUnitValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      var el = target.closest(".dropdown-parent");
      if (!el) return;

      this._showOnlyClickedDropdownList(el);

      var curlistItemClickedEl = target.closest(".list-item");
      if (!curlistItemClickedEl) return;
      var curlistItemClickedElValue = target.closest(".list-item").dataset.value;
      var input = el.querySelector("input");
      input.value = curlistItemClickedElValue === "disabled" ? "disabled" : curlistItemClickedElValue + " " + inputUnitValue;
      return true;
    } // HANDLE *********************************************
    // handle 1

  }, {
    key: "_handleSetAlarmDay",
    value: function _handleSetAlarmDay(target, handle) {
      var btn = target.closest(".alarm-dayBtn");
      if (!btn) return;
      var _btn$dataset = btn.dataset,
          day = _btn$dataset.day,
          active = _btn$dataset.active;
      active = active === "true" ? "false" : "true";
      btn.dataset.active = active; // handle("alarm-on-day-set", this.cardIndex, { day, active });
    } // handle 2

  }, {
    key: "_handleToggleAllAlarmsDay",
    value: function _handleToggleAllAlarmsDay(target) {
      var btn = target.closest('button[data-action="toggle-all-set-alarms"]');
      if (!btn) return;
      var active = btn.dataset.active;
      active = active === "true" ? false : true;
      btn.dataset.active = active;

      var allAlarmDayBtns = this._getAllAlarmsDayBtns();

      allAlarmDayBtns.forEach(function (el) {
        return el.dataset.active = active;
      });
    } // handle 3

  }, {
    key: "_handleSetAlarmTune",
    value: function _handleSetAlarmTune(target) {
      if (!target.closest('.modal-input__box[data-action="set-alarm-tune"]')) return; // need to hide repeat input as it is creating problem

      this._getInputRepeatEl().classList.add("hidden"); // play muisc if play btn clickded


      var audio = document.querySelector("audio");
      var playBtn = target.closest(".fa-play");

      if (playBtn) {
        var song = target.closest(".list-item").dataset.value;
        audio.src = "../../../music/".concat(song, ".mp3");
        audio.play();
        return;
      } // alarm tune set


      var done = this._setClickDropdownItemValueInInput(target);

      if (done === true) {
        audio.pause();

        this._hideAllDropdownList();

        this._getInputRepeatEl().classList.remove("hidden");

        return;
      }
    } // handle 4

  }, {
    key: "_handleSetAlarmRepeatTimePeriod",
    value: function _handleSetAlarmRepeatTimePeriod(target) {
      if (!target.closest('.modal-input__box[data-action="set-repeat-alarm-timer-period"]')) return;

      var done = this._setClickDropdownItemValueInInput(target, "minutes");

      if (done) this._hideAllDropdownList();
    } // handle 5

  }, {
    key: "_unSelectDisplayElsWhenLoseFocus",
    value: function _unSelectDisplayElsWhenLoseFocus(target) {
      if (!target.closest(".dropdown-parent")) {
        this._getInputRepeatEl().classList.remove("hidden");

        this._hideAllDropdownList();

        document.querySelector("audio").pause();
      }
    }
  }, {
    key: "saveCardUpdatedValues",
    value: function saveCardUpdatedValues(action, index, handle) {
      var active;
      var dayArr = [];
      var ring_day_set = false;
      var name = this.getUpdateCardName();
      var timeValues = this.getUpdatedCardTime();

      var allInputs = _toConsumableArray(this._parentEl.querySelectorAll("input"));

      var dataObj = allInputs.reduce(function (obj, input) {
        obj[input.name] = input.value;
        return obj;
      }, {});
      dataObj["repeat_alarm_time_period"] = dataObj["repeat_alarm_time_period"].split(" ")[0];

      var allDaysBtns = this._getAllAlarmsDayBtns();

      allDaysBtns.forEach(function (btn) {
        var dayProp = {};
        dayProp.day = btn.dataset.day;
        dayProp.active = btn.dataset.active;
        dayProp.completed = btn.dataset.completed;
        if (btn.dataset.active === "true") ring_day_set = true;
        dayArr.push(dayProp);
      });
      dataObj.alarm_days = dayArr;
      var timeInSeconds = timeValues.duration,
          time = timeValues.remainingTimeStr;
      time = time.split(":").slice(0, 2).join(":");
      var remainingTimeStr = (0, _helper.calculateRemainingTimeStr)(time);
      active = ring_day_set ? true : false;
      handle(action, index, _objectSpread({
        name: name,
        time: time,
        ring_day_set: ring_day_set,
        active: active
      }, dataObj));
      this.hide();
    }
  }, {
    key: "handleAdditionBtns",
    value: function handleAdditionBtns(target, handle) {
      // handle set or unset alarm on days
      this._handleSetAlarmDay(target, handle); // handle toggle all alarm on days by clicking checbox


      this._handleToggleAllAlarmsDay(target); // show dropdown list of tunes


      this._handleSetAlarmTune(target); // show dropdown list of alarm repeat time period


      this._handleSetAlarmRepeatTimePeriod(target); // hide when component lose focus and remove some other things
      // like pause song and show repeat input


      this._unSelectDisplayElsWhenLoseFocus(target);
    }
  }, {
    key: "addHandlerModal",
    value: function addHandlerModal(handle) {
      this.handleModal(handle); //
    }
  }]);

  return AlarmModalView;
}(_ModalView2.default);

var _default = AlarmModalView;
exports.default = _default;
},{"../../Common/ModalView.js":"View/Common/ModalView.js","../../../utils/_helper.js":"utils/_helper.js","../../../utils/_domFunction.js":"utils/_domFunction.js"}],"Controller/Components/Modal/alarmModal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controlAddAlarm = exports.controlUpdateAlarm = exports.getAlarmModalView = void 0;

var _AlarmModalView = _interopRequireDefault(require("../../../View/Components/Modal/AlarmModalView.js"));

var _alarmModel = require("../../../Model/alarmModel.js");

var _alarmCardList = require("../CardList/alarmCardList.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// get u new remaining time from update alarm time
var View;
var alarmModal = document.querySelector(".alarm");

var getAlarmModalView = function getAlarmModalView() {
  return View;
};

exports.getAlarmModalView = getAlarmModalView;

var controlUpdateAlarm = function controlUpdateAlarm(index, updateProp) {
  var updateAlarm = (0, _alarmModel.modelUpdateAlarmsTimingAndRemainingTimeProp)(updateProp);
  (0, _alarmModel.modelUpdateAlarm)(index, updateAlarm);
};

exports.controlUpdateAlarm = controlUpdateAlarm;

var controlAddAlarm = function controlAddAlarm(index, alarm) {
  var updatedAlarm = (0, _alarmModel.modelUpdateAlarmsTimingAndRemainingTimeProp)(alarm);
  var newAlarmObj = immer.produce(updatedAlarm, function (draft) {
    draft.index = index;
  });
  (0, _alarmModel.modelCreateAlarm)(newAlarmObj);
}; // function action on alarm obj in model


exports.controlAddAlarm = controlAddAlarm;

var controlAlarmModal = function controlAlarmModal(action, index, updateProp) {
  index = Number(index);
  if (action === "edit") controlUpdateAlarm(index, updateProp);
  if (action === "add") controlAddAlarm(index, updateProp);
  (0, _alarmCardList.controlLoadAlarms)();
};

if (alarmModal) {
  View = new _AlarmModalView.default();
  View.addHandlerModal(controlAlarmModal);
}
},{"../../../View/Components/Modal/AlarmModalView.js":"View/Components/Modal/AlarmModalView.js","../../../Model/alarmModel.js":"Model/alarmModel.js","../CardList/alarmCardList.js":"Controller/Components/CardList/alarmCardList.js"}],"Controller/Components/CardList/alarmCardList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlarmCardListView = exports.controlLoadAlarms = void 0;

var _AlarmCardListView = _interopRequireDefault(require("../../../View/Components/CardList/AlarmCardListView.js"));

var _alarmCard = require("../Card/alarmCard.js");

var _alarmModal = require("../Modal/alarmModal.js");

var _alarmModel = require("../../../Model/alarmModel.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alarmListEl = document.querySelector(".alarm__list");
var View;

var controlLoadAlarms = function controlLoadAlarms() {
  var alarmsArr = (0, _alarmModel.modelGetAllAlarms)();
  View.render(alarmsArr);
};

exports.controlLoadAlarms = controlLoadAlarms;

var getAlarmCardListView = function getAlarmCardListView() {
  return View;
}; // // this function should be written in alarmCardView
// const controlAlarms = (action,alarm_index) => {
// };


exports.getAlarmCardListView = getAlarmCardListView;

var inititalAlarmsRender = function inititalAlarmsRender() {
  var alarmsArr = (0, _alarmModel.modelGetAllAlarms)();
  alarmsArr.forEach(function (alarm) {
    (0, _alarmModel.modelSetAlarmAllDaysTiming)(alarm.index, alarm.time, true);
    var updatedAlarmArr = (0, _alarmCard.controlUpdateAlarmTime)(alarm);
    View.render(updatedAlarmArr);
  });
};

var controlUpdateAlarmsTime = function controlUpdateAlarmsTime() {
  inititalAlarmsRender();
  var setInterValID = setInterval(function () {
    var alarmsArr = (0, _alarmModel.modelGetAllAlarms)();
    alarmsArr.forEach(function (alarm) {
      var updatedAlarmArr = (0, _alarmCard.controlUpdateAlarmTime)(alarm);
      View.render(updatedAlarmArr);
    });
  }, 60 * 1000);
};

if (alarmListEl) {
  View = new _AlarmCardListView.default();
  controlLoadAlarms(); // update time every minute

  controlUpdateAlarmsTime(); // reset alarm completed state every week

  (0, _alarmModel.modelResetAllAlarmsCompleteStateEveryWeek)(); //////////////////////////////////////////////////////

  var AlarmCardView = (0, _alarmCard.getAlarmCardView)();
  var AlarmModalView = (0, _alarmModal.getAlarmModalView)();
  View.addHandlerCardList(_alarmCard.controlAlarm, AlarmCardView, AlarmModalView);
}
},{"../../../View/Components/CardList/AlarmCardListView.js":"View/Components/CardList/AlarmCardListView.js","../Card/alarmCard.js":"Controller/Components/Card/alarmCard.js","../Modal/alarmModal.js":"Controller/Components/Modal/alarmModal.js","../../../Model/alarmModel.js":"Model/alarmModel.js"}],"View/Components/Crud/AlarmCrudView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CrudView2 = _interopRequireDefault(require("../../Common/CrudView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var AlarmCrudView = /*#__PURE__*/function (_CrudView) {
  _inherits(AlarmCrudView, _CrudView);

  var _super = _createSuper(AlarmCrudView);

  function AlarmCrudView() {
    var _this;

    _classCallCheck(this, AlarmCrudView);

    _this = _super.call(this);

    _this.setAccoringToPage();

    return _this;
  }

  _createClass(AlarmCrudView, [{
    key: "setAccoringToPage",
    value: function setAccoringToPage() {
      this.render("alarm");
    }
  }, {
    key: "addHandlerBtns",
    value: function addHandlerBtns(handle, AlarmCardListView, AlarmModalView) {
      this.handleBtns(handle, AlarmCardListView, AlarmModalView, "alarm");
    }
  }]);

  return AlarmCrudView;
}(_CrudView2.default); // index = AlarmCardListView.generateNewCardNumber();
// name=`Alarm(index)`
// time:"00:00:00"
// duration:0
// type:'Alarm'


var _default = AlarmCrudView;
exports.default = _default;
},{"../../Common/CrudView.js":"View/Common/CrudView.js"}],"Controller/Components/Crud/alarmCrud.js":[function(require,module,exports) {
"use strict";

var _AlarmCrudView = _interopRequireDefault(require("../../../View/Components/Crud/AlarmCrudView.js"));

var _alarmCardList = require("../CardList/alarmCardList.js");

var _alarmModal = require("../Modal/alarmModal.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timerCrudEl = document.querySelector('.crud-btns[data-page="alarm"]');

var controlCrudBtns = function controlCrudBtns(action) {};

if (timerCrudEl) {
  var View = new _AlarmCrudView.default();
  var AlarmCardListView = (0, _alarmCardList.getAlarmCardListView)();
  var AlarmModalView = (0, _alarmModal.getAlarmModalView)();
  View.addHandlerBtns(controlCrudBtns, AlarmCardListView, AlarmModalView); // View.addHandlerBtns(controlCrudBtns, AlarmCardListView);
}
},{"../../../View/Components/Crud/AlarmCrudView.js":"View/Components/Crud/AlarmCrudView.js","../CardList/alarmCardList.js":"Controller/Components/CardList/alarmCardList.js","../Modal/alarmModal.js":"Controller/Components/Modal/alarmModal.js"}],"View/Pages/StopWatchView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var StopWatchView = /*#__PURE__*/function () {
  function StopWatchView() {
    _classCallCheck(this, StopWatchView);

    _defineProperty(this, "_parentEl", document.querySelector(".stopwatch"));

    _defineProperty(this, "_hourEl", this._parentEl.querySelector('span[data-field="hour"]'));

    _defineProperty(this, "_minEl", this._parentEl.querySelector('span[data-field="min"]'));

    _defineProperty(this, "_secEl", this._parentEl.querySelector('span[data-field="sec"]'));

    _defineProperty(this, "_miliSecEl", this._parentEl.querySelector('span[data-field="mili-sec"]'));

    _defineProperty(this, "_timeMarkedContainer", this._parentEl.querySelector(".stopwatch-checkpoint"));

    _defineProperty(this, "_timeMarkedList", this._parentEl.querySelector(".stopwatch-checkpoint-list"));

    _defineProperty(this, "_stopwatchIntervalID", void 0);
  }

  _createClass(StopWatchView, [{
    key: "renderTimeMarkedList",
    value: function renderTimeMarkedList(arr) {
      var _this = this;

      var html = arr.map(function (time_marked_obj) {
        var index = time_marked_obj.index,
            mark_timing_rank = time_marked_obj.mark_timing_rank,
            mark_timing = time_marked_obj.mark_timing,
            mark_timing_gap = time_marked_obj.mark_timing_gap;
        return "  \n              <li class=\"stopwatch-checkpoint-item\" data-index=".concat(index, " data-mark-timing=").concat(mark_timing, ">\n                  <p class=\"t--sm stopwatch-checkpoint-item-details\">\n                  <span class=\"stopwatch-checkpoint-item-index\"> ").concat(index, " </span>\n                  <span class=\"stopwatch-checkpoint-item-mark_time_rank\">").concat(mark_timing_rank ? mark_timing_rank : "", "</span>\n                  </p>\n                  <p class=\"t--sm stopwatch-checkpoint-item-time\">").concat(_this._formatTime(mark_timing_gap).time_str, "</p>\n                  <p class=\"t--sm stopwatch-checkpoint-item-total\">").concat(_this._formatTime(mark_timing).time_str, "</p>\n              </li>");
      }).join("");
      this._timeMarkedList.innerHTML = "";

      this._timeMarkedList.insertAdjacentHTML("beforeend", html);
    } // HEADER BTNS --------------------------------

  }, {
    key: "_handleExpandViewBtn",
    value: function _handleExpandViewBtn(target) {
      var btn = target.closest('button[data-action="expand-stopwatch-view"]');
      if (!btn) return;
      this._parentEl.dataset.expandView = true;
    }
  }, {
    key: "_handleNormalViewBtn",
    value: function _handleNormalViewBtn(target) {
      var btn = target.closest('button[data-action="normal-stopwatch-view"]');
      if (!btn) return;
      this._parentEl.dataset.expandView = false;
      this._parentEl.dataset.miniView = false;
    }
  }, {
    key: "_handleMiniViewBtn",
    value: function _handleMiniViewBtn(target) {
      var btn = target.closest('button[data-action="mini-stopwatch-view"]');
      if (!btn) return;
      this._parentEl.dataset.miniView = true;
    } // FOOTER BTNS

  }, {
    key: "_formatTime",
    value: function _formatTime(time_in_milisec) {
      var hour = Math.floor(time_in_milisec / (3600 * 1000));
      var min = Math.floor(time_in_milisec % (3600 * 1000) / (60 * 1000));
      var sec = Math.floor(time_in_milisec % (3600 * 1000) % (60 * 1000) / 1000);
      var mili_sec = Math.floor(time_in_milisec % (3600 * 1000) % (60 * 1000) % 1000);
      var hour_str = hour < 10 ? "0".concat(hour) : hour;
      var min_str = min < 10 ? "0".concat(min) : min;
      var sec_str = sec < 10 ? "0".concat(sec) : sec;
      var duration_mili_sec = mili_sec / 10;
      var mili_sec_str = duration_mili_sec < 10 ? "0".concat(duration_mili_sec) : duration_mili_sec;
      var time_str = " ".concat(hour_str, ":").concat(min_str, ":").concat(sec_str, ".").concat(mili_sec_str);
      return {
        hour_str: hour_str,
        min_str: min_str,
        sec_str: sec_str,
        mili_sec_str: mili_sec_str,
        time_str: time_str
      };
    }
  }, {
    key: "_handlePlayBtn",
    value: function _handlePlayBtn(target) {
      var _this2 = this;

      var btn = target.closest('button[data-action="start-stopwatch"]');
      if (!btn) return;
      this._parentEl.dataset.startStopwatch = true;
      var timeCoveredInMiliSec = this._parentEl.dataset.timeCoveredInMiliSec;
      timeCoveredInMiliSec = Number(timeCoveredInMiliSec); // mutating variable outside its function

      var duration_covered_in_milisec = timeCoveredInMiliSec > 0 ? timeCoveredInMiliSec : 0;
      this._stopwatchIntervalID = setInterval(function () {
        duration_covered_in_milisec += 10;
        _this2._parentEl.dataset.timeCoveredInMiliSec = duration_covered_in_milisec;

        var _this2$_formatTime = _this2._formatTime(duration_covered_in_milisec),
            hour_str = _this2$_formatTime.hour_str,
            min_str = _this2$_formatTime.min_str,
            sec_str = _this2$_formatTime.sec_str,
            mili_sec_str = _this2$_formatTime.mili_sec_str,
            time_str = _this2$_formatTime.time_str;

        _this2._parentEl.dataset.timeStr = time_str;
        _this2._hourEl.textContent = hour_str;
        _this2._minEl.textContent = min_str;
        _this2._secEl.textContent = sec_str;
        _this2._miliSecEl.textContent = mili_sec_str;
      }, 10);
    }
  }, {
    key: "_handlePauseBtn",
    value: function _handlePauseBtn(target, handle) {
      var btn = target.closest('button[data-action="pause-stopwatch"]');
      if (!btn) return;
      this._parentEl.dataset.startStopwatch = false;
      clearInterval(this._stopwatchIntervalID);
      var _this$_parentEl$datas = this._parentEl.dataset,
          time_covered_in_mili_sec = _this$_parentEl$datas.timeCoveredInMiliSec,
          time_str = _this$_parentEl$datas.timeStr;
      handle("update-time-props", {
        time_covered_in_mili_sec: time_covered_in_mili_sec,
        time_str: time_str
      });
    }
  }, {
    key: "_handleResetBtn",
    value: function _handleResetBtn(target, handle) {
      var btn = target.closest('button[data-action="reset-stopwatch"]');
      if (!btn) return;
      clearInterval(this._stopwatchIntervalID);
      this._parentEl.dataset.startStopwatch = false;
      this._parentEl.dataset.timeCoveredInMiliSec = 0;
      this._hourEl.textContent = this._minEl.textContent = this._secEl.textContent = this._miliSecEl.textContent = "00";
      handle("update-time-props", {
        time_str: "00:00:00.0",
        time_covered_in_mili_sec: 0,
        time_marked_arr: []
      });
    }
  }, {
    key: "_handleMarkTimingBtn",
    value: function _handleMarkTimingBtn(target, handle) {
      var btn = target.closest('[data-action="bookmark-current-time"]');
      if (!btn) return;
      var timeCoveredInMiliSec = this._parentEl.dataset.timeCoveredInMiliSec;

      var timeMarkedListArr = _toConsumableArray(this._timeMarkedContainer.querySelectorAll(".stopwatch-checkpoint-item")); // get the last item if arr is empty then not empty arr


      var timeMarkedItem = timeMarkedListArr.slice(0);
      var index = timeMarkedListArr.length === 0 ? 1 : Number(timeMarkedItem[0].dataset.index) + 1;
      var mark_timing_gap = timeMarkedListArr.length === 0 ? Number(timeCoveredInMiliSec) : Number(timeCoveredInMiliSec) - Number(timeMarkedItem[0].dataset.markTiming); // get the new index and also marked_time_gap from previosu one

      var time_marked_obj = {
        index: index,
        mark_timing: timeCoveredInMiliSec,
        mark_timing_gap: mark_timing_gap
      };
      handle("add-time-marked", time_marked_obj);
    }
  }, {
    key: "addHandlerStopWatch",
    value: function addHandlerStopWatch(handle) {
      var _this3 = this;

      this._parentEl.addEventListener("click", function (e) {
        var target = e.target; // headers btns

        _this3._handleExpandViewBtn(target);

        _this3._handleNormalViewBtn(target);

        _this3._handleMiniViewBtn(target); // footer btns


        _this3._handlePlayBtn(target);

        _this3._handlePauseBtn(target, handle);

        _this3._handleResetBtn(target, handle);

        _this3._handleMarkTimingBtn(target, handle);
      });
    }
  }]);

  return StopWatchView;
}();

var _default = StopWatchView;
exports.default = _default;
},{}],"Model/stopwatchModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modelGetTimerMarkedArrWithFastestAndSlowestTimeMarkedMention = exports.modelGetTimeMarkedArr = exports.modelGetStopwatch = exports.modelAddTimeMarked = exports.modelUpdateTimeProps = exports.modelCreateStopwatch = void 0;
//
// every  time related prop hhere is in milisec
var state = {
  time_covered_in_mili_sec: 0,
  time_str: "00:00:00",
  time_marked_arr: [// { mark_timing,mark_timing_gap}
  ]
}; // Modification related -----------------------------------------

var modelCreateStopwatch = function modelCreateStopwatch(stopwatch_obj) {
  var time_covered_in_mili_sec = stopwatch_obj.time_covered_in_mili_sec,
      time_str = stopwatch_obj.time_str;
  state = immmer.produce(state, function (draft) {
    draft.time_covered_in_mili_sec = time_covered_in_mili_sec;
    draft.time_str = time_str;
    draft.time_covered_in_mili_sec = time_covered_in_mili_sec;
  });
};

exports.modelCreateStopwatch = modelCreateStopwatch;

var modelUpdateTimeProps = function modelUpdateTimeProps(update_stopwatch_obj) {
  var time_covered_in_mili_sec = update_stopwatch_obj.time_covered_in_mili_sec,
      time_str = update_stopwatch_obj.time_str,
      time_marked_arr = update_stopwatch_obj.time_marked_arr;
  state = immer.produce(state, function (draft) {
    draft.time_covered_in_mili_sec = time_covered_in_mili_sec;
    draft.time_str = time_str;
    if (time_marked_arr) draft.time_marked_arr = time_marked_arr;
  });
};

exports.modelUpdateTimeProps = modelUpdateTimeProps;

var modelAddTimeMarked = function modelAddTimeMarked(time_marked_obj) {
  // //
  // const add_index_to_time_marked_obj = immer.produce(
  //   time_marked_obj,
  //   (draft) => {
  //     const el_in_time_marked_arr = state.time_marked_arr.slice(-1);
  //     const index = el_in_time_marked_arr
  //       ? Number(el_in_time_marked_arr.index) + 1
  //       : 1;
  //     draft.index = index;
  //   }
  // );
  // time_marked_arr is draft obh which is immutable new prop can be assigned to it
  state = immer.produce(state, function (draft) {
    draft.time_marked_arr.push(time_marked_obj);
  });
}; // Query related -------------------------------------------------


exports.modelAddTimeMarked = modelAddTimeMarked;

var modelGetStopwatch = function modelGetStopwatch() {
  return immer.produce(state, function (draft) {
    return draft;
  });
};

exports.modelGetStopwatch = modelGetStopwatch;

var modelGetTimeMarkedArr = function modelGetTimeMarkedArr() {
  return modelGetStopwatch().time_marked_arr;
};

exports.modelGetTimeMarkedArr = modelGetTimeMarkedArr;

var modelGetTimerMarkedArrWithFastestAndSlowestTimeMarkedMention = function modelGetTimerMarkedArrWithFastestAndSlowestTimeMarkedMention() {
  if (state.time_marked_arr.length === 0) return [];
  var sorted_time_marked_arr_by_time_gap = immer.produce(state.time_marked_arr, function (draft) {
    var sort_time_marked_arr = draft.sort(function (a, b) {
      return Number(a.mark_timing_gap) - Number(b.mark_timing_gap);
    });
    sort_time_marked_arr[sort_time_marked_arr.length - 1].mark_timing_rank = "slowest";
    sort_time_marked_arr[0].mark_timing_rank = "fastest";
    return sort_time_marked_arr.sort(function (a, b) {
      return Number(b.index) - Number(a.index);
    });
  });
  return sorted_time_marked_arr_by_time_gap;
};

exports.modelGetTimerMarkedArrWithFastestAndSlowestTimeMarkedMention = modelGetTimerMarkedArrWithFastestAndSlowestTimeMarkedMention;
},{}],"Controller/Pages/Stopwatch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controlRenderTimeMarkedList = void 0;

var _StopWatchView = _interopRequireDefault(require("../../View/Pages/StopWatchView.js"));

var _stopwatchModel = require("../../Model/stopwatchModel.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stopwatchEl = document.querySelector(".stopwatch");
var View;

var controlRenderTimeMarkedList = function controlRenderTimeMarkedList(time_marked_arr) {
  View.renderTimeMarkedList(time_marked_arr);
};

exports.controlRenderTimeMarkedList = controlRenderTimeMarkedList;

var controlAddTimeMarkedObj = function controlAddTimeMarkedObj(time_marked_obj) {
  (0, _stopwatchModel.modelAddTimeMarked)(time_marked_obj);
};

var controlStopwatch = function controlStopwatch(action, updatePropObj) {
  if (action === "update-time-props") (0, _stopwatchModel.modelUpdateTimeProps)(updatePropObj);
  if (action === "add-time-marked") controlAddTimeMarkedObj(updatePropObj);
  controlRenderTimeMarkedList((0, _stopwatchModel.modelGetTimerMarkedArrWithFastestAndSlowestTimeMarkedMention)());
};

if (stopwatchEl) {
  View = new _StopWatchView.default();
  View.addHandlerStopWatch(controlStopwatch);
}
},{"../../View/Pages/StopWatchView.js":"View/Pages/StopWatchView.js","../../Model/stopwatchModel.js":"Model/stopwatchModel.js"}],"View/Components/CardList/WorldClockCardListView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TimerCardView = _interopRequireDefault(require("../Card/TimerCardView.js"));

var _domFunction = require("../../../utils/_domFunction.js");

var _CardListView2 = _interopRequireDefault(require("../../Common/CardListView.js"));

var _helper = require("../../../utils/_helper.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WorldClockCardListView = /*#__PURE__*/function (_CardListView) {
  _inherits(WorldClockCardListView, _CardListView);

  var _super = _createSuper(WorldClockCardListView);

  function WorldClockCardListView() {
    var _this;

    _classCallCheck(this, WorldClockCardListView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_parentEl", (0, _domFunction.findEl)("worldclock-list"));

    return _this;
  }

  _createClass(WorldClockCardListView, [{
    key: "_generateMarkUpItem",
    value: // constructor() {
    //   super();
    //   this.addHandlerCardList();
    //   // this.render(timerState.timers);
    // }
    function _generateMarkUpItem(item) {
      var index = item.index,
          day_state = item.day_state,
          time = item.time,
          location = item.location,
          date = item.date,
          time_comparision_str = item.time_comparision_str;
      return "<div\n              class=\"card worldclock-item\"\n              data-index=\"".concat(index, "\"\n              data-day-type=\"").concat(day_state, "\"\n              data-location=").concat(location, "\n              >\n                  <div class=\"worldclock-icon-box\">\n                    <button\n                      class=\"card-header__btn card-deleteBtn btn-icon--square hidden\"\n                      data-action=\"delete-card\">\n                      <i class=\"fas fa-trash-alt\"></i>\n                    </button>\n                    <i class=\"fa fa-sun icon worldclock-day-icon\" data-icon=\"day\"></i>\n                    <i class=\"fa fa-moon icon worldclock-day-icon\" data-icon=\"night\"></i>\n                  </div>\n                  <h5 class=\"h-5 mg-0 worldclock-item-time\">").concat(time, "</h5>\n                  <p class=\"p--md worldclock-item-location\">").concat(location.split("/")[1], "</p>\n                  <p class=\"p--md worldclock-item-time-info\">\n                    <span class=\"t--md worldclock-item-date\">").concat(date, "</span>\n                    <span class=\"t--md worldclock-item-time-comparsion\"\n                      >").concat(time_comparision_str, "</span\n                    >\n              </p>\n            </div>");
    } //////////////////////////////////////////////////////////

  }, {
    key: "addHandlerCardList",
    value: function addHandlerCardList(handle, WorldCLockCardView) {
      this._parentEl.addEventListener("click", WorldCLockCardView.handleCard.bind(WorldCLockCardView, handle));
    } ///////////////////////////////////////////////

  }]);

  return WorldClockCardListView;
}(_CardListView2.default);

var _default = WorldClockCardListView;
exports.default = _default;
},{"../Card/TimerCardView.js":"View/Components/Card/TimerCardView.js","../../../utils/_domFunction.js":"utils/_domFunction.js","../../Common/CardListView.js":"View/Common/CardListView.js","../../../utils/_helper.js":"utils/_helper.js"}],"View/Components/Card/WorldClockView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CardView2 = _interopRequireDefault(require("../../Common/CardView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WorldClockCardView = /*#__PURE__*/function (_CardView) {
  _inherits(WorldClockCardView, _CardView);

  var _super = _createSuper(WorldClockCardView);

  function WorldClockCardView() {
    var _this;

    _classCallCheck(this, WorldClockCardView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_parentEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "_alarmIndex", void 0);

    return _this;
  }

  _createClass(WorldClockCardView, [{
    key: "_handleDeleteBtn",
    value: function _handleDeleteBtn(e, handle) {
      // i should not mess with basic data-attribute name
      // delete
      // edit
      var btn = e.target.closest('button[data-action="delete-card"]');
      if (!btn) return;
      handle("delete-clock", this._alarmIndex);
    } // MAIN --------------------------------------------

  }, {
    key: "handleCard",
    value: function handleCard(handle, e) {
      this._parentEl = e.target.closest(".card");
      if (!this._parentEl) return;
      this._alarmIndex = this._parentEl.dataset.index; // handle deltete Btn

      this._handleDeleteBtn(e, handle);
    }
  }]);

  return WorldClockCardView;
}(_CardView2.default);

var _default = WorldClockCardView;
exports.default = _default;
},{"../../Common/CardView.js":"View/Common/CardView.js"}],"Model/worldclockModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modelUpdateClock = exports.modelAddClock = exports.modelDeleteClock = exports.modelGetClock = exports.modelGetClocks = void 0;
var state = {
  clocks: [{
    index: 1,
    day_state: "night",
    time: "6:31",
    location: "Asia/Seoul",
    date: "14/10/2030",
    time_comparision_str: "+10hrs 30mins"
  }]
};

var modelGetClocks = function modelGetClocks() {
  return immer.produce(state, function (draft) {
    return draft.clocks;
  });
};

exports.modelGetClocks = modelGetClocks;

var modelGetClock = function modelGetClock(index) {
  return immer.produce(state, function (draft) {
    return draft.clocks.find(function (el) {
      return Number(el.index) === Number(index);
    });
  });
};

exports.modelGetClock = modelGetClock;

var modelDeleteClock = function modelDeleteClock(index) {
  state = immer.produce(state, function (draft) {
    draft.clocks.splice(Number(index) - 1, 1);
  });
};

exports.modelDeleteClock = modelDeleteClock;

var modelAddClock = function modelAddClock(clockObj) {
  state = immer.produce(state, function (draft) {
    draft.clocks.push(clockObj);
  });
};

exports.modelAddClock = modelAddClock;

var modelUpdateClock = function modelUpdateClock(index, updateProps) {
  var rIndex = Number(index); // obj new Create but reference obj inside are same

  var clock = modelGetClock(rIndex);
  var updateClock = immer.produce(clock, function (draft) {
    // expensive thing to copy a obj
    var updatePropArr = Object.entries(updateProps);
    updatePropArr.map(function (prop) {
      if (prop[1] === undefined) return;
      draft[prop[0]] = prop[1];
      return draft;
    });
    return draft;
  });
  state = immer.produce(state, function (draft) {
    draft.clocks.splice(rIndex - 1, 1, updateClock);
    return draft;
  });
};

exports.modelUpdateClock = modelUpdateClock;
},{}],"Controller/Components/Card/worldclockCardController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWorldClockCardView = exports.controlWorldClockCard = exports.controlUpdateClockTime = void 0;

var _WorldClockView = _interopRequireDefault(require("../../../View/Components/Card/WorldClockView.js"));

var _worldclockCardListController = require("../CardList/worldclockCardListController.js");

var _worldclockModel = require("../../../Model/worldclockModel.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var worldclockSectionEL = document.querySelector(".section-worldclock");
var View;

var convertUTCDateToLocalDate = function convertUTCDateToLocalDate(timeInSeconds) {
  timeInSeconds = "".concat(timeInSeconds); // signpresent - or not sign mean plus

  var signPresent = timeInSeconds.slice(0, 1) === "-" ? true : false;
  var seconds = signPresent ? Number(timeInSeconds.slice(1)) * 1000 : Number(timeInSeconds) * 1000;
  var date;
  date = signPresent ? new Date(+new Date() + seconds) : new Date(+new Date() - seconds);
  console.log(date); // newDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());

  return date;
};

var controlUpdateClockTime = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(clock) {
    var res, date, date_convert, date_local_str, time, _res, raw_offset, day_state, time_comparision_str;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fetch("http://worldtimeapi.org/api/timezone/".concat(clock.location));

          case 3:
            res = _context.sent;
            _context.next = 6;
            return res.json();

          case 6:
            res = _context.sent;
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            throw _context.t0;

          case 13:
            _res = res, raw_offset = _res.raw_offset;
            date_convert = convertUTCDateToLocalDate(raw_offset);
            date_local_str = date_convert.toLocaleString().split(",");
            date = date_local_str[0];
            day_state = date_convert.getHours() < 18 ? "night" : "day";
            time_comparision_str = "".concat(Math.floor((new Date() - date_convert) / (3600 * 1000)), "hrs ").concat(Math.floor((new Date() - date_convert) % (3600 * 1000)), "mins");
            time_comparision_str = new Date() > date_convert ? "+".concat(time_comparision_str) : time_comparision_str;
            time = date_local_str[1];
            time = time.trim().split(":");
            time = time[0] + ":" + time[1];
            (0, _worldclockModel.modelUpdateClock)(clock.index, {
              date: date,
              time: time,
              day_state: day_state,
              time_comparision_str: time_comparision_str
            });

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function controlUpdateClockTime(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.controlUpdateClockTime = controlUpdateClockTime;

var controlWorldClockCard = function controlWorldClockCard(action, index) {
  console.log(index);
  if (action === "delete-clock") (0, _worldclockModel.modelDeleteClock)(index);
  (0, _worldclockCardListController.controlLoadAllClocks)();
};

exports.controlWorldClockCard = controlWorldClockCard;

var getWorldClockCardView = function getWorldClockCardView() {
  return View;
};

exports.getWorldClockCardView = getWorldClockCardView;

if (worldclockSectionEL) {
  View = new _WorldClockView.default();
}
},{"../../../View/Components/Card/WorldClockView.js":"View/Components/Card/WorldClockView.js","../CardList/worldclockCardListController.js":"Controller/Components/CardList/worldclockCardListController.js","../../../Model/worldclockModel.js":"Model/worldclockModel.js"}],"Controller/Components/CardList/worldclockCardListController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateWorldClocks = exports.initialUpdateWorldClock = exports.controlLoadAllClocks = exports.getWorldClockCardListView = void 0;

var _WorldClockCardListView = _interopRequireDefault(require("../../../View/Components/CardList/WorldClockCardListView.js"));

var _worldclockCardController = require("../Card/worldclockCardController.js");

var _worldclockModel = require("../../../Model/worldclockModel.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var worldclockSectionEl = document.querySelector(".section-worldclock");
var View;

var getWorldClockCardListView = function getWorldClockCardListView() {
  return View;
};

exports.getWorldClockCardListView = getWorldClockCardListView;

var controlLoadAllClocks = function controlLoadAllClocks() {
  var clocks = (0, _worldclockModel.modelGetClocks)();
  View.render(clocks);
};

exports.controlLoadAllClocks = controlLoadAllClocks;

var initialUpdateWorldClock = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var promise;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            promise = (0, _worldclockModel.modelGetClocks)().map(function (clock) {
              return (0, _worldclockCardController.controlUpdateClockTime)(clock);
            });
            _context.next = 3;
            return Promise.all(promise);

          case 3:
            // when all update then load
            controlLoadAllClocks();

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function initialUpdateWorldClock() {
    return _ref.apply(this, arguments);
  };
}(); // update all set country time


exports.initialUpdateWorldClock = initialUpdateWorldClock;

var updateWorldClocks = function updateWorldClocks() {
  setInterval( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var promise;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // update all clock at every min
            promise = (0, _worldclockModel.modelGetClocks)().map(function (clock) {
              return (0, _worldclockCardController.controlUpdateClockTime)(clock);
            });
            console.log(promise);
            _context2.next = 4;
            return Promise.all(promise);

          case 4:
            // when all update then load
            controlLoadAllClocks();

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })), 1000 * 60);
};

exports.updateWorldClocks = updateWorldClocks;

if (worldclockSectionEl) {
  View = new _WorldClockCardListView.default();
  initialUpdateWorldClock();
  updateWorldClocks(); // handle all user interactions

  View.addHandlerCardList(_worldclockCardController.controlWorldClockCard, (0, _worldclockCardController.getWorldClockCardView)());
}
},{"../../../View/Components/CardList/WorldClockCardListView.js":"View/Components/CardList/WorldClockCardListView.js","../Card/worldclockCardController.js":"Controller/Components/Card/worldclockCardController.js","../../../Model/worldclockModel.js":"Model/worldclockModel.js"}],"View/Common/DropdownView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DropdownView = /*#__PURE__*/function () {
  function DropdownView() {
    _classCallCheck(this, DropdownView);

    _defineProperty(this, "_dropdownEl", void 0);

    _defineProperty(this, "_dropdownParentEl", void 0);

    _defineProperty(this, "_dropdownParentInputEl", void 0);

    _defineProperty(this, "_hideManually", void 0);
  }

  _createClass(DropdownView, [{
    key: "show",
    value: function show() {
      this._dropdownParentEl.dataset.active = true;
    }
  }, {
    key: "_hide",
    value: function _hide() {
      this._dropdownParentEl.dataset.active = false;
    }
  }, {
    key: "render",
    value: function render(arr) {
      var dropdownListEl = this._dropdownEl.querySelector(".list");

      dropdownListEl.innerHTML = "";
      var html = arr.map(function (el) {
        return "\n      <div class=\"list-item\" data-active=\"false\" data-value=\"".concat(el, "\">\n        ").concat(el, "\n        </div>\n      ");
      }).join("");
      dropdownListEl.insertAdjacentHTML("afterbegin", html);
    }
  }, {
    key: "_handleSelectItem",
    value: function _handleSelectItem(target) {
      var item = target.closest(".list-item");
      if (!item) return;
      var _target$dataset = target.dataset,
          active = _target$dataset.active,
          value = _target$dataset.value;
      if (value === "No matches found!") return; // active = active === "true" ? "false" : "true";

      active = true;

      var allItemEls = _toConsumableArray(this._dropdownEl.querySelectorAll(".list-item"));

      allItemEls.forEach(function (el) {
        if (el !== item) el.dataset.active = "false";
      });
      item.dataset.active = active; // determining if input el is input or p el where we have data-value instead of value

      var elType = this._dropdownParentInputEl.nodeName.toLowerCase();

      if (elType === "input") this._dropdownParentInputEl.value = value;else {
        this._dropdownParentInputEl.dataset.value = value;
        this._dropdownParentInputEl.textContent = value;
      }
      if (this._hideManually) return;

      this._hide();
    }
  }, {
    key: "handleDropdown",
    value: function handleDropdown(dropdownEl) {
      var _this = this;

      var hideManually = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this._hideManually = hideManually ? true : false;
      this._dropdownEl = dropdownEl;
      if (this._dropdownEl.dataset.clickEvent === "true") return;
      this._dropdownParentEl = this._dropdownEl.closest(".dropdown-parent");
      this._dropdownParentInputEl = this._dropdownParentEl.querySelector(".dropdown-parent-input");
      this._dropdownEl.dataset.clickEvent = true;

      this._dropdownEl.addEventListener("click", function (e) {
        var target = e.target;

        _this._handleSelectItem(target);
      });
    }
  }]);

  return DropdownView;
}();

var _default = DropdownView;
exports.default = _default;
},{}],"View/Components/Modal/worldClockModalView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ModalView2 = _interopRequireDefault(require("../../Common/ModalView.js"));

var _domFunction = require("../../../utils/_domFunction.js");

var _DropdownView = _interopRequireDefault(require("../../Common/DropdownView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var WorldclockModalView = /*#__PURE__*/function (_ModalView) {
  _inherits(WorldclockModalView, _ModalView);

  var _super = _createSuper(WorldclockModalView);

  function WorldclockModalView() {
    _classCallCheck(this, WorldclockModalView);

    return _super.apply(this, arguments);
  }

  _createClass(WorldclockModalView, [{
    key: "_generateMarkUp",
    value: function _generateMarkUp(index, action) {
      return "<div class=\"modal-content\" data-type=\"worldclock\" data-index=".concat(index, " data-action=").concat(action, ">\n              <h5 class=\"h-5 mg-sm\">Add new location</h5>\n\n              <div\n                class=\"mg-bg modal-search-bar dropdown-parent\"\n                data-active=\"false\"\n                data-d-scale=\"top\"\n              >\n                <i class=\"fas fa-search icon--sm\"></i>\n                <input\n                  type=\"text\"\n                  class=\"modal-name__input dropdown-parent-input\"\n                  \n                  name=\"location\"\n                  placeholder=\"Enter a location\"\n                />\n\n                <div\n                  class=\"dropdown dropdown-h-0\"\n                  data-dropdown=\"location\"\n                  data-click-event=\"false\"\n                >\n                  <div class=\"list\">\n                    <div class=\"list-item\" data-active=\"false\" data-value=\"10\">\n                      10 minutes\n                    </div>\n                    <div class=\"list-item\" data-active=\"false\" data-value=\"20\">\n                      20 minutes\n                    </div>\n                    <div class=\"list-item\" data-active=\"false\" data-value=\"30\">\n                      30 minutes\n                    </div>\n                    <div class=\"list-item\" data-active=\"false\" data-value=\"50\">\n                      50 minutes\n                    </div>\n                    <div class=\"list-item\" data-active=\"false\" data-value=\"60\">\n                      1 hour\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"modal-crud__btns\">\n                <button class=\"modal-crud__btn btn--primary\" data-action=\"save\">\n                  <i class=\"fas fa-plus\"></i>\n                  <span>Add</span>\n                </button>\n                <button class=\"modal-crud__btn btn--outline\" data-action=\"cancel\">\n                  <i class=\"fas fa-times\"></i>\n                  <span>Cancel</span>\n                </button>\n              </div>\n            </div>");
    }
  }, {
    key: "show",
    value: function show(index, action) {
      this.render(index, action);
      (0, _domFunction.replaceClass)(this._topParentEl, "hidden", "display");
    }
  }, {
    key: "showAddModal",
    value: function showAddModal(CardListView) {
      var index = CardListView.generateNewCardNumber();
      this.show(index, "add-clock");
    }
  }, {
    key: "_convertUTCDateToLocalDate",
    value: function _convertUTCDateToLocalDate(timeInSeconds) {
      timeInSeconds = "".concat(timeInSeconds); // signpresent - or not sign mean plus

      var signPresent = timeInSeconds.slice(0, 1) === "-" ? true : false;
      console.log(signPresent);
      var seconds = signPresent ? Number(timeInSeconds.slice(1)) * 1000 : Number(timeInSeconds) * 1000;
      var date;
      console.log(seconds);
      date = signPresent ? new Date(+new Date() + seconds) : new Date(+new Date() - seconds); // newDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());

      return date;
    }
  }, {
    key: "saveCardUpdatedValues",
    value: function () {
      var _saveCardUpdatedValues = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(action, index, handle) {
        var location, res, date, utc_date_convert, date_local_str, time, _res, raw_offset, day_state, time_comparision_str;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                location = this._topParentEl.querySelector('input[name="location"]').value;

                if (!(location === "" || !location)) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                _context.prev = 3;
                _context.next = 6;
                return fetch("http://worldtimeapi.org/api/timezone/".concat(location));

              case 6:
                res = _context.sent;
                _context.next = 9;
                return res.json();

              case 9:
                res = _context.sent;
                _context.next = 16;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](3);
                console.log(_context.t0);
                return _context.abrupt("return");

              case 16:
                console.log(res);

                if (!(res.status === 404 || res.error)) {
                  _context.next = 19;
                  break;
                }

                return _context.abrupt("return");

              case 19:
                _res = res, raw_offset = _res.raw_offset;
                utc_date_convert = this._convertUTCDateToLocalDate(raw_offset);
                date_local_str = utc_date_convert.toLocaleString().split(",");
                date = date_local_str[0];
                day_state = utc_date_convert.getHours() > 18 ? "night" : "day";
                time_comparision_str = "".concat(Math.floor((new Date() - utc_date_convert) / (3600 * 1000)), "hrs ").concat(Math.floor((new Date() - utc_date_convert) % (3600 * 1000) / (60 * 1000)), "mins");
                time_comparision_str = new Date() > utc_date_convert ? "+".concat(time_comparision_str) : time_comparision_str;
                console.log(utc_date_convert, time_comparision_str, date, day_state);
                time = date_local_str[1];
                time = time.trim().split(":");
                time = time[0] + ":" + time[1];
                handle(action, {
                  index: index,
                  location: location,
                  date: date,
                  time: time,
                  day_state: day_state,
                  time_comparision_str: time_comparision_str
                });
                this.hide();

              case 32:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 12]]);
      }));

      function saveCardUpdatedValues(_x, _x2, _x3) {
        return _saveCardUpdatedValues.apply(this, arguments);
      }

      return saveCardUpdatedValues;
    }()
  }, {
    key: "_handleSearchInputLocation",
    value: function _handleSearchInputLocation() {
      var allTimezone = ["Africa/Abidjan", "Africa/Accra", "Africa/Algiers", "Africa/Bissau", "Africa/Cairo", "Africa/Casablanca", "Africa/Ceuta", "Africa/El_Aaiun", "Africa/Johannesburg", "Africa/Juba", "Africa/Khartoum", "Africa/Lagos", "Africa/Maputo", "Africa/Monrovia", "Africa/Nairobi", "Africa/Ndjamena", "Africa/Sao_Tome", "Africa/Tripoli", "Africa/Tunis", "Africa/Windhoek", "America/Adak", "America/Anchorage", "America/Araguaina", "America/Argentina/Buenos_Aires", "America/Argentina/Catamarca", "America/Argentina/Cordoba", "America/Argentina/Jujuy", "America/Argentina/La_Rioja", "America/Argentina/Mendoza", "America/Argentina/Rio_Gallegos", "America/Argentina/Salta", "America/Argentina/San_Juan", "America/Argentina/San_Luis", "America/Argentina/Tucuman", "America/Argentina/Ushuaia", "America/Asuncion", "America/Atikokan", "America/Bahia", "America/Bahia_Banderas", "America/Barbados", "America/Belem", "America/Belize", "America/Blanc-Sablon", "America/Boa_Vista", "America/Bogota", "America/Boise", "America/Cambridge_Bay", "America/Campo_Grande", "America/Cancun", "America/Caracas", "America/Cayenne", "America/Chicago", "America/Chihuahua", "America/Costa_Rica", "America/Creston", "America/Cuiaba", "America/Curacao", "America/Danmarkshavn", "America/Dawson", "America/Dawson_Creek", "America/Denver", "America/Detroit", "America/Edmonton", "America/Eirunepe", "America/El_Salvador", "America/Fort_Nelson", "America/Fortaleza", "America/Glace_Bay", "America/Goose_Bay", "America/Grand_Turk", "America/Guatemala", "America/Guayaquil", "America/Guyana", "America/Halifax", "America/Havana", "America/Hermosillo", "America/Indiana/Indianapolis", "America/Indiana/Knox", "America/Indiana/Marengo", "America/Indiana/Petersburg", "America/Indiana/Tell_City", "America/Indiana/Vevay", "America/Indiana/Vincennes", "America/Indiana/Winamac", "America/Inuvik", "America/Iqaluit", "America/Jamaica", "America/Juneau", "America/Kentucky/Louisville", "America/Kentucky/Monticello", "America/La_Paz", "America/Lima", "America/Los_Angeles", "America/Maceio", "America/Managua", "America/Manaus", "America/Martinique", "America/Matamoros", "America/Mazatlan", "America/Menominee", "America/Merida", "America/Metlakatla", "America/Mexico_City", "America/Miquelon", "America/Moncton", "America/Monterrey", "America/Montevideo", "America/Nassau", "America/New_York", "America/Nipigon", "America/Nome", "America/Noronha", "America/North_Dakota/Beulah", "America/North_Dakota/Center", "America/North_Dakota/New_Salem", "America/Nuuk", "America/Ojinaga", "America/Panama", "America/Pangnirtung", "America/Paramaribo", "America/Phoenix", "America/Port-au-Prince", "America/Port_of_Spain", "America/Porto_Velho", "America/Puerto_Rico", "America/Punta_Arenas", "America/Rainy_River", "America/Rankin_Inlet", "America/Recife", "America/Regina", "America/Resolute", "America/Rio_Branco", "America/Santarem", "America/Santiago", "America/Santo_Domingo", "America/Sao_Paulo", "America/Scoresbysund", "America/Sitka", "America/St_Johns", "America/Swift_Current", "America/Tegucigalpa", "America/Thule", "America/Thunder_Bay", "America/Tijuana", "America/Toronto", "America/Vancouver", "America/Whitehorse", "America/Winnipeg", "America/Yakutat", "America/Yellowknife", "Antarctica/Casey", "Antarctica/Davis", "Antarctica/DumontDUrville", "Antarctica/Macquarie", "Antarctica/Mawson", "Antarctica/Palmer", "Antarctica/Rothera", "Antarctica/Syowa", "Antarctica/Troll", "Antarctica/Vostok", "Asia/Almaty", "Asia/Amman", "Asia/Anadyr", "Asia/Aqtau", "Asia/Aqtobe", "Asia/Ashgabat", "Asia/Atyrau", "Asia/Baghdad", "Asia/Baku", "Asia/Bangkok", "Asia/Barnaul", "Asia/Beirut", "Asia/Bishkek", "Asia/Brunei", "Asia/Chita", "Asia/Choibalsan", "Asia/Colombo", "Asia/Damascus", "Asia/Dhaka", "Asia/Dili", "Asia/Dubai", "Asia/Dushanbe", "Asia/Famagusta", "Asia/Gaza", "Asia/Hebron", "Asia/Ho_Chi_Minh", "Asia/Hong_Kong", "Asia/Hovd", "Asia/Irkutsk", "Asia/Jakarta", "Asia/Jayapura", "Asia/Jerusalem", "Asia/Kabul", "Asia/Kamchatka", "Asia/Karachi", "Asia/Kathmandu", "Asia/Khandyga", "Asia/Kolkata", "Asia/Krasnoyarsk", "Asia/Kuala_Lumpur", "Asia/Kuching", "Asia/Macau", "Asia/Magadan", "Asia/Makassar", "Asia/Manila", "Asia/Nicosia", "Asia/Novokuznetsk", "Asia/Novosibirsk", "Asia/Omsk", "Asia/Oral", "Asia/Pontianak", "Asia/Pyongyang", "Asia/Qatar", "Asia/Qostanay", "Asia/Qyzylorda", "Asia/Riyadh", "Asia/Sakhalin", "Asia/Samarkand", "Asia/Seoul", "Asia/Shanghai", "Asia/Singapore", "Asia/Srednekolymsk", "Asia/Taipei", "Asia/Tashkent", "Asia/Tbilisi", "Asia/Tehran", "Asia/Thimphu", "Asia/Tokyo", "Asia/Tomsk", "Asia/Ulaanbaatar", "Asia/Urumqi", "Asia/Ust-Nera", "Asia/Vladivostok", "Asia/Yakutsk", "Asia/Yangon", "Asia/Yekaterinburg", "Asia/Yerevan", "Atlantic/Azores", "Atlantic/Bermuda", "Atlantic/Canary", "Atlantic/Cape_Verde", "Atlantic/Faroe", "Atlantic/Madeira", "Atlantic/Reykjavik", "Atlantic/South_Georgia", "Atlantic/Stanley", "Australia/Adelaide", "Australia/Brisbane", "Australia/Broken_Hill", "Australia/Darwin", "Australia/Eucla", "Australia/Hobart", "Australia/Lindeman", "Australia/Lord_Howe", "Australia/Melbourne", "Australia/Perth", "Australia/Sydney", "CET", "CST6CDT", "EET", "EST", "EST5EDT", "Etc/GMT", "Etc/GMT+1", "Etc/GMT+10", "Etc/GMT+11", "Etc/GMT+12", "Etc/GMT+2", "Etc/GMT+3", "Etc/GMT+4", "Etc/GMT+5", "Etc/GMT+6", "Etc/GMT+7", "Etc/GMT+8", "Etc/GMT+9", "Etc/GMT-1", "Etc/GMT-10", "Etc/GMT-11", "Etc/GMT-12", "Etc/GMT-13", "Etc/GMT-14", "Etc/GMT-2", "Etc/GMT-3", "Etc/GMT-4", "Etc/GMT-5", "Etc/GMT-6", "Etc/GMT-7", "Etc/GMT-8", "Etc/GMT-9", "Etc/UTC", "Europe/Amsterdam", "Europe/Andorra", "Europe/Astrakhan", "Europe/Athens", "Europe/Belgrade", "Europe/Berlin", "Europe/Brussels", "Europe/Bucharest", "Europe/Budapest", "Europe/Chisinau", "Europe/Copenhagen", "Europe/Dublin", "Europe/Gibraltar", "Europe/Helsinki", "Europe/Istanbul", "Europe/Kaliningrad", "Europe/Kiev", "Europe/Kirov", "Europe/Lisbon", "Europe/London", "Europe/Luxembourg", "Europe/Madrid", "Europe/Malta", "Europe/Minsk", "Europe/Monaco", "Europe/Moscow", "Europe/Oslo", "Europe/Paris", "Europe/Prague", "Europe/Riga", "Europe/Rome", "Europe/Samara", "Europe/Saratov", "Europe/Simferopol", "Europe/Sofia", "Europe/Stockholm", "Europe/Tallinn", "Europe/Tirane", "Europe/Ulyanovsk", "Europe/Uzhgorod", "Europe/Vienna", "Europe/Vilnius", "Europe/Volgograd", "Europe/Warsaw", "Europe/Zaporozhye", "Europe/Zurich", "HST", "Indian/Chagos", "Indian/Christmas", "Indian/Cocos", "Indian/Kerguelen", "Indian/Mahe", "Indian/Maldives", "Indian/Mauritius", "Indian/Reunion", "MET", "MST", "MST7MDT", "PST8PDT", "Pacific/Apia", "Pacific/Auckland", "Pacific/Bougainville", "Pacific/Chatham", "Pacific/Chuuk", "Pacific/Easter", "Pacific/Efate", "Pacific/Enderbury", "Pacific/Fakaofo", "Pacific/Fiji", "Pacific/Funafuti", "Pacific/Galapagos", "Pacific/Gambier", "Pacific/Guadalcanal", "Pacific/Guam", "Pacific/Honolulu", "Pacific/Kiritimati", "Pacific/Kosrae", "Pacific/Kwajalein", "Pacific/Majuro", "Pacific/Marquesas", "Pacific/Nauru", "Pacific/Niue", "Pacific/Norfolk", "Pacific/Noumea", "Pacific/Pago_Pago", "Pacific/Palau", "Pacific/Pitcairn", "Pacific/Pohnpei", "Pacific/Port_Moresby", "Pacific/Rarotonga", "Pacific/Tahiti", "Pacific/Tarawa", "Pacific/Tongatapu", "Pacific/Wake", "Pacific/Wallis", "WET"];

      var locationInputEl = this._topParentEl.querySelector('input[name="location"]');

      var dropdownParentEl = locationInputEl.closest(".dropdown-parent");
      var dropdownEl = locationInputEl.closest(".dropdown-parent").querySelector(".dropdown");
      var View = new _DropdownView.default();
      View.handleDropdown(dropdownEl);
      locationInputEl.addEventListener("input", function (e) {
        dropdownParentEl.dataset.active = true;
        var value = e.target.value;
        value = value.length > 0 ? value.slice(0, 1).toUpperCase() + value.slice(1) : value;

        if (value.includes("/")) {
          var split_value = value.split("/");
          console.log(split_value);
          value = split_value[0] + "/" + split_value[1].slice(0, 1).toUpperCase() + split_value[1].slice(1);
        }

        var validTimezone = allTimezone.filter(function (el) {
          return el.includes(value);
        });
        validTimezone = validTimezone.length === 0 ? ["No matches found!"] : validTimezone;
        View.render(validTimezone);
      }); // dropdown functionality active
    }
  }, {
    key: "_hideDropdown",
    value: function _hideDropdown(target) {
      if (!target.closest('input[name="location"]')) {
        this._topParentEl.querySelector(".dropdown-parent").dataset.active = false;
      }
    }
  }, {
    key: "handleAdditionBtns",
    value: function handleAdditionBtns(target) {
      this._handleSearchInputLocation();

      this._hideDropdown(target);
    }
  }, {
    key: "addHandlerModal",
    value: function addHandlerModal(handle) {
      this.handleModal(handle); //
    }
  }]);

  return WorldclockModalView;
}(_ModalView2.default);

var _default = WorldclockModalView;
exports.default = _default;
},{"../../Common/ModalView.js":"View/Common/ModalView.js","../../../utils/_domFunction.js":"utils/_domFunction.js","../../Common/DropdownView.js":"View/Common/DropdownView.js"}],"Controller/Components/Modal/worldclockModal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWorldClockModalView = void 0;

var _worldclockModel = require("../../../Model/worldclockModel.js");

var _worldClockModalView = _interopRequireDefault(require("../../../View/Components/Modal/worldClockModalView.js"));

var _worldclockCardListController = require("../CardList/worldclockCardListController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var worldClockSectionEl = document.querySelector(".section-worldclock");
var View;

var getWorldClockModalView = function getWorldClockModalView() {
  return View;
};

exports.getWorldClockModalView = getWorldClockModalView;

var controlWorldClockModal = function controlWorldClockModal(action, clock_obj) {
  if (action === "add-clock") (0, _worldclockModel.modelAddClock)(clock_obj);
  (0, _worldclockCardListController.controlLoadAllClocks)();
};

if (worldClockSectionEl) {
  View = new _worldClockModalView.default();
  View.addHandlerModal(controlWorldClockModal);
}
},{"../../../Model/worldclockModel.js":"Model/worldclockModel.js","../../../View/Components/Modal/worldClockModalView.js":"View/Components/Modal/worldClockModalView.js","../CardList/worldclockCardListController.js":"Controller/Components/CardList/worldclockCardListController.js"}],"View/Components/Crud/worldclockCrudView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CrudView2 = _interopRequireDefault(require("../../Common/CrudView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var WorldclockCrudView = /*#__PURE__*/function (_CrudView) {
  _inherits(WorldclockCrudView, _CrudView);

  var _super = _createSuper(WorldclockCrudView);

  function WorldclockCrudView() {
    var _this;

    _classCallCheck(this, WorldclockCrudView);

    _this = _super.call(this);

    _this.setAccoringToPage();

    return _this;
  }

  _createClass(WorldclockCrudView, [{
    key: "setAccoringToPage",
    value: function setAccoringToPage() {
      this.render("worldclock");
    }
  }, {
    key: "addHandlerBtns",
    value: function addHandlerBtns(handle, WorldclockListView, WorldclockModalView) {
      this.handleBtns(handle, WorldclockListView, WorldclockModalView, "worldclock");
    }
  }]);

  return WorldclockCrudView;
}(_CrudView2.default);

var _default = WorldclockCrudView;
exports.default = _default;
},{"../../Common/CrudView.js":"View/Common/CrudView.js"}],"Controller/Components/Crud/worldClockCrud.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controlWorldClockModal = void 0;

var _worldclockCrudView = _interopRequireDefault(require("../../../View/Components/Crud/worldclockCrudView.js"));

var _worldclockCardListController = require("../CardList/worldclockCardListController.js");

var _worldclockModal = require("../Modal/worldclockModal.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var View;
var worldclockSectionEl = document.querySelector(".section-worldclock");

var controlWorldClockModal = function controlWorldClockModal() {};

exports.controlWorldClockModal = controlWorldClockModal;

if (worldclockSectionEl) {
  View = new _worldclockCrudView.default();
  View.addHandlerBtns(controlWorldClockModal, (0, _worldclockCardListController.getWorldClockCardListView)(), (0, _worldclockModal.getWorldClockModalView)());
}
},{"../../../View/Components/Crud/worldclockCrudView.js":"View/Components/Crud/worldclockCrudView.js","../CardList/worldclockCardListController.js":"Controller/Components/CardList/worldclockCardListController.js","../Modal/worldclockModal.js":"Controller/Components/Modal/worldclockModal.js"}],"Controller/Pages/WorldClockPage.js":[function(require,module,exports) {
"use strict";

require("../Components/CardList/worldclockCardListController.js");

require("../Components/Modal/worldclockModal.js");

require("../Components/Crud/worldClockCrud.js");
},{"../Components/CardList/worldclockCardListController.js":"Controller/Components/CardList/worldclockCardListController.js","../Components/Modal/worldclockModal.js":"Controller/Components/Modal/worldclockModal.js","../Components/Crud/worldClockCrud.js":"Controller/Components/Crud/worldClockCrud.js"}],"View/Pages/SettingsView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DropdownView = _interopRequireDefault(require("../Common/DropdownView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SettingsView = /*#__PURE__*/function () {
  function SettingsView() {
    _classCallCheck(this, SettingsView);

    _defineProperty(this, "_parentEl", document.querySelector(".settings"));

    _defineProperty(this, "_dropdownEl", this._parentEl.querySelector(".dropdown"));

    _defineProperty(this, "_settingItemInputEl", this._parentEl.querySelector(".setting-item-input"));
  }

  _createClass(SettingsView, [{
    key: "addHandlerSettings",
    value: function addHandlerSettings(handle) {
      var _this = this;

      var View = new _DropdownView.default();
      View.handleDropdown(this._dropdownEl, true);

      this._parentEl.addEventListener("click", function (e) {
        var target = e.target;
        var itemEl = target.closest(".setting-item");
        if (!itemEl) return; // select dropdown item

        if (target.closest(".dropdown")) {
          document.documentElement.dataset.theme = _this._settingItemInputEl.dataset.value;
          return;
        } // close or open dropdown when clicking setting-item-content


        var active = itemEl.dataset.active;
        active = active === "true" ? "false" : "true";
        itemEl.dataset.active = active; // check if setting is changed

        var _this$_settingItemInp = _this._settingItemInputEl.dataset,
            setting = _this$_settingItemInp.setting,
            value = _this$_settingItemInp.value; // setting theme in view

        var previousSettingValue = itemEl.dataset.settingValue;
        if (previousSettingValue === value) return;
        itemEl.dataset.settingValue = value;
        handle(setting, value);
      });
    }
  }]);

  return SettingsView;
}();

var _default = SettingsView;
exports.default = _default;
},{"../Common/DropdownView.js":"View/Common/DropdownView.js"}],"Model/settingsModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modelUpdateSettings = void 0;
var state = {
  theme: "dark"
};

var modelUpdateSettings = function modelUpdateSettings(theme) {
  state = immer.produce(state, function (draft) {
    draft.theme = theme;
  });
};

exports.modelUpdateSettings = modelUpdateSettings;
},{}],"Controller/Pages/Settings.js":[function(require,module,exports) {
"use strict";

var _SettingsView = _interopRequireDefault(require("../../View/Pages/SettingsView.js"));

var _settingsModel = require("../../Model/settingsModel.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var settingsSectionEl = document.querySelector(".section-settings");

var controlSettings = function controlSettings(setting, value) {
  (0, _settingsModel.modelUpdateSettings)({
    setting: value
  });
};

if (settingsSectionEl) {
  var View = new _SettingsView.default();
  View.addHandlerSettings(controlSettings);
}
},{"../../View/Pages/SettingsView.js":"View/Pages/SettingsView.js","../../Model/settingsModel.js":"Model/settingsModel.js"}],"script.js":[function(require,module,exports) {
"use strict";

require("./Controller/Layouts/Navbar.js");

require("./Controller/Components/CardList/timerCardList.js");

require("./Controller/Components/Modal/timerModal.js");

require("./Controller/Components/Crud/timerCrud.js");

require("./Controller/Components/CardList/alarmCardList.js");

require("./Controller/Components/Modal/alarmModal.js");

require("./Controller/Components/Popup/AlarmCompletedPopupController.js");

require("./Controller/Components/Crud/alarmCrud.js");

require("./Controller/Pages/Stopwatch.js");

require("./Controller/Pages/WorldClockPage.js");

require("./Controller/Pages/Settings.js");
},{"./Controller/Layouts/Navbar.js":"Controller/Layouts/Navbar.js","./Controller/Components/CardList/timerCardList.js":"Controller/Components/CardList/timerCardList.js","./Controller/Components/Modal/timerModal.js":"Controller/Components/Modal/timerModal.js","./Controller/Components/Crud/timerCrud.js":"Controller/Components/Crud/timerCrud.js","./Controller/Components/CardList/alarmCardList.js":"Controller/Components/CardList/alarmCardList.js","./Controller/Components/Modal/alarmModal.js":"Controller/Components/Modal/alarmModal.js","./Controller/Components/Popup/AlarmCompletedPopupController.js":"Controller/Components/Popup/AlarmCompletedPopupController.js","./Controller/Components/Crud/alarmCrud.js":"Controller/Components/Crud/alarmCrud.js","./Controller/Pages/Stopwatch.js":"Controller/Pages/Stopwatch.js","./Controller/Pages/WorldClockPage.js":"Controller/Pages/WorldClockPage.js","./Controller/Pages/Settings.js":"Controller/Pages/Settings.js"}],"../../../../../mnt/c/Users/natsu/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "35817" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../mnt/c/Users/natsu/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.js.map