/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
import React from 'react';
import '../styles/Review.css';

const Helpful = ({ addHelpfulRating, review }) => {
  return (
    <button style={{ border: '1px solid #c5cbd5', padding: '0 7px' }} onClick={() => addHelpfulRating(review.productID, review._id)} className="reviewButtons">
      helpful
      {` (${review.reviewHelpful})`}
    </button>
  );
};

export default Helpful;
