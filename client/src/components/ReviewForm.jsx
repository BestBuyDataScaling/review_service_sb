/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React from 'react';
import Rating from 'react-rating';
import '../styles/ReviewForm.css';
import StarRatings from 'react-star-ratings';

const ReviewForm = ({
  addReviewPart, reviewQuality, reviewValue, reviewEaseOfUse,
  reviewRating, writeReview, reviewHeading, reviewText, reviewQualityDefault,
  reviewValueDefault, reviewEaseOfUseDefault, reviewUsername, reviewEmail,
}) => {
  return (
    <div id="writeReviewForm" className="rw-hidden">
      <div className="bufferReview" />
      <div className="reviewForm">
        <h3> Overall rating: </h3>
        <StarRatings
          className="reviewRating"
          onClick={reviewRating}
          starDimension="33px"
          starSpacing="0px"
          isSelectable
          changeRating={(rating) => reviewRating(rating)}
          starHoverColor="yellow"
          starRatedColor="yellow"
        />
        <div>
          <br />
          <h3> Summary </h3>
          <input type="text" className="reviewHeading" onChange={addReviewPart} value={reviewHeading} />
          <br />
          <em style={{ fontSize: '13px' }}> Example: Great Camera for beginners! </em>
        </div>
        <div>
          <h3> Your review </h3>
          <textarea className="reviewText" onChange={addReviewPart} value={reviewText} />
          <br />
          <em style={{ fontSize: '13px' }}> Minimum required characters: 50 </em>
        </div>
        <br />
        <div>
          <h3> Would you recommend this to a friend? </h3>
          <input className="reviewRecommended" onChange={addReviewPart} type="radio" id="yes" name="recommended" value defaultChecked={false} />
          <label htmlFor="yes"> Yes </label>
          <br />
          <input className="reviewRecommended" onChange={addReviewPart} type="radio" id="no" name="recommended" value={false} defaultChecked={false} />
          <label htmlFor="no"> No </label>
          <br />
        </div>
        <br />
        <div>
          <h3> Help us break it down </h3>
          <h5>Quality:</h5>
          {' '}
          <Rating
            onClick={reviewQuality}
            emptySymbol={<div className="emptyRating" />}
            fullSymbol={<div className="fullRating" />}
            initialRating={reviewQualityDefault}
          />
          <br />
          <h5>Value:</h5>
          {' '}
          <Rating
            onClick={reviewValue}
            emptySymbol={<div className="emptyRating" />}
            fullSymbol={<div className="fullRating" />}
            initialRating={reviewValueDefault}
          />
          <br />
          <h5>Ease of Use:</h5>
          {' '}
          <Rating
            onClick={reviewEaseOfUse}
            emptySymbol={<div className="emptyRating" />}
            fullSymbol={<div className="fullRating" />}
            initialRating={reviewEaseOfUseDefault}
          />
          <br />
        </div>
        <br />
        <div>
          <h3> Add a photo </h3>
          <input type="file" />
        </div>
        <br />
        <div>
          <h3> Tell us a little about yourself. </h3>
          <p style={{ fontSize: '15px' }}><strong> Create a nickname </strong></p>
          <input className="reviewUsername" type="text" onChange={addReviewPart} value={reviewUsername} />
          <p style={{ fontSize: '15px' }}>
            <strong> Email address </strong>
            <em> Optional </em>
          </p>
          <input className="reviewEmail" type="text" onChange={addReviewPart} value={reviewEmail} />
        </div>
        <button onClick={writeReview} className="reviewSubmit"> Submit Review </button>
      </div>
    </div>
  );
};

export default ReviewForm;
