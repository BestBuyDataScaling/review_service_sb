"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactStarRatings = _interopRequireDefault(require("react-star-ratings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import '../styles/Review.css';
var Review = function Review(_ref) {
  var review = _ref.review;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "reviewContainer"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "reviewHeader"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "username"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, review.reviewUsername)), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", {
    className: "reviewHeaderText"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Pros mentioned"), /*#__PURE__*/_react["default"].createElement("div", null), "small battery, bad laptop"), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", {
    className: "reviewHeaderText"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Cons mentioned"), /*#__PURE__*/_react["default"].createElement("div", null), "Looks sweet")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "reviewBody"
  }, /*#__PURE__*/_react["default"].createElement(_reactStarRatings["default"], {
    className: "reviewRating",
    rating: review.reviewRating,
    starRatedColor: "yellow" // changeRating={this.changeRating}
    ,
    numberOfStars: 5,
    name: "rating",
    starDimension: "20px",
    starSpacing: "3px"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "reviewBody header"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, review.reviewHeading)), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("br", null), "Posted 1 month ago."), /*#__PURE__*/_react["default"].createElement("br", null), review.reviewText, /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", {
    className: "reviewBody footer"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    style: {
      border: '1px solid #c5cbd5',
      padding: '0 7px'
    },
    className: "reviewButtons"
  }, "helpful (", review.reviewHelpful, ")"), /*#__PURE__*/_react["default"].createElement("button", {
    className: "reviewButtons"
  }, "unhelpful (", review.reviewUnhelpful, ")"), /*#__PURE__*/_react["default"].createElement("button", {
    className: "reviewButtons"
  }, "report"), /*#__PURE__*/_react["default"].createElement("button", {
    className: "reviewButtons"
  }, "comment"), /*#__PURE__*/_react["default"].createElement("button", {
    className: "reviewButtons"
  }, "show comment"))));
};

