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
          { reviewAvg }
        </div>
        <div className="starRatings">
          <StarRatings
            rating={reviewAvg}
            starRatedColor="yellow"
            numberOfStars={5}
            name="rating"
            starDimension="20px"
            starSpacing="3px"
          />
          <br />
          {`${reviews.length} reviews` }
          <br />
          {`${percentRecommended}% would recommend to friends` }
        </div>
      </div>
      <div className="countByStars">
        <div>
          5 Stars
          <input type="checkbox" />
          <Line className="percentBar" percent={reviewCounts[5]} strokeWidth={5} strokeColor="blue" trailWidth={5} />
        </div>
        <div>
          4 Stars
          <input type="checkbox" />
          <Line className="percentBar" percent={reviewCounts[4]} strokeWidth={5} strokeColor="blue" trailWidth={5} />
        </div>
        <div>
          3 Stars
          <input type="checkbox" />
          <Line className="percentBar" percent={reviewCounts[3]} strokeWidth={5} strokeColor="blue" trailWidth={5} />
        </div>
        <div>
          2 Stars
          <input type="checkbox" />
          <Line className="percentBar" percent={reviewCounts[2]} strokeWidth={5} strokeColor="blue" trailWidth={5} />
        </div>
        <div>
          1 Stars
          <input type="checkbox" />
          <Line className="percentBar" percent={reviewCounts[1]} strokeWidth={5} strokeColor="blue" trailWidth={5} />
        </div>
      </div>
    </div>
  );
};

export default RatingCountByStar;
