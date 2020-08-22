/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
import React from 'react';
import '../styles/Review.css';

const Unhelpful = ({ addUnhelpfulRating, review }) => {
  return (
    <button onClick={() => addUnhelpfulRating(review.productID, review._id)} className="reviewButtons">
      unhelpful
      {` (${review.reviewUnhelpful})`}
    </button>
  );
};

export default Unhelpful;
