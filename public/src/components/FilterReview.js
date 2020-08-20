"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactSwitch = _interopRequireDefault(require("react-switch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FilterReview = function FilterReview() {
  var checked = false;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_reactSwitch["default"], {
    checked: !checked,
    onChange: function onChange() {
      return console.log('click');
    },
    onColor: "#86d3ff",
    onHandleColor: "#2693e6",
    handleDiameter: 30,
    uncheckedIcon: false,
    checkedIcon: false,
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.6)",
    activeBoxShadow: "0px 0px 1px 10px rgba(0, 0, 0, 0.2)",
    height: 20,
    width: 48,
    className: "react-switch",
    id: "material-switch"
  }));
};

var _default = FilterReview;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9zcmMvY29tcG9uZW50cy9GaWx0ZXJSZXZpZXcuanN4Il0sIm5hbWVzIjpbIkZpbHRlclJldmlldyIsImNoZWNrZWQiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFHQSxJQUFNQSxZQUFZLEdBQUcsU0FBZkEsWUFBZSxHQUFNO0FBQ3pCLE1BQUlDLE9BQU8sR0FBRyxLQUFkO0FBQ0Esc0JBQ0UsMERBQ0UsZ0NBQUMsdUJBQUQ7QUFDQyxJQUFBLE9BQU8sRUFBSyxDQUFDQSxPQURkO0FBRUMsSUFBQSxRQUFRLEVBQUk7QUFBQSxhQUFNQyxPQUFPLENBQUNDLEdBQVIsQ0FBYSxPQUFiLENBQU47QUFBQSxLQUZiO0FBR0MsSUFBQSxPQUFPLEVBQUcsU0FIWDtBQUlDLElBQUEsYUFBYSxFQUFHLFNBSmpCO0FBS0MsSUFBQSxjQUFjLEVBQUssRUFMcEI7QUFNQyxJQUFBLGFBQWEsRUFBSyxLQU5uQjtBQU9DLElBQUEsV0FBVyxFQUFLLEtBUGpCO0FBUUMsSUFBQSxTQUFTLEVBQUcsZ0NBUmI7QUFTQyxJQUFBLGVBQWUsRUFBRyxxQ0FUbkI7QUFVQyxJQUFBLE1BQU0sRUFBSyxFQVZaO0FBV0MsSUFBQSxLQUFLLEVBQUssRUFYWDtBQVlDLElBQUEsU0FBUyxFQUFHLGNBWmI7QUFhQyxJQUFBLEVBQUUsRUFBRztBQWJOLElBREYsQ0FERjtBQW1CRCxDQXJCRDs7ZUF1QmVILFkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFN3aXRjaCBmcm9tICdyZWFjdC1zd2l0Y2gnO1xuXG5cbmNvbnN0IEZpbHRlclJldmlldyA9ICgpID0+IHtcbiAgdmFyIGNoZWNrZWQgPSBmYWxzZTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPFN3aXRjaFxuICAgICAgIGNoZWNrZWQgPSB7ICFjaGVja2VkIH1cbiAgICAgICBvbkNoYW5nZSA9IHsoKSA9PiBjb25zb2xlLmxvZyggJ2NsaWNrJyApfVxuICAgICAgIG9uQ29sb3IgPSBcIiM4NmQzZmZcIlxuICAgICAgIG9uSGFuZGxlQ29sb3IgPSBcIiMyNjkzZTZcIlxuICAgICAgIGhhbmRsZURpYW1ldGVyID0geyAzMCB9XG4gICAgICAgdW5jaGVja2VkSWNvbiA9IHsgZmFsc2UgfVxuICAgICAgIGNoZWNrZWRJY29uID0geyBmYWxzZSB9XG4gICAgICAgYm94U2hhZG93ID0gXCIwcHggMXB4IDVweCByZ2JhKDAsIDAsIDAsIDAuNilcIlxuICAgICAgIGFjdGl2ZUJveFNoYWRvdyA9IFwiMHB4IDBweCAxcHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMilcIlxuICAgICAgIGhlaWdodCA9IHsgMjAgfVxuICAgICAgIHdpZHRoID0geyA0OCB9XG4gICAgICAgY2xhc3NOYW1lID0gXCJyZWFjdC1zd2l0Y2hcIlxuICAgICAgIGlkID0gXCJtYXRlcmlhbC1zd2l0Y2hcIlxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRmlsdGVyUmV2aWV3OyJdfQ==