var _default = Review;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9zcmMvY29tcG9uZW50cy9SZXZpZXcuanN4Il0sIm5hbWVzIjpbIlJldmlldyIsInJldmlldyIsInJldmlld1VzZXJuYW1lIiwicmV2aWV3UmF0aW5nIiwicmV2aWV3SGVhZGluZyIsInJldmlld1RleHQiLCJib3JkZXIiLCJwYWRkaW5nIiwicmV2aWV3SGVscGZ1bCIsInJldmlld1VuaGVscGZ1bCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBOzs7O0FBREE7QUFJQSxJQUFNQSxNQUFNLEdBQUcsU0FBVEEsTUFBUyxPQUFnQjtBQUFBLE1BQWJDLE1BQWEsUUFBYkEsTUFBYTtBQUM3QixzQkFDRTtBQUFLLElBQUEsU0FBUyxFQUFDO0FBQWYsa0JBQ0U7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLGtCQUNFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixrQkFDRSxnREFBU0EsTUFBTSxDQUFDQyxjQUFoQixDQURGLENBREYsZUFJRSwyQ0FKRixlQUtFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixrQkFDRSxpRUFERixlQUVFLDRDQUZGLDhCQUxGLGVBVUUsMkNBVkYsZUFXRTtBQUFLLElBQUEsU0FBUyxFQUFDO0FBQWYsa0JBQ0UsaUVBREYsZUFFRSw0Q0FGRixnQkFYRixDQURGLGVBbUJFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixrQkFDRSxnQ0FBQyw0QkFBRDtBQUNFLElBQUEsU0FBUyxFQUFDLGNBRFo7QUFFRSxJQUFBLE1BQU0sRUFBRUQsTUFBTSxDQUFDRSxZQUZqQjtBQUdFLElBQUEsY0FBYyxFQUFDLFFBSGpCLENBSUU7QUFKRjtBQUtFLElBQUEsYUFBYSxFQUFFLENBTGpCO0FBTUUsSUFBQSxJQUFJLEVBQUMsUUFOUDtBQU9FLElBQUEsYUFBYSxFQUFDLE1BUGhCO0FBUUUsSUFBQSxXQUFXLEVBQUM7QUFSZCxJQURGLGVBV0U7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLGtCQUNDLGdEQUFTRixNQUFNLENBQUNHLGFBQWhCLENBREQsQ0FYRixlQWNFLDBEQUNBLDJDQURBLHdCQWRGLGVBa0JFLDJDQWxCRixFQW1CQ0gsTUFBTSxDQUFDSSxVQW5CUixlQW9CQSwyQ0FwQkEsZUFxQkE7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLGtCQUNFO0FBQVEsSUFBQSxLQUFLLEVBQUU7QUFBQ0MsTUFBQUEsTUFBTSxFQUFFLG1CQUFUO0FBQThCQyxNQUFBQSxPQUFPLEVBQUU7QUFBdkMsS0FBZjtBQUErRCxJQUFBLFNBQVMsRUFBQztBQUF6RSxrQkFBbUdOLE1BQU0sQ0FBQ08sYUFBMUcsTUFERixlQUVFO0FBQVEsSUFBQSxTQUFTLEVBQUM7QUFBbEIsb0JBQThDUCxNQUFNLENBQUNRLGVBQXJELE1BRkYsZUFHRTtBQUFRLElBQUEsU0FBUyxFQUFDO0FBQWxCLGNBSEYsZUFJRTtBQUFRLElBQUEsU0FBUyxFQUFDO0FBQWxCLGVBSkYsZUFLRTtBQUFRLElBQUEsU0FBUyxFQUFDO0FBQWxCLG9CQUxGLENBckJBLENBbkJGLENBREY7QUFtREQsQ0FwREQ7O2VBc0RlVCxNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0Jztcbi8vIGltcG9ydCAnLi4vc3R5bGVzL1Jldmlldy5jc3MnO1xuaW1wb3J0IFN0YXJSYXRpbmdzIGZyb20gJ3JlYWN0LXN0YXItcmF0aW5ncyc7XG5cblxuY29uc3QgUmV2aWV3ID0gKCB7cmV2aWV3fSApID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT0ncmV2aWV3Q29udGFpbmVyJz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyZXZpZXdIZWFkZXInPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJuYW1lXCI+XG4gICAgICAgICAgPHN0cm9uZz57cmV2aWV3LnJldmlld1VzZXJuYW1lfTwvc3Ryb25nPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJyPjwvYnI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmV2aWV3SGVhZGVyVGV4dFwiPlxuICAgICAgICAgIDxzdHJvbmc+UHJvcyBtZW50aW9uZWQ8L3N0cm9uZz5cbiAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgIHNtYWxsIGJhdHRlcnksIGJhZCBsYXB0b3BcbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxicj48L2JyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJldmlld0hlYWRlclRleHRcIj5cbiAgICAgICAgICA8c3Ryb25nPkNvbnMgbWVudGlvbmVkPC9zdHJvbmc+XG4gICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICBMb29rcyBzd2VldFxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncmV2aWV3Qm9keSc+XG4gICAgICAgIDxTdGFyUmF0aW5nc1xuICAgICAgICAgIGNsYXNzTmFtZT0ncmV2aWV3UmF0aW5nJ1xuICAgICAgICAgIHJhdGluZz17cmV2aWV3LnJldmlld1JhdGluZ31cbiAgICAgICAgICBzdGFyUmF0ZWRDb2xvcj1cInllbGxvd1wiXG4gICAgICAgICAgLy8gY2hhbmdlUmF0aW5nPXt0aGlzLmNoYW5nZVJhdGluZ31cbiAgICAgICAgICBudW1iZXJPZlN0YXJzPXs1fVxuICAgICAgICAgIG5hbWU9J3JhdGluZydcbiAgICAgICAgICBzdGFyRGltZW5zaW9uPVwiMjBweFwiXG4gICAgICAgICAgc3RhclNwYWNpbmc9XCIzcHhcIlxuICAgICAgICAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJldmlld0JvZHkgaGVhZGVyXCI+XG4gICAgICAgICA8c3Ryb25nPntyZXZpZXcucmV2aWV3SGVhZGluZ308L3N0cm9uZz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgIDxicj48L2JyPlxuICAgICAgICBQb3N0ZWQgMSBtb250aCBhZ28uXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnI+PC9icj5cbiAgICAgIHtyZXZpZXcucmV2aWV3VGV4dH1cbiAgICAgIDxicj48L2JyPlxuICAgICAgPGRpdiBjbGFzc05hbWU9J3Jldmlld0JvZHkgZm9vdGVyJz5cbiAgICAgICAgPGJ1dHRvbiBzdHlsZT17e2JvcmRlcjogJzFweCBzb2xpZCAjYzVjYmQ1JywgcGFkZGluZzogJzAgN3B4J319Y2xhc3NOYW1lPVwicmV2aWV3QnV0dG9uc1wiPmhlbHBmdWwgKHtyZXZpZXcucmV2aWV3SGVscGZ1bH0pPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicmV2aWV3QnV0dG9uc1wiPnVuaGVscGZ1bCAoe3Jldmlldy5yZXZpZXdVbmhlbHBmdWx9KTwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInJldmlld0J1dHRvbnNcIj5yZXBvcnQ8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJyZXZpZXdCdXR0b25zXCI+Y29tbWVudDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInJldmlld0J1dHRvbnNcIj5zaG93IGNvbW1lbnQ8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgUmV2aWV3OyJdfQ==