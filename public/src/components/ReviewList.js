"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactStarRatings = _interopRequireDefault(require("react-star-ratings"));

var _RatingCountByStar = _interopRequireDefault(require("./RatingCountByStar.jsx"));

var _FilterReview = _interopRequireDefault(require("./FilterReview.jsx"));

var _Review = _interopRequireDefault(require("./Review.jsx"));

var _axios = _interopRequireDefault(require("axios"));

var _ReviewForm = _interopRequireDefault(require("./ReviewForm.jsx"));

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var ReviewList = /*#__PURE__*/function (_React$Component) {
  _inherits(ReviewList, _React$Component);

  var _super = _createSuper(ReviewList);

  function ReviewList(props) {
    var _this;

    _classCallCheck(this, ReviewList);

    _this = _super.call(this, props); //state holds:
    //the reviews that will be rendered
    //the product ID that is currently being viewed
    //fields used in creating a review

    _this.state = {
      reviews: [],
      productID: 4,
      reviewHeading: '',
      reviewText: '',
      reviewUsername: '',
      reviewRating: 0,
      reviewRecommended: false,
      reviewQuality: 0,
      reviewValue: 0,
      reviewEaseOfUse: 0,
      reviewImages: [],
      reviewAvg: 0,
      reviewCounts: {},
      reviewEmail: ''
    };
    _this.getReviewsByProductID = _this.getReviewsByProductID.bind(_assertThisInitialized(_this)); // this.getAllReviews = this.getAllReviews.bind(this);

    _this.addReviewPart = _this.addReviewPart.bind(_assertThisInitialized(_this));
    _this.addReviewQuality = _this.addReviewQuality.bind(_assertThisInitialized(_this));
    _this.addReviewValue = _this.addReviewValue.bind(_assertThisInitialized(_this));
    _this.addReviewEaseOfUse = _this.addReviewEaseOfUse.bind(_assertThisInitialized(_this));
    _this.addReviewRating = _this.addReviewRating.bind(_assertThisInitialized(_this));
    _this.writeReview = _this.writeReview.bind(_assertThisInitialized(_this));
    _this.changeProduct = _this.changeProduct.bind(_assertThisInitialized(_this));
    _this.toggleReview = _this.toggleReview.bind(_assertThisInitialized(_this)); // this.onMessage = this.onMessage.bind(this);

    return _this;
  }

  _createClass(ReviewList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // this.getAllReviews();
      this.getReviewsByProductID(this.state.productID);
      (0, _jquery["default"])('body').on('change', '#Walker', function (event) {
        console.log("IN REVIEW LIST: ", event);
      }); // window.addEventListener('message', this.initPort);
    } // initPort(event) {
    //   var port2 = event.ports[0];
    //   port2.onMessage = this.onMessage;
    // }
    // onMessage(event) {
    //   console.log("EVENT IN REVIEW LIST: ", event);
    // }
    //gets reviews by the product ID that is currently in state
    //also, in the second 'then statement, caculates the average rating of reviews by product, and the amount of reviews per star category (e.g. # of 5 star reviews, # of 4 star reviews, etc)

  }, {
    key: "getReviewsByProductID",
    value: function getReviewsByProductID(state) {
      var _this2 = this;

      console.log(11111111111);

      _axios["default"].get('http://localhost:4000/reviews', {
        params: {
          productID: state
        }
      }).then(function (reviews) {
        _this2.setState({
          reviews: reviews.data
        });

        return reviews;
      }).then(function () {
        var sum = 0;
        var counts = {
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0
        };

        _this2.state.reviews.forEach(function (review) {
          sum += review.reviewRating;
          counts[review.reviewRating]++;
        });

        for (var key in counts) {
          counts[key] = counts[key] / _this2.state.reviews.length * 100;
        }

        if (sum !== 0) {
          _this2.setState({
            reviewAvg: sum / _this2.state.reviews.length,
            reviewCounts: counts
          });
        } else {
          _this2.setState({
            reviewAvg: 0,
            reviewCounts: counts
          });
        } // console.log(this.state)

      })["catch"](function (error) {
        console.log('Error retrieving reviews: ', error);
      });
    } //not currently using this fn - was just using it in the beginning to render some data to the page to work on styling
    // getAllReviews() {
    //   axios.get('/reviews')
    //   .then(reviews => {
    //     this.setState({
    //       reviews: reviews.data
    //     });
    //     // console.log(this.state);
    //   })
    //   .catch(error => {
    //     console.log('Error retrieving reviews: ', error);
    //     console.log(error)
    //   })
    // }
    //uses the data entered on the 'ReviewForm' component that is rendered to state, and sends a post request to write a new review into the DB

  }, {
    key: "writeReview",
    value: function writeReview(event) {
      var _this3 = this;

      event.preventDefault();
      this.toggleReview(event);

      _axios["default"].post('http://localhost:4000/reviews', {
        productID: this.state.productID,
        reviewHeading: this.state.reviewHeading,
        reviewText: this.state.reviewText,
        reviewRating: this.state.reviewRating,
        reviewUsername: this.state.reviewUsername,
        reviewRecommended: this.state.reviewRecommended,
        reivewQuality: this.state.reviewQuality,
        reviewValue: this.state.reviewValue,
        reviewEaseOfUse: this.state.reviewEaseOfUse,
        reviewImages: this.state.reviewImages,
        reviewHelpful: 0,
        reviewUnhelpful: 0
      }).then(function (confirmation) {
        console.log('Review successfully posted: ', confirmation);
      }).then(function () {
        _this3.getReviewsByProductID(_this3.state.productID);
      }).then(function () {
        _this3.setState({
          reviewHeading: '',
          reviewText: '',
          reviewRating: 0,
          reviewUsername: '',
          reviewRecommended: false,
          reviewQuality: 0,
          reviewValue: 0,
          reviewEaseOfUse: 0,
          reviewImages: [],
          reviewEmail: ''
        });
      })["catch"](function (error) {
        console.log('Error posting review: ', error);
      });
    } //this is used to add certain review characteristics into state - passed down as a prop & called in the 'ReviewForm' component

  }, {
    key: "addReviewPart",
    value: function addReviewPart(event) {
      var reviewPart = event.target.className;
      this.setState(_defineProperty({}, reviewPart, event.target.value));
    } //this is used to add certain review characteristics into state - passed down as a prop & called in the 'ReviewForm' component
    //I want to refactor these next 3 functions and combine them, but need to spend some time figuring out how to do so. The problem is that the rating component I'm using only sends back a number (the rating in this case) --need to figure out how to determine which component that number came from in order to combine

  }, {
    key: "addReviewQuality",
    value: function addReviewQuality(rating) {
      this.setState({
        reviewQuality: rating
      });
    } //this is used to add certain review characteristics into state - passed down as a prop & called in the 'ReviewForm' component

  }, {
    key: "addReviewValue",
    value: function addReviewValue(rating) {
      this.setState({
        reviewValue: rating
      });
    } //this is used to add certain review characteristics into state - passed down as a prop & called in the 'ReviewForm' component

  }, {
    key: "addReviewEaseOfUse",
    value: function addReviewEaseOfUse(rating) {
      this.setState({
        reviewEaseOfUse: rating
      });
    }
  }, {
    key: "addReviewRating",
    value: function addReviewRating(rating) {
      this.setState({
        reviewRating: rating
      });
    } //may or may not need this once we combine - this was used in order for me to test out switching up the productID in state to make sure the reviews were changing based on productID

  }, {
    key: "changeProduct",
    value: function changeProduct(event) {
      var _this4 = this;

      var newProductID = event.target.value;
      this.setState({
        productID: newProductID
      }, function () {
        _this4.getReviewsByProductID(_this4.state.productID); // this.getAverageRating();

      });
    } //used to hide the div with the 'ReviewForm component'

  }, {
    key: "toggleReview",
    value: function toggleReview(event) {
      event.preventDefault();
      var reviewDiv = document.getElementById('writeReviewForm');

      if (reviewDiv.className === 'rw-hidden' || !reviewDiv.className) {
        reviewDiv.className = 'rw-visible';
      } else {
        reviewDiv.className = 'rw-hidden';
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("input", {
        onChange: this.changeProduct,
        type: "text"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "reviewStats"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "ratingSummary"
      }, /*#__PURE__*/_react["default"].createElement(_RatingCountByStar["default"], {
        reviewAvg: this.state.reviewAvg,
        reviewCounts: this.state.reviewCounts,
        reviews: this.state.reviews
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "rating pros"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "ProsAndCons"
      }, "Pros mentioned", /*#__PURE__*/_react["default"].createElement("button", {
        className: "proButtons"
      }, "Pro #1"), /*#__PURE__*/_react["default"].createElement("button", {
        className: "proButtons"
      }, "Pro #2"), /*#__PURE__*/_react["default"].createElement("button", {
        className: "proButtons"
      }, "Pro #3")), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ProsAndCons"
      }, "Cons mentioned", /*#__PURE__*/_react["default"].createElement("button", {
        className: "proButtons"
      }, "Con #1"), /*#__PURE__*/_react["default"].createElement("button", {
        className: "proButtons"
      }, "Con #1"), /*#__PURE__*/_react["default"].createElement("button", {
        className: "proButtons"
      }, "Con #1"))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "rating expertRating"
      }, "Expert Rating", /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", {
        className: "avgRatingScore"
      }, "4.7"), /*#__PURE__*/_react["default"].createElement("div", {
        className: "starRatings"
      }, /*#__PURE__*/_react["default"].createElement(_reactStarRatings["default"], {
        rating: 4,
        starRatedColor: "yellow",
        numberOfStars: 5,
        name: "rating",
        starDimension: "20px",
        starSpacing: "3px"
      }), /*#__PURE__*/_react["default"].createElement("br", null), "(50 ratings)"))), /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          borderBottom: '1px solid rgb(197, 203, 213)'
        }
      }, /*#__PURE__*/_react["default"].createElement(_FilterReview["default"], null)), this.state.reviews.map(function (review, idx) {
        return /*#__PURE__*/_react["default"].createElement(_Review["default"], {
          review: review,
          key: idx
        });
      }), /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          textAlign: 'center'
        }
      }, /*#__PURE__*/_react["default"].createElement("button", {
        className: "showReviewButtons show"
      }, "Show More"), /*#__PURE__*/_react["default"].createElement("button", {
        className: "showReviewButtons",
        onClick: this.toggleReview
      }, "Write a Review")), /*#__PURE__*/_react["default"].createElement(_ReviewForm["default"] // review={this.state.addReview}
      , {
        addReviewPart: this.addReviewPart,
        reviewQuality: this.addReviewQuality,
        reviewValue: this.addReviewValue,
        reviewEaseOfUse: this.addReviewEaseOfUse,
        reviewRating: this.addReviewRating,
        writeReview: this.writeReview,
        overallRating: this.state.reviewRating,
        reviewHeading: this.state.reviewHeading,
        reviewText: this.state.reviewText,
        reviewQualityDefault: this.state.reviewQuality,
        reviewValueDefault: this.state.reviewValue,
        reviewEaseOfUseDefault: this.state.reviewEaseOfUse,
        reviewUsername: this.state.reviewUsername,
        reviewEmail: this.state.reviewEmail
      }));
    }
  }]);

  return ReviewList;
}(_react["default"].Component);

