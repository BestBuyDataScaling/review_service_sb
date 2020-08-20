"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRating = _interopRequireDefault(require("react-rating"));

var _reactStarRatings = _interopRequireDefault(require("react-star-ratings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import '../styles/ReviewForm.css'
var ReviewForm = function ReviewForm(_ref) {
  var review = _ref.review,
      addReviewPart = _ref.addReviewPart,
      reviewQuality = _ref.reviewQuality,
      reviewValue = _ref.reviewValue,
      reviewEaseOfUse = _ref.reviewEaseOfUse,
      reviewRating = _ref.reviewRating,
      writeReview = _ref.writeReview,
      reviewHeading = _ref.reviewHeading,
      reviewText = _ref.reviewText,
      reviewQualityDefault = _ref.reviewQualityDefault,
      reviewValueDefault = _ref.reviewValueDefault,
      reviewEaseOfUseDefault = _ref.reviewEaseOfUseDefault,
      reviewUsername = _ref.reviewUsername,
      reviewEmail = _ref.reviewEmail;
  return /*#__PURE__*/_react["default"].createElement("div", {
    id: "writeReviewForm",
    "class": "rw-hidden"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bufferReview"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "reviewForm"
  }, /*#__PURE__*/_react["default"].createElement("h4", null, " Overall rating: "), /*#__PURE__*/_react["default"].createElement(_reactStarRatings["default"], {
    className: "reviewRating",
    onClick: reviewRating,
    starDimension: "33px",
    starSpacing: "0px",
    isSelectable: true,
    changeRating: function changeRating(rating) {
      return reviewRating(rating);
    },
    starHoverColor: "yellow",
    starRatedColor: "yellow"
  }), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("h5", null, " Summary "), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    className: "reviewHeading",
    onChange: addReviewPart,
    value: reviewHeading
  }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("em", {
    style: {
      fontSize: '13px'
    }
  }, " Example: Great Camera for beginners! ")), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h5", null, " Your review "), /*#__PURE__*/_react["default"].createElement("textarea", {
    className: "reviewText",
    onChange: addReviewPart,
    value: reviewText
  }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("em", {
    style: {
      fontSize: '13px'
    }
  }, " Minimum required characters: 50 ")), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h5", null, " Would you recommend this to a friend? "), /*#__PURE__*/_react["default"].createElement("input", {
    className: "reviewRecommended",
    onChange: addReviewPart,
    type: "radio",
    id: "yes",
    name: "recommended",
    value: true,
    defaultChecked: false
  }), /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "yes"
  }, " Yes "), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("input", {
    className: "reviewRecommended",
    onChange: addReviewPart,
    type: "radio",
    id: "no",
    name: "recommended",
    value: false,
    defaultChecked: false
  }), /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "no"
  }, " No "), /*#__PURE__*/_react["default"].createElement("br", null)), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h5", null, " Help us break it down "), "Quality: ", /*#__PURE__*/_react["default"].createElement(_reactRating["default"], {
    onClick: reviewQuality,
    emptySymbol: /*#__PURE__*/_react["default"].createElement("div", {
      className: "emptyRating"
    }),
    fullSymbol: /*#__PURE__*/_react["default"].createElement("div", {
      className: "fullRating"
    }),
    initialRating: reviewQualityDefault
  }), /*#__PURE__*/_react["default"].createElement("br", null), "Value: ", /*#__PURE__*/_react["default"].createElement(_reactRating["default"], {
    onClick: reviewValue,
    emptySymbol: /*#__PURE__*/_react["default"].createElement("div", {
      className: "emptyRating"
    }),
    fullSymbol: /*#__PURE__*/_react["default"].createElement("div", {
      className: "fullRating"
    }),
    initialRating: reviewValueDefault
  }), /*#__PURE__*/_react["default"].createElement("br", null), "Ease of Use: ", /*#__PURE__*/_react["default"].createElement(_reactRating["default"], {
    onClick: reviewEaseOfUse,
    emptySymbol: /*#__PURE__*/_react["default"].createElement("div", {
      className: "emptyRating"
    }),
    fullSymbol: /*#__PURE__*/_react["default"].createElement("div", {
      className: "fullRating"
    }),
    initialRating: reviewEaseOfUseDefault
  }), /*#__PURE__*/_react["default"].createElement("br", null)), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h5", null, " Add a photo "), /*#__PURE__*/_react["default"].createElement("input", {
    type: "file"
  })), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h5", null, " Tell us a little about yourself. "), /*#__PURE__*/_react["default"].createElement("p", {
    style: {
      fontSize: '15px'
    }
  }, /*#__PURE__*/_react["default"].createElement("strong", null, " Create a nickname ")), /*#__PURE__*/_react["default"].createElement("input", {
    className: "reviewUsername",
    type: "text",
    onChange: addReviewPart,
    value: reviewUsername
  }), /*#__PURE__*/_react["default"].createElement("p", {
    style: {
      fontSize: '15px'
    }
  }, /*#__PURE__*/_react["default"].createElement("strong", null, " Email address "), /*#__PURE__*/_react["default"].createElement("em", null, " Optional ")), /*#__PURE__*/_react["default"].createElement("input", {
    className: "reviewEmail",
    type: "text",
    onChange: addReviewPart,
    value: reviewEmail
  })), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: writeReview,
    className: "reviewSubmit"
  }, " Submit Review ")));
};

