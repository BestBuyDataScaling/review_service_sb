"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _rcProgress = require("rc-progress");

var _reactStarRatings = _interopRequireDefault(require("react-star-ratings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import '../styles/ReviewList.css'
var RatingCountByStar = function RatingCountByStar(_ref) {
  var reviewAvg = _ref.reviewAvg,
      reviewCounts = _ref.reviewCounts,
      reviews = _ref.reviews;
  // console.log(reviewAvg)
  var numRecommended = 0;
  reviews.forEach(function (review) {
    if (review.reviewRecommended === true) {
      numRecommended++;
    }
  });
  var percentRecommended = numRecommended / reviews.length * 100 || 0;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "averageRatings"
  }, "Customer Rating", /*#__PURE__*/_react["default"].createElement("div", {
    className: "avgRatingScore"
  }, reviewAvg), /*#__PURE__*/_react["default"].createElement("div", {
    className: "starRatings"
  }, /*#__PURE__*/_react["default"].createElement(_reactStarRatings["default"], {
    rating: reviewAvg,
    starRatedColor: "yellow",
    numberOfStars: 5,
    name: "rating",
    starDimension: "20px",
    starSpacing: "3px"
  }), /*#__PURE__*/_react["default"].createElement("br", null), "".concat(reviews.length, " reviews"), /*#__PURE__*/_react["default"].createElement("br", null), "".concat(percentRecommended, "% would recommend to friends"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "countByStars"
  }, /*#__PURE__*/_react["default"].createElement("div", null, "5 Stars", /*#__PURE__*/_react["default"].createElement("input", {
    type: "checkbox"
  }), /*#__PURE__*/_react["default"].createElement(_rcProgress.Line, {
    className: "percentBar",
    percent: reviewCounts[5],
    strokeWidth: 5,
    strokeColor: "blue",
    trailWidth: 5
  })), /*#__PURE__*/_react["default"].createElement("div", null, "4 Stars", /*#__PURE__*/_react["default"].createElement("input", {
    type: "checkbox"
  }), /*#__PURE__*/_react["default"].createElement(_rcProgress.Line, {
    className: "percentBar",
    percent: reviewCounts[4],
    strokeWidth: 5,
    strokeColor: "blue",
    trailWidth: 5
  })), /*#__PURE__*/_react["default"].createElement("div", null, "3 Stars", /*#__PURE__*/_react["default"].createElement("input", {
    type: "checkbox"
  }), /*#__PURE__*/_react["default"].createElement(_rcProgress.Line, {
    className: "percentBar",
    percent: reviewCounts[3],
    strokeWidth: 5,
    strokeColor: "blue",
    trailWidth: 5
  })), /*#__PURE__*/_react["default"].createElement("div", null, "2 Stars", /*#__PURE__*/_react["default"].createElement("input", {
    type: "checkbox"
  }), /*#__PURE__*/_react["default"].createElement(_rcProgress.Line, {
    className: "percentBar",
    percent: reviewCounts[2],
    strokeWidth: 5,
    strokeColor: "blue",
    trailWidth: 5
  })), /*#__PURE__*/_react["default"].createElement("div", null, "1 Stars", /*#__PURE__*/_react["default"].createElement("input", {
    type: "checkbox"
  }), /*#__PURE__*/_react["default"].createElement(_rcProgress.Line, {
    className: "percentBar",
    percent: reviewCounts[1],
    strokeWidth: 5,
    strokeColor: "blue",
    trailWidth: 5
  }))));
};

