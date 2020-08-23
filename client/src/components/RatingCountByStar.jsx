/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
import React from 'react';
import { Line } from 'rc-progress';
import '../styles/ReviewList.css';
import StarRatings from 'react-star-ratings';

const RatingCountByStar = ({ reviewAvg, reviewCounts, reviews }) => {
  // console.log(reviewAvg)
  let numRecommended = 0;
  reviews.forEach((review) => {
    if (review.reviewRecommended === true) {
      numRecommended++;
    }
  });

  const percentRecommended = (numRecommended / reviews.length) * 100 || 0;

  return (
    <div>
      <div className="averageRatings">
        Customer Rating
        <div className="avgRatingScore">
          { reviewAvg.toFixed(1) }
        </div>
        <div className="starRatings">
          <StarRatings
            rating={reviewAvg}
            starRatedColor="rgb(255, 204, 0)"
            numberOfStars={5}
            name="rating"
            starDimension="20px"
            starSpacing="3px"
          />
          <br />
          {`${reviews.length} reviews` }
          <br />
          <strong>{`${Math.floor(percentRecommended)}% `}</strong>
          would recommend to a friend.
        </div>
      </div>
      <div className="countByStars">
        <div className="ratingsByStars">
          5 Stars
          <input type="checkbox" />
          <Line className="percentBar" percent={reviewCounts[5]} strokeWidth={5} strokeColor="blue" trailWidth={5} />
        </div>
        <div className="ratingsByStars">
          4 Stars
          <input type="checkbox" />
          <Line className="percentBar" percent={reviewCounts[4]} strokeWidth={5} strokeColor="blue" trailWidth={5} />
        </div>
        <div className="ratingsByStars">
          3 Stars
          <input type="checkbox" />
          <Line className="percentBar" percent={reviewCounts[3]} strokeWidth={5} strokeColor="blue" trailWidth={5} />
        </div>
        <div className="ratingsByStars">
          2 Stars
          <input type="checkbox" />
          <Line className="percentBar" percent={reviewCounts[2]} strokeWidth={5} strokeColor="blue" trailWidth={5} />
        </div>
        <div className="ratingsByStars">
          1 Stars
          <input type="checkbox" />
          <Line className="percentBar" percent={reviewCounts[1]} strokeWidth={5} strokeColor="blue" trailWidth={5} />
        </div>
      </div>
    </div>
  );
};

export default RatingCountByStar;