var _default = ReviewForm;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9zcmMvY29tcG9uZW50cy9SZXZpZXdGb3JtLmpzeCJdLCJuYW1lcyI6WyJSZXZpZXdGb3JtIiwicmV2aWV3IiwiYWRkUmV2aWV3UGFydCIsInJldmlld1F1YWxpdHkiLCJyZXZpZXdWYWx1ZSIsInJldmlld0Vhc2VPZlVzZSIsInJldmlld1JhdGluZyIsIndyaXRlUmV2aWV3IiwicmV2aWV3SGVhZGluZyIsInJldmlld1RleHQiLCJyZXZpZXdRdWFsaXR5RGVmYXVsdCIsInJldmlld1ZhbHVlRGVmYXVsdCIsInJldmlld0Vhc2VPZlVzZURlZmF1bHQiLCJyZXZpZXdVc2VybmFtZSIsInJldmlld0VtYWlsIiwicmF0aW5nIiwiZm9udFNpemUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7OztBQURBO0FBSUEsSUFBTUEsVUFBVSxHQUFHLFNBQWJBLFVBQWEsT0FBaU87QUFBQSxNQUE5TkMsTUFBOE4sUUFBOU5BLE1BQThOO0FBQUEsTUFBdE5DLGFBQXNOLFFBQXROQSxhQUFzTjtBQUFBLE1BQXZNQyxhQUF1TSxRQUF2TUEsYUFBdU07QUFBQSxNQUF4TEMsV0FBd0wsUUFBeExBLFdBQXdMO0FBQUEsTUFBM0tDLGVBQTJLLFFBQTNLQSxlQUEySztBQUFBLE1BQTFKQyxZQUEwSixRQUExSkEsWUFBMEo7QUFBQSxNQUE1SUMsV0FBNEksUUFBNUlBLFdBQTRJO0FBQUEsTUFBL0hDLGFBQStILFFBQS9IQSxhQUErSDtBQUFBLE1BQWhIQyxVQUFnSCxRQUFoSEEsVUFBZ0g7QUFBQSxNQUFwR0Msb0JBQW9HLFFBQXBHQSxvQkFBb0c7QUFBQSxNQUE5RUMsa0JBQThFLFFBQTlFQSxrQkFBOEU7QUFBQSxNQUExREMsc0JBQTBELFFBQTFEQSxzQkFBMEQ7QUFBQSxNQUFsQ0MsY0FBa0MsUUFBbENBLGNBQWtDO0FBQUEsTUFBbEJDLFdBQWtCLFFBQWxCQSxXQUFrQjtBQUVsUCxzQkFDRTtBQUFLLElBQUEsRUFBRSxFQUFH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QUssTUFBQSxTQUFTLEVBQUc7QUFBakIsTUFGbkI7QUFHRyxJQUFBLFVBQVUsZUFBSztBQUFLLE1BQUEsU0FBUyxFQUFHO0FBQWpCLE1BSGxCO0FBSUcsSUFBQSxhQUFhLEVBQUtPO0FBSnJCLElBaEJmLGVBc0JBLDJDQXRCQSxDQWpDRixlQXlERSwyQ0F6REYsZUEwREUsMERBQ0UsNERBREYsZUFFRTtBQUFPLElBQUEsSUFBSSxFQUFHO0FBQWQsSUFGRixDQTFERixlQThERSwyQ0E5REYsZUErREUsMERBQ0UsaUZBREYsZUFFRTtBQUFHLElBQUEsS0FBSyxFQUFJO0FBQUVJLE1BQUFBLFFBQVEsRUFBRTtBQUFaO0FBQVosa0JBQWtDLHNFQUFsQyxDQUZGLGVBR0U7QUFBTyxJQUFBLFNBQVMsRUFBRyxnQkFBbkI7QUFBb0MsSUFBQSxJQUFJLEVBQUcsTUFBM0M7QUFBa0QsSUFBQSxRQUFRLEVBQUtkLGFBQS9EO0FBQStFLElBQUEsS0FBSyxFQUFLVztBQUF6RixJQUhGLGVBSUU7QUFBRyxJQUFBLEtBQUssRUFBSTtBQUFFRyxNQUFBQSxRQUFRLEVBQUU7QUFBWjtBQUFaLGtCQUFrQyxrRUFBbEMsZUFBa0UseURBQWxFLENBSkYsZUFLRTtBQUFPLElBQUEsU0FBUyxFQUFHLGFBQW5CO0FBQWlDLElBQUEsSUFBSSxFQUFHLE1BQXhDO0FBQStDLElBQUEsUUFBUSxFQUFLZCxhQUE1RDtBQUE0RSxJQUFBLEtBQUssRUFBS1k7QUFBdEYsSUFMRixDQS9ERixlQXNFRTtBQUFRLElBQUEsT0FBTyxFQUFLUCxXQUFwQjtBQUFrQyxJQUFBLFNBQVMsRUFBRztBQUE5Qyx1QkF0RUYsQ0FIRixDQURGO0FBOEVELENBaEZEOztlQWtGZVAsVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmF0aW5nIGZyb20gJ3JlYWN0LXJhdGluZyc7XG4vLyBpbXBvcnQgJy4uL3N0eWxlcy9SZXZpZXdGb3JtLmNzcydcbmltcG9ydCBTdGFyUmF0aW5ncyBmcm9tICdyZWFjdC1zdGFyLXJhdGluZ3MnO1xuXG5cbmNvbnN0IFJldmlld0Zvcm0gPSAoeyByZXZpZXcsIGFkZFJldmlld1BhcnQsIHJldmlld1F1YWxpdHksIHJldmlld1ZhbHVlLCByZXZpZXdFYXNlT2ZVc2UsIHJldmlld1JhdGluZywgd3JpdGVSZXZpZXcsIHJldmlld0hlYWRpbmcsIHJldmlld1RleHQsIHJldmlld1F1YWxpdHlEZWZhdWx0LCByZXZpZXdWYWx1ZURlZmF1bHQsIHJldmlld0Vhc2VPZlVzZURlZmF1bHQsIHJldmlld1VzZXJuYW1lLCByZXZpZXdFbWFpbCB9KSA9PiB7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGlkID0gJ3dyaXRlUmV2aWV3Rm9ybScgY2xhc3MgPSAncnctaGlkZGVuJyA+XG4gICAgICA8ZGl2IGNsYXNzTmFtZSA9ICdidWZmZXJSZXZpZXcnID5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiAgY2xhc3NOYW1lID0gJ3Jldmlld0Zvcm0nID5cbiAgICAgICAgPGg0PiBPdmVyYWxsIHJhdGluZzogPC9oND5cbiAgICAgICAgPFN0YXJSYXRpbmdzXG4gICAgICAgICAgY2xhc3NOYW1lID0gJ3Jldmlld1JhdGluZydcbiAgICAgICAgICBvbkNsaWNrID0geyByZXZpZXdSYXRpbmcgfVxuICAgICAgICAgIHN0YXJEaW1lbnNpb24gPSBcIjMzcHhcIlxuICAgICAgICAgIHN0YXJTcGFjaW5nID0gXCIwcHhcIlxuICAgICAgICAgIGlzU2VsZWN0YWJsZSA9IHsgdHJ1ZSB9XG4gICAgICAgICAgY2hhbmdlUmF0aW5nID0geyByYXRpbmcgPT4gcmV2aWV3UmF0aW5nKHJhdGluZykgfVxuICAgICAgICAgIHN0YXJIb3ZlckNvbG9yID0gXCJ5ZWxsb3dcIlxuICAgICAgICAgIHN0YXJSYXRlZENvbG9yID0gXCJ5ZWxsb3dcIlxuICAgICAgICAvPlxuICAgICAgICA8ZGl2PlxuICAgICAgICA8YnI+PC9icj5cbiAgICAgICAgICA8aDU+IFN1bW1hcnkgPC9oNT5cbiAgICAgICAgICA8aW5wdXQgdHlwZSA9IFwidGV4dFwiIGNsYXNzTmFtZSA9ICdyZXZpZXdIZWFkaW5nJyBvbkNoYW5nZSA9IHsgYWRkUmV2aWV3UGFydCB9IHZhbHVlID0geyByZXZpZXdIZWFkaW5nIH0gPjwvaW5wdXQ+XG4gICAgICAgICAgPGJyPjwvYnI+XG4gICAgICAgICAgPGVtIHN0eWxlID0ge3sgZm9udFNpemU6ICcxM3B4JyB9fT4gRXhhbXBsZTogR3JlYXQgQ2FtZXJhIGZvciBiZWdpbm5lcnMhIDwvZW0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoNT4gWW91ciByZXZpZXcgPC9oNT5cbiAgICAgICAgICA8dGV4dGFyZWEgY2xhc3NOYW1lID0gJ3Jldmlld1RleHQnIG9uQ2hhbmdlID0geyBhZGRSZXZpZXdQYXJ0IH0gdmFsdWUgPSB7IHJldmlld1RleHR9ICA+PC90ZXh0YXJlYT5cbiAgICAgICAgICA8YnI+PC9icj5cbiAgICAgICAgICA8ZW0gc3R5bGUgPSB7eyBmb250U2l6ZTogJzEzcHgnIH19PiBNaW5pbXVtIHJlcXVpcmVkIGNoYXJhY3RlcnM6IDUwIDwvZW0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnI+PC9icj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDU+IFdvdWxkIHlvdSByZWNvbW1lbmQgdGhpcyB0byBhIGZyaWVuZD8gPC9oNT5cbiAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lID0gJ3Jldmlld1JlY29tbWVuZGVkJyBvbkNoYW5nZSA9IHsgYWRkUmV2aWV3UGFydCB9IHR5cGUgPSAncmFkaW8nIGlkID0gJ3llcycgbmFtZSA9ICdyZWNvbW1lbmRlZCcgdmFsdWUgPSB7IHRydWUgfSBkZWZhdWx0Q2hlY2tlZCA9IHsgZmFsc2UgfSA+PC9pbnB1dD5cbiAgICAgICAgICA8bGFiZWwgaHRtbEZvciA9ICd5ZXMnPiBZZXMgPC9sYWJlbD48YnI+PC9icj5cbiAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lID0gJ3Jldmlld1JlY29tbWVuZGVkJyBvbkNoYW5nZSA9IHsgYWRkUmV2aWV3UGFydCB9IHR5cGUgPSAncmFkaW8nIGlkID0gJ25vJyBuYW1lID0gJ3JlY29tbWVuZGVkJyB2YWx1ZSA9IHsgZmFsc2UgfSBkZWZhdWx0Q2hlY2tlZCA9IHsgZmFsc2UgfSA+PC9pbnB1dD5cbiAgICAgICAgICA8bGFiZWwgaHRtbEZvciA9ICdubycgPiBObyA8L2xhYmVsPjxicj48L2JyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDU+IEhlbHAgdXMgYnJlYWsgaXQgZG93biA8L2g1PlxuICAgICAgICAgIFF1YWxpdHk6IDxSYXRpbmdcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrID0geyByZXZpZXdRdWFsaXR5IH1cbiAgICAgICAgICAgICAgICAgICAgICBlbXB0eVN5bWJvbCA9IHsgPGRpdiBjbGFzc05hbWUgPSBcImVtcHR5UmF0aW5nXCIgPjwvZGl2Pn1cbiAgICAgICAgICAgICAgICAgICAgICBmdWxsU3ltYm9sID0geyA8ZGl2IGNsYXNzTmFtZSA9IFwiZnVsbFJhdGluZ1wiID48L2Rpdj4gfVxuICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxSYXRpbmcgPSB7IHJldmlld1F1YWxpdHlEZWZhdWx0IH1cbiAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgIDxicj48L2JyPlxuICAgICAgICAgIFZhbHVlOiA8UmF0aW5nXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2sgPSB7IHJldmlld1ZhbHVlIH1cbiAgICAgICAgICAgICAgICAgICAgZW1wdHlTeW1ib2wgPSB7IDxkaXYgY2xhc3NOYW1lID0gXCJlbXB0eVJhdGluZ1wiID48L2Rpdj4gfVxuICAgICAgICAgICAgICAgICAgICBmdWxsU3ltYm9sID0geyA8ZGl2IGNsYXNzTmFtZSA9IFwiZnVsbFJhdGluZ1wiID48L2Rpdj4gfVxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsUmF0aW5nID0geyByZXZpZXdWYWx1ZURlZmF1bHQgfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICA8YnI+PC9icj5cbiAgICAgICAgICBFYXNlIG9mIFVzZTogPFJhdGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrID0geyByZXZpZXdFYXNlT2ZVc2UgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBlbXB0eVN5bWJvbCA9IHsgPGRpdiBjbGFzc05hbWUgPSBcImVtcHR5UmF0aW5nXCIgPjwvZGl2PiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxTeW1ib2wgPSB7IDxkaXYgY2xhc3NOYW1lID0gXCJmdWxsUmF0aW5nXCIgPjwvZGl2PiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxSYXRpbmcgPSB7IHJldmlld0Vhc2VPZlVzZURlZmF1bHQgfVxuICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICA8YnI+PC9icj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxicj48L2JyPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoNT4gQWRkIGEgcGhvdG8gPC9oNT5cbiAgICAgICAgICA8aW5wdXQgdHlwZSA9ICdmaWxlJyA+PC9pbnB1dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxicj48L2JyPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoNT4gVGVsbCB1cyBhIGxpdHRsZSBhYm91dCB5b3Vyc2VsZi4gPC9oNT5cbiAgICAgICAgICA8cCBzdHlsZSA9IHt7IGZvbnRTaXplOiAnMTVweCcgfX0+PHN0cm9uZz4gQ3JlYXRlIGEgbmlja25hbWUgPC9zdHJvbmc+PC9wPlxuICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWUgPSAncmV2aWV3VXNlcm5hbWUnIHR5cGUgPSAndGV4dCcgb25DaGFuZ2UgPSB7IGFkZFJldmlld1BhcnQgfSB2YWx1ZSA9IHsgcmV2aWV3VXNlcm5hbWUgfSA+PC9pbnB1dD5cbiAgICAgICAgICA8cCBzdHlsZSA9IHt7IGZvbnRTaXplOiAnMTVweCcgfX0+PHN0cm9uZz4gRW1haWwgYWRkcmVzcyA8L3N0cm9uZz48ZW0+IE9wdGlvbmFsIDwvZW0+PC9wPlxuICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWUgPSAncmV2aWV3RW1haWwnIHR5cGUgPSAndGV4dCcgb25DaGFuZ2UgPSB7IGFkZFJldmlld1BhcnQgfSB2YWx1ZSA9IHsgcmV2aWV3RW1haWwgfSA+PC9pbnB1dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxidXR0b24gb25DbGljayA9IHsgd3JpdGVSZXZpZXcgfSBjbGFzc05hbWUgPSAncmV2aWV3U3VibWl0JyA+IFN1Ym1pdCBSZXZpZXcgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJldmlld0Zvcm07Il19