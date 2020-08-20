"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactAccessibleAccordion = require("react-accessible-accordion");

var _ReviewList = _interopRequireDefault(require("./ReviewList.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var App = /*#__PURE__*/function (_React$Component) {
  _inherits(App, _React$Component);

  var _super = _createSuper(App);

  function App(props) {
    _classCallCheck(this, App);

    return _super.call(this, props);
  } // componentDidMount() {
  //   window.addEventListener('message', this.initPort);
  // }
  // initPort(event) {
  //   var port2 = event.ports[0];
  //   port2.onmessage = this.onMessage;
  // }
  // onMessage(event) {
  //   console.log("MESSAGE IN REVIEW COMPONENT: ", event)
  // }


  _createClass(App, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(_reactAccessibleAccordion.Accordion, {
        allowZeroExpanded: true,
        style: {
          width: "85%"
        }
      }, /*#__PURE__*/_react["default"].createElement(_reactAccessibleAccordion.AccordionItem, {
        className: "reviewAccordion"
      }, /*#__PURE__*/_react["default"].createElement(_reactAccessibleAccordion.AccordionItemHeading, null, /*#__PURE__*/_react["default"].createElement(_reactAccessibleAccordion.AccordionItemButton, null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "reviews"
      }, "Reviews"), /*#__PURE__*/_react["default"].createElement("img", {
        className: "arrow",
        src: "https://static.thenounproject.com/png/196766-200.png"
      }))), /*#__PURE__*/_react["default"].createElement(_reactAccessibleAccordion.AccordionItemPanel, null, /*#__PURE__*/_react["default"].createElement(_ReviewList["default"], null)))); // return (
      // <div className="App">
      //   <div>Hello Worl1d</div>
      // </div>
      // )
    }
  }]);

  return App;
}(_react["default"].Component);

var _default = App;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9zcmMvY29tcG9uZW50cy9BcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsInByb3BzIiwid2lkdGgiLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQVFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVNQSxHOzs7OztBQUNKLGVBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSw2QkFDWEEsS0FEVztBQUVsQixHLENBRUQ7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OzZCQUVTO0FBQ1AsMEJBQ0UsZ0NBQUMsbUNBQUQ7QUFBVyxRQUFBLGlCQUFpQixFQUFFLElBQTlCO0FBQW9DLFFBQUEsS0FBSyxFQUFFO0FBQUNDLFVBQUFBLEtBQUssRUFBQztBQUFQO0FBQTNDLHNCQUNJLGdDQUFDLHVDQUFEO0FBQWUsUUFBQSxTQUFTLEVBQUM7QUFBekIsc0JBQ0ksZ0NBQUMsOENBQUQscUJBQ0ksZ0NBQUMsNkNBQUQscUJBQ0U7QUFBSyxRQUFBLFNBQVMsRUFBQztBQUFmLG1CQURGLGVBSUU7QUFBSyxRQUFBLFNBQVMsRUFBQyxPQUFmO0FBQXVCLFFBQUEsR0FBRyxFQUFDO0FBQTNCLFFBSkYsQ0FESixDQURKLGVBU0ksZ0NBQUMsNENBQUQscUJBQ0ksZ0NBQUMsc0JBQUQsT0FESixDQVRKLENBREosQ0FERixDQURPLENBa0JQO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7OztFQXpDZUMsa0JBQU1DLFM7O2VBMkNUSixHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEFjY29yZGlvbixcbiAgQWNjb3JkaW9uSXRlbSxcbiAgQWNjb3JkaW9uSXRlbUhlYWRpbmcsXG4gIEFjY29yZGlvbkl0ZW1CdXR0b24sXG4gIEFjY29yZGlvbkl0ZW1QYW5lbCxcbn0gZnJvbSAncmVhY3QtYWNjZXNzaWJsZS1hY2NvcmRpb24nO1xuLy8gaW1wb3J0ICcuL3N0eWxlcy9BcHAuY3NzJztcbmltcG9ydCBSZXZpZXdMaXN0IGZyb20gJy4vUmV2aWV3TGlzdC5qc3gnO1xuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICB9XG5cbiAgLy8gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gIC8vICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLmluaXRQb3J0KTtcbiAgLy8gfVxuXG4gIC8vIGluaXRQb3J0KGV2ZW50KSB7XG4gIC8vICAgdmFyIHBvcnQyID0gZXZlbnQucG9ydHNbMF07XG4gIC8vICAgcG9ydDIub25tZXNzYWdlID0gdGhpcy5vbk1lc3NhZ2U7XG4gIC8vIH1cbiAgLy8gb25NZXNzYWdlKGV2ZW50KSB7XG4gIC8vICAgY29uc29sZS5sb2coXCJNRVNTQUdFIElOIFJFVklFVyBDT01QT05FTlQ6IFwiLCBldmVudClcbiAgLy8gfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEFjY29yZGlvbiBhbGxvd1plcm9FeHBhbmRlZD17dHJ1ZX0gc3R5bGU9e3t3aWR0aDpcIjg1JVwifX0+XG4gICAgICAgICAgPEFjY29yZGlvbkl0ZW0gY2xhc3NOYW1lPVwicmV2aWV3QWNjb3JkaW9uXCI+XG4gICAgICAgICAgICAgIDxBY2NvcmRpb25JdGVtSGVhZGluZz5cbiAgICAgICAgICAgICAgICAgIDxBY2NvcmRpb25JdGVtQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmV2aWV3cyc+XG4gICAgICAgICAgICAgICAgICAgICAgUmV2aWV3c1xuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJhcnJvd1wiIHNyYz1cImh0dHBzOi8vc3RhdGljLnRoZW5vdW5wcm9qZWN0LmNvbS9wbmcvMTk2NzY2LTIwMC5wbmdcIj48L2ltZz5cbiAgICAgICAgICAgICAgICAgIDwvQWNjb3JkaW9uSXRlbUJ1dHRvbj5cbiAgICAgICAgICAgICAgPC9BY2NvcmRpb25JdGVtSGVhZGluZz5cbiAgICAgICAgICAgICAgPEFjY29yZGlvbkl0ZW1QYW5lbD5cbiAgICAgICAgICAgICAgICAgIDxSZXZpZXdMaXN0IC8+XG4gICAgICAgICAgICAgIDwvQWNjb3JkaW9uSXRlbVBhbmVsPlxuICAgICAgICAgIDwvQWNjb3JkaW9uSXRlbT5cbiAgICAgIDwvQWNjb3JkaW9uPlxuICApO1xuICAgIC8vIHJldHVybiAoXG5cbiAgICAvLyA8ZGl2IGNsYXNzTmFtZT1cIkFwcFwiPlxuICAgIC8vICAgPGRpdj5IZWxsbyBXb3JsMWQ8L2Rpdj5cbiAgICAvLyA8L2Rpdj5cbiAgICAvLyApXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEFwcDtcbiJdfQ==