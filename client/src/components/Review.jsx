/* eslint-disable import/extensions */
/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React from 'react';
import '../styles/Review.css';
import StarRatings from 'react-star-ratings';
import ReactTimeAgo from 'react-time-ago';
import Helpful from './Helpful.jsx';
import Unhelpful from './Unhelpful.jsx';

const Review = ({ review, addHelpfulRating, addUnhelpfulRating }) => {
  return (
    <div className="reviewContainer">
      <div className="reviewHeader">
        <div className="username">
          <strong>{review.reviewUsername}</strong>
        </div>
        <br />
        <div className="reviewHeaderText">
          <strong>Pros mentioned</strong>
          <div />
          small battery, bad laptop
        </div>
        <br />
        <div className="reviewHeaderText">
          <strong>Cons mentioned</strong>
          <div />
          Looks sweet
        </div>
      </div>

      <div className="reviewBody">
        <StarRatings
          className="reviewRating"
          rating={review.reviewRating}
          starRatedColor="rgb(255, 204, 0)"
          // changeRating={this.changeRating}
          numberOfStars={5}
          name="rating"
          starDimension="25px"
          starSpacing="3px"
        />
        <div className="reviewBody header">
          <strong>{review.reviewHeading}</strong>
        </div>
        <div style={{ fontSize: '15px' }}>
          <br />
          Posted
          <ReactTimeAgo date={review.reviewCreatedAt} />
        </div>
        <br />
        {review.reviewText}
        <br />
        <div className="reviewBody footer">
          <Helpful
            addHelpfulRating={addHelpfulRating}
            review={review}
          />
          <Unhelpful
            addUnhelpfulRating={addUnhelpfulRating}
            review={review}
          />
          <button className="reviewButtons">report</button>
          <button className="reviewButtons">comment</button>
          <button className="reviewButtons">show comment</button>
        </div>
      </div>
    </div>
  );
};

export default Review;