var _default = RatingCountByStar;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9zcmMvY29tcG9uZW50cy9SYXRpbmdDb3VudEJ5U3Rhci5qc3giXSwibmFtZXMiOlsiUmF0aW5nQ291bnRCeVN0YXIiLCJyZXZpZXdBdmciLCJyZXZpZXdDb3VudHMiLCJyZXZpZXdzIiwibnVtUmVjb21tZW5kZWQiLCJmb3JFYWNoIiwicmV2aWV3IiwicmV2aWV3UmVjb21tZW5kZWQiLCJwZXJjZW50UmVjb21tZW5kZWQiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7OztBQURBO0FBR0EsSUFBTUEsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixPQUEwQztBQUFBLE1BQXZDQyxTQUF1QyxRQUF2Q0EsU0FBdUM7QUFBQSxNQUE1QkMsWUFBNEIsUUFBNUJBLFlBQTRCO0FBQUEsTUFBZEMsT0FBYyxRQUFkQSxPQUFjO0FBQ2xFO0FBQ0EsTUFBSUMsY0FBYyxHQUFHLENBQXJCO0FBQ0FELEVBQUFBLE9BQU8sQ0FBQ0UsT0FBUixDQUFpQixVQUFBQyxNQUFNLEVBQUk7QUFDekIsUUFBS0EsTUFBTSxDQUFDQyxpQkFBUCxLQUE2QixJQUFsQyxFQUF5QztBQUN2Q0gsTUFBQUEsY0FBYztBQUNmO0FBQ0YsR0FKRDtBQU1BLE1BQUlJLGtCQUFrQixHQUFHSixjQUFjLEdBQUdELE9BQU8sQ0FBQ00sTUFBekIsR0FBa0MsR0FBbEMsSUFBeUMsQ0FBbEU7QUFFQSxzQkFDRSwwREFDQTtBQUFLLElBQUEsU0FBUyxFQUFHO0FBQWpCLHFDQUVFO0FBQUssSUFBQSxTQUFTLEVBQUc7QUFBakIsS0FDSVIsU0FESixDQUZGLGVBS0U7QUFBSyxJQUFBLFNBQVMsRUFBRztBQUFqQixrQkFDRSxnQ0FBQyw0QkFBRDtBQUNFLElBQUEsTUFBTSxFQUFLQSxTQURiO0FBRUUsSUFBQSxjQUFjLEVBQUcsUUFGbkI7QUFHRSxJQUFBLGFBQWEsRUFBSyxDQUhwQjtBQUlFLElBQUEsSUFBSSxFQUFHLFFBSlQ7QUFLRSxJQUFBLGFBQWEsRUFBRyxNQUxsQjtBQU1FLElBQUEsV0FBVyxFQUFHO0FBTmhCLElBREYsZUFTRSwyQ0FURixZQVVPRSxPQUFPLENBQUNNLE1BVmYsNEJBV0UsMkNBWEYsWUFZT0Qsa0JBWlAsa0NBTEYsQ0FEQSxlQXFCRTtBQUFLLElBQUEsU0FBUyxFQUFHO0FBQWpCLGtCQUNFLHFFQUVFO0FBQU8sSUFBQSxJQUFJLEVBQUc7QUFBZCxJQUZGLGVBR0UsZ0NBQUMsZ0JBQUQ7QUFBTSxJQUFBLFNBQVMsRUFBRyxZQUFsQjtBQUErQixJQUFBLE9BQU8sRUFBS04sWUFBWSxDQUFDLENBQUQsQ0FBdkQ7QUFBNkQsSUFBQSxXQUFXLEVBQUssQ0FBN0U7QUFBaUYsSUFBQSxXQUFXLEVBQUcsTUFBL0Y7QUFBc0csSUFBQSxVQUFVLEVBQUs7QUFBckgsSUFIRixDQURGLGVBTUUscUVBRUU7QUFBTyxJQUFBLElBQUksRUFBRztBQUFkLElBRkYsZUFHRSxnQ0FBQyxnQkFBRDtBQUFNLElBQUEsU0FBUyxFQUFHLFlBQWxCO0FBQStCLElBQUEsT0FBTyxFQUFLQSxZQUFZLENBQUMsQ0FBRCxDQUF2RDtBQUE2RCxJQUFBLFdBQVcsRUFBSyxDQUE3RTtBQUFpRixJQUFBLFdBQVcsRUFBRyxNQUEvRjtBQUFzRyxJQUFBLFVBQVUsRUFBSztBQUFySCxJQUhGLENBTkYsZUFXRSxxRUFFRTtBQUFPLElBQUEsSUFBSSxFQUFHO0FBQWQsSUFGRixlQUdFLGdDQUFDLGdCQUFEO0FBQU0sSUFBQSxTQUFTLEVBQUcsWUFBbEI7QUFBK0IsSUFBQSxPQUFPLEVBQUtBLFlBQVksQ0FBQyxDQUFELENBQXZEO0FBQTZELElBQUEsV0FBVyxFQUFLLENBQTdFO0FBQWlGLElBQUEsV0FBVyxFQUFHLE1BQS9GO0FBQXNHLElBQUEsVUFBVSxFQUFLO0FBQXJILElBSEYsQ0FYRixlQWdCRSxxRUFFRTtBQUFPLElBQUEsSUFBSSxFQUFHO0FBQWQsSUFGRixlQUdFLGdDQUFDLGdCQUFEO0FBQU0sSUFBQSxTQUFTLEVBQUcsWUFBbEI7QUFBK0IsSUFBQSxPQUFPLEVBQUtBLFlBQVksQ0FBQyxDQUFELENBQXZEO0FBQTZELElBQUEsV0FBVyxFQUFLLENBQTdFO0FBQWlGLElBQUEsV0FBVyxFQUFHLE1BQS9GO0FBQXNHLElBQUEsVUFBVSxFQUFLO0FBQXJILElBSEYsQ0FoQkYsZUFxQkUscUVBRUU7QUFBTyxJQUFBLElBQUksRUFBRztBQUFkLElBRkYsZUFHRSxnQ0FBQyxnQkFBRDtBQUFNLElBQUEsU0FBUyxFQUFHLFlBQWxCO0FBQStCLElBQUEsT0FBTyxFQUFLQSxZQUFZLENBQUMsQ0FBRCxDQUF2RDtBQUE2RCxJQUFBLFdBQVcsRUFBSyxDQUE3RTtBQUFpRixJQUFBLFdBQVcsRUFBRyxNQUEvRjtBQUFzRyxJQUFBLFVBQVUsRUFBSztBQUFySCxJQUhGLENBckJGLENBckJGLENBREY7QUFtREQsQ0E5REQ7O2VBZ0VlRixpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0xpbmV9IGZyb20gJ3JjLXByb2dyZXNzJztcbi8vIGltcG9ydCAnLi4vc3R5bGVzL1Jldmlld0xpc3QuY3NzJ1xuaW1wb3J0IFN0YXJSYXRpbmdzIGZyb20gJ3JlYWN0LXN0YXItcmF0aW5ncyc7XG5cbmNvbnN0IFJhdGluZ0NvdW50QnlTdGFyID0gKHsgcmV2aWV3QXZnLCByZXZpZXdDb3VudHMsIHJldmlld3MgfSkgPT4ge1xuICAvLyBjb25zb2xlLmxvZyhyZXZpZXdBdmcpXG4gIHZhciBudW1SZWNvbW1lbmRlZCA9IDA7XG4gIHJldmlld3MuZm9yRWFjaCggcmV2aWV3ID0+IHtcbiAgICBpZiAoIHJldmlldy5yZXZpZXdSZWNvbW1lbmRlZCA9PT0gdHJ1ZSApIHtcbiAgICAgIG51bVJlY29tbWVuZGVkKys7XG4gICAgfVxuICB9KTtcblxuICBsZXQgcGVyY2VudFJlY29tbWVuZGVkID0gbnVtUmVjb21tZW5kZWQgLyByZXZpZXdzLmxlbmd0aCAqIDEwMCB8fCAwO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICA8ZGl2IGNsYXNzTmFtZSA9ICdhdmVyYWdlUmF0aW5ncycgPlxuICAgICAgQ3VzdG9tZXIgUmF0aW5nXG4gICAgICA8ZGl2IGNsYXNzTmFtZSA9ICdhdmdSYXRpbmdTY29yZScgPlxuICAgICAgICB7IHJldmlld0F2ZyB9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lID0gJ3N0YXJSYXRpbmdzJyA+XG4gICAgICAgIDxTdGFyUmF0aW5nc1xuICAgICAgICAgIHJhdGluZyA9IHsgcmV2aWV3QXZnIH1cbiAgICAgICAgICBzdGFyUmF0ZWRDb2xvciA9IFwieWVsbG93XCJcbiAgICAgICAgICBudW1iZXJPZlN0YXJzID0geyA1IH1cbiAgICAgICAgICBuYW1lID0gJ3JhdGluZydcbiAgICAgICAgICBzdGFyRGltZW5zaW9uID0gXCIyMHB4XCJcbiAgICAgICAgICBzdGFyU3BhY2luZyA9IFwiM3B4XCJcbiAgICAgICAgLz5cbiAgICAgICAgPGJyPjwvYnI+XG4gICAgICAgIHtgJHsgcmV2aWV3cy5sZW5ndGggfSByZXZpZXdzYCB9XG4gICAgICAgIDxicj48L2JyPlxuICAgICAgICB7YCR7IHBlcmNlbnRSZWNvbW1lbmRlZCB9JSB3b3VsZCByZWNvbW1lbmQgdG8gZnJpZW5kc2AgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWUgPSAnY291bnRCeVN0YXJzJyA+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgNSBTdGFyc1xuICAgICAgICAgIDxpbnB1dCB0eXBlID0gXCJjaGVja2JveFwiID48L2lucHV0PlxuICAgICAgICAgIDxMaW5lIGNsYXNzTmFtZSA9ICdwZXJjZW50QmFyJyBwZXJjZW50ID0geyByZXZpZXdDb3VudHNbNV0gfSBzdHJva2VXaWR0aCA9IHsgNSB9IHN0cm9rZUNvbG9yID0gJ2JsdWUnIHRyYWlsV2lkdGggPSB7IDUgfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA0IFN0YXJzXG4gICAgICAgICAgPGlucHV0IHR5cGUgPSBcImNoZWNrYm94XCIgPjwvaW5wdXQ+XG4gICAgICAgICAgPExpbmUgY2xhc3NOYW1lID0gJ3BlcmNlbnRCYXInIHBlcmNlbnQgPSB7IHJldmlld0NvdW50c1s0XSB9IHN0cm9rZVdpZHRoID0geyA1IH0gc3Ryb2tlQ29sb3IgPSAnYmx1ZScgdHJhaWxXaWR0aCA9IHsgNSB9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDMgU3RhcnNcbiAgICAgICAgICA8aW5wdXQgdHlwZSA9IFwiY2hlY2tib3hcIiA+PC9pbnB1dD5cbiAgICAgICAgICA8TGluZSBjbGFzc05hbWUgPSAncGVyY2VudEJhcicgcGVyY2VudCA9IHsgcmV2aWV3Q291bnRzWzNdIH0gc3Ryb2tlV2lkdGggPSB7IDUgfSBzdHJva2VDb2xvciA9ICdibHVlJyB0cmFpbFdpZHRoID0geyA1IH0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgMiBTdGFyc1xuICAgICAgICAgIDxpbnB1dCB0eXBlID0gXCJjaGVja2JveFwiID48L2lucHV0PlxuICAgICAgICAgIDxMaW5lIGNsYXNzTmFtZSA9ICdwZXJjZW50QmFyJyBwZXJjZW50ID0geyByZXZpZXdDb3VudHNbMl0gfSBzdHJva2VXaWR0aCA9IHsgNSB9IHN0cm9rZUNvbG9yID0gJ2JsdWUnIHRyYWlsV2lkdGggPSB7IDUgfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAxIFN0YXJzXG4gICAgICAgICAgPGlucHV0IHR5cGUgPSBcImNoZWNrYm94XCI+PC9pbnB1dD5cbiAgICAgICAgICA8TGluZSBjbGFzc05hbWUgPSAncGVyY2VudEJhcicgcGVyY2VudCA9IHsgcmV2aWV3Q291bnRzWzFdIH0gc3Ryb2tlV2lkdGggPSB7IDUgfSBzdHJva2VDb2xvciA9ICdibHVlJyB0cmFpbFdpZHRoID0geyA1IH0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmF0aW5nQ291bnRCeVN0YXI7XG4iXX0=