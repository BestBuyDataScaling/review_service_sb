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
        <h4> Overall rating: </h4>
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
          <h5> Summary </h5>
          <input type="text" className="reviewHeading" onChange={addReviewPart} value={reviewHeading} />
          <br />
          <em style={{ fontSize: '13px' }}> Example: Great Camera for beginners! </em>
        </div>
        <div>
          <h5> Your review </h5>
          <textarea className="reviewText" onChange={addReviewPart} value={reviewText} />
          <br />
          <em style={{ fontSize: '13px' }}> Minimum required characters: 50 </em>
        </div>
        <br />
        <div>
          <h5> Would you recommend this to a friend? </h5>
          <input className="reviewRecommended" onChange={addReviewPart} type="radio" id="yes" name="recommended" value defaultChecked={false} />
          <label htmlFor="yes"> Yes </label>
          <br />
          <input className="reviewRecommended" onChange={addReviewPart} type="radio" id="no" name="recommended" value={false} defaultChecked={false} />
          <label htmlFor="no"> No </label>
          <br />
        </div>
        <div>
          <h5> Help us break it down </h5>
          Quality:
          {' '}
          <Rating
            onClick={reviewQuality}
            emptySymbol={<div className="emptyRating" />}
            fullSymbol={<div className="fullRating" />}
            initialRating={reviewQualityDefault}
          />
          <br />
          Value:
          {' '}
          <Rating
            onClick={reviewValue}
            emptySymbol={<div className="emptyRating" />}
            fullSymbol={<div className="fullRating" />}
            initialRating={reviewValueDefault}
          />
          <br />
          Ease of Use:
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
          <h5> Add a photo </h5>
          <input type="file" />
        </div>
        <br />
        <div>
          <h5> Tell us a little about yourself. </h5>
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