var _default = ReviewList;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9zcmMvY29tcG9uZW50cy9SZXZpZXdMaXN0LmpzeCJdLCJuYW1lcyI6WyJSZXZpZXdMaXN0IiwicHJvcHMiLCJzdGF0ZSIsInJldmlld3MiLCJwcm9kdWN0SUQiLCJyZXZpZXdIZWFkaW5nIiwicmV2aWV3VGV4dCIsInJldmlld1VzZXJuYW1lIiwicmV2aWV3UmF0aW5nIiwicmV2aWV3UmVjb21tZW5kZWQiLCJyZXZpZXdRdWFsaXR5IiwicmV2aWV3VmFsdWUiLCJyZXZpZXdFYXNlT2ZVc2UiLCJyZXZpZXdJbWFnZXMiLCJyZXZpZXdBdmciLCJyZXZpZXdDb3VudHMiLCJyZXZpZXdFbWFpbCIsImdldFJldmlld3NCeVByb2R1Y3RJRCIsImJpbmQiLCJhZGRSZXZpZXdQYXJ0IiwiYWRkUmV2aWV3UXVhbGl0eSIsImFkZFJldmlld1ZhbHVlIiwiYWRkUmV2aWV3RWFzZU9mVXNlIiwiYWRkUmV2aWV3UmF0aW5nIiwid3JpdGVSZXZpZXciLCJjaGFuZ2VQcm9kdWN0IiwidG9nZ2xlUmV2aWV3Iiwib24iLCJldmVudCIsImNvbnNvbGUiLCJsb2ciLCJheGlvcyIsImdldCIsInBhcmFtcyIsInRoZW4iLCJzZXRTdGF0ZSIsImRhdGEiLCJzdW0iLCJjb3VudHMiLCJmb3JFYWNoIiwicmV2aWV3Iiwia2V5IiwibGVuZ3RoIiwiZXJyb3IiLCJwcmV2ZW50RGVmYXVsdCIsInBvc3QiLCJyZWl2ZXdRdWFsaXR5IiwicmV2aWV3SGVscGZ1bCIsInJldmlld1VuaGVscGZ1bCIsImNvbmZpcm1hdGlvbiIsInJldmlld1BhcnQiLCJ0YXJnZXQiLCJjbGFzc05hbWUiLCJ2YWx1ZSIsInJhdGluZyIsIm5ld1Byb2R1Y3RJRCIsInJldmlld0RpdiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJib3JkZXJCb3R0b20iLCJtYXAiLCJpZHgiLCJ0ZXh0QWxpZ24iLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztB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LEVBQUUsS0FBS3BDO0FBQXJELDBCQUZGLENBbERGLGVBc0RFLGdDQUFDLHNCQUFELENBQ0U7QUFERjtBQUVFLFFBQUEsYUFBYSxFQUFFLEtBQUtQLGFBRnRCO0FBR0UsUUFBQSxhQUFhLEVBQUksS0FBS0MsZ0JBSHhCO0FBSUUsUUFBQSxXQUFXLEVBQUksS0FBS0MsY0FKdEI7QUFLRSxRQUFBLGVBQWUsRUFBSSxLQUFLQyxrQkFMMUI7QUFNRSxRQUFBLFlBQVksRUFBSSxLQUFLQyxlQU52QjtBQU9FLFFBQUEsV0FBVyxFQUFJLEtBQUtDLFdBUHRCO0FBUUUsUUFBQSxhQUFhLEVBQUksS0FBS3RCLEtBQUwsQ0FBV00sWUFSOUI7QUFTRSxRQUFBLGFBQWEsRUFBSSxLQUFLTixLQUFMLENBQVdHLGFBVDlCO0FBVUUsUUFBQSxVQUFVLEVBQUksS0FBS0gsS0FBTCxDQUFXSSxVQVYzQjtBQVdFLFFBQUEsb0JBQW9CLEVBQUksS0FBS0osS0FBTCxDQUFXUSxhQVhyQztBQVlFLFFBQUEsa0JBQWtCLEVBQUksS0FBS1IsS0FBTCxDQUFXUyxXQVpuQztBQWFFLFFBQUEsc0JBQXNCLEVBQUksS0FBS1QsS0FBTCxDQUFXVSxlQWJ2QztBQWNFLFFBQUEsY0FBYyxFQUFJLEtBQUtWLEtBQUwsQ0FBV0ssY0FkL0I7QUFlRSxRQUFBLFdBQVcsRUFBSSxLQUFLTCxLQUFMLENBQVdjO0FBZjVCLFFBdERGLENBREY7QUEwRUQ7Ozs7RUE3U3NCK0Msa0JBQU1DLFM7O2VBZ1RkaEUsVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG4vLyBpbXBvcnQgJy4uL3N0eWxlcy9SZXZpZXdMaXN0LmNzcyc7XG5pbXBvcnQgU3RhclJhdGluZ3MgZnJvbSAncmVhY3Qtc3Rhci1yYXRpbmdzJztcbmltcG9ydCBSYXRpbmdDb3VudEJ5U3RhciBmcm9tICcuL1JhdGluZ0NvdW50QnlTdGFyLmpzeCc7XG5pbXBvcnQgRmlsdGVyUmV2aWV3IGZyb20gJy4vRmlsdGVyUmV2aWV3LmpzeCc7XG5pbXBvcnQgUmV2aWV3IGZyb20gJy4vUmV2aWV3LmpzeCc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IFJldmlld0Zvcm0gZnJvbSAnLi9SZXZpZXdGb3JtLmpzeCc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5jbGFzcyBSZXZpZXdMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcblxuICAgIC8vc3RhdGUgaG9sZHM6XG4gICAgICAvL3RoZSByZXZpZXdzIHRoYXQgd2lsbCBiZSByZW5kZXJlZFxuICAgICAgLy90aGUgcHJvZHVjdCBJRCB0aGF0IGlzIGN1cnJlbnRseSBiZWluZyB2aWV3ZWRcbiAgICAgIC8vZmllbGRzIHVzZWQgaW4gY3JlYXRpbmcgYSByZXZpZXdcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICByZXZpZXdzOiBbXSxcbiAgICAgIHByb2R1Y3RJRDogNCxcbiAgICAgIHJldmlld0hlYWRpbmc6ICcnLFxuICAgICAgcmV2aWV3VGV4dDogJycsXG4gICAgICByZXZpZXdVc2VybmFtZTogJycsXG4gICAgICByZXZpZXdSYXRpbmc6IDAsXG4gICAgICByZXZpZXdSZWNvbW1lbmRlZDogZmFsc2UsXG4gICAgICByZXZpZXdRdWFsaXR5OiAwLFxuICAgICAgcmV2aWV3VmFsdWU6IDAsXG4gICAgICByZXZpZXdFYXNlT2ZVc2U6IDAsXG4gICAgICByZXZpZXdJbWFnZXM6IFtdLFxuICAgICAgcmV2aWV3QXZnOiAwLFxuICAgICAgcmV2aWV3Q291bnRzOiB7fSxcbiAgICAgIHJldmlld0VtYWlsOiAnJ1xuICAgIH07XG5cblxuICAgIHRoaXMuZ2V0UmV2aWV3c0J5UHJvZHVjdElEID0gdGhpcy5nZXRSZXZpZXdzQnlQcm9kdWN0SUQuYmluZCh0aGlzKTtcbiAgICAvLyB0aGlzLmdldEFsbFJldmlld3MgPSB0aGlzLmdldEFsbFJldmlld3MuYmluZCh0aGlzKTtcbiAgICB0aGlzLmFkZFJldmlld1BhcnQgPSB0aGlzLmFkZFJldmlld1BhcnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmFkZFJldmlld1F1YWxpdHkgPSB0aGlzLmFkZFJldmlld1F1YWxpdHkuYmluZCh0aGlzKTtcbiAgICB0aGlzLmFkZFJldmlld1ZhbHVlID0gdGhpcy5hZGRSZXZpZXdWYWx1ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYWRkUmV2aWV3RWFzZU9mVXNlID0gdGhpcy5hZGRSZXZpZXdFYXNlT2ZVc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmFkZFJldmlld1JhdGluZyA9IHRoaXMuYWRkUmV2aWV3UmF0aW5nLmJpbmQodGhpcyk7XG4gICAgdGhpcy53cml0ZVJldmlldyA9IHRoaXMud3JpdGVSZXZpZXcuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNoYW5nZVByb2R1Y3QgPSB0aGlzLmNoYW5nZVByb2R1Y3QuYmluZCh0aGlzKTtcbiAgICB0aGlzLnRvZ2dsZVJldmlldyA9IHRoaXMudG9nZ2xlUmV2aWV3LmJpbmQodGhpcyk7XG4gICAgLy8gdGhpcy5vbk1lc3NhZ2UgPSB0aGlzLm9uTWVzc2FnZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gdGhpcy5nZXRBbGxSZXZpZXdzKCk7XG4gICAgdGhpcy5nZXRSZXZpZXdzQnlQcm9kdWN0SUQodGhpcy5zdGF0ZS5wcm9kdWN0SUQpO1xuICAgICQoJ2JvZHknKS5vbignY2hhbmdlJywgJyNXYWxrZXInLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiSU4gUkVWSUVXIExJU1Q6IFwiLCBldmVudCk7XG4gICAgfSlcbiAgICAvLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMuaW5pdFBvcnQpO1xuICB9XG5cbiAgLy8gaW5pdFBvcnQoZXZlbnQpIHtcbiAgLy8gICB2YXIgcG9ydDIgPSBldmVudC5wb3J0c1swXTtcbiAgLy8gICBwb3J0Mi5vbk1lc3NhZ2UgPSB0aGlzLm9uTWVzc2FnZTtcbiAgLy8gfVxuXG4gIC8vIG9uTWVzc2FnZShldmVudCkge1xuICAvLyAgIGNvbnNvbGUubG9nKFwiRVZFTlQgSU4gUkVWSUVXIExJU1Q6IFwiLCBldmVudCk7XG4gIC8vIH1cblxuXG4gIC8vZ2V0cyByZXZpZXdzIGJ5IHRoZSBwcm9kdWN0IElEIHRoYXQgaXMgY3VycmVudGx5IGluIHN0YXRlXG4gIC8vYWxzbywgaW4gdGhlIHNlY29uZCAndGhlbiBzdGF0ZW1lbnQsIGNhY3VsYXRlcyB0aGUgYXZlcmFnZSByYXRpbmcgb2YgcmV2aWV3cyBieSBwcm9kdWN0LCBhbmQgdGhlIGFtb3VudCBvZiByZXZpZXdzIHBlciBzdGFyIGNhdGVnb3J5IChlLmcuICMgb2YgNSBzdGFyIHJldmlld3MsICMgb2YgNCBzdGFyIHJldmlld3MsIGV0YylcblxuICBnZXRSZXZpZXdzQnlQcm9kdWN0SUQoc3RhdGUpe1xuICAgIGNvbnNvbGUubG9nKDExMTExMTExMTExKVxuICAgIGF4aW9zLmdldCgnaHR0cDovL2xvY2FsaG9zdDo0MDAwL3Jldmlld3MnLCB7XG4gICAgICBwYXJhbXM6IHtcbiAgICAgICAgcHJvZHVjdElEOiBzdGF0ZVxuICAgICAgfVxuICAgIH0pXG4gICAgLnRoZW4ocmV2aWV3cyA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgcmV2aWV3czogcmV2aWV3cy5kYXRhXG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXZpZXdzO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgdmFyIHN1bSA9IDBcbiAgICAgIHZhciBjb3VudHMgPSB7XG4gICAgICAgIDU6IDAsXG4gICAgICAgIDQ6IDAsXG4gICAgICAgIDM6IDAsXG4gICAgICAgIDI6IDAsXG4gICAgICAgIDE6IDBcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhdGUucmV2aWV3cy5mb3JFYWNoKHJldmlldyA9PiB7XG4gICAgICAgIHN1bSArPSByZXZpZXcucmV2aWV3UmF0aW5nXG4gICAgICAgIGNvdW50c1tyZXZpZXcucmV2aWV3UmF0aW5nXSsrXG4gICAgICB9KTtcblxuICAgICAgZm9yICh2YXIga2V5IGluIGNvdW50cykge1xuICAgICAgICBjb3VudHNba2V5XSA9IChjb3VudHNba2V5XSAvIHRoaXMuc3RhdGUucmV2aWV3cy5sZW5ndGgpICogMTAwO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3VtICE9PSAwKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHJldmlld0F2Zzogc3VtIC8gdGhpcy5zdGF0ZS5yZXZpZXdzLmxlbmd0aCxcbiAgICAgICAgICByZXZpZXdDb3VudHM6IGNvdW50c1xuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgcmV2aWV3QXZnOiAwLFxuICAgICAgICAgIHJldmlld0NvdW50czogY291bnRzXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zdGF0ZSlcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgcmV0cmlldmluZyByZXZpZXdzOiAnLCBlcnJvcik7XG4gICAgfSlcbiAgfVxuXG4gIC8vbm90IGN1cnJlbnRseSB1c2luZyB0aGlzIGZuIC0gd2FzIGp1c3QgdXNpbmcgaXQgaW4gdGhlIGJlZ2lubmluZyB0byByZW5kZXIgc29tZSBkYXRhIHRvIHRoZSBwYWdlIHRvIHdvcmsgb24gc3R5bGluZ1xuXG4gIC8vIGdldEFsbFJldmlld3MoKSB7XG4gIC8vICAgYXhpb3MuZ2V0KCcvcmV2aWV3cycpXG4gIC8vICAgLnRoZW4ocmV2aWV3cyA9PiB7XG4gIC8vICAgICB0aGlzLnNldFN0YXRlKHtcbiAgLy8gICAgICAgcmV2aWV3czogcmV2aWV3cy5kYXRhXG4gIC8vICAgICB9KTtcbiAgLy8gICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuICAvLyAgIH0pXG4gIC8vICAgLmNhdGNoKGVycm9yID0+IHtcbiAgLy8gICAgIGNvbnNvbGUubG9nKCdFcnJvciByZXRyaWV2aW5nIHJldmlld3M6ICcsIGVycm9yKTtcbiAgLy8gICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAvLyAgIH0pXG4gIC8vIH1cblxuXG4gIC8vdXNlcyB0aGUgZGF0YSBlbnRlcmVkIG9uIHRoZSAnUmV2aWV3Rm9ybScgY29tcG9uZW50IHRoYXQgaXMgcmVuZGVyZWQgdG8gc3RhdGUsIGFuZCBzZW5kcyBhIHBvc3QgcmVxdWVzdCB0byB3cml0ZSBhIG5ldyByZXZpZXcgaW50byB0aGUgREJcbiAgd3JpdGVSZXZpZXcoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMudG9nZ2xlUmV2aWV3KGV2ZW50KTtcbiAgICBheGlvcy5wb3N0KCdodHRwOi8vbG9jYWxob3N0OjQwMDAvcmV2aWV3cycgLCB7XG4gICAgICBwcm9kdWN0SUQ6IHRoaXMuc3RhdGUucHJvZHVjdElELFxuICAgICAgcmV2aWV3SGVhZGluZzogdGhpcy5zdGF0ZS5yZXZpZXdIZWFkaW5nLFxuICAgICAgcmV2aWV3VGV4dDogdGhpcy5zdGF0ZS5yZXZpZXdUZXh0LFxuICAgICAgcmV2aWV3UmF0aW5nOiB0aGlzLnN0YXRlLnJldmlld1JhdGluZyxcbiAgICAgIHJldmlld1VzZXJuYW1lOiB0aGlzLnN0YXRlLnJldmlld1VzZXJuYW1lLFxuICAgICAgcmV2aWV3UmVjb21tZW5kZWQ6IHRoaXMuc3RhdGUucmV2aWV3UmVjb21tZW5kZWQsXG4gICAgICByZWl2ZXdRdWFsaXR5OiB0aGlzLnN0YXRlLnJldmlld1F1YWxpdHksXG4gICAgICByZXZpZXdWYWx1ZTogdGhpcy5zdGF0ZS5yZXZpZXdWYWx1ZSxcbiAgICAgIHJldmlld0Vhc2VPZlVzZTogdGhpcy5zdGF0ZS5yZXZpZXdFYXNlT2ZVc2UsXG4gICAgICByZXZpZXdJbWFnZXM6IHRoaXMuc3RhdGUucmV2aWV3SW1hZ2VzLFxuICAgICAgcmV2aWV3SGVscGZ1bDogMCxcbiAgICAgIHJldmlld1VuaGVscGZ1bDogMFxuICAgIH0pXG4gICAgLnRoZW4oY29uZmlybWF0aW9uID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdSZXZpZXcgc3VjY2Vzc2Z1bGx5IHBvc3RlZDogJywgY29uZmlybWF0aW9uKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuZ2V0UmV2aWV3c0J5UHJvZHVjdElEKHRoaXMuc3RhdGUucHJvZHVjdElEKTtcbiAgICB9KVxuICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHJldmlld0hlYWRpbmc6ICcnLFxuICAgICAgcmV2aWV3VGV4dDogJycsXG4gICAgICByZXZpZXdSYXRpbmc6IDAsXG4gICAgICByZXZpZXdVc2VybmFtZTogJycsXG4gICAgICByZXZpZXdSZWNvbW1lbmRlZDogZmFsc2UsXG4gICAgICByZXZpZXdRdWFsaXR5OiAwLFxuICAgICAgcmV2aWV3VmFsdWU6IDAsXG4gICAgICByZXZpZXdFYXNlT2ZVc2U6IDAsXG4gICAgICByZXZpZXdJbWFnZXM6IFtdLFxuICAgICAgcmV2aWV3RW1haWw6ICcnXG4gICAgICB9KVxuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBwb3N0aW5nIHJldmlldzogJywgZXJyb3IpO1xuICAgIH0pXG4gIH1cblxuICAvL3RoaXMgaXMgdXNlZCB0byBhZGQgY2VydGFpbiByZXZpZXcgY2hhcmFjdGVyaXN0aWNzIGludG8gc3RhdGUgLSBwYXNzZWQgZG93biBhcyBhIHByb3AgJiBjYWxsZWQgaW4gdGhlICdSZXZpZXdGb3JtJyBjb21wb25lbnRcbiAgYWRkUmV2aWV3UGFydChldmVudCkge1xuICAgIGxldCByZXZpZXdQYXJ0ID0gZXZlbnQudGFyZ2V0LmNsYXNzTmFtZVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIFtyZXZpZXdQYXJ0XTogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICB9KTtcbiAgfVxuIC8vdGhpcyBpcyB1c2VkIHRvIGFkZCBjZXJ0YWluIHJldmlldyBjaGFyYWN0ZXJpc3RpY3MgaW50byBzdGF0ZSAtIHBhc3NlZCBkb3duIGFzIGEgcHJvcCAmIGNhbGxlZCBpbiB0aGUgJ1Jldmlld0Zvcm0nIGNvbXBvbmVudFxuICAvL0kgd2FudCB0byByZWZhY3RvciB0aGVzZSBuZXh0IDMgZnVuY3Rpb25zIGFuZCBjb21iaW5lIHRoZW0sIGJ1dCBuZWVkIHRvIHNwZW5kIHNvbWUgdGltZSBmaWd1cmluZyBvdXQgaG93IHRvIGRvIHNvLiBUaGUgcHJvYmxlbSBpcyB0aGF0IHRoZSByYXRpbmcgY29tcG9uZW50IEknbSB1c2luZyBvbmx5IHNlbmRzIGJhY2sgYSBudW1iZXIgKHRoZSByYXRpbmcgaW4gdGhpcyBjYXNlKSAtLW5lZWQgdG8gZmlndXJlIG91dCBob3cgdG8gZGV0ZXJtaW5lIHdoaWNoIGNvbXBvbmVudCB0aGF0IG51bWJlciBjYW1lIGZyb20gaW4gb3JkZXIgdG8gY29tYmluZVxuXG4gIGFkZFJldmlld1F1YWxpdHkocmF0aW5nKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICByZXZpZXdRdWFsaXR5OiByYXRpbmdcbiAgICB9KVxuICB9XG4gLy90aGlzIGlzIHVzZWQgdG8gYWRkIGNlcnRhaW4gcmV2aWV3IGNoYXJhY3RlcmlzdGljcyBpbnRvIHN0YXRlIC0gcGFzc2VkIGRvd24gYXMgYSBwcm9wICYgY2FsbGVkIGluIHRoZSAnUmV2aWV3Rm9ybScgY29tcG9uZW50XG4gIGFkZFJldmlld1ZhbHVlKHJhdGluZykge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcmV2aWV3VmFsdWU6IHJhdGluZ1xuICAgIH0pXG4gIH1cbiAvL3RoaXMgaXMgdXNlZCB0byBhZGQgY2VydGFpbiByZXZpZXcgY2hhcmFjdGVyaXN0aWNzIGludG8gc3RhdGUgLSBwYXNzZWQgZG93biBhcyBhIHByb3AgJiBjYWxsZWQgaW4gdGhlICdSZXZpZXdGb3JtJyBjb21wb25lbnRcbiAgYWRkUmV2aWV3RWFzZU9mVXNlKHJhdGluZykge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcmV2aWV3RWFzZU9mVXNlOiByYXRpbmdcbiAgICB9KVxuICB9XG4gIGFkZFJldmlld1JhdGluZyhyYXRpbmcpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHJldmlld1JhdGluZzogcmF0aW5nXG4gICAgfSlcbiAgfVxuXG4gIC8vbWF5IG9yIG1heSBub3QgbmVlZCB0aGlzIG9uY2Ugd2UgY29tYmluZSAtIHRoaXMgd2FzIHVzZWQgaW4gb3JkZXIgZm9yIG1lIHRvIHRlc3Qgb3V0IHN3aXRjaGluZyB1cCB0aGUgcHJvZHVjdElEIGluIHN0YXRlIHRvIG1ha2Ugc3VyZSB0aGUgcmV2aWV3cyB3ZXJlIGNoYW5naW5nIGJhc2VkIG9uIHByb2R1Y3RJRFxuICBjaGFuZ2VQcm9kdWN0KGV2ZW50KSB7XG4gICAgbGV0IG5ld1Byb2R1Y3RJRCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByb2R1Y3RJRDogbmV3UHJvZHVjdElEXG4gICAgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5nZXRSZXZpZXdzQnlQcm9kdWN0SUQodGhpcy5zdGF0ZS5wcm9kdWN0SUQpO1xuICAgICAgLy8gdGhpcy5nZXRBdmVyYWdlUmF0aW5nKCk7XG4gICAgfSlcbiAgfVxuXG4gIC8vdXNlZCB0byBoaWRlIHRoZSBkaXYgd2l0aCB0aGUgJ1Jldmlld0Zvcm0gY29tcG9uZW50J1xuICB0b2dnbGVSZXZpZXcoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCByZXZpZXdEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd3JpdGVSZXZpZXdGb3JtJylcbiAgICBpZiAocmV2aWV3RGl2LmNsYXNzTmFtZSA9PT0gJ3J3LWhpZGRlbicgfHwgIXJldmlld0Rpdi5jbGFzc05hbWUgKSB7XG4gICAgICByZXZpZXdEaXYuY2xhc3NOYW1lID0gJ3J3LXZpc2libGUnXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldmlld0Rpdi5jbGFzc05hbWUgPSAncnctaGlkZGVuJ1xuICAgIH1cbiAgfVxuICByZW5kZXIoKSB7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGlucHV0IG9uQ2hhbmdlPXt0aGlzLmNoYW5nZVByb2R1Y3R9IHR5cGU9J3RleHQnPjwvaW5wdXQ+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyZXZpZXdTdGF0cyc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWUgPSAncmF0aW5nU3VtbWFyeSc+XG4gICAgICAgICAgICA8UmF0aW5nQ291bnRCeVN0YXJcbiAgICAgICAgICAgIHJldmlld0F2ZyA9IHt0aGlzLnN0YXRlLnJldmlld0F2Z31cbiAgICAgICAgICAgIHJldmlld0NvdW50cyA9IHt0aGlzLnN0YXRlLnJldmlld0NvdW50c31cbiAgICAgICAgICAgIHJldmlld3MgPSB7dGhpcy5zdGF0ZS5yZXZpZXdzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZSA9J3JhdGluZyBwcm9zJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiUHJvc0FuZENvbnNcIj5cbiAgICAgICAgICAgICAgUHJvcyBtZW50aW9uZWRcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJwcm9CdXR0b25zXCI+UHJvICMxPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicHJvQnV0dG9uc1wiPlBybyAjMjwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInByb0J1dHRvbnNcIj5Qcm8gIzM8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJQcm9zQW5kQ29uc1wiPlxuICAgICAgICAgICAgICBDb25zIG1lbnRpb25lZFxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInByb0J1dHRvbnNcIj5Db24gIzE8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJwcm9CdXR0b25zXCI+Q29uICMxPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicHJvQnV0dG9uc1wiPkNvbiAjMTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWUgPSAncmF0aW5nIGV4cGVydFJhdGluZyc+XG4gICAgICAgICAgICBFeHBlcnQgUmF0aW5nXG4gICAgICAgICAgICA8YnI+PC9icj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdhdmdSYXRpbmdTY29yZSc+XG4gICAgICAgICAgICAgIDQuN1xuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc3RhclJhdGluZ3MnPlxuICAgICAgICAgICAgICA8U3RhclJhdGluZ3NcbiAgICAgICAgICAgICAgICByYXRpbmc9ezR9XG4gICAgICAgICAgICAgICAgc3RhclJhdGVkQ29sb3I9XCJ5ZWxsb3dcIlxuICAgICAgICAgICAgICAgIG51bWJlck9mU3RhcnM9ezV9XG4gICAgICAgICAgICAgICAgbmFtZT0ncmF0aW5nJ1xuICAgICAgICAgICAgICAgIHN0YXJEaW1lbnNpb249XCIyMHB4XCJcbiAgICAgICAgICAgICAgICBzdGFyU3BhY2luZz1cIjNweFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGJyPjwvYnI+XG4gICAgICAgICAgICAgICg1MCByYXRpbmdzKVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7Ym9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHJnYigxOTcsIDIwMywgMjEzKSd9fT5cbiAgICAgICAgICA8RmlsdGVyUmV2aWV3IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7dGhpcy5zdGF0ZS5yZXZpZXdzLm1hcCggKHJldmlldywgaWR4KSA9PlxuICAgICAgICA8UmV2aWV3IHJldmlldz17cmV2aWV3fSAga2V5PXtpZHh9IC8+XG4gICAgICAgICl9XG4gICAgICAgIDxkaXYgc3R5bGU9e3t0ZXh0QWxpZ246ICdjZW50ZXInfX0+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J3Nob3dSZXZpZXdCdXR0b25zIHNob3cnID5TaG93IE1vcmU8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZSA9J3Nob3dSZXZpZXdCdXR0b25zJyBvbkNsaWNrPXt0aGlzLnRvZ2dsZVJldmlld30+V3JpdGUgYSBSZXZpZXc8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxSZXZpZXdGb3JtXG4gICAgICAgICAgLy8gcmV2aWV3PXt0aGlzLnN0YXRlLmFkZFJldmlld31cbiAgICAgICAgICBhZGRSZXZpZXdQYXJ0PXt0aGlzLmFkZFJldmlld1BhcnR9XG4gICAgICAgICAgcmV2aWV3UXVhbGl0eSA9IHt0aGlzLmFkZFJldmlld1F1YWxpdHl9XG4gICAgICAgICAgcmV2aWV3VmFsdWUgPSB7dGhpcy5hZGRSZXZpZXdWYWx1ZX1cbiAgICAgICAgICByZXZpZXdFYXNlT2ZVc2UgPSB7dGhpcy5hZGRSZXZpZXdFYXNlT2ZVc2V9XG4gICAgICAgICAgcmV2aWV3UmF0aW5nID0ge3RoaXMuYWRkUmV2aWV3UmF0aW5nfVxuICAgICAgICAgIHdyaXRlUmV2aWV3ID0ge3RoaXMud3JpdGVSZXZpZXd9XG4gICAgICAgICAgb3ZlcmFsbFJhdGluZyA9IHt0aGlzLnN0YXRlLnJldmlld1JhdGluZ31cbiAgICAgICAgICByZXZpZXdIZWFkaW5nID0ge3RoaXMuc3RhdGUucmV2aWV3SGVhZGluZ31cbiAgICAgICAgICByZXZpZXdUZXh0ID0ge3RoaXMuc3RhdGUucmV2aWV3VGV4dH1cbiAgICAgICAgICByZXZpZXdRdWFsaXR5RGVmYXVsdCA9IHt0aGlzLnN0YXRlLnJldmlld1F1YWxpdHl9XG4gICAgICAgICAgcmV2aWV3VmFsdWVEZWZhdWx0ID0ge3RoaXMuc3RhdGUucmV2aWV3VmFsdWV9XG4gICAgICAgICAgcmV2aWV3RWFzZU9mVXNlRGVmYXVsdCA9IHt0aGlzLnN0YXRlLnJldmlld0Vhc2VPZlVzZX1cbiAgICAgICAgICByZXZpZXdVc2VybmFtZSA9IHt0aGlzLnN0YXRlLnJldmlld1VzZXJuYW1lfVxuICAgICAgICAgIHJldmlld0VtYWlsID0ge3RoaXMuc3RhdGUucmV2aWV3RW1haWx9XG4gICAgICAgIC8+XG4gICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbiAgZXhwb3J0IGRlZmF1bHQgUmV2aWV3TGlzdCJdfQ